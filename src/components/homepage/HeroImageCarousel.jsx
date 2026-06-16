/**
 * @file HeroImageCarousel.jsx
 * @description Full-background hero image carousel with 4 slides.
 *   Touch swipe on mobile, clickable dots, crossfade transition.
 *   Autoplay with pause on interaction.
 */
import { useState, useRef, useCallback, useEffect } from 'react';

import imgWaterfall from '@/assets/images/WATERFALL .png';
import imgRock from '@/assets/images/ROCK.png';
import imgCanopy from '@/assets/images/CANOPY.png';
import imgBoat from '@/assets/images/BOAT.png';

const SLIDES = [
  { src: imgWaterfall, alt: 'Waterfall', pos: 'object-[center_40%]' },
  { src: imgRock, alt: 'Rock formation', pos: 'object-[center_35%]' },
  { src: imgCanopy, alt: 'Canopy walk', pos: 'object-[center_30%]' },
  { src: imgBoat, alt: 'Boat ride', pos: 'object-[center_40%]' },
];

const SWIPE_THRESHOLD = 50;
const AUTOPLAY_INTERVAL = 5000;
const AUTOPLAY_RESUME_DELAY = 3000;

export function HeroImageCarousel() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(null);

  const next = useCallback(() => {
    setActive((i) => (i === SLIDES.length - 1 ? 0 : i + 1));
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i === 0 ? SLIDES.length - 1 : i - 1));
  }, []);

  const goTo = useCallback((index) => {
    setActive(index);
  }, []);

  const pauseAutoplay = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, AUTOPLAY_RESUME_DELAY);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    pauseAutoplay();
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
  };

  const handleDotClick = useCallback(
    (index) => {
      goTo(index);
      pauseAutoplay();
    },
    [goTo, pauseAutoplay]
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) next();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Background images — crossfade */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
            <img
              key={i}
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover ${slide.pos} transition-opacity duration-500 ${i === active ? 'opacity-80' : 'opacity-0'}`}
              draggable={false}
            />
          ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.18)_25%,rgba(122,69,11,0.14)_60%,rgba(0,0,0,0.2)),radial-gradient(circle_at_center,rgba(255,174,58,0.28),transparent_42%)]" />

      {/* Touch swipe surface */}
      <div
        className="absolute inset-0 z-[1] touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[2] flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleDotClick(i)}
            className={`rounded-full transition-all duration-200 ${
              i === active ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}
