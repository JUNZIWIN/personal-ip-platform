/**
 * Vercel Edge Middleware — 域名路由
 *
 * 路由规则：
 *   bowentian.com / www.bowentian.com / bowentian.aiipower.me
 *     → /bowen.html（个人IP网站 — 创始人/用户真实信息）
 *   aiipower.me / www.aiipower.me / *.vercel.app（默认）
 *     → /index.html（SaaS 平台演示 — 含模板切换 + 一键展示入口）
 *   bizatom.ai
 *     → /index.html
 */

export const config = {
  matcher: ["/((?!_next/|css/|js/|data/|assets/|favicon).*)"],
];

const PERSONAL_DOMAINS = [
  "bowentian.com",
  "www.bowentian.com",
  "bowentian.aiipower.me",
];

const SAAS_DOMAINS = [
  "aiipower.me",
  "www.aiipower.me",
  "bizatom.ai",
  "www.bizatom.ai",
];

export default function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;

  // 已有路径名不重写
  if (url.pathname !== "/") {
    return fetch(request);
  }

  // 个人IP网站域名 → bowen.html
  if (PERSONAL_DOMAINS.includes(hostname)) {
    const targetUrl = new URL("/bowen.html", url.origin);
    return fetch(new Request(targetUrl, request));
  }

  // 其他所有域名（含默认 vercel.app）→ index.html（SaaS平台）
  const targetUrl = new URL("/index.html", url.origin);
  return fetch(new Request(targetUrl, request));
}
