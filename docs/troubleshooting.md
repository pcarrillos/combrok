# 🛠️ Troubleshooting

Guía completa para solucionar problemas comunes en **Comunidad Broker**.

## 🚨 Problemas de Instalación

### Error: Node.js Version

#### Síntoma
```bash
error astro@4.16.18: The engine "node" is incompatible with this module.
```

#### Solución
```bash
# Verificar versión actual
node --version

# Si es menor a 18.0.0:
# Usando nvm (recomendado)
nvm install 18
nvm use 18

# Usando n
npm install -g n
n 18

# Verificar instalación
node --version  # Debe mostrar 18.x.x+
```

### Error: npm install Failures

#### Síntoma
```bash
npm ERR! peer dep missing
npm ERR! code ERESOLVE
```

#### Solución
```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar con resolución de conflictos
npm install --legacy-peer-deps

# O forzar resolución
npm install --force
```

### Error: Permisos en macOS/Linux

#### Síntoma
```bash
Error: EACCES: permission denied
```

#### Solución
```bash
# Configurar npm para usar directorio local
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Agregar a PATH (.bashrc, .zshrc)
export PATH=~/.npm-global/bin:$PATH

# Recargar terminal
source ~/.bashrc  # o ~/.zshrc

# Reinstalar paquetes globales
npm install -g astro
```

## 🔧 Problemas de Build

### Error: TypeScript Compilation

#### Síntoma
```bash
[ERROR] TypeScript error in src/pages/index.astro
Property 'data' does not exist on type...
```

#### Solución
```bash
# Verificar types de Astro
npm run astro add -- --yes @astrojs/ts-plugin

# Regenerar types
rm -rf .astro
npm run dev  # Regenera automáticamente

# Si persiste, verificar imports
# Asegurar que imports usen tipos correctos
```

### Error: Zod Schema Validation

#### Síntoma
```bash
[InvalidContentEntryFrontmatterError] frontmatter does not match collection schema
```

#### Solución
```bash
# Verificar frontmatter del contenido
# Ejemplo: src/content/posts/post.mdx

# Correcto:
---
title: "Título válido"
publishDate: 2024-01-15T10:00:00.000Z  # Formato ISO correcto
category: "noticias"  # Debe ser uno de los enum definidos
status: "published"   # Valores válidos: draft, scheduled, published
---

# Verificar schema en src/content/config.ts
# Asegurar que tipos coincidan exactamente
```

### Error: Image Processing

#### Síntoma
```bash
[NoImageMetadata] Could not process image metadata
```

#### Solución
```bash
# Verificar que imágenes existan
ls public/images/  # Para imágenes referenciadas con /images/

# Verificar formatos soportados
# Soportados: JPG, PNG, WebP, SVG, GIF
# No soportados: TIFF, BMP

# Para imágenes placeholder temporales:
# Crear archivo simple:
echo "placeholder" > public/images/missing-image.jpg

# O usar URLs externas:
image:
  src: "https://via.placeholder.com/1200x630"
  alt: "Imagen placeholder"
```

### Error: Memory Limit

#### Síntoma
```bash
FATAL ERROR: Ineffective mark-compacts near heap limit
```

#### Solución
```bash
# Aumentar límite de memoria
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# O en package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' astro build"
  }
}

# Para deploy en Vercel, agregar en vercel.json:
{
  "functions": {
    "app/build.js": {
      "memory": 3008
    }
  }
}
```

## 🌐 Problemas de Desarrollo

### Error: Puerto en Uso

#### Síntoma
```bash
Error: listen EADDRINUSE: address already in use :::4321
```

#### Solución
```bash
# Encontrar proceso usando el puerto
lsof -i :4321

# Matar proceso específico
kill -9 [PID]

# O usar puerto diferente
npm run dev -- --port 3000

# En Windows:
netstat -ano | findstr :4321
taskkill /PID [PID] /F
```

### Error: Hot Reload No Funciona

#### Síntoma
- Los cambios no se reflejan automáticamente
- Necesitas recargar manualmente

#### Solución
```bash
# Verificar que no tengas múltiples instancias
ps aux | grep astro
# Matar procesos duplicados

# Limpiar cache de Astro
rm -rf .astro/
npm run dev

# Si usas WSL en Windows:
# Verificar que los archivos estén en filesystem de Linux
# Mover proyecto a /home/usuario/ en lugar de /mnt/c/
```

### Error: Import Path Resolution

#### Síntoma
```bash
Error: Cannot resolve module '@/components/Layout.astro'
```

#### Solución
```typescript
// Verificar tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]  // Verificar que esta línea exista
    }
  }
}

// Si el problema persiste, usar rutas relativas:
import Layout from '../components/Layout.astro';
// En lugar de:
import Layout from '@/components/Layout.astro';
```

## 📝 Problemas de Contenido

### Error: Content Collections

#### Síntoma
```bash
Content collection "posts" does not exist
```

#### Solución
```bash
# Verificar estructura de directorios
ls src/content/
# Debe mostrar: posts/ brokers/ authors/ config.ts

# Verificar config.ts
cat src/content/config.ts
# Debe exportar collections con nombres correctos

# Recrear estructura si es necesaria
mkdir -p src/content/{posts,brokers,authors}
```

### Error: Frontmatter Parsing

#### Síntoma
```bash
[MarkdownError] Invalid frontmatter
```

#### Solución
```markdown
<!-- Verificar sintaxis YAML correcta -->

<!-- Incorrecto: -->
---
title: Título sin comillas con: caracteres especiales
tags: [tag1, tag2, tag3]  # Sin espacios después de comas
date: 2024-1-15  # Formato de fecha incorrecto
---

<!-- Correcto: -->
---
title: "Título con comillas y: caracteres especiales"
tags: ["tag1", "tag2", "tag3"]
publishDate: 2024-01-15T10:00:00.000Z
---
```

### Error: Missing Author

#### Síntoma
```bash
Author "admin" not found in authors collection
```

#### Solución
```bash
# Verificar que existe el archivo del autor
ls src/content/authors/
# Debe mostrar: admin.json

# Si no existe, crear:
cat > src/content/authors/admin.json << EOF
{
  "name": "Administrador",
  "bio": "Equipo editorial de Comunidad Broker",
  "avatar": "/images/authors/admin.jpg",
  "role": "Editor",
  "active": true
}
EOF
```

## 🖼️ Problemas de Imágenes

### Error: Images Not Loading

#### Síntoma
- Imágenes muestran 404 en el navegador
- Alt text se muestra en lugar de imagen

#### Solución
```bash
# Verificar ubicación correcta
# Las imágenes deben estar en public/, no en src/
mv src/images/* public/images/

# Verificar rutas en contenido
# Correcto:
image:
  src: "/images/post-image.jpg"  # Comienza con /
  
# Incorrecto:
image:
  src: "./images/post-image.jpg"  # Ruta relativa
  src: "images/post-image.jpg"    # Sin /
```

### Error: Large Bundle Size

#### Síntoma
```bash
Warning: Asset size limit: The following asset(s) exceed the recommended size limit
```

#### Solución
```bash
# Optimizar imágenes antes de subirlas
# Usando ImageOptim (macOS) o TinyPNG (web)

# Redimensionar imágenes grandes
# Posts: máximo 1200px ancho
# Logos: máximo 200px
# Avatares: máximo 150px

# Convertir a WebP para mejor compresión
# Usando CLI tools:
cwebp input.jpg -q 80 -o output.webp

# O usar servicio online:
# https://squoosh.app/
```

### Error: SVG Icons Not Displaying

#### Síntoma
- Iconos SVG no se muestran
- Espacios vacíos donde deberían estar los iconos

#### Solución
```html
<!-- Verificar estructura SVG -->
<!-- Correcto: -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="..." />
</svg>

<!-- Asegurar que viewBox coincida con dimensiones -->
<!-- Usar fill="currentColor" para heredar color del texto -->

<!-- Si usas iconos externos, verificar CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/heroicons@1.0.6/outline/index.css">
```

## 🔐 Problemas del Panel Admin

### Error: Cannot Access Admin Panel

#### Síntoma
- 404 al acceder a /_admin
- Página en blanco

#### Solución
```bash
# Verificar que existen las páginas admin
ls src/pages/_admin/
# Debe mostrar: index.astro login.astro

# Verificar rutas en desarrollo
npm run dev
# Ir a http://localhost:4321/_admin

# En producción, verificar que el build incluye las páginas
npm run build
ls dist/_admin/  # Debe mostrar archivos HTML
```

### Error: Admin Login Not Working

#### Síntoma
- Credenciales correctas pero no permite acceso
- Error de autenticación

#### Solución
```bash
# Verificar variables de entorno
echo $ADMIN_USERNAME
echo $ADMIN_PASSWORD

# Si están vacías, configurar:
export ADMIN_USERNAME=admin
export ADMIN_PASSWORD=combrok2024

# Verificar archivo .env
cat .env
# Debe contener:
ADMIN_USERNAME=admin
ADMIN_PASSWORD=combrok2024

# Reiniciar servidor de desarrollo
npm run dev
```

### Error: API Routes Not Working

#### Síntoma
```bash
404 - This page could not be found
```

#### Solución
```bash
# Verificar estructura de API routes
ls src/pages/api/
# Debe mostrar estructura correcta

# Verificar que archivos son .ts (no .js)
# Correcto: src/pages/api/posts/index.ts
# Incorrecto: src/pages/api/posts/index.js

# En Astro config, verificar output mode:
export default defineConfig({
  output: 'hybrid',  // Necesario para API routes
  adapter: vercel()
});
```

## 🚀 Problemas de Deployment

### Error: Vercel Build Failures

#### Síntoma
```bash
Error: Command "npm run build" exited with 1
```

#### Solución
```bash
# Verificar build local primero
npm run build
# Si falla local, arreglar errores primero

# En Vercel, verificar:
# 1. Node version (debe ser 18+)
# 2. Variables de entorno configuradas
# 3. Build command correcta: npm run build
# 4. Output directory: .vercel/output

# Ver logs detallados en Vercel dashboard
# Functions tab → View logs
```

### Error: Environment Variables

#### Síntoma
- Sitio no funciona en producción
- Variables undefined

#### Solución
```bash
# En Vercel Dashboard:
# Settings → Environment Variables
# Agregar todas las variables de .env

# Verificar que no uses variables en build time
# que no estén disponibles en el entorno

# Para debugging, agregar console.log temporal:
console.log('ENV vars:', {
  SITE_URL: process.env.SITE_URL,
  NODE_ENV: process.env.NODE_ENV
});
```

### Error: 404 in Production

#### Síntoma
- Páginas funcionan en desarrollo pero 404 en producción

#### Solución
```bash
# Verificar que páginas se generan en build
npm run build
ls -la dist/  # Verificar estructura

# Para páginas dinámicas, verificar getStaticPaths
export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.slug }
  }));
}

# Verificar redirects en hosting:
# Vercel: vercel.json
# Netlify: _redirects o netlify.toml
```

## 📱 Problemas de Performance

### Error: Low Lighthouse Scores

#### Síntoma
- Performance score bajo
- Core Web Vitals fallan

#### Solución
```bash
# Optimizar imágenes
# Usar formato WebP
# Redimensionar a tamaños apropiados

# Verificar loading de fonts
# En BaseLayout.astro:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin>

# Optimizar JavaScript
# Verificar bundle size:
npm run build -- --report

# Usar lazy loading para imágenes:
<img loading="lazy" src="..." alt="...">
```

### Error: Slow Build Times

#### Síntoma
- Build toma mucho tiempo (>5 minutos)

#### Solución
```bash
# Optimizar número de páginas
# Verificar si generas demasiadas páginas estáticas

# Usar incremental builds (experimental):
export default defineConfig({
  experimental: {
    contentCollectionCache: true
  }
});

# Reducir optimizaciones en desarrollo:
export default defineConfig({
  vite: {
    build: {
      sourcemap: false  // Solo en desarrollo
    }
  }
});
```

## 🔍 Problemas de SEO

### Error: Sitemap Not Generated

#### Síntoma
- /sitemap-index.xml muestra 404

#### Solución
```javascript
// Verificar configuración en astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tu-dominio.com',  // OBLIGATORIO para sitemap
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ]
});

// Verificar después del build:
ls dist/sitemap*  # Debe mostrar archivos XML
```

### Error: Missing Meta Tags

#### Síntoma
- Meta tags no aparecen en view source

#### Solución
```astro
---
// En cada página, verificar props del Layout
const { title, description } = Astro.props;
---

<BaseLayout 
  title={title || "Título por defecto"}
  description={description || "Descripción por defecto"}
  image="/images/default-og.jpg"
>
  <!-- Contenido -->
</BaseLayout>
```

## 📞 Cómo Obtener Ayuda

### Información para Debug

Cuando reporten problemas, incluir:

```bash
# Información del sistema
node --version
npm --version
npx astro --version

# Información del proyecto
cat package.json | grep version
git log --oneline -5

# Error completo
# Copiar mensaje de error completo
# Incluir stack trace si está disponible
```

### Logs Útiles

```bash
# Build con información detallada
npm run build -- --verbose

# Desarrollo con debug
DEBUG=astro:* npm run dev

# Verificar sintaxis de archivos
npx astro check
```

### Recursos de Ayuda

- **Documentación Astro**: https://docs.astro.build
- **GitHub Issues**: https://github.com/pcarrillos/combrok/issues
- **Astro Discord**: https://astro.build/chat
- **Stack Overflow**: Tag `astro`

### Crear Issue en GitHub

```markdown
## Descripción del Problema
[Descripción clara del problema]

## Pasos para Reproducir
1. [Paso 1]
2. [Paso 2]
3. [Resultado actual]

## Comportamiento Esperado
[Lo que debería pasar]

## Información del Sistema
- Node version: [versión]
- npm version: [versión]
- Astro version: [versión]
- OS: [sistema operativo]

## Logs de Error
```
[Pegar logs completos aquí]
```

## Archivos Relevantes
[Mencionar archivos relacionados con el problema]
```

---

**¿No encontraste la solución?** Abre un issue en GitHub con toda la información de debug y te ayudaremos a resolverlo.