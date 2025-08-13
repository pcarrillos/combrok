# 🚀 Guía de Inicio Rápido

Esta guía te ayudará a poner en funcionamiento **Comunidad Broker** en menos de 15 minutos.

## ⚡ Instalación Rápida

### 1. Clonar y Configurar
```bash
# Clonar el repositorio
git clone https://github.com/pcarrillos/combrok.git
cd combrok

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### 2. Iniciar Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev
```

### 3. Acceso Inicial
- **Sitio web**: http://localhost:4321
- **Panel admin**: http://localhost:4321/_admin
- **Login**: `admin` / `combrok2024`

## 🎯 Primeros Pasos

### Paso 1: Explorar el Sitio
1. **Homepage**: Revisa el diseño y contenido de ejemplo
2. **Blog**: Ve el post de ejemplo sobre brokers
3. **Brokers**: Explora el análisis de "Example Broker"
4. **Navegación**: Prueba todas las páginas

### Paso 2: Acceder al Panel Admin
```
URL: http://localhost:4321/_admin
Usuario: admin
Contraseña: combrok2024
```

**Dashboard incluye**:
- Estadísticas de contenido
- Posts recientes y programados
- Acciones rápidas
- Estado del sistema

### Paso 3: Crear tu Primer Post
1. **Ir a "Nuevo Post"** desde el dashboard
2. **Completar el formulario**:
   - Título atractivo (máx. 60 caracteres)
   - Descripción SEO (140-160 caracteres)
   - Seleccionar categoría
   - Agregar etiquetas
3. **Escribir contenido** en Markdown
4. **Configurar imagen** principal
5. **Publicar o guardar** como borrador

### Paso 4: Agregar tu Primer Broker
1. **Crear archivo** manualmente: `src/content/brokers/mi-broker.mdx`
2. **Copiar estructura** de `example-broker.mdx`
3. **Completar datos**:
   - Información básica
   - Regulación y seguridad
   - Costos y spreads
   - Análisis completo
4. **Guardar y verificar** en el sitio

## 🔧 Configuración Básica

### Variables de Entorno (.env)
```bash
# Sitio
SITE_URL=http://localhost:4321
SITE_NAME="Tu Sitio de Brokers"

# Analytics (opcional)
PLAUSIBLE_DOMAIN=tudominio.com

# Contacto
CONTACT_EMAIL=contacto@tudominio.com

# Admin (cambiar en producción)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu-contraseña-segura
```

### Personalización Rápida

#### 1. Información del Sitio
**Archivo**: `src/utils/constants.ts`
```typescript
export const SITE = {
  name: 'Tu Nombre del Sitio',
  description: 'Tu descripción personalizada',
  url: 'https://tudominio.com',
  image: '/images/og-image.jpg'
};
```

#### 2. Colores y Estilo
**Archivo**: `tailwind.config.js`
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#tu-color-principal',
        secondary: '#tu-color-secundario'
      }
    }
  }
}
```

#### 3. Logo y Favicon
- **Favicon**: Reemplazar `public/favicon.svg`
- **Logo**: Actualizar SVG en componentes de header

## 📝 Crear Contenido

### Estructura de Post
```markdown
---
title: "Tu Título Aquí"
description: "Descripción SEO optimizada de 140-160 caracteres"
publishDate: 2024-01-15T10:00:00.000Z
author: "admin"
category: "analisis"  # noticias, analisis, educacion, alertas
readingTime: 5
image:
  src: "/images/tu-imagen.jpg"
  alt: "Descripción de la imagen"
tags: ["forex", "trading", "análisis"]
status: "published"  # draft, scheduled, published
featured: false
priority: 5
---

# Tu contenido aquí

Escribe en **Markdown** con todas las características:

## Subtítulos
- Listas
- [Enlaces](https://ejemplo.com)
- Imágenes
- Tablas

> Citas importantes

```código
Bloques de código
```
```

### Categorías Disponibles
- **`noticias`**: Noticias del mercado financiero
- **`analisis`**: Análisis técnico y fundamental
- **`educacion`**: Contenido educativo y guías
- **`alertas`**: Advertencias y alertas de riesgo

### Estados de Publicación
- **`draft`**: Borrador, no visible públicamente
- **`scheduled`**: Programado para fecha específica
- **`published`**: Publicado y visible

## 🖼️ Gestión de Imágenes

### Ubicación de Imágenes
```
public/images/
├── posts/          # Imágenes de artículos
├── brokers/        # Logos de brokers
├── authors/        # Avatares de autores
└── general/        # Imágenes generales
```

### Formatos Recomendados
- **Posts**: 1200x630px (ratio 16:9)
- **Logos de brokers**: 200x200px (cuadrado)
- **Avatares**: 150x150px (circular)
- **Formato**: WebP preferido, JPG/PNG aceptados

### Optimización
```bash
# Las imágenes se optimizan automáticamente en build
npm run build
```

## 🚀 Deploy Rápido

### Vercel (Recomendado)
1. **Conectar repositorio** en Vercel.com
2. **Configurar variables de entorno**
3. **Deploy automático** en cada push

### Netlify
1. **Conectar repositorio** en Netlify.com
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`

### Variables de Entorno en Producción
```bash
SITE_URL=https://tudominio.com
NODE_ENV=production
ADMIN_PASSWORD=contraseña-super-segura
PLAUSIBLE_DOMAIN=tudominio.com
```

## ✅ Checklist de Launch

### Antes de Producción
- [ ] Cambiar credenciales de admin
- [ ] Actualizar información del sitio
- [ ] Reemplazar imágenes placeholder
- [ ] Configurar analytics
- [ ] Probar todas las páginas
- [ ] Verificar SEO con herramientas

### SEO Básico
- [ ] Meta titles únicos (< 60 caracteres)
- [ ] Meta descriptions (140-160 caracteres)
- [ ] Imágenes con alt text
- [ ] URLs amigables
- [ ] Sitemap automático funcionando

### Performance
- [ ] Core Web Vitals verdes
- [ ] Imágenes optimizadas
- [ ] CSS/JS minificado
- [ ] Service Worker activo

## 🆘 Problemas Comunes

### Error de Build
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Imágenes No Cargan
- Verificar que estén en `public/images/`
- Revisar rutas en el contenido (comenzar con `/`)
- Comprobar formatos soportados

### Panel Admin No Funciona
- Verificar URL: `http://localhost:4321/_admin`
- Revisar credenciales en `.env`
- Comprobar JavaScript habilitado

### Contenido No Aparece
- Verificar frontmatter válido
- Comprobar status: `published`
- Revisar errores de validación Zod

## 📞 Siguiente Paso

Una vez que tengas el sitio funcionando:

1. **Lee la [Gestión de Contenido](./content-management.md)** para crear contenido profesional
2. **Consulta el [Panel Administrativo](./admin-panel.md)** para dominar todas las funciones
3. **Revisa [SEO y Performance](./seo-performance.md)** para optimizar tu sitio

¿Problemas? Consulta **[Troubleshooting](./troubleshooting.md)** o abre un issue en GitHub.