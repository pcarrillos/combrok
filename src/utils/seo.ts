import { SITE } from './constants';

export interface SEOData {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function generateSEOTags(data: SEOData) {
  const {
    title = SITE.name,
    description = SITE.description,
    image = SITE.image,
    canonical,
    noindex = false,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    tags = []
  } = data;

  return {
    title,
    description,
    canonical,
    noindex,
    openGraph: {
      type,
      title,
      description,
      image,
      siteName: SITE.name,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { author }),
      ...(tags.length > 0 && { tags })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{name: string, href: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE.url}${item.href}`
    }))
  };
}