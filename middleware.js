/**
 * Vercel Edge Middleware — 域名路由
 *
 * 路由规则：
 *   bowentian.com / www.bowentian.com / bowentian.aiipower.me
 *     → /bowen.html（个人IP网站）
 *   bizatom.ai / www.bizatom.ai
 *     → /bizatom.html（BIZATOM.AI 商业知识平台）
 *   airankrocket.ai / www.airankrocket.ai
 *     → /airankrocket.html（AIRankRocket GEO工具）
 *   aiipower.me / www.aiipower.me / *.vercel.app（默认）
 *     → /index.html（AIP Studio SaaS 平台演示）
 */

export const config = {
  matcher: ["/((?!_next/|css/|js/|data/|assets/|favicon).*)"],
];

const PERSONAL_DOMAINS = [
  "bowentian.com",
  "www.bowentian.com",
  "bowentian.aiipower.me",
];

const BIZATOM_DOMAINS = [
  "bizatom.ai",
  "www.bizatom.ai",
];

const AIRANKROCKET_DOMAINS = [
  "airankrocket.ai",
  "www.airankrocket.ai",
];

const SAAS_DOMAINS = [
  "aiipower.me",
  "www.aiipower.me",
];

export default function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;

  // 已有路径名不重写（允许直接访问 /bizatom.html 等）
  if (url.pathname !== "/") {
    return fetch(request);
  }

  // 个人IP网站域名 → bowen.html
  if (PERSONAL_DOMAINS.includes(hostname)) {
    const targetUrl = new URL("/bowen.html", url.origin);
    return fetch(new Request(targetUrl, request));
  }

  // BIZATOM.AI 域名 → bizatom.html
  if (BIZATOM_DOMAINS.includes(hostname)) {
    const targetUrl = new URL("/bizatom.html", url.origin);
    return fetch(new Request(targetUrl, request));
  }

  // AIRankRocket 域名 → airankrocket.html
  if (AIRANKROCKET_DOMAINS.includes(hostname)) {
    const targetUrl = new URL("/airankrocket.html", url.origin);
    return fetch(new Request(targetUrl, request));
  }

  // SaaS 平台域名 → index.html
  if (SAAS_DOMAINS.includes(hostname)) {
    const targetUrl = new URL("/index.html", url.origin);
    return fetch(new Request(targetUrl, request));
  }

  // 其他所有域名（含默认 vercel.app）→ index.html
  const targetUrl = new URL("/index.html", url.origin);
  return fetch(new Request(targetUrl, request));
}
