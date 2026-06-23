/**
 * BizAtom Web Search — Vercel Serverless Function
 *
 * Uses DuckDuckGo Lite (text-only) for zero-cost web search.
 * Returns up to 5 results with title, snippet, URL.
 *
 * POST /api/search
 * Body: { query: string, max?: number }
 */

// ─── DDG Lite HTML scraper ───
async function searchDDG(query, max) {
  try {
    const encoded = encodeURIComponent(query);
    // DDG Lite: text-only version, stable HTML structure, no JS
    const url = 'https://lite.duckduckgo.com/lite/';
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'BizAtom/1.0 (AI Search Bot; +https://bizatom.ai)',
        'Accept': 'text/html',
      },
      body: 'q=' + encoded + '&kl=wt-wt&df=',
      redirect: 'follow',
    });

    if (!resp.ok) return [];

    const html = await resp.text();

    // Parse DDG Lite results: each result wrapped in <a> with class "result-link"
    // and snippet in <td class="result-snippet">
    const results = [];
    // Match result links: <a rel="nofollow" class="result-link" href="...">Title</a>
    const linkRe = /<a[^>]*class="result-link"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
    // Match snippets: <td class="result-snippet">...</td>
    const snippetRe = /<td[^>]*class="result-snippet"[^>]*>([\s\S]*?)<\/td>/gi;

    let linkMatch;
    const links = [];
    while ((linkMatch = linkRe.exec(html)) !== null) {
      links.push({ url: linkMatch[1], title: linkMatch[2].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"') });
    }

    let snippetMatch;
    const snippets = [];
    while ((snippetMatch = snippetRe.exec(html)) !== null) {
      const s = snippetMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim();
      if (s) snippets.push(s);
    }

    // Pair links with snippets
    for (let i = 0; i < Math.min(links.length, snippets.length, max || 5); i++) {
      results.push({
        title: links[i].title,
        snippet: snippets[i],
        url: links[i].url,
      });
    }

    console.log('[Search] DDG found', results.length, 'results for:', query.substring(0, 60));
    return results;
  } catch (e) {
    console.error('[Search] DDG error:', e.message);
    return [];
  }
}

// ─── Fallback: Google search scraping ───
async function searchGoogle(query, max) {
  try {
    const encoded = encodeURIComponent(query);
    const url = 'https://www.google.com/search?q=' + encoded + '&hl=en&num=' + (max || 5);
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BizAtom/1.0; +https://bizatom.ai)',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    });

    if (!resp.ok) return [];

    const html = await resp.text();

    // Extract organic results: <h3> for title, surrounding <div> for snippet
    const results = [];
    // Simple regex to extract titles and snippets from Google SERP
    const resultBlocks = html.split(/<div[^>]*class="[^"]*g[^"]*"[^>]*>/i);
    for (let i = 1; i < Math.min(resultBlocks.length, (max || 5) + 1); i++) {
      const block = resultBlocks[i];
      const titleMatch = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const urlMatch = block.match(/<a[^>]*href="(https?:\/\/[^"]*)"[^>]*>/i);
      const snippetMatch = block.match(/<span[^>]*class="[^"]*st[^"]*"[^>]*>([\s\S]*?)<\/span>/i) ||
                           block.match(/<div[^>]*class="[^"]*BNeawe[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

      if (titleMatch) {
        const title = titleMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
        const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim() : '';
        const url = urlMatch ? urlMatch[1].replace(/&amp;/g, '&') : '';
        if (title && title.length > 3) {
          results.push({ title, snippet, url });
        }
      }
    }
    console.log('[Search] Google found', results.length, 'results for:', query.substring(0, 60));
    return results;
  } catch (e) {
    console.error('[Search] Google error:', e.message);
    return [];
  }
}

// ─── Main export ───
export async function searchWeb(query, maxResults) {
  const max = maxResults || 5;
  if (!query || query.length < 2) return [];

  // Try DDG first (more reliable server-side)
  let results = await searchDDG(query, max);

  // Fallback to Google if DDG returns nothing
  if (!results || results.length === 0) {
    console.log('[Search] DDG empty, trying Google fallback...');
    results = await searchGoogle(query, max);
  }

  // Clean and deduplicate
  const seen = new Set();
  return results.filter(function(r) {
    const key = r.url || r.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return r.title && r.title.length > 3;
  }).slice(0, max);
}

/**
 * Classify whether a question likely needs real-time web search.
 * Returns { needsSearch: boolean, reason: string }
 */
export function classifyQuestion(question) {
  const q = (question || '').toLowerCase();
  const reasons = [];

  // 1. Contains specific numbers/years → likely needs current data
  if (/\b(20[12]\d|202\d|2030)\b/.test(q)) {
    reasons.push('contains_year');
  }
  if (/\d{1,3}[万亿千百]?(吨|元|美元|美金|欧元|英镑|日元|人民币|%).*?(数据|多少|几|多少|统计|报告)/.test(q)) {
    reasons.push('quantitative_query');
  }

  // 2. Explicit data-seeking keywords
  const dataKeywords = [
    '数据', '多少', '几个', '多少吨', '多少亿', '多少万',
    '统计', '海关', '进出口', '出口量', '进口量', '贸易额',
    '最新', '最近', '今年', '去年', '近5年', '近几年', '近年',
    '增长率', '占比', '份额', '排名', '位列', '第几名',
    '产量', '产能', '销量', '价格', '报价', '行情',
    'data', 'statistics', 'how many', 'how much', 'latest',
    'export', 'import', 'customs', 'trade volume',
    'recent', 'current', 'in 202', 'last year', 'this year',
    'revenue', 'market share', 'ranking',
  ];
  for (const kw of dataKeywords) {
    if (q.includes(kw)) {
      reasons.push('data_keyword:' + kw);
      break;
    }
  }

  // 3. Industry-specific queries that need current market data
  const industryPatterns = [
    /不锈钢|钢管|钢铁|钢材|铝|铜|原油|石油|天然气|煤炭|稀土/,
    /芯片|半导体|集成电路|光伏|锂电池|新能源/,
    /汽车|电动车|新能源车|特斯拉|比亚迪/,
    /房地产|房价|楼市|成交/,
    /GDP|ppi|cpi|通胀|利率|汇率|股市|a股|港股/,
    /不锈钢无缝钢管|无缝钢管|焊管/,
  ];
  for (const pat of industryPatterns) {
    if (pat.test(q)) {
      reasons.push('industry_specific');
      break;
    }
  }

  // 4. Questions about current events / news
  const newsKeywords = [
    '新闻', '最新消息', '发生了什么', '政策', '法规',
    'new regulation', 'policy change', 'announced', 'news',
    '今日', '今天', '本周', '本月',
  ];
  for (const kw of newsKeywords) {
    if (q.includes(kw)) {
      reasons.push('news_intent');
      break;
    }
  }

  return {
    needsSearch: reasons.length > 0,
    reasons: reasons,
  };
}

/**
 * Format search results as a text block for AI prompt injection.
 */
export function formatSearchResults(results) {
  if (!results || results.length === 0) return '';
  let text = '\n\n【以下是你通过搜索引擎获取的最新信息。请基于这些信息回答用户问题，优先引用其中具体的数据和事实。如有必要，注明信息来源。】\n\n';
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    text += '来源' + (i + 1) + '：' + r.title + '\n';
    text += '摘要：' + (r.snippet || '') + '\n';
    if (r.url) text += '链接：' + r.url + '\n';
    text += '\n';
  }
  return text;
}

// ─── HTTP handler ───
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', service: 'BizAtom Web Search' });
  }

  try {
    const body = req.body || {};
    const query = (body.query || '').trim();
    const max = body.max || 5;

    if (!query) {
      return res.status(200).json({ results: [], message: 'Empty query' });
    }

    const results = await searchWeb(query, max);
    const classification = classifyQuestion(query);

    return res.status(200).json({
      results: results,
      count: results.length,
      classification: classification,
      query: query,
    });
  } catch (err) {
    console.error('[Search] Handler error:', err);
    return res.status(500).json({ results: [], error: 'Search failed' });
  }
}
