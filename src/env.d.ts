/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'astro:content' {
  interface Render {
    '.mdx': Promise<{
      Content: import('astro').MarkdownInstance<{}>['Content'];
      headings: import('astro').MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  }
}

// Environment variables
interface ImportMetaEnv {
  readonly PLAUSIBLE_DOMAIN?: string;
  readonly GOOGLE_ANALYTICS_ID?: string;
  readonly CONTACT_EMAIL?: string;
  readonly ADMIN_USERNAME?: string;
  readonly ADMIN_PASSWORD?: string;
  readonly JWT_SECRET?: string;
  readonly DATABASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}