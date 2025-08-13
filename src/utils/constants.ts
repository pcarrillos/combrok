export const SITE = {
  name: 'Comunidad Broker',
  description: 'Portal de análisis independiente de brokers y noticias de inversión',
  url: 'https://comunidadbroker.com',
  author: 'Equipo Comunidad Broker',
  image: '/og-default.jpg'
} as const;

export const CATEGORIES = {
  noticias: {
    name: 'Noticias',
    description: 'Últimas noticias del mercado financiero',
    icon: '📰'
  },
  analisis: {
    name: 'Análisis',
    description: 'Análisis técnico y fundamental',
    icon: '📊'
  },
  educacion: {
    name: 'Educación',
    description: 'Guías y tutoriales de trading',
    icon: '📚'
  },
  alertas: {
    name: 'Alertas',
    description: 'Avisos de seguridad y estafas',
    icon: '⚠️'
  }
} as const;

export const PAGINATION = {
  blog: 12,
  brokers: 20,
  search: 15
} as const;