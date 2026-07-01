/**
 * @file useCarouselSafeClick.js
 * @description Hook that prevents card clicks from firing when the user was scrolling
 *   a horizontal carousel. Tracks pointer gestures and determines if the dominant
 *   movement was horizontal (a carousel pan) vs. a simple tap/click.
 *
 * Usage:
 *   const { pointerEventHandlers, lastGestureWasPanRef } = useCarouselSafeClick();
 *
 *   // Spread handlers onto the root card element:
 *   <div {...pointerEventHandlers} ...>
 *
 *   // Check the ref in your click handler:
 *   const handleClick = (e) => {
 *     if (lastGestureWasPanRef.current) {
 *       e.preventDefault();
 *       lastGestureWasPanRef.current = false;
 *       return;
 *     }
 *     // ... proceed with navigation/action
 *   };
 */
import { useRef, useCallback } from 'react';

const PAN_MIN_PX = 20;
const HORIZONTAL_DOMINANCE = 1.35;

export function useCarouselSafeClick() {
  const panRef = useRef({
    active: false,
    originX: 0,
    originY: 0,
    maxAbsDx: 0,
    maxAbsDy: 0,
  });
  const lastGestureWasPanRef = useRef(false);

  const resetPanTracking = useCallback(() => {
    panRef.current = {
      active: false,
      originX: 0,
      originY: 0,
      maxAbsDx: 0,
      maxAbsDy: 0,
    };
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (e.button !== undefined && e.button !== 0) return;

    panRef.current = {
      active: true,
      originX: e.clientX,
      originY: e.clientY,
      maxAbsDx: 0,
      maxAbsDy: 0,
    };
    lastGestureWasPanRef.current = false;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!panRef.current.active) return;

    const dx = Math.abs(e.clientX - panRef.current.originX);
    const dy = Math.abs(e.clientY - panRef.current.originY);
    panRef.current.maxAbsDx = Math.max(panRef.current.maxAbsDx, dx);
    panRef.current.maxAbsDy = Math.max(panRef.current.maxAbsDy, dy);
  }, []);

  const endPointerGesture = useCallback(() => {
    if (!panRef.current.active) return;

    const { maxAbsDx, maxAbsDy } = panRef.current;
    resetPanTracking();

    lastGestureWasPanRef.current =
      maxAbsDx >= PAN_MIN_PX && maxAbsDx > maxAbsDy * HORIZONTAL_DOMINANCE;
  }, [resetPanTracking]);

  const pointerEventHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: endPointerGesture,
    onPointerCancel: endPointerGesture,
  };

  return { pointerEventHandlers, lastGestureWasPanRef };
}
