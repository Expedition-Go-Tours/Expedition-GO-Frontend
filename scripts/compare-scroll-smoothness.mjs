/**
 * Compares scroll smoothness between TourCarouselSection (Featured Experiences)
 * vs. the manually-built section (New Experiences or Last Minute Deals).
 */
import { chromium } from 'playwright';

const URL = 'http://localhost:5173';

async function inspectPage(page) {
  return page.evaluate(() => {
    const sections = [...document.querySelectorAll('section')];
    return sections.map((s, i) => {
      const h = s.querySelector('h2, h3, h4');
      const headingText = h ? h.textContent.trim() : '(no heading)';
      const arrows = s.querySelectorAll('button[aria-label*="Scroll"]');
      const hasArrows = arrows.length > 0;
      const scrollDivs = [...s.querySelectorAll('div')].filter((d) => {
        if (d.scrollWidth <= d.clientWidth) return false;
        const style = getComputedStyle(d);
        return style.scrollSnapType !== 'none' || d.style.scrollSnapType || style.scrollBehavior === 'smooth';
      });
      return {
        index: i,
        heading: headingText.substring(0, 60),
        hasArrows,
        scrollContainers: scrollDivs.map((d) => ({
          scrollSnapType: getComputedStyle(d).scrollSnapType || d.style.scrollSnapType || 'none',
          scrollBehavior: getComputedStyle(d).scrollBehavior,
          className: d.className?.substring(0, 120),
          inlineStyle: d.getAttribute('style')?.substring(0, 200),
        })),
      };
    }).filter((s) => s.hasArrows || s.scrollContainers.length > 0);
  });
}

async function measureScroll(page, sectionHeading) {
  console.log(`\n=== "${sectionHeading}" ===`);

  // Find section
  const sectionData = await page.evaluate((heading) => {
    const h = [...document.querySelectorAll('h2, h3, h4')].find((el) => el.textContent.trim() === heading);
    if (!h) return null;
    const section = h.closest('section');
    if (!section) return null;
    const top = section.getBoundingClientRect().top + window.scrollY;
    return { top };
  }, sectionHeading);

  if (!sectionData) {
    console.log('  Section not found');
    return null;
  }

  await page.evaluate((top) => window.scrollTo({ top: top - 120, behavior: 'instant' }), sectionData.top);
  await page.waitForTimeout(500);

  // Find visible scroll container
  const cInfo = await page.evaluate(() => {
    const divs = [...document.querySelectorAll('div')];
    const vh = window.innerHeight;
    const candidates = [];
    divs.forEach((d) => {
      if (d.scrollWidth <= d.clientWidth) return;
      if (!d.offsetParent) return;
      const style = getComputedStyle(d);
      candidates.push({
        top: d.getBoundingClientRect().top,
        scrollWidth: d.scrollWidth,
        clientWidth: d.clientWidth,
        maxScroll: d.scrollWidth - d.clientWidth,
        scrollSnapType: style.scrollSnapType || d.style.scrollSnapType || 'none',
        scrollBehavior: style.scrollBehavior,
        overflowX: style.overflowX,
        className: d.className?.substring(0, 250),
        inlineStyle: d.getAttribute('style')?.substring(0, 300),
      });
    });
    candidates.sort((a, b) => Math.abs(a.top - vh / 2) - Math.abs(b.top - vh / 2));
    return candidates[0] || null;
  });

  if (!cInfo) {
    console.log('  No scrollable container found');
    return null;
  }

  console.log(`  scrollSnapType: ${cInfo.scrollSnapType}`);
  console.log(`  scrollBehavior CSS: ${cInfo.scrollBehavior}`);
  console.log(`  overflowX: ${cInfo.overflowX}`);
  console.log(`  scrollWidth: ${cInfo.scrollWidth}, clientWidth: ${cInfo.clientWidth}`);
  console.log(`  className: ${cInfo.className}`);
  console.log(`  inlineStyle: ${cInfo.inlineStyle}`);

  // Find right arrow button
  const btnBox = await page.evaluate(() => {
    const vh = window.innerHeight;
    const btns = [...document.querySelectorAll('button[aria-label="Scroll right"]')]
      .filter((b) => b.offsetParent)
      .map((b) => ({ x: b.getBoundingClientRect().left + b.offsetWidth / 2, y: b.getBoundingClientRect().top + b.offsetHeight / 2, top: b.getBoundingClientRect().top }))
      .sort((a, b) => Math.abs(a.top - vh / 2) - Math.abs(b.top - vh / 2));
    return btns[0] || null;
  });

  if (!btnBox) {
    console.log('  No visible right arrow button');
    return null;
  }

  // Measure 3 clicks
  const results = [];
  for (let i = 0; i < 3; i++) {
    const frames = await page.evaluate(() => {
      return new Promise((resolve) => {
        const divs = [...document.querySelectorAll('div')];
        const c = divs.find((d) => {
          if (d.scrollWidth <= d.clientWidth) return false;
          if (!d.offsetParent) return false;
          const s = getComputedStyle(d);
          return s.scrollSnapType !== 'none' || d.style.scrollSnapType;
        });
        if (!c) { resolve(null); return; }

        const start = c.scrollLeft;
        const frames = [];
        const t0 = performance.now();
        let last = start;
        let stale = 0;

        function tick() {
          const now = performance.now();
          const cur = c.scrollLeft;
          if (cur !== last) {
            frames.push({ t: Math.round(now - t0), pos: Math.round(cur) });
            last = cur;
            stale = 0;
          } else {
            stale++;
          }
          if (now - t0 > 3000 || (stale > 15 && frames.length > 0)) {
            resolve({ startPos: start, endPos: cur, frames, duration: Math.round(now - t0) });
            return;
          }
          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    });

    // Click the arrow
    await page.mouse.click(btnBox.x, btnBox.y);
    await page.waitForTimeout(200);

    if (!frames) {
      console.log(`  Click ${i + 1}: no data`);
      break;
    }

    const distance = frames.endPos - frames.startPos;
    const fps = frames.frames.length > 1 ? (frames.frames.length / (frames.duration / 1000)) : 0;

    console.log(`  Click ${i + 1}: ${frames.frames.length} frames, ${frames.duration}ms, ${distance}px, ~${fps.toFixed(0)}fps`);

    if (frames.frames.length <= 1) {
      console.log('    ⚠ INSTANT JUMP — not smooth');
      results.push({ instant: true, distance, duration: frames.duration });
    } else {
      const deltas = frames.frames.slice(1).map((f, j) => Math.abs(f.pos - frames.frames[j].pos));
      const avgD = deltas.reduce((s, d) => s + d, 0) / deltas.length;
      const maxD = Math.max(...deltas);
      const minD = Math.min(...deltas);
      console.log(`    Deltas: avg=${avgD.toFixed(1)}, min=${minD}, max=${maxD}`);
      results.push({ instant: false, distance, duration: frames.duration, frameCount: frames.frames.length, fps, avgDelta: avgD, maxDelta: maxD, minDelta: minD });
    }

    await page.waitForTimeout(700);
  }

  return { container: cInfo, clicks: results };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    console.log(`Opening ${URL}...`);
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Inspect all sections
    const sections = await inspectPage(page);
    console.log('\nSections with scroll controls:');
    sections.forEach((s) => {
      console.log(`  [${s.index}] "${s.heading}"  arrows:${s.hasArrows}  containers:${s.scrollContainers.length}`);
      s.scrollContainers.forEach((c) => {
        console.log(`      snap:${c.scrollSnapType}  behavior:${c.scrollBehavior}  class:${c.className.substring(0, 80)}`);
      });
    });

    // Compare two different types: TourCarouselSection vs manual section
    // "Featured experiences" = TourCarouselSection (has smooth scroll-snap-type inline)
    // Choose another visible TourCarouselSection for comparison
    const section1 = 'Featured experiences';
    const section2 = 'Recommended for You';  // Both are TourCarouselSection

    await measureScroll(page, section1);
    await measureScroll(page, section2);

    console.log('\n═══════════════════════════════════════════');
    console.log('SUMMARY');
    console.log('═══════════════════════════════════════════');
    console.log('Both sections above use the SAME TourCarouselSection component.');
    console.log('If there IS a smoothness difference, check:');
    console.log('  1. CSS scroll-behavior:smooth vs behavior:"smooth" in JS');
    console.log('  2. scroll-snap-type presence');
    console.log('  3. overflow-x value (hidden vs auto)');
    console.log('  4. Whether the container is inside CarouselClipTrack');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
