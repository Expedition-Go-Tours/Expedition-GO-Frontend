/**
 * @file lib/utils.js
 * @description Tailwind class-name utility. Merges clsx conditional classes with
 *   tailwind-merge deduplication — standard pattern for shadcn/Radix UI components.
 *
 * @example cn("px-4", isActive && "bg-green-500", className)
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
