/**
 * Compares scroll smoothness between New Experiences and Featured Experiences sections.
 * Captures scrollLeft over time during programmatic scrolls and measures frame consistency.
 */
const puppeteer = require('puppeteer');

const URL = 'http://localhost:5173';
const SECTIONS = [
  {
    name: 'New Experiences',
    sectionSelector: 'section',
    headingText: 'New Experiences',
    arrowSelector: 'button[aria-label="Scroll right"]',
  },
  {
    name: 'Featured Experiences (TourCarouselSection)',
    // TourCarouselSection sections are labeled with ids or dynamic titles
    // Let's find by the generic section structure
    arrowSelector: 'button[aria-label="Scroll right"]',
    // Distinguished by presence of "Recommended For You" or similar
    headingText: 'Recommended For You',
  },
];

async function getScrollSmoothness(page, sectionName, headingText, arrowSelector) {
  console.log(`\n=== ${sectionName} ===`);

  // Find the section by heading text
  const section = await page.evaluate((text) => {
    const headings = [...document.querySelectorAll('h2, h3, h4')];
    const h = headings.find((el) => el.textContent.includes(text));
    if (!h) return null;
    const s = h.closest('section');
    if (!s) return null;
    return {
      top: s.getBoundingClientRect().top + window.scrollY,
    };
  }, headingText);

  if (!section) {
    console.log(`  Could not find section with heading "${headingText}"`);
    return null;
  }

  // Scroll the section into view
  await page.evaluate((top) => {
    window.scrollTo({ top: top - 120, behavior: 'instant' });
  }, section.top);
  await new Promise((r) => setTimeout(r, 500));

  // Find the right arrow button within this section
  const btnInfo = await page.evaluate((selector) => {
    const btns = [...document.querySelectorAll(selector)];
    // Get the one that's visible
    const btn = btns.find((b) => b.offsetParent !== null);
    if (!btn) return null;
    return { x: btn.getBoundingClientRect().left + btn.offsetWidth / 2, y: btn.getBoundingClientRect().top + btn.offsetHeight / 2 };
  }, arrowSelector);

  if (!btnInfo) {
    console.log('  Could not find visible arrow button');
    return null;
  }

  // Find the scroll container - it's the track div inside CarouselClipTrack or the direct scrollable div
  const scrollInfo = await page.evaluate(() => {
    // Look for scroll containers with scroll-snap
    const containers = [...document.querySelectorAll('[style*="scroll-snap-type"], [style*="scrollSnapType"], .snap-x, .snap-mandatory')];
    const visible = containers.filter((c) => c.offsetParent !== null && c.scrollWidth > c.clientWidth);
    if (visible.length === 0) return null;
    // Get the one nearest to viewport center
    const vh = window.innerHeight;
    const sorted = visible.sort((a, b) => {
      const aCenter = Math.abs(a.getBoundingClientRect().top - vh / 2);
      const bCenter = Math.abs(b.getBoundingClientRect().top - vh / 2);
      return aCenter - bCenter;
    });
    const c = sorted[0];
    return {
      scrollWidth: c.scrollWidth,
      clientWidth: c.clientWidth,
      scrollLeft: c.scrollLeft,
      maxScroll: c.scrollWidth - c.clientWidth,
      hasScrollSnap: !!c.style.scrollSnapType || c.classList.contains('snap-x'),
      hasScrollBehavior: !!getComputedStyle(c).scrollBehavior || c.classList.contains('scroll-smooth'),
      className: c.className?.substring(0, 200),
      style: c.getAttribute('style')?.substring(0, 200),
    };
  });

  if (!scrollInfo) {
    console.log('  Could not find scroll container');
    return null;
  }

  console.log(`  Container: scrollWidth=${scrollInfo.scrollWidth}, clientWidth=${scrollInfo.clientWidth}`);
  console.log(`  Has scroll-snap: ${scrollInfo.hasScrollSnap}`);
  console.log(`  Has scroll-behavior:smooth: ${scrollInfo.hasScrollBehavior}`);
  console.log(`  className: ${scrollInfo.className}`);
  console.log(`  style: ${scrollInfo.style}`);

  // Now measure the scroll animation smoothness over 3 clicks
  const results = [];
  for (let click = 0; click < 3; click++) {
    // Record scrollLeft positions over time during the animation
    const frames = await page.evaluate(() => {
      return new Promise((resolve) => {
        const containers = [...document.querySelectorAll('[style*="scroll-snap-type"], [style*="scrollSnapType"], .snap-x, .snap-mandatory')];
        const visible = containers.filter((c) => c.offsetParent !== null && c.scrollWidth > c.clientWidth);
        if (visible.length === 0) { resolve(null); return; }
        const vh = window.innerHeight;
        const sorted = visible.sort((a, b) => {
          const aCenter = Math.abs(a.getBoundingClientRect().top - vh / 2);
          const bCenter = Math.abs(b.getBoundingClientRect().top - vh / 2);
          return aCenter - bCenter;
        });
        const container = sorted[0];

        const startScrollLeft = container.scrollLeft;
        const frames = [];
        const startTime = performance.now();
        let lastScrollLeft = startScrollLeft;
        let idleFrames = 0;
        const MAX_DURATION = 2000;

        const record = () => {
          const now = performance.now();
          const elapsed = now - startTime;
          const current = container.scrollLeft;

          if (current !== lastScrollLeft) {
            frames.push({ time: elapsed, scrollLeft: current, delta: current - lastScrollLeft });
            lastScrollLeft = current;
            idleFrames = 0;
          } else {
            idleFrames++;
          }

          if (elapsed > MAX_DURATION || (idleFrames > 10 && frames.length > 0)) {
            resolve({ startScrollLeft, frames, totalTime: elapsed, finalScrollLeft: current });
            return;
          }
          requestAnimationFrame(record);
        };

        requestAnimationFrame(record);
      });
    });

    if (!frames) {
      console.log('  Could not record frames');
      break;
    }

    const totalDistance = frames.frames.length > 0
      ? frames.frames[frames.frames.length - 1].scrollLeft - frames.startScrollLeft
      : 0;
    const frameCount = frames.frames.length;
    const avgDelta = frameCount > 0 ? Math.abs(totalDistance) / frameCount : 0;

    console.log(`  Click ${click + 1}: ${frameCount} frames over ${frames.totalTime.toFixed(0)}ms, distance=${totalDistance.toFixed(0)}px`);
    console.log(`    Avg px/frame: ${avgDelta.toFixed(1)}, idle at end: ${frames.finalScrollLeft === frames.frames[frames.frames.length-1]?.scrollLeft ? 'yes' : 'no'}`);

    results.push({ frameCount, totalTime: frames.totalTime, totalDistance, avgDelta });

    // Click the right arrow
    await page.mouse.click(btnInfo.x, btnInfo.y);
    await new Promise((r) => setTimeout(r, 1000));
  }

  return {
    scrollInfo,
    clicks: results,
    avgFrames: results.reduce((s, r) => s + r.frameCount, 0) / results.length,
    avgTime: results.reduce((s, r) => s + r.totalTime, 0) / results.length,
  };
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  try {
    console.log(`Navigating to ${URL}...`);
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Page loaded.');

    // Wait for carousels to render
    await new Promise((r) => setTimeout(r, 2000));

    // First, let's see what sections are on the page
    const allHeadings = await page.evaluate(() => {
      return [...document.querySelectorAll('h2, h3, h4')]
        .map((h) => h.textContent.trim())
        .filter((t) => t.length > 0 && t.length < 100);
    });
    console.log('\nHeadings found on page:');
    allHeadings.forEach((h, i) => console.log(`  ${i + 1}. "${h}"`));

    // Now test each section
    const newExp = await getScrollSmoothness(page, 'New Experiences', 'New Experiences', 'button[aria-label="Scroll right"]');
    const featured = await getScrollSmoothness(page, 'Featured Experiences', 'Recommended For You', 'button[aria-label="Scroll right"]');

    console.log('\n========================================');
    console.log('COMPARISON SUMMARY');
    console.log('========================================');

    if (newExp && featured) {
      console.log(`\nNew Experiences:`);
      console.log(`  Container scroll-snap: ${newExp.scrollInfo.hasScrollSnap}`);
      console.log(`  Container scroll-behavior:smooth: ${newExp.scrollInfo.hasScrollBehavior}`);
      console.log(`  Avg frames per click: ${newExp.avgFrames.toFixed(1)}`);
      console.log(`  Avg animation time: ${newExp.avgTime.toFixed(0)}ms`);

      console.log(`\nFeatured Experiences:`);
      console.log(`  Container scroll-snap: ${featured.scrollInfo.hasScrollSnap}`);
      console.log(`  Container scroll-behavior:smooth: ${featured.scrollInfo.hasScrollBehavior}`);
      console.log(`  Avg frames per click: ${featured.avgFrames.toFixed(1)}`);
      console.log(`  Avg animation time: ${featured.avgTime.toFixed(0)}ms`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
