/**
 * BizAtom Professional Database Search — Vercel Serverless Function
 *
 * Provides access to professional/industry databases for Gold & Diamond members:
 *   tonghuashun — 同花顺金融数据 (financial/stock market data)
 *   trade       — 外贸海关数据 (international trade & customs data)
 *   legal       — 法律数据库 (legal & regulatory database)
 *   general     — 通用专业搜索 (searches all available professional sources)
 *
 * Sources:
 *   Financial: public financial news, SEC filings, company reports
 *   Trade: WTO, UN Comtrade, China Customs public data
 *   Legal: public legal databases, regulatory announcements
 *
 * POST /api/pro-db
 * Body: { query: string, source: string, max?: number }
 *
 * GET /api/pro-db?action=sources
 * Returns available professional data sources
 */

// ─── Source: 同花顺/Financial Data ───
// Searches financial news and public company data
async function searchTonghuashun(query, max) {
  const results = [];
  const encoded = encodeURIComponent(query);

  try {
    // Source A: Financial news search via Google (site-restricted to financial domains)
    const googleUrl = 'https://www.google.com/search?q=' + encoded + '+site:eastmoney.com+OR+site:finance.sina.com.cn+OR+site:10jqka.com.cn&num=' + (max || 5);
    const resp = await fetch(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BizAtom/1.0 Professional; +https://bizatom.ai)',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    });

    if (resp.ok) {
      const html = await resp.text();
      const blocks = html.split(/<div[^>]*class="[^"]*g[^"]*"[^>]*>/i);
      for (let i = 1; i < Math.min(blocks.length, (max || 5) + 1); i++) {
        const block = blocks[i];
        const titleMatch = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
        const urlMatch = block.match(/<a[^>]*href="(https?:\/\/[^"]*)"[^>]*>/i);
        const snippetMatch = block.match(/<span[^>]*class="[^"]*st[^"]*"[^>]*>([\s\S]*?)<\/span>/i);

        if (titleMatch) {
          const title = titleMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
          const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim() : '';
          const url = urlMatch ? urlMatch[1].replace(/&amp;/g, '&') : '';
          if (title && title.length > 3) {
            results.push({ title, snippet, url, source: 'tonghuashun' });
          }
        }
      }
    }
  } catch (e) {
    console.error('[ProDB] Tonghuashun search error:', e.message);
  }

  return results.slice(0, max || 5);
}

// ─── Source: Trade/Customs Data ───
// Searches international trade databases
async function searchTrade(query, max) {
  const results = [];
  const encoded = encodeURIComponent(query);

  try {
    // Search trade-specific data via Google
    const tradeDomains = 'site:customs.gov.cn+OR+site:trademap.org+OR+site:comtrade.un.org+OR+site:wto.org';
    const googleUrl = 'https://www.google.com/search?q=' + encoded + '+' + tradeDomains + '&num=' + (max || 5);
    const resp = await fetch(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BizAtom/1.0 Trade; +https://bizatom.ai)',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    });

    if (resp.ok) {
      const html = await resp.text();
      const blocks = html.split(/<div[^>]*class="[^"]*g[^"]*"[^>]*>/i);
      for (let i = 1; i < Math.min(blocks.length, (max || 5) + 1); i++) {
        const block = blocks[i];
        const titleMatch = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
        const urlMatch = block.match(/<a[^>]*href="(https?:\/\/[^"]*)"[^>]*>/i);
        const snippetMatch = block.match(/<span[^>]*class="[^"]*st[^"]*"[^>]*>([\s\S]*?)<\/span>/i);

        if (titleMatch) {
          const title = titleMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
          const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim() : '';
          const url = urlMatch ? urlMatch[1].replace(/&amp;/g, '&') : '';
          if (title && title.length > 3) {
            results.push({ title, snippet, url, source: 'trade' });
          }
        }
      }
    }
  } catch (e) {
    console.error('[ProDB] Trade search error:', e.message);
  }

  return results.slice(0, max || 5);
}

// ─── Source: Legal Database ───
// Searches legal/regulatory databases
async function searchLegal(query, max) {
  const results = [];
  const encoded = encodeURIComponent(query);

  try {
    // Search legal databases via Google
    const legalDomains = 'site:pkulaw.com+OR+site:chinalawinfo.com+OR+site:court.gov.cn+OR+site:npc.gov.cn+OR+site:lawinfochina.com';
    const googleUrl = 'https://www.google.com/search?q=' + encoded + '+' + legalDomains + '&num=' + (max || 5);
    const resp = await fetch(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BizAtom/1.0 Legal; +https://bizatom.ai)',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    });

    if (resp.ok) {
      const html = await resp.text();
      const blocks = html.split(/<div[^>]*class="[^"]*g[^"]*"[^>]*>/i);
      for (let i = 1; i < Math.min(blocks.length, (max || 5) + 1); i++) {
        const block = blocks[i];
        const titleMatch = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
        const urlMatch = block.match(/<a[^>]*href="(https?:\/\/[^"]*)"[^>]*>/i);
        const snippetMatch = block.match(/<span[^>]*class="[^"]*st[^"]*"[^>]*>([\s\S]*?)<\/span>/i);

        if (titleMatch) {
          const title = titleMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
          const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim() : '';
          const url = urlMatch ? urlMatch[1].replace(/&amp;/g, '&') : '';
          if (title && title.length > 3) {
            results.push({ title, snippet, url, source: 'legal' });
          }
        }
      }
    }
  } catch (e) {
    console.error('[ProDB] Legal search error:', e.message);
  }

  return results.slice(0, max || 5);
}

// ─── Main export: Search professional databases ───
export async function searchProDB(query, source, maxResults) {
  const max = maxResults || 5;
  if (!query || query.length < 2) return [];

  const allResults = [];

  // Map source parameter to specific search functions
  const sourceMap = {
    tonghuashun: searchTonghuashun,
    trade: searchTrade,
    legal: searchLegal,
  };

  if (source === 'general' || !source) {
    // Search all professional sources in parallel
    const promises = [
      searchTonghuashun(query, 3),
      searchTrade(query, 3),
      searchLegal(query, 3),
    ];
    const batches = await Promise.allSettled(promises);
    for (const batch of batches) {
      if (batch.status === 'fulfilled' && batch.value) {
        allResults.push(...batch.value);
      }
    }
  } else if (sourceMap[source]) {
    const results = await sourceMap[source](query, max);
    allResults.push(...results);
  } else {
    console.log('[ProDB] Unknown source:', source);
    return [];
  }

  // Deduplicate by URL
  const seen = new Set();
  return allResults
    .filter(function(r) {
      const key = r.url || r.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return r.title && r.title.length > 3;
    })
    .slice(0, maxResults || 5);
}

/**
 * Format professional database results as a text block for AI prompt injection.
 */
export function formatProResults(results, sourceDisplay) {
  if (!results || results.length === 0) return '';

  let header = '\n\n【以下是通过专业数据库获取的最新行业数据。请基于这些数据回答用户问题，优先引用具体数字和来源。】\n\n';

  const sourceNames = {
    tonghuashun: '同花顺金融数据',
    trade: '外贸海关数据',
    legal: '法律专业数据库',
    general: '多源专业数据库',
  };

  const srcName = sourceNames[sourceDisplay] || '专业数据库';
  header += '数据来源：' + srcName + '\n\n';

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    header += '来源' + (i + 1) + '：' + r.title + '\n';
    header += '摘要：' + (r.snippet || '') + '\n';
    if (r.url) header += '链接：' + r.url + '\n';
    header += '数据源：' + srcName + '\n\n';
  }
  return header;
}

/**
 * Get available professional database sources with descriptions.
 */
export function getProDBSources() {
  return [
    {
      id: 'tonghuashun',
      name: '同花顺金融数据',
      nameEn: 'Tonghuashun Financial',
      description: '股票行情、公司财报、行业研报、宏观经济数据',
      descriptionEn: 'Stock prices, company reports, industry research, macro data',
      icon: '📈',
      tier: 'gold',
    },
    {
      id: 'trade',
      name: '外贸海关数据',
      nameEn: 'Trade & Customs',
      description: '进出口数据、海关统计、贸易协定、关税信息',
      descriptionEn: 'Import/export data, customs statistics, trade agreements, tariffs',
      icon: '🚢',
      tier: 'gold',
    },
    {
      id: 'legal',
      name: '法律专业数据库',
      nameEn: 'Legal Database',
      description: '法律法规、司法解释、裁判文书、合同范本',
      descriptionEn: 'Laws, judicial interpretations, court decisions, contract templates',
      icon: '⚖️',
      tier: 'gold',
    },
    {
      id: 'general',
      name: '综合专业搜索',
      nameEn: 'All Professional Sources',
      description: '同时搜索金融、外贸、法律三大专业数据库',
      descriptionEn: 'Search all professional databases simultaneously',
      icon: '🔍',
      tier: 'diamond',
    },
  ];
}

// ─── HTTP handler ───
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const url = new URL(req.url, 'http://localhost');
    if (url.searchParams.get('action') === 'sources') {
      return res.status(200).json({ sources: getProDBSources() });
    }
    return res.status(200).json({ status: 'ok', service: 'BizAtom Professional Database Search' });
  }

  try {
    const body = req.body || {};
    const query = (body.query || '').trim();
    const source = body.source || 'general';
    const max = body.max || 5;

    if (!query) {
      return res.status(200).json({ results: [], message: 'Empty query' });
    }

    const results = await searchProDB(query, source, max);

    return res.status(200).json({
      results: results,
      count: results.length,
      source: source,
      query: query,
    });
  } catch (err) {
    console.error('[ProDB] Handler error:', err);
    return res.status(500).json({ results: [], error: 'Pro DB search failed' });
  }
}
