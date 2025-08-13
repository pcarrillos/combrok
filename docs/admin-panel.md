# 🎛️ Panel Administrativo

Guía completa del panel de administración de **Comunidad Broker** para gestionar todo el contenido y configuración del sitio.

## 🚪 Acceso al Panel

### URL de Acceso
```
http://localhost:4321/_admin          # Desarrollo
https://tudominio.com/_admin          # Producción
```

### Credenciales Predeterminadas
```
Usuario: admin
Contraseña: combrok2024
```

⚠️ **IMPORTANTE**: Cambia estas credenciales en producción editando las variables de entorno.

## 🏠 Dashboard Principal

### Elementos del Dashboard

#### 📊 Estadísticas Generales
- **Total de artículos** (publicados, borradores, programados)
- **Total de brokers** analizados
- **Brokers recomendados** vs. alto riesgo
- **Actividad reciente** del sitio

#### ⚡ Acciones Rápidas
- **Nuevo Post**: Crear artículo directamente
- **Nuevo Broker**: Agregar análisis de broker
- **Gestión de Medios**: Subir y organizar imágenes
- **Analytics**: Ver estadísticas del sitio

#### 📈 Widgets de Información
- **Posts Recientes**: Últimos 5 artículos editados
- **Posts Programados**: Contenido futuro pendiente
- **Estado del Sistema**: Versión, última actualización

### Navegación Principal
```
Dashboard
├── Posts
│   ├── Todos los Posts
│   ├── Nuevo Post
│   └── Categorías
├── Brokers
│   ├── Todos los Brokers
│   ├── Nuevo Broker
│   └── Comparativas
├── Medios
│   ├── Biblioteca
│   └── Subir Archivos
├── Autores
│   ├── Gestionar Autores
│   └── Nuevo Autor
├── Analytics
│   ├── Tráfico
│   ├── Posts Populares
│   └── Conversiones
└── Configuración
    ├── Sitio
    ├── SEO
    └── Usuarios
```

## 📝 Gestión de Posts

### Vista de Lista de Posts

#### Información Mostrada
| Columna | Descripción |
|---------|-------------|
| **Título** | Título del post + preview |
| **Autor** | Autor asignado |
| **Categoría** | Categoría principal |
| **Estado** | draft/scheduled/published |
| **Fecha** | Publicación o actualización |
| **Acciones** | Editar, Duplicar, Eliminar |

#### Filtros Disponibles
```bash
# Filtros de estado
✓ Todos los posts
✓ Publicados
✓ Borradores  
✓ Programados

# Filtros de categoría
✓ Noticias
✓ Análisis
✓ Educación
✓ Alertas

# Filtros de autor
✓ Por autor específico
✓ Posts sin autor

# Búsqueda
✓ Por título
✓ Por contenido
✓ Por etiquetas
```

#### Acciones en Masa
- **Publicar** múltiples borradores
- **Cambiar categoría** de varios posts
- **Eliminar** selección múltiple
- **Exportar** a diferentes formatos

### Editor de Posts

#### Interfaz del Editor

**Barra Superior**:
```
[Guardar Borrador] [Vista Previa] [Publicar] [Configuración ⚙️]
```

**Panel Principal** (70% ancho):
- **Título**: Campo principal con contador de caracteres
- **Editor de contenido**: Markdown con preview en tiempo real
- **Tags**: Input con autocompletado

**Panel Lateral** (30% ancho):
- **Estado y Visibilidad**
- **Programación**
- **Categorías y Tags**
- **Imagen Destacada**
- **SEO Avanzado**

#### Características del Editor

##### Editor de Markdown
```markdown
# Funcionalidades incluidas:

## Formato de Texto
**Negrita**, *cursiva*, ~~tachado~~

## Listas
- Elemento 1
- Elemento 2
  - Subelemento

## Enlaces y Referencias
[Texto del enlace](https://ejemplo.com)

## Imágenes
![Alt text](ruta/imagen.jpg)

## Tablas
| Columna 1 | Columna 2 |
|-----------|-----------|
| Dato 1    | Dato 2    |

## Citas
> Esta es una cita importante

## Código
```código aquí```
```

##### Atajos de Teclado
```
Ctrl + B    = Negrita
Ctrl + I    = Cursiva
Ctrl + K    = Enlace
Ctrl + S    = Guardar
Ctrl + P    = Vista previa
Tab         = Sangría
Shift + Tab = Quitar sangría
```

#### Panel de Configuración de Post

##### Estado y Visibilidad
```yaml
Estado:
  - Borrador (draft)
  - Programado (scheduled)  
  - Publicado (published)

Visibilidad:
  - Público
  - Privado
  - Protegido por contraseña

Opciones:
  - Permitir comentarios
  - Permitir pingbacks
  - Destacar en homepage
```

##### Programación
```yaml
Publicar:
  - Inmediatamente
  - Programar para fecha específica
  - Guardar como borrador

Fecha de Publicación:
  - Selector de fecha/hora
  - Zona horaria automática
  - Vista previa de fecha de publicación
```

##### SEO Avanzado
```yaml
Título SEO:
  - Campo personalizable
  - Contador de caracteres (60 máx)
  - Preview de Google

Meta Descripción:
  - 140-160 caracteres recomendados
  - Preview snippet
  - Análisis de palabras clave

URL Slug:
  - Generado automáticamente
  - Editable manualmente
  - Validación de duplicados

Configuración Avanzada:
  - URL canónica
  - Noindex/Nofollow
  - Meta robots personalizados
```

##### Imagen Destacada
```yaml
Subida de Imagen:
  - Drag & drop
  - Selector de archivos
  - Biblioteca de medios

Configuración:
  - Alt text (obligatorio)
  - Título de imagen
  - Descripción/Caption
  - Créditos

Optimización:
  - Redimensionado automático
  - Compresión WebP
  - Diferentes tamaños generados
```

## 🏢 Gestión de Brokers

### Vista de Lista de Brokers

#### Información Mostrada
| Campo | Descripción |
|-------|-------------|
| **Logo + Nombre** | Identidad visual del broker |
| **País de Origen** | Jurisdicción principal |
| **Regulación** | Estado regulatorio + entidades |
| **Rating** | Puntuación sobre 5 estrellas |
| **Trust Score** | Puntuación de confianza (0-100) |
| **Nivel de Riesgo** | Low/Medium/High/Extreme |
| **Última Revisión** | Fecha de última actualización |

#### Filtros de Brokers
```bash
# Por estado regulatorio
✓ Solo regulados
✓ No regulados
✓ Regulación dudosa

# Por nivel de riesgo
✓ Bajo riesgo (recomendados)
✓ Riesgo medio
✓ Alto riesgo
✓ Lista negra

# Por instrumentos
✓ Forex
✓ CFDs
✓ Criptomonedas
✓ Acciones

# Por región
✓ Europa
✓ Asia-Pacífico
✓ Américas
✓ Offshore
```

#### Categorización Automática
Los brokers se organizan automáticamente:

```yaml
Recomendados:
  - Rating > 4.0
  - Trust Score > 70
  - Risk Level: "low"
  - Regulación verificada

Otros Brokers:
  - Rating 3.0-4.0
  - Trust Score 50-70
  - Risk Level: "medium"

Alto Riesgo:
  - Scam Alert: true
  - Blacklisted: true
  - Risk Level: "high" o "extreme"
```

### Editor de Brokers

#### Secciones del Formulario

##### 1. Información Básica
```yaml
Datos Principales:
  - Nombre del broker
  - Logo (upload)
  - Sitio web oficial
  - Año de fundación
  - Empresa matriz

Ubicación:
  - País de origen
  - Sede principal
  - Países donde opera
  - Países restringidos
  - Idiomas soportados
```

##### 2. Regulación y Licencias
```yaml
Por cada regulador:
  - Entidad reguladora (FCA, CySEC, etc.)
  - País de la regulación
  - Número de licencia
  - Estado de verificación
  - URL de verificación
  - Fecha de verificación

Estado General:
  - ¿Está regulado? (Sí/No)
  - Nivel de confianza regulatoria
  - Notas sobre regulación
```

##### 3. Instrumentos y Mercados
```yaml
Disponibilidad por Categoría:
  ✓ Forex (pares de divisas)
  ✓ Acciones (CFDs)
  ✓ Índices bursátiles
  ✓ Commodities (oro, petróleo)
  ✓ Criptomonedas
  ✓ ETFs
  ✓ Bonos
  ✓ Opciones
  ✓ Futuros

Detalles:
  - Número total de mercados
  - Pares de forex específicos
  - Criptos disponibles
```

##### 4. Plataformas de Trading
```yaml
Por cada plataforma:
  - Nombre (MT4, MT5, cTrader, propia)
  - Tipo (desktop, web, mobile, API)
  - ¿Es plataforma personalizada?
  - Características especiales
  - Disponibilidad por región

Tecnología:
  - Tipo de ejecución (ECN, STP, MM)
  - Velocidad promedio de ejecución
  - Servidores VPS disponibles
```

##### 5. Condiciones de Trading
```yaml
Costos:
  - Depósito mínimo
  - Apalancamiento máximo
  - Spreads desde (pips)
  - Spread promedio
  - Tipo de comisión
  - Detalles de comisiones

Límites:
  - Tamaño mínimo de posición
  - Tamaño máximo de posición
  - Límites de apalancamiento por instrumento
```

##### 6. Depósitos y Retiros
```yaml
Métodos de Depósito:
  - Lista de métodos disponibles
  - Comisiones por método
  - Límites mínimos/máximos
  - Tiempos de procesamiento

Métodos de Retiro:
  - Lista de métodos disponibles
  - Comisiones por retiro
  - Límites y restricciones
  - Tiempos de procesamiento

Políticas:
  - Verificación KYC requerida
  - Restricciones geográficas
  - Políticas anti-lavado
```

##### 7. Tipos de Cuenta
```yaml
Cuentas Disponibles:
  - Nombres de tipos de cuenta
  - Características de cada tipo
  - Requisitos mínimos

Características Especiales:
  ✓ Cuenta demo disponible
  ✓ Cuenta islámica (swap-free)
  ✓ Copy trading
  ✓ Social trading
  ✓ Centro educativo
```

##### 8. Evaluación y Scoring
```yaml
Puntuaciones:
  - Rating general (1-5 estrellas)
  - Trust Score (0-100)
  - Número de reviews de usuarios

Pros y Contras:
  - Lista de ventajas
  - Lista de desventajas
  - Análisis equilibrado

Nivel de Riesgo:
  - Low: Recomendado y seguro
  - Medium: Aceptable con limitaciones  
  - High: Riesgoso, usar con precaución
  - Extreme: Evitar completamente
```

##### 9. Soporte al Cliente
```yaml
Canales de Soporte:
  ✓ Live chat
  ✓ Teléfono
  ✓ Email
  ✓ Oficina local

Disponibilidad:
  - ¿24/7?
  - Horarios específicos
  - Calidad del soporte (poor/average/good/excellent)
  - Idiomas soportados
```

##### 10. Alertas y Advertencias
```yaml
Sistema de Alertas:
  - Advertencias específicas (array)
  - ¿Alerta de estafa? (Sí/No)
  - ¿En lista negra? (Sí/No)
  - Número de quejas registradas
  - Fuentes de las alertas

Investigación:
  - Verificaciones realizadas
  - Fuentes consultadas
  - Última actualización de datos
```

#### Auto-cálculo de Métricas

El sistema calcula automáticamente:

```javascript
// Trust Score basado en múltiples factores
Trust Score = (
  regulationScore * 0.4 +
  userReviewsScore * 0.2 + 
  platformStabilityScore * 0.15 +
  supportQualityScore * 0.15 +
  transparencyScore * 0.1
)

// Rating general
Rating = promedio ponderado de todas las categorías

// Risk Level automático
if (scamAlert || blacklisted) riskLevel = "extreme"
else if (trustScore < 30) riskLevel = "high"  
else if (trustScore < 60) riskLevel = "medium"
else riskLevel = "low"
```

## 👥 Gestión de Autores

### Lista de Autores
- **Vista de tarjetas** con avatar y datos básicos
- **Filtros**: Activos, inactivos, por rol
- **Estadísticas**: Posts por autor, engagement

### Editor de Autor
```json
{
  "name": "Nombre Completo",
  "bio": "Biografía profesional (200-500 caracteres)",
  "avatar": "/images/authors/avatar.jpg",
  "role": "Analista Senior / Editor / Colaborador",
  "social": {
    "twitter": "https://twitter.com/usuario",
    "linkedin": "https://linkedin.com/in/usuario", 
    "email": "autor@email.com",
    "website": "https://website-personal.com"
  },
  "active": true,
  "expertise": ["Forex", "Análisis Técnico", "Criptomonedas"],
  "joinDate": "2024-01-15T00:00:00.000Z",
  "totalPosts": 45,
  "bio_extended": "Biografía extendida para página de autor..."
}
```

## 🖼️ Gestión de Medios

### Biblioteca de Medios

#### Vista Principal
- **Grid de imágenes** con thumbnails
- **Información**: Nombre, tamaño, fecha, uso
- **Filtros**: Por tipo, fecha, uso
- **Búsqueda**: Por nombre o alt text

#### Subida de Archivos
```yaml
Métodos de Subida:
  - Drag & drop múltiple
  - Selector de archivos
  - URL externa

Formatos Soportados:
  - Imágenes: JPG, PNG, WebP, SVG
  - Documentos: PDF
  - Máximo: 10MB por archivo

Procesamiento Automático:
  - Redimensionado inteligente
  - Compresión automática
  - Generación de múltiples tamaños
  - Conversión a WebP
```

#### Organización
```
Estructura Automática:
/images/
├── /posts/2024/01/
├── /brokers/
├── /authors/
├── /general/
└── /uploads/[año]/[mes]/
```

#### Metadatos de Imagen
- **Alt text** (obligatorio para SEO)
- **Título** de imagen
- **Descripción/Caption**
- **Créditos/Fuente**
- **Tags** de categorización

### Optimización Automática

#### Procesamiento en Subida
1. **Validación**: Formato, tamaño, seguridad
2. **Redimensionado**: Multiple breakpoints
3. **Compresión**: Optimización de calidad
4. **Conversión**: WebP para browsers compatibles
5. **Indexación**: Metadatos para búsqueda

#### Tamaños Generados
```yaml
Para Posts:
  - Original: Máximo 1920px ancho
  - Large: 1200px (para contenido)
  - Medium: 800px (para grid)
  - Small: 400px (para thumbnails)
  - Thumbnail: 150px (para admin)

Para Logos:
  - Original: 200x200px
  - Small: 100x100px
  - Icon: 50x50px
```

## 📊 Analytics y Métricas

### Dashboard de Analytics

#### Métricas Principales
```yaml
Tráfico:
  - Visitantes únicos (día/semana/mes)
  - Páginas vistas totales
  - Tiempo promedio en sitio
  - Tasa de rebote

Contenido:
  - Posts más populares
  - Categorías más visitadas
  - Búsquedas internas
  - Downloads/shares

Conversiones:
  - Clicks en enlaces de brokers
  - Registros de newsletter
  - Tiempo de lectura promedio
  - Engagement por post
```

#### Reportes Disponibles
- **Reporte semanal** automático
- **Análisis mensual** de tendencias
- **Comparativas** período anterior
- **Exportación** a CSV/PDF

### Integración con Plausible

#### Configuración
```javascript
// Ya incluido en BaseLayout.astro
<script defer 
  data-domain="comunidadbroker.com" 
  src="https://plausible.io/js/script.js">
</script>
```

#### Eventos Personalizados
```javascript
// Tracking de interacciones importantes
plausible('Broker Click', {
  props: { broker: 'IC Markets', page: 'Analysis' }
});

plausible('Newsletter Signup', {
  props: { source: 'Footer CTA' }
});
```

## ⚙️ Configuración del Sistema

### Configuración General

#### Información del Sitio
```yaml
Datos Básicos:
  - Nombre del sitio
  - Descripción meta
  - URL principal
  - Email de contacto
  - Timezone

SEO Global:
  - Título por defecto
  - Descripción por defecto
  - Imagen OG por defecto
  - Twitter Card tipo
```

#### Configuración de Posts
```yaml
Opciones por Defecto:
  - Autor predeterminado
  - Categoría por defecto
  - Estado inicial (draft/published)
  - Comentarios habilitados
  - Pingbacks habilitados

Formato de URLs:
  - Estructura de permalinks
  - Prefijos de categoría
  - Sufijos de página
```

### Gestión de Usuarios

#### Roles y Permisos
```yaml
Administrador:
  - Acceso completo
  - Gestión de usuarios
  - Configuración del sistema

Editor:
  - Crear/editar posts
  - Gestionar medios
  - Moderar comentarios

Autor:
  - Crear posts propios
  - Editar posts propios
  - Subir medios

Colaborador:
  - Crear borradores
  - Sugerir ediciones
  - Sin publicación directa
```

#### Seguridad
```yaml
Autenticación:
  - Sesiones con expiración
  - Logout automático
  - Protección CSRF

Contraseñas:
  - Mínimo 8 caracteres
  - Complejidad requerida
  - Cambio periódico sugerido

Auditoría:
  - Log de accesos
  - Historial de cambios
  - IP tracking
```

## 🔐 Seguridad del Panel

### Medidas de Protección

#### Acceso
- **URL no estándar** (/_admin en lugar de /admin)
- **Autenticación obligatoria** en todas las páginas
- **Sesión con timeout** automático
- **IP whitelisting** (configurable)

#### Datos
- **Sanitización** de inputs
- **Validación** de formularios
- **Escape** de outputs
- **CSRF protection** en formularios

### Mejores Prácticas

#### Para Producción
```yaml
Obligatorio:
  - Cambiar credenciales por defecto
  - HTTPS únicamente
  - Backup automático
  - Monitoring de seguridad

Recomendado:
  - 2FA para administradores
  - IP restrictions
  - Rate limiting
  - Security headers
```

#### Backup de Contenido
```bash
# El contenido está en Git por defecto
git add .
git commit -m "Backup contenido"
git push origin main

# Backup adicional de imágenes
rsync -av public/images/ backup/images/
```

## 🚀 Flujo de Trabajo Recomendado

### Rutina Diaria
1. **Check del dashboard** - Estado general
2. **Revisar comentarios** - Moderación pendiente  
3. **Verificar analytics** - Métricas del día anterior
4. **Gestionar contenido** - Publicar posts programados

### Rutina Semanal
1. **Planificación editorial** - Contenido de la semana
2. **Análisis de performance** - Posts más exitosos
3. **Backup completo** - Seguridad de datos
4. **Actualización de brokers** - Reviews periódicas

### Rutina Mensual
1. **Reporte completo** - Analytics y métricas
2. **Auditoría de contenido** - Actualizar posts antiguos
3. **Revisión de SEO** - Optimizaciones necesarias
4. **Planificación estratégica** - Objetivos del siguiente mes

---

**Siguiente paso**: Consulta la [Arquitectura del Sistema](./architecture.md) para entender cómo funciona todo por debajo.