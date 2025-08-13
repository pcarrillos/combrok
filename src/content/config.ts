import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Identificación
    title: z.string().max(60),
    description: z.string().min(140).max(160),
    publishDate: z.date(),
    updateDate: z.date().optional(),
    
    // Autor y categorización
    author: z.string(),
    category: z.enum(['noticias', 'analisis', 'educacion', 'alertas']),
    readingTime: z.number().positive(),
    
    // SEO avanzado
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
    canonical: z.string().url().optional(),
    noindex: z.boolean().default(false),
    
    // Media
    image: z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
      credit: z.string().optional()
    }),
    ogImage: z.string().optional(),
    
    // Taxonomías
    tags: z.array(z.string()),
    topics: z.array(z.string()).optional(),
    countries: z.array(z.string()).optional(),
    relatedBrokers: z.array(z.string()).optional(),
    
    // Estado
    status: z.enum(['draft', 'scheduled', 'published']).default('draft'),
    scheduledDate: z.date().optional(),
    featured: z.boolean().default(false),
    priority: z.number().min(0).max(10).default(5),
    
    // Avisos
    warnings: z.array(z.string()).optional(),
    disclaimer: z.string().optional(),
    
    // Fuentes
    sources: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
      date: z.date()
    })).optional(),
    
    // Métricas (automáticas)
    views: z.number().default(0),
    shares: z.number().default(0)
  })
});

const brokerCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Identificación
    name: z.string(),
    logo: z.string(),
    website: z.string().url(),
    foundedYear: z.number().min(1900).max(2024),
    parentCompany: z.string().optional(),
    
    // Ubicación
    countryOrigin: z.string(),
    headquarters: z.string(),
    countriesOperating: z.array(z.string()),
    countriesRestricted: z.array(z.string()).optional(),
    languages: z.array(z.string()),
    
    // Regulación
    regulations: z.array(z.object({
      entity: z.string(),
      country: z.string(),
      licenseNumber: z.string(),
      verified: z.boolean(),
      verificationDate: z.date().optional(),
      url: z.string().url().optional()
    })),
    isRegulated: z.boolean(),
    
    // Instrumentos
    instruments: z.object({
      forex: z.boolean().default(false),
      stocks: z.boolean().default(false),
      indices: z.boolean().default(false),
      commodities: z.boolean().default(false),
      cryptocurrencies: z.boolean().default(false),
      etfs: z.boolean().default(false),
      bonds: z.boolean().default(false),
      options: z.boolean().default(false),
      futures: z.boolean().default(false)
    }),
    availableMarkets: z.number().optional(),
    
    // Plataformas
    platforms: z.array(z.object({
      name: z.string(),
      type: z.enum(['desktop', 'web', 'mobile', 'api']),
      customPlatform: z.boolean().default(false)
    })),
    
    // Condiciones trading
    minDeposit: z.number().min(0),
    maxLeverage: z.string(),
    spreadsFrom: z.number().min(0),
    averageSpread: z.number().optional(),
    commissionType: z.enum(['spread', 'commission', 'both']),
    commissionDetails: z.string().optional(),
    
    // Depósitos y retiros
    depositMethods: z.array(z.string()),
    withdrawalMethods: z.array(z.string()),
    depositFees: z.string(),
    withdrawalFees: z.string(),
    processingTime: z.object({
      deposits: z.string(),
      withdrawals: z.string()
    }),
    
    // Cuenta y servicios
    accountTypes: z.array(z.string()),
    demoAccount: z.boolean().default(false),
    islamicAccount: z.boolean().default(false),
    copyTrading: z.boolean().default(false),
    socialTrading: z.boolean().default(false),
    educationCenter: z.boolean().default(false),
    
    // Evaluación
    rating: z.number().min(0).max(5),
    trustScore: z.number().min(0).max(100),
    userReviews: z.number().min(0).default(0),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    
    // Soporte
    supportChannels: z.object({
      liveChat: z.boolean().default(false),
      phone: z.boolean().default(false),
      email: z.boolean().default(false),
      localOffice: z.boolean().default(false)
    }),
    support247: z.boolean().default(false),
    supportQuality: z.enum(['excellent', 'good', 'average', 'poor']).optional(),
    
    // Alertas
    warnings: z.array(z.string()).optional(),
    scamAlert: z.boolean().default(false),
    blacklisted: z.boolean().default(false),
    complaints: z.number().min(0).default(0),
    riskLevel: z.enum(['low', 'medium', 'high', 'extreme']),
    
    // SEO
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    lastReviewDate: z.date(),
    nextReviewDate: z.date().optional(),
    updateFrequency: z.enum(['monthly', 'quarterly', 'yearly']),
    reviewAuthor: z.string(),
    
    // Afiliación (interno)
    affiliateLink: z.string().url().optional(),
    affiliateCommission: z.string().optional()
  })
});

const authorCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string(),
    role: z.string(),
    social: z.object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      email: z.string().email().optional()
    }).optional(),
    active: z.boolean().default(true)
  })
});

export const collections = {
  'posts': postCollection,
  'brokers': brokerCollection,
  'authors': authorCollection
};