/**
 * Simple HTML parser helper for React Native
 * Mimics basic cheerio functionality for extracting form values
 */

/**
 * Extract attribute value from HTML using regex
 */
function extractAttribute(
  html: string,
  selector: string,
  attribute: string,
): string | null {
  // Convert cheerio-like selector to regex pattern
  const tagName = selector.match(/^(\w+)/)?.[1] || "input";
  const attrSelector = selector.match(/\[([^\]]+)\]/)?.[1] || "";

  // Build regex pattern
  let pattern: RegExp;

  if (attrSelector.includes("name=")) {
    const nameValue = attrSelector.match(/name=['"]([^'"]+)['"]/)?.[1];
    if (nameValue) {
      pattern = new RegExp(
        `<${tagName}[^>]*name=['"]${nameValue.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        )}['"][^>]*${attribute}=['"]([^'"]+)['"][^>]*>`,
        "i",
      );
    } else {
      pattern = new RegExp(
        `<${tagName}[^>]*${attribute}=['"]([^'"]+)['"][^>]*>`,
        "i",
      );
    }
  } else {
    pattern = new RegExp(
      `<${tagName}[^>]*${attribute}=['"]([^'"]+)['"][^>]*>`,
      "i",
    );
  }

  const match = html.match(pattern);
  return match?.[1] || null;
}

/**
 * Simple HTML parser that mimics cheerio's load and attr functionality
 */
export function parseHtml(html: string) {
  return {
    /**
     * Extract attribute value from element
     */
    attr: (selector: string, attribute: string): string | null => {
      return extractAttribute(html, selector, attribute);
    },

    /**
     * Get text content of element
     */
    text: (selector: string): string => {
      const tagName = selector.match(/^(\w+)/)?.[1] || "div";
      const pattern = new RegExp(`<${tagName}[^>]*>([^<]*)</${tagName}>`, "i");
      const match = html.match(pattern);
      return match?.[1] || "";
    },

    /**
     * Check if element exists
     */
    exists: (selector: string): boolean => {
      const tagName = selector.match(/^(\w+)/)?.[1] || "div";
      const pattern = new RegExp(`<${tagName}[^>]*>`, "i");
      return pattern.test(html);
    },
  };
}

/**
 * Convenience function to extract form token
 */
export function extractFormToken(
  html: string,
  tokenName: string = "__RequestVerificationToken",
): string | null {
  const $ = parseHtml(html);
  return $.attr(`input[name='${tokenName}']`, "value");
}
