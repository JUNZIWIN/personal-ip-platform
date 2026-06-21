/**
 * Vercel Edge Middleware — 根据域名路由到不同页面
 * 依赖: 无（纯标准 Request/Response API）
 *
 * 路由规则：
 *   aiipower.me / bowentian.aiipower.me / bowentian.com / www.bowentian.com
 *     → 重写到 /bowen.html（个人IP网站）
 *   bizatom.ai / www.bizatom.ai
 *     → 重写到 /index.html（SaaS平台演示）
 *   其他（含 *.vercel.app）
 *     → 默认显示 /bowen.html
 */

export const config = {
  matcher: ["/((?!_next/|css/|js/|data/|assets/|favicon).*)"],
};

const BOWEN_DOMAINS = [
  "aiipower.me",
  "www.aiipower.me",
  "bowentian.aiipower.me",
  "bowentian.com",
  "www.bowentian.com",
];

const SAAS_DOMAINS = [
  "bizatom.ai",
  "www.bizatom.ai",
];

export default function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;

  // 已有路径名（含文件扩展名）不重写，直接放行
  if (url.pathname !== "/") {
    return fetch(request);
  }

  let target = "/bowen.html"; // 默认

  if (BOWEN_DOMAINS.includes(hostname)) {
    target = "/bowen.html";
  } else if (SAAS_DOMAINS.includes(hostname)) {
    target = "/index.html";
  }

  // 用 rewrites 方式：返回 index.html/bowen.html 的内容，但 URL 不变
  const rewrittenUrl = new URL(target, url.origin);
  return fetch(new Request(rewrittenUrl, request));
}
