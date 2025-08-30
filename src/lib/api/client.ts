export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = `${path.startsWith('http') ? '' : API_BASE}${path}`;
  const token =
    typeof document !== 'undefined'
      ? document.cookie
          .split('; ')
          .find((c) => c.startsWith('hublang_token='))
          ?.split('=')[1]
      : undefined;

  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const json = text ? JSON.parse(text) : {};
      throw new Error(json?.message || res.statusText);
    } catch {
      throw new Error(text || res.statusText);
    }
  }
  return (await res.json()) as T;
}
