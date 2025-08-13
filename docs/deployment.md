# 🚀 Guía de Deployment

Guía completa para desplegar **Comunidad Broker** en diferentes plataformas de hosting, desde desarrollo hasta producción.

## 🎯 Opciones de Deployment

### ⭐ Vercel (Recomendado)
- **Integración perfecta** con Astro
- **Deploy automático** desde Git
- **Edge Functions** incluidas
- **CDN global** gratuito
- **Analytics** integrado

### 🌐 Netlify
- **Generoso plan gratuito**
- **Deploy previews** automáticos
- **Forms** integrados
- **Edge Functions** disponibles

### ☁️ Otras Opciones
- **Cloudflare Pages**: Rápido y gratuito
- **GitHub Pages**: Para sitios estáticos simples
- **Railway/Render**: Para necesidades más complejas
- **VPS Tradicional**: Máximo control

## 🏆 Deployment en Vercel

### Método 1: Desde Dashboard de Vercel

#### Paso 1: Preparar el Repositorio
```bash
# Asegurar que el código está en GitHub
git add .
git commit -m "Preparar para deploy en Vercel"
git push origin main
```

#### Paso 2: Conectar en Vercel
1. **Ir a**: https://vercel.com
2. **Registrarse/Login** con GitHub
3. **Import Git Repository**
4. **Seleccionar**: `pcarrillos/combrok`
5. **Configure Project**:
   ```yaml
   Framework Preset: Astro
   Build Command: npm run build
   Output Directory: .vercel/output
   Install Command: npm install
   ```

#### Paso 3: Variables de Entorno
En el dashboard de Vercel, configurar:
```bash
# Producción
SITE_URL=https://tu-dominio.vercel.app
NODE_ENV=production

# Analytics
PLAUSIBLE_DOMAIN=tu-dominio.com

# Admin (CAMBIAR OBLIGATORIAMENTE)
ADMIN_USERNAME=tu-usuario-admin
ADMIN_PASSWORD=contraseña-super-segura-123

# Contacto
CONTACT_EMAIL=contacto@tu-dominio.com
SUPPORT_EMAIL=soporte@tu-dominio.com

# Opcional: Integraciones
SMTP_HOST=tu-smtp.com
SMTP_USER=usuario@smtp.com
SMTP_PASS=password-smtp
```

#### Paso 4: Deploy
1. **Click "Deploy"**
2. **Esperar 2-3 minutos** (primera vez)
3. **Verificar URL** generada automáticamente

### Método 2: Desde CLI de Vercel

#### Instalación y Setup
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login en Vercel
vercel login

# Deploy desde directorio del proyecto
cd combrok
vercel
```

#### Configuración Interactiva
```bash
? Set up and deploy "~/combrok"? [Y/n] y
? Which scope should contain your project? tu-usuario
? Link to existing project? [y/N] n
? What's your project's name? combrok
? In which directory is your code located? ./
? Want to override the settings? [y/N] y
? Output Directory: .vercel/output
? Build Command: npm run build
? Development Command: npm run dev
```

#### Deploy Automático
```bash
# Deploy de producción
vercel --prod

# Deploy de preview (para testing)
vercel
```

### Configuración Avanzada de Vercel

#### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".vercel/output",
  "framework": "astro",
  "regions": ["iad1", "fra1"],
  "functions": {
    "src/pages/api/**/*.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/admin",
      "destination": "/_admin",
      "permanent": true
    }
  ]
}
```

#### Dominios Personalizados
1. **En Dashboard Vercel**: Settings → Domains
2. **Agregar dominio**: `comunidadbroker.com`
3. **Configurar DNS**:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.19
   ```

## 🌐 Deployment en Netlify

### Método 1: Desde Dashboard

#### Configuración del Proyecto
```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
  
[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "8"

[[redirects]]
  from = "/admin"
  to = "/_admin"
  status = 301

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[headers]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

#### Variables de Entorno
En Netlify Dashboard → Site Settings → Environment Variables:
```bash
SITE_URL=https://amazing-site-123456.netlify.app
NODE_ENV=production
ADMIN_USERNAME=tu-admin
ADMIN_PASSWORD=password-segura
```

### Método 2: Desde CLI

#### Setup
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inicializar proyecto
netlify init
```

#### Deploy
```bash
# Deploy de prueba
netlify deploy

# Deploy de producción
netlify deploy --prod
```

## ☁️ Cloudflare Pages

### Configuración
1. **Dashboard de Cloudflare** → Pages
2. **Connect to Git** → Seleccionar repositorio
3. **Build settings**:
   ```yaml
   Framework: Astro
   Build command: npm run build
   Build output: dist
   Root directory: /
   ```

### Configuración Adicional
```yaml
# wrangler.toml (opcional para Workers)
name = "comunidad-broker"
compatibility_date = "2024-01-15"

[env.production]
vars = { ENVIRONMENT = "production" }
```

## 🖥️ VPS/Servidor Propio

### Requisitos del Servidor
```yaml
Mínimo:
  - CPU: 1 vCore
  - RAM: 512MB
  - Storage: 10GB SSD
  - Node.js: 18+
  - Nginx/Apache

Recomendado:
  - CPU: 2 vCores
  - RAM: 2GB
  - Storage: 20GB SSD
  - CDN: Cloudflare
```

### Setup en Ubuntu

#### 1. Preparar Servidor
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Nginx
sudo apt install nginx -y

# Instalar PM2 para gestión de procesos
sudo npm install -g pm2
```

#### 2. Configurar Proyecto
```bash
# Clonar repositorio
git clone https://github.com/pcarrillos/combrok.git
cd combrok

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
nano .env  # Editar con datos de producción

# Build del proyecto
npm run build
```

#### 3. Configurar Nginx
```nginx
# /etc/nginx/sites-available/comunidadbroker
server {
    listen 80;
    server_name comunidadbroker.com www.comunidadbroker.com;
    
    root /home/usuario/combrok/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # HTML files
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public";
    }
    
    # API routes (si usas servidor Node.js)
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Try files
    location / {
        try_files $uri $uri/ =404;
    }
}
```

#### 4. SSL con Let's Encrypt
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
sudo certbot --nginx -d comunidadbroker.com -d www.comunidadbroker.com

# Verificar renovación automática
sudo certbot renew --dry-run
```

#### 5. Automatización con PM2 (si necesitas servidor)
```bash
# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'combrok-api',
    script: './server.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};

# Iniciar con PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🔄 CI/CD y Automatización

### GitHub Actions

#### .github/workflows/deploy.yml
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test  # Cuando implementes tests
    
    - name: Build project
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: dist
        path: dist/

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### Deploy Hooks

#### Webhook para Auto-Deploy
```bash
# Webhook URL (ejemplo Vercel)
POST https://api.vercel.com/v1/integrations/deploy/QmX...

# Configurar en GitHub:
# Settings → Webhooks → Add webhook
# URL: [Vercel deploy hook URL]
# Content type: application/json
# Events: Just push
```

## 📊 Configuración de Analytics

### Plausible Analytics

#### En Producción
```html
<!-- Ya incluido en BaseLayout.astro -->
<script defer 
  data-domain="tu-dominio.com" 
  src="https://plausible.io/js/script.js">
</script>
```

#### Variables de Entorno
```bash
PLAUSIBLE_DOMAIN=tu-dominio.com
```

### Google Analytics (Alternativo)

#### Configuración
```html
<!-- En BaseLayout.astro -->
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Configuración de Seguridad

### Headers de Seguridad

#### En Vercel (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' plausible.io; style-src 'self' 'unsafe-inline'"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### Variables de Entorno Seguras

#### Producción
```bash
# Cambiar OBLIGATORIAMENTE
ADMIN_USERNAME=admin-super-secreto
ADMIN_PASSWORD=contraseña-compleja-123!@#

# JWT para sesiones
JWT_SECRET=clave-jwt-super-secreta-256-bits

# API Keys (si las usas)
SMTP_PASSWORD=password-smtp-seguro
ANALYTICS_API_KEY=key-analytics
```

## 📈 Optimización de Performance

### Build Optimizado

#### astro.config.mjs
```javascript
export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  
  // Optimizaciones
  build: {
    inlineStylesheets: 'auto',
    splitEntryChunks: true
  },
  
  // Compresión
  compressHTML: true,
  
  // Integrations optimizadas
  integrations: [
    tailwind({
      config: { applyBaseStyles: false }
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7
    })
  ],
  
  // Optimización de imágenes
  image: {
    domains: ['images.unsplash.com'],
    formats: ['webp', 'avif']
  }
});
```

### CDN y Caching

#### Cloudflare Setup
1. **Agregar sitio** a Cloudflare
2. **Configurar DNS** según provider
3. **Page Rules**:
   ```
   *.comunidadbroker.com/*
   Cache Level: Cache Everything
   Edge Cache TTL: 1 month
   ```

## ✅ Checklist Pre-Deploy

### Antes del Primer Deploy
- [ ] Variables de entorno configuradas
- [ ] Credenciales de admin cambiadas
- [ ] HTTPS configurado
- [ ] Analytics configurado
- [ ] Backup strategy definida
- [ ] Monitoring configurado

### Testing Pre-Producción
- [ ] Build exitoso sin errores
- [ ] Todas las páginas cargan correctamente
- [ ] Panel admin funcional
- [ ] Formularios trabajando
- [ ] Images loading correctly
- [ ] SEO meta tags correctos
- [ ] Performance audit pasado

### Post-Deploy
- [ ] DNS propagado correctamente
- [ ] SSL certificado activo
- [ ] Analytics recibiendo datos
- [ ] Sitemap accesible (/sitemap-index.xml)
- [ ] Robots.txt correcto (/robots.txt)
- [ ] Admin panel securizado

## 🚨 Troubleshooting Común

### Errores de Build
```bash
# Error: Module not found
npm install  # Reinstalar dependencias

# Error: Memory limit
npm run build -- --experimental-memory-limit=4096

# Error: Type checking
npm run build -- --no-check
```

### Problemas de Imágenes
```bash
# Imágenes no cargan
# Verificar que estén en public/images/
# Revisar paths (deben empezar con /)

# Error de optimización
# Verificar formatos soportados
# Comprobar tamaños de imagen
```

### Issues de Performance
```bash
# Lighthouse audit
npx lighthouse https://tu-sitio.com --view

# Bundle analyzer
npm run build -- --analyze

# Check unused CSS
npm install -g purgecss
purgecss --css dist/**/*.css --content dist/**/*.html
```

---

**Siguiente paso**: Consulta [SEO y Performance](./seo-performance.md) para optimizar tu sitio al máximo.