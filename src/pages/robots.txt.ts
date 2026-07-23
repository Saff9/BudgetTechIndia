import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ? site.href : 'https://budget-tech-india.vercel.app';
  
  const robotsTxt = `# BudgetTechIndia Robots.txt
# Optimized for Google, Bing, and AI Search Engines (Perplexity, ChatGPT, Gemini, Copilot)

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# AI Crawlers & Search Assistants
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

# Sitemap
Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap-index.xml
Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap-0.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
