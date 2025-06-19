import setCookieParser from "set-cookie-parser";

const origFetch = globalThis.fetch;
const cookieMap = new Map<string, Record<string, setCookieParser.Cookie>>();

function buildCookieString(
  cookies: Record<string, setCookieParser.Cookie>
): string {
  return Object.entries(cookies)
    .map(([name, cookie]) => `${name}=${cookie.value}`)
    .join("; ");
}

function isCookieExpired(cookie: setCookieParser.Cookie): boolean {
  if (cookie.expires) {
    return new Date(cookie.expires) <= new Date();
  }
  return false;
}

// A wrapper around fetch since RN messes up handling of cookies
export function fetchWithCookies(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const hostname = new URL(input instanceof Request ? input.url : input)
    .hostname;

  return origFetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Cookie: buildCookieString(cookieMap.get(hostname) || {}),
    },
    credentials: "omit", // Omit cookies and handle ourselves
  }).then((res) => {
    const existingCookies = cookieMap.get(hostname) || {};
    const newCookies = setCookieParser.parse(
      res.headers.get("Set-Cookie") || "",
      {
        map: true, // Use map to get an object with cookie names as keys
      }
    );

    // Update the existing cookies with new ones
    const combinedCookies = { ...existingCookies, ...newCookies };

    // Filter out expired cookies
    const validNewCookies = Object.entries(combinedCookies)
      .filter(([, cookie]) => !isCookieExpired(cookie))
      .reduce((acc, [name, cookie]) => {
        acc[name] = cookie;
        return acc;
      }, {} as Record<string, setCookieParser.Cookie>);

    cookieMap.set(hostname, validNewCookies);
    return res;
  });
}

