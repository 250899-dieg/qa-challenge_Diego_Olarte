export async function withTiming<T>(label: string, fn: () => Promise<T> | T): Promise<T> {
  const supportsPerf = typeof performance !== 'undefined' && typeof performance.now === 'function';
  const getTime = () => (supportsPerf ? performance.now() : Date.now());
  const start = getTime();
  try {
    return await fn();
  } finally {
    const duration = getTime() - start;
    console.info(`[perf] ${label} completed in ${duration.toFixed(2)}ms`);
  }
}

export function markClient(label: string, state: 'start' | 'end') {
  if (typeof window === 'undefined' || typeof performance === 'undefined') {
    return;
  }
  performance.mark(`${label}:${state}`);
}
