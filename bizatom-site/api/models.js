/**
 * BizAtom Multi-Model Router
 * Routes AI requests to the appropriate provider based on model selection.
 *
 * Supported models (7 models, 4 providers):
 *   deepseek  — DeepSeek Chat (default, low cost, Chinese-optimized)
 *   chatgpt   — OpenAI GPT-4o (ChatGPT flagship, multimodal, balanced)
 *   codex     — OpenAI o3-mini (reasoning + coding, branded as Codex)
 *   doubao    — ByteDance Doubao 豆包 (Chinese-optimized, cost-effective)
 *   kimi      — Moonshot Kimi (long context 128k, Chinese native)
 *   claude    — Anthropic Claude Sonnet (architecture, long docs)
 *   gpt4o-mini — OpenAI GPT-4o mini (fast, affordable, everyday use)
 *
 * Env vars required:
 *   DEEPSEEK_API_KEY  (always required as fallback)
 *   OPENAI_API_KEY    (for chatgpt, codex, gpt4o-mini)
 *   ANTHROPIC_API_KEY (for claude)
 *   DOUBAO_API_KEY    (for doubao / Volcengine ARK)
 *   KIMI_API_KEY      (for kimi / Moonshot)
 */

// ─── Model Registry ───
const MODELS = {
  deepseek: {
    name: 'DeepSeek Chat',
    provider: 'deepseek',
    model: 'deepseek-chat',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    apiKeyEnv: 'DEEPSEEK_API_KEY',
    cost: 'low',
    description: 'Best for Chinese-language responses, general business Q&A, low cost',
    icon: '🧠',
    maxTokens: 2000,
    temperature: 0.7,
    buildRequest(messages, opts) {
      return {
        model: this.model,
        messages,
        max_tokens: opts.maxTokens || this.maxTokens,
        temperature: opts.temperature || this.temperature,
        stream: false,
      };
    },
    parseResponse(data) {
      return data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content : null;
    },
    // DeepSeek uses OpenAI-compatible format, so headers are standard
    buildHeaders(apiKey) {
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      };
    },
  },

  // ─── ChatGPT (OpenAI GPT-4o) ───
  // The flagship ChatGPT model — multimodal, balanced performance & cost
  // Register: https://platform.openai.com/
  chatgpt: {
    name: 'ChatGPT (GPT-4o)',
    provider: 'openai',
    model: 'gpt-4o',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    apiKeyEnv: 'OPENAI_API_KEY',
    cost: 'medium',
    description: 'OpenAI ChatGPT flagship — GPT-4o. Excellent for general Q&A, reasoning, and multilingual conversations. Balanced performance and cost.',
    icon: '💬',
    maxTokens: 3000,
    temperature: 0.7,
    buildRequest(messages, opts) {
      return {
        model: this.model,
        messages,
        max_tokens: opts.maxTokens || this.maxTokens,
        temperature: opts.temperature || this.temperature,
        stream: false,
      };
    },
    parseResponse(data) {
      return data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content : null;
    },
    buildHeaders(apiKey) {
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      };
    },
  },

  // ─── Codex (OpenAI o3-mini) ───
  // Reasoning + coding model, branded as "Codex" for BizAtom users
  // Best for complex analysis, coding questions, step-by-step reasoning
  codex: {
    name: 'Codex (o3-mini)',
    provider: 'openai',
    model: 'o3-mini',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    apiKeyEnv: 'OPENAI_API_KEY',
    cost: 'medium',
    description: 'OpenAI o3-mini reasoning model — branded as Codex. Best for complex analysis, coding, and step-by-step logical reasoning.',
    icon: '🔧',
    maxTokens: 3000,
    temperature: 0.7,
    buildRequest(messages, opts) {
      return {
        model: this.model,
        messages,
        max_tokens: opts.maxTokens || this.maxTokens,
        temperature: opts.temperature || this.temperature,
        stream: false,
      };
    },
    parseResponse(data) {
      return data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content : null;
    },
    buildHeaders(apiKey) {
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      };
    },
  },

  // ─── GPT-4o mini (OpenAI) ───
  // Fast and affordable model for everyday queries
  gpt4o_mini: {
    name: 'GPT-4o mini',
    provider: 'openai',
    model: 'gpt-4o-mini',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    apiKeyEnv: 'OPENAI_API_KEY',
    cost: 'low',
    description: 'OpenAI GPT-4o mini — fast, affordable, great for everyday business Q&A. Best value from OpenAI.',
    icon: '⚡',
    maxTokens: 2000,
    temperature: 0.7,
    buildRequest(messages, opts) {
      return {
        model: this.model,
        messages,
        max_tokens: opts.maxTokens || this.maxTokens,
        temperature: opts.temperature || this.temperature,
        stream: false,
      };
    },
    parseResponse(data) {
      return data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content : null;
    },
    buildHeaders(apiKey) {
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      };
    },
  },

  claude: {
    name: 'Claude Sonnet',
    provider: 'anthropic',
    model: 'claude-sonnet-4-20250514',
    endpoint: 'https://api.anthropic.com/v1/messages',
    apiKeyEnv: 'ANTHROPIC_API_KEY',
    cost: 'high',
    description: 'Best for architecture design, long-form analysis, nuanced reasoning.',
    icon: '🎯',
    maxTokens: 2000,
    temperature: 0.7,
    // Anthropic uses a different API format (NOT OpenAI-compatible)
    buildRequest(messages, opts) {
      // Convert OpenAI-style messages to Anthropic format
      const systemMsgs = messages.filter(m => m.role === 'system');
      const convMsgs = messages.filter(m => m.role !== 'system');

      const body = {
        model: this.model,
        max_tokens: opts.maxTokens || this.maxTokens,
        temperature: opts.temperature || this.temperature,
        messages: convMsgs.map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        })),
      };

      if (systemMsgs.length > 0) {
        body.system = systemMsgs.map(m => m.content).join('\n\n');
      }

      return body;
    },
    parseResponse(data) {
      return data.content && data.content[0] ? data.content[0].text : null;
    },
    buildHeaders(apiKey) {
      return {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      };
    },
  },

  // ─── Doubao 豆包 (ByteDance / Volcengine ARK) ───
  // OpenAI-compatible API via Volcengine ARK platform
  // Register: https://console.volcengine.com/ark
  doubao: {
    name: 'Doubao Pro 豆包',
    provider: 'volcengine',
    model: 'doubao-pro-32k',
    endpoint: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    apiKeyEnv: 'DOUBAO_API_KEY',
    cost: 'low',
    description: 'ByteDance 豆包 — excellent Chinese understanding, fast response, very cost-effective. Great for business Q&A and content generation.',
    icon: '🫘',
    maxTokens: 3000,
    temperature: 0.7,
    // OpenAI-compatible format
    buildRequest(messages, opts) {
      return {
        model: this.model,
        messages,
        max_tokens: opts.maxTokens || this.maxTokens,
        temperature: opts.temperature || this.temperature,
        stream: false,
      };
    },
    parseResponse(data) {
      return data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content : null;
    },
    buildHeaders(apiKey) {
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      };
    },
  },

  // ─── Kimi (Moonshot AI) ───
  // OpenAI-compatible API with ultra-long context support (up to 128k)
  // Register: https://platform.moonshot.cn/
  kimi: {
    name: 'Kimi (Moonshot)',
    provider: 'moonshot',
    model: 'moonshot-v1-8k',
    endpoint: 'https://api.moonshot.cn/v1/chat/completions',
    apiKeyEnv: 'KIMI_API_KEY',
    cost: 'low',
    description: 'Moonshot Kimi — native Chinese LLM with up to 128k context window. Excellent for long-document analysis and in-depth discussions.',
    icon: '🌙',
    maxTokens: 3000,
    temperature: 0.7,
    // OpenAI-compatible format
    buildRequest(messages, opts) {
      return {
        model: this.model,
        messages,
        max_tokens: opts.maxTokens || this.maxTokens,
        temperature: opts.temperature || this.temperature,
        stream: false,
      };
    },
    parseResponse(data) {
      return data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content : null;
    },
    buildHeaders(apiKey) {
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      };
    },
  },
};

// ─── Available models list (for frontend display) ───
export function getAvailableModels() {
  const available = [];
  for (const [id, config] of Object.entries(MODELS)) {
    const hasKey = !!process.env[config.apiKeyEnv];
    available.push({
      id,
      name: config.name,
      provider: config.provider,
      description: config.description,
      icon: config.icon,
      cost: config.cost,
      available: hasKey,
    });
  }
  return available;
}

// ─── Route request to the appropriate model ───
export async function callModel(modelId, messages, opts = {}) {
  const config = MODELS[modelId];
  if (!config) {
    // Fallback to DeepSeek if model unknown
    console.log(`[Models] Unknown model "${modelId}", falling back to deepseek`);
    return callModel('deepseek', messages, opts);
  }

  const apiKey = process.env[config.apiKeyEnv];
  if (!apiKey) {
    console.log(`[Models] ${config.apiKeyEnv} not set for ${modelId}`);
    // If the requested model isn't available, fall back to DeepSeek
    if (modelId !== 'deepseek') {
      console.log(`[Models] Falling back to deepseek`);
      return callModel('deepseek', messages, opts);
    }
    return { answer: null, error: 'API_KEY_NOT_SET', modelUsed: modelId };
  }

  console.log(`[Models] Calling ${config.name} (${modelId})...`, {
    msgCount: messages.length,
    model: config.model,
  });

  try {
    const resp = await fetch(config.endpoint, {
      method: 'POST',
      headers: config.buildHeaders(apiKey),
      body: JSON.stringify(config.buildRequest(messages, opts)),
    });

    const status = resp.status;
    const bodyText = await resp.text();

    if (!resp.ok) {
      const errMsg = `[Models] ${config.name} error: ${status} ${bodyText.substring(0, 300)}`;
      console.error(errMsg);

      // Auto-fallback to DeepSeek on failure (unless we're already on DeepSeek)
      if (modelId !== 'deepseek') {
        console.log(`[Models] ${modelId} failed, auto-fallback to deepseek`);
        return callModel('deepseek', messages, opts);
      }

      return { answer: null, error: 'API_ERROR_' + status, modelUsed: modelId, detail: bodyText.substring(0, 200) };
    }

    const data = JSON.parse(bodyText);
    const answer = config.parseResponse(data);

    console.log(`[Models] ${config.name} OK, answer length:`, answer ? answer.length : 0);
    return { answer, error: null, modelUsed: modelId };
  } catch (e) {
    const errMsg = `[Models] ${config.name} exception: ${e.message}`;
    console.error(errMsg);

    // Auto-fallback to DeepSeek
    if (modelId !== 'deepseek') {
      console.log(`[Models] ${modelId} exception, auto-fallback to deepseek`);
      return callModel('deepseek', messages, opts);
    }

    return { answer: null, error: 'EXCEPTION: ' + e.message, modelUsed: modelId };
  }
}
