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

import { NextResponse } from "next/server";

export const config = {
  matcher: "/((?!_next/|css/|js/|data/|assets/|favicon.ico).*)",
};

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

  // 个人IP网站域名 → bowen.html
  if (PERSONAL_DOMAINS.includes(hostname)) {
    return NextResponse.rewrite(new URL("/bowen.html", request.url));
  }

  // BIZATOM.AI 域名 → bizatom.html
  if (BIZATOM_DOMAINS.includes(hostname)) {
    return NextResponse.rewrite(new URL("/bizatom.html", request.url));
  }

  // AIRankRocket 域名 → airankrocket.html
  if (AIRANKROCKET_DOMAINS.includes(hostname)) {
    return NextResponse.rewrite(new URL("/airankrocket.html", request.url));
  }

  // SaaS 平台域名 → index.html
  if (SAAS_DOMAINS.includes(hostname)) {
    return NextResponse.rewrite(new URL("/index.html", request.url));
  }

  // 其他所有域名（含默认 vercel.app）→ index.html
  return NextResponse.rewrite(new URL("/index.html", request.url));
}
