import CookieManager from "@react-native-cookies/cookies";
import setCookieParser, { splitCookiesString } from "set-cookie-parser";

// Thanks to https://stackoverflow.com/questions/41132167/react-native-fetch-cookie-persist/79293653#79293653
// for the solution to persist cookies across requests

const origFetch = globalThis.fetch;
const cookieMap = new Map<string, Record<string, setCookieParser.Cookie>>();
// Expose cookieMap globally for debugging
// @ts-ignore
globalThis.__cookieMap = cookieMap;

function buildCookieString(
  cookies: Record<string, setCookieParser.Cookie>
): string {
  // Order cookies to match browser behavior
  const cookieOrder = [
    "SPIHACSiteCode",
    "__RequestVerificationToken_L0hvbWVBY2Nlc3M1",
    "ASP.NET_SessionId",
  ];
  const sortedEntries: [string, setCookieParser.Cookie][] = [];

  // Add cookies in the specified order first
  for (const name of cookieOrder) {
    if (cookies[name]) {
      sortedEntries.push([name, cookies[name]]);
    }
  }

  // Add any remaining cookies not in the order list
  Object.entries(cookies).forEach(([name, cookie]) => {
    if (!cookieOrder.includes(name)) {
      sortedEntries.push([name, cookie]);
    }
  });

  return sortedEntries
    .map(([name, cookie]) => `${name}=${cookie.value}`)
    .join("; ");
}

function isCookieExpired(cookie: setCookieParser.Cookie): boolean {
  if (cookie.expires) {
    return new Date(cookie.expires) <= new Date();
  }
  return false;
}

// Clear native cookies to prevent interference
async function clearNativeCookies(hostname: string): Promise<void> {
  try {
    await CookieManager.clearByName(hostname, "ASP.NET_SessionId");
    await CookieManager.clearByName(hostname, "SPIHACSiteCode");
    await CookieManager.clearByName(
      hostname,
      "__RequestVerificationToken_L0hvbWVBY2Nlc3M1"
    );
    await CookieManager.clearByName(hostname, ".AuthCookie");
    console.log("🧹 [clearNativeCookies] Cleared native cookies for", hostname);
  } catch (error) {
    console.log("🧹 [clearNativeCookies] Error clearing cookies:", error);
  }
}

// A wrapper around fetch since RN messes up handling of cookies
export async function fetchWithCookies(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const hostname = new URL(input instanceof Request ? input.url : input)
    .hostname;

  // Clear native cookies before each request to prevent interference
  await clearNativeCookies(hostname);

  const cookieString = buildCookieString(cookieMap.get(hostname) || {});

  // Log the cookies being sent with this request
  console.log(
    `🍪 [fetchWithCookies] Sending cookies for ${hostname}:`,
    cookieString || "(no cookies)"
  );
  console.log(
    `🍪 [fetchWithCookies] Request URL:`,
    input instanceof Request ? input.url : input
  );
  console.log(`🍪 [fetchWithCookies] Request method:`, init?.method || "GET");

  // Debug cookie details
  if (cookieString) {
    const cookies = cookieMap.get(hostname) || {};
    console.log(
      `🍪 [DEBUG] Individual cookies:`,
      Object.keys(cookies).map((name) => `${name}=${cookies[name].value}`)
    );
  }

  return origFetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Cookie: cookieString,
    },
    credentials: "omit", // Omit cookies and handle ourselves
  }).then((res) => {
    const existingCookies = cookieMap.get(hostname) || {};
    const setCookieHeader = res.headers.get("Set-Cookie") || "";
    console.log("🍪 [DEBUG] Raw Set-Cookie header:", setCookieHeader);

    // Use set-cookie-parser's splitCookiesString to safely split the header
    const cookieParts = splitCookiesString(setCookieHeader);
    const newCookies = setCookieParser.parse(cookieParts, { map: true });

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

    // Log stored cookies
    if (Object.keys(validNewCookies).length > 0) {
      console.log(
        "🍪 [fetchWithCookies] Stored cookies:",
        Object.entries(validNewCookies)
          .map(([name, cookie]) => `${name}=${cookie.value}`)
          .join(", ")
      );
    }

    return res;
  });
}

