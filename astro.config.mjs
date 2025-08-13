import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://comunidadbroker.com',
  integrations: [
    tailwind({ 
      applyBaseStyles: false 
    }),
    mdx(),
    sitemap({
      customPages: [
        'https://comunidadbroker.com/sitemap-news.xml'
      ]
    })
  ],
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true },
    edgeMiddleware: true
  }),
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  image: {
    domains: ['comunidadbroker.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.comunidadbroker.com'
      }
    ]
  },
  experimental: {
    contentCollectionCache: true
  }
});