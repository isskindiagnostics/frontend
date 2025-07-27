const GA4_ID = process.env.NEXT_PUBLIC_GA_ID || "";

declare global {
  interface Window {
    gtag: (
      command: "config" | "set" | "event",
      eventNameOrId: string,
      params?: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}

export function trackPageView(url: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA4_ID, {
      page_path: url,
    });
  }
}

function event(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}

export function trackLoginClick(method: string) {
  event("login_click", { method });
}

export function trackSignupClick(method: string) {
  event("signup_click", { method });
}

export function trackLinkClick(
  label: string,
  url: string,
  pageContext?: string
) {
  event("link_click", { label, url, page: pageContext });
}

export function trackButtonClick(
  label: string,
  url: string,
  pageContext?: string
) {
  event("button_click", { label, url, page: pageContext });
}
