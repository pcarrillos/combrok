# Comunidad Broker

Portal independiente de análisis de brokers y noticias de inversión. Una plataforma moderna construida con Astro, TypeScript y Tailwind CSS que ofrece análisis honestos e independientes del mundo del trading y las inversiones.

## 🚀 Características

- **Análisis de Brokers**: Reviews detalladas y objetivas de los principales brokers
- **Blog Especializado**: Noticias, análisis y educación financiera
- **SEO Optimizado**: Implementación técnica avanzada para máxima visibilidad
- **Panel Administrativo**: Sistema de gestión de contenido integrado
- **Rendimiento**: Optimizado para Core Web Vitals y velocidad
- **Accesibilidad**: Cumple estándares WCAG AA
- **Responsive**: Diseño adaptado para todos los dispositivos

## 🛠️ Tecnologías

- **Framework**: [Astro 4.0+](https://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Contenido**: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- **Validación**: [Zod](https://zod.dev)
- **TypeScript**: Para type safety
- **Analytics**: Plausible Analytics (cookieless)
- **Deploy**: Vercel con Edge Functions

## 📦 Estructura del Proyecto

```
/
├── public/              # Assets estáticos
│   ├── icons/          # Íconos PWA
│   ├── images/         # Imágenes del sitio
│   └── manifest.json   # PWA manifest
├── src/
│   ├── components/     # Componentes reutilizables
│   │   ├── admin/     # Componentes del panel admin
│   │   └── layout/    # Componentes de layout
│   ├── content/       # Contenido del sitio
│   │   ├── posts/     # Artículos del blog
│   │   ├── brokers/   # Análisis de brokers
│   │   └── authors/   # Información de autores
│   ├── layouts/       # Layouts de páginas
│   ├── pages/         # Páginas del sitio
│   │   ├── _admin/    # Panel administrativo
│   │   ├── api/       # API routes
│   │   ├── blog/      # Blog
│   │   └── brokers/   # Sección de brokers
│   ├── styles/        # Estilos globales
│   ├── types/         # Definiciones TypeScript
│   └── utils/         # Utilidades y constantes
└── package.json
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18.0 o superior
- npm, yarn o pnpm

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/pcarrillos/combrok.git
   cd combrok
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Edita .env con tus configuraciones
   ```

4. **Iniciar desarrollo**
   ```bash
   npm run dev
   ```

   El sitio estará disponible en `http://localhost:4321`

### Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run astro        # CLI de Astro
npm run type-check   # Verificar tipos TypeScript
```

## 📝 Gestión de Contenido

### Crear un Nuevo Post

1. **Ir al panel admin**: `http://localhost:4321/_admin`
2. **Usar el formulario web** o crear manualmente:

```markdown
---
title: "Tu título aquí"
description: "Descripción SEO optimizada"
publishDate: 2024-01-15T10:00:00.000Z
author: "admin"
category: "analisis"
readingTime: 5
image:
  src: "./images/post-image.jpg"
  alt: "Descripción de la imagen"
tags: ["forex", "trading", "análisis"]
status: "published"
featured: false
priority: 5
---

# Tu contenido aquí

Escribe tu contenido en formato Markdown...
```

### Agregar un Broker

Los análisis de brokers siguen un esquema estructurado con más de 50 campos:

```markdown
---
name: "Nombre del Broker"
logo: "./logos/broker-logo.png"
website: "https://broker.com"
foundedYear: 2020
regulatedBy: ["FCA", "CySEC"]
# ... más campos
---

Tu análisis detallado aquí...
```

## 🔐 Panel Administrativo

El panel admin está disponible en `/_admin` e incluye:

- **Dashboard**: Estadísticas y actividad reciente
- **Posts**: Gestión completa de artículos
- **Brokers**: Análisis de brokers
- **Medios**: Gestión de archivos
- **Analytics**: Métricas del sitio

### Seguridad

⚠️ **Importante**: El sistema de autenticación actual es básico y solo para desarrollo. Para producción, implementa:

- Autenticación robusta (JWT, OAuth, etc.)
- Encriptación de contraseñas
- Rate limiting
- CSRF protection

## 📊 SEO y Performance

### SEO Features

- **Meta tags dinámicos**: Title, description, OG tags
- **Structured data**: JSON-LD para artículos y reviews
- **Sitemap automático**: Generado por Astro
- **URLs amigables**: Slugs SEO optimizados
- **Breadcrumbs**: Navegación estructurada
- **Alt text**: Todas las imágenes optimizadas

### Performance

- **SSG**: Generación estática para velocidad máxima
- **Image optimization**: Astro Assets automático
- **Critical CSS**: Inlined para First Paint
- **Service Worker**: Caching inteligente
- **Lazy loading**: Imágenes y componentes

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conectar repositorio** en Vercel
2. **Configurar variables de entorno**
3. **Deploy automático** en cada push

### Netlify

```bash
npm run build
# Deploy la carpeta dist/
```

### Variables de Entorno en Producción

```bash
SITE_URL=https://comunidadbroker.com
NODE_ENV=production
PLAUSIBLE_DOMAIN=comunidadbroker.com
# Configura todas las variables necesarias
```

## 🧪 Testing

```bash
# Próximamente
npm run test          # Tests unitarios
npm run test:e2e      # Tests end-to-end
npm run lighthouse    # Audit de performance
```

## 📚 Documentación

### Arquitectura

- **[Agents System](./comunidadbroker-subagentes/)**: Documentación del sistema multi-agente
- **[Content Schema](./src/content/config.ts)**: Esquemas de contenido
- **[Components](./src/components/)**: Documentación de componentes

### Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

### Estándares de Código

- **TypeScript**: Strict mode habilitado
- **ESLint**: Configuración Astro oficial
- **Prettier**: Para formateo consistente
- **Conventional Commits**: Para mensajes de commit

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🤝 Soporte

- **Issues**: [GitHub Issues](https://github.com/pcarrillos/combrok/issues)
- **Documentación**: [Astro Docs](https://docs.astro.build)
- **Email**: contacto@comunidadbroker.com

## 🎯 Roadmap

### Próximas Características

- [ ] Sistema de comentarios
- [ ] Newsletter automático
- [ ] Comparador de brokers
- [ ] API pública
- [ ] Aplicación móvil
- [ ] Notificaciones push
- [ ] Calculadoras de trading
- [ ] Backtesting tools

### Mejoras Técnicas

- [ ] Tests automatizados
- [ ] CI/CD completo
- [ ] Database integration
- [ ] Authentication robusto
- [ ] Rate limiting
- [ ] CDN optimization

---

**Hecho con ❤️ para la comunidad de traders**