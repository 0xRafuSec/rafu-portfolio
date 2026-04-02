/**
 * Device performance detection utilities.
 * Used across components to scale visuals for low-end hardware.
 */

export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  if (cores <= 2) return true;

  // Check device memory API (Chrome only)
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory && nav.deviceMemory <= 4) return true;

  // Check if mobile via user agent
  if (isMobile()) return true;

  return false;
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
