export const SITE = {
  name: 'Comunidad Broker',
  description: 'Portal de análisis independiente de brokers y noticias de inversión',
  url: 'https://comunidadbroker.com',
  author: 'Equipo Comunidad Broker',
  image: '/og-default.jpg'
} as const;

// Navegación principal del sitio
export const NAVIGATION = [
  { name: 'Inicio', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Brokers', href: '/brokers' },
  { name: 'Educación', href: '/educacion' },
  { name: 'Contacto', href: '/contacto' }
] as const;

// Categorías para clasificación de contenido del blog
export const CATEGORIES = {
  noticias: {
    name: 'Noticias',
    description: 'Últimas noticias del mercado financiero',
    icon: '📰',
    slug: 'noticias'
  },
  analisis: {
    name: 'Análisis',
    description: 'Análisis técnico y fundamental',
    icon: '📊',
    slug: 'analisis'
  },
  educacion: {
    name: 'Educación',
    description: 'Guías y tutoriales de trading',
    icon: '📚',
    slug: 'educacion'
  },
  alertas: {
    name: 'Alertas',
    description: 'Avisos de seguridad y estafas',
    icon: '⚠️',
    slug: 'alertas'
  },
  reviews: {
    name: 'Reviews',
    description: 'Reseñas de brokers y plataformas',
    icon: '⭐',
    slug: 'reviews'
  }
} as const;

// Temas/tags específicos para contenido
export const TOPICS = {
  forex: {
    name: 'Forex',
    description: 'Trading de divisas',
    icon: '💱',
    slug: 'forex'
  },
  criptomonedas: {
    name: 'Criptomonedas',
    description: 'Trading de criptomonedas',
    icon: '₿',
    slug: 'criptomonedas'
  },
  cfds: {
    name: 'CFDs',
    description: 'Contratos por diferencia',
    icon: '📈',
    slug: 'cfds'
  },
  acciones: {
    name: 'Acciones',
    description: 'Trading de acciones',
    icon: '📊',
    slug: 'acciones'
  },
  commodities: {
    name: 'Commodities',
    description: 'Materias primas',
    icon: '🥇',
    slug: 'commodities'
  }
} as const;

export const PAGINATION = {
  blog: 12,
  brokers: 20,
  search: 15
} as const;