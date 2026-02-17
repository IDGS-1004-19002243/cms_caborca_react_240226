# Guía de Optimización de Imágenes - CMS Caborca

## 📋 Resumen Ejecutivo

Esta guía proporciona las especificaciones técnicas recomendadas para todas las imágenes del proyecto CMS Caborca, optimizadas para rendimiento web y calidad visual.

---

## 🎯 Recomendaciones Generales

### Formatos de Archivo Recomendados (en orden de prioridad):

1. **WebP** - Mejor opción (70-90% más ligero que JPG/PNG)
2. **AVIF** - Futuro del web (aún mejor que WebP, pero menos compatible)
3. **JPG/JPEG** - Para fotografías (fallback)
4. **PNG** - Solo para imágenes con transparencia
5. **SVG** - Para logos, iconos y gráficos vectoriales

### Límites Generales:
- **Peso máximo por imagen**: 200-300 KB (idealmente < 150 KB)
- **Peso máximo actual en código**: 1 MB (pero es demasiado alto)
- **Calidad recomendada**: 75-85% para JPG/WebP

---

## 📐 Especificaciones por Tipo de Imagen

### 1. **HERO IMAGES / BANNERS PRINCIPALES**

**Ubicación**: Inicio, Nosotros, Responsabilidad, Distribuidores, Contacto

**Especificaciones:**
```
Dimensiones: 1920 x 1080 px (Full HD)
Relación de aspecto: 16:9
Formato: WebP o JPG
Peso objetivo: 150-250 KB
Calidad: 80-85%
```

**Consideraciones:**
- Estas son las imágenes más grandes y visibles
- Usar compresión agresiva (80-85%) porque el overlay oscuro oculta artefactos
- Considerar lazy loading para imágenes below the fold
- Versiones responsive:
  - Desktop: 1920 x 1080 px
  - Tablet: 1024 x 576 px
  - Mobile: 768 x 432 px

**Ejemplo de código actual:**
```jsx
// EditarInicio.jsx - Hero Carousel
className="w-full h-[600px] object-cover"

// EditarNosotros.jsx - Hero
className="w-full h-[600px] object-cover"
```

---

### 2. **CAROUSEL / SLIDER IMAGES**

**Ubicación**: Página de Inicio (Carousel principal)

**Especificaciones:**
```
Dimensiones: 1920 x 1080 px
Relación de aspecto: 16:9
Formato: WebP
Peso objetivo: 120-180 KB por slide
Calidad: 75-80%
```

**Consideraciones:**
- Múltiples imágenes = mayor impacto en rendimiento
- Implementar lazy loading para slides no visibles
- Precargar solo el primer slide
- Usar srcset para responsive images

**Código actual:**
```jsx
// EditarInicio.jsx - Carousel
{contenido.carousel.map((slide, index) => (
  <img src={slide.imagen} className="w-full h-full object-cover" />
))}
```

---

### 3. **PRODUCT IMAGES / IMÁGENES DE PRODUCTOS**

**Ubicación**: Catálogos (Hombre, Mujer), Página de Inicio (Productos Destacados)

**Especificaciones:**
```
Dimensiones: 800 x 800 px (cuadradas)
Relación de aspecto: 1:1
Formato: WebP o JPG
Peso objetivo: 60-100 KB
Calidad: 80-85%
Fondo: Blanco o transparente (PNG si es necesario)
```

**Consideraciones:**
- Mantener consistencia en el fondo (preferiblemente blanco)
- Usar lazy loading
- Implementar placeholder mientras carga
- Versiones:
  - Thumbnail: 400 x 400 px (< 40 KB)
  - Vista normal: 800 x 800 px (< 100 KB)
  - Zoom/Detalle: 1200 x 1200 px (< 150 KB)

**Código actual:**
```jsx
// CatalogoHombre.jsx / CatalogoMujer.jsx
className="w-full h-64 object-cover"

// EditarInicio.jsx - Productos Destacados
className="w-full h-64 object-cover rounded-lg"
```

---

### 4. **SECTION IMAGES / IMÁGENES DE SECCIÓN**

**Ubicación**: Nosotros (Origen, Crecimiento), Responsabilidad (Compañía, Pieles, etc.)

**Especificaciones:**
```
Dimensiones: 1200 x 800 px
Relación de aspecto: 3:2
Formato: WebP o JPG
Peso objetivo: 100-150 KB
Calidad: 80%
```

**Consideraciones:**
- Estas imágenes acompañan texto
- No necesitan ser tan grandes como los heroes
- Usar lazy loading

**Código actual:**
```jsx
// EditarNosotros.jsx - Secciones
className="rounded-lg shadow-2xl"

// EditarResponsabilidad.jsx
className="w-full h-[500px] object-cover"
```

---

### 5. **BACKGROUND IMAGES / IMÁGENES DE FONDO**

**Ubicación**: Mantenimiento, 404, Secciones con overlay

**Especificaciones:**
```
Dimensiones: 1920 x 1080 px
Relación de aspecto: 16:9
Formato: WebP
Peso objetivo: 100-150 KB
Calidad: 70-75% (el overlay oscuro oculta compresión)
```

**Consideraciones:**
- Pueden tener compresión más agresiva por el overlay
- Usar blur o filtros para reducir peso
- Considerar usar gradientes CSS en lugar de imágenes cuando sea posible

**Código actual:**
```jsx
// EditarMantenimiento.jsx
className="absolute inset-0 w-full h-full object-cover"

// EditarNotFound.jsx
className="absolute inset-0 w-full h-full object-cover opacity-20"
```

---

### 6. **LOGOS E ICONOS**

**Ubicación**: Header, Footer, Distribuidores

**Especificaciones:**
```
Formato: SVG (preferido) o PNG con transparencia
Dimensiones SVG: Vectorial (escalable)
Dimensiones PNG: 
  - Logo principal: 300 x 100 px (< 20 KB)
  - Iconos: 64 x 64 px (< 10 KB)
Fondo: Transparente
```

**Consideraciones:**
- SVG es ideal para logos y iconos
- Mantener versiones en blanco y color
- Optimizar SVG con SVGO

**Código actual:**
```jsx
// Header.jsx
<img src="/logo.svg" alt="Caborca" className="h-12" />
```

---

### 7. **THUMBNAILS / MINIATURAS**

**Ubicación**: Carousel editor, Galería de distribuidores

**Especificaciones:**
```
Dimensiones: 320 x 180 px (16:9) o 200 x 200 px (1:1)
Formato: WebP
Peso objetivo: 15-30 KB
Calidad: 70-75%
```

**Consideraciones:**
- Generar automáticamente desde imagen original
- Usar para previews en el CMS

**Código actual:**
```jsx
// EditarInicio.jsx - Carousel thumbnails
<img src={s.imagen} className="w-32 h-16 object-cover rounded" />
```

---

## 🛠️ Herramientas Recomendadas

### Compresión y Optimización:

1. **TinyPNG / TinyJPG** (https://tinypng.com/)
   - Excelente para compresión con pérdida mínima
   - Soporta PNG y JPG
   - API disponible para automatización

2. **Squoosh** (https://squoosh.app/)
   - Herramienta de Google
   - Convierte a WebP, AVIF
   - Comparación visual lado a lado
   - **MUY RECOMENDADO**

3. **ImageOptim** (Mac) / **FileOptimizer** (Windows)
   - Compresión por lotes
   - Sin pérdida de calidad visible

4. **Sharp** (Node.js)
   - Para automatización en el servidor
   - Genera múltiples tamaños
   - Convierte formatos

### Conversión a WebP:

```bash
# Usando cwebp (Google)
cwebp -q 80 input.jpg -o output.webp

# Usando ImageMagick
convert input.jpg -quality 80 output.webp

# Usando Sharp (Node.js)
const sharp = require('sharp');
sharp('input.jpg')
  .webp({ quality: 80 })
  .toFile('output.webp');
```

---

## 📊 Tabla Resumen Rápida

| Tipo de Imagen | Dimensiones | Formato | Peso Max | Calidad |
|----------------|-------------|---------|----------|---------|
| Hero/Banner | 1920x1080 | WebP/JPG | 250 KB | 80-85% |
| Carousel | 1920x1080 | WebP | 180 KB | 75-80% |
| Producto | 800x800 | WebP/JPG | 100 KB | 80-85% |
| Sección | 1200x800 | WebP/JPG | 150 KB | 80% |
| Fondo | 1920x1080 | WebP | 150 KB | 70-75% |
| Logo | SVG/PNG | SVG/PNG | 20 KB | - |
| Thumbnail | 320x180 | WebP | 30 KB | 70-75% |

---

## ✅ Checklist de Optimización

Antes de subir una imagen al CMS, verifica:

- [ ] ¿Está en el formato correcto? (WebP preferido)
- [ ] ¿Tiene las dimensiones adecuadas? (no más grande de lo necesario)
- [ ] ¿Pesa menos del límite recomendado?
- [ ] ¿La calidad visual es aceptable?
- [ ] ¿Tiene el nombre descriptivo? (ej: `hero-inicio-botas.webp`)
- [ ] ¿Está comprimida? (usar TinyPNG o Squoosh)

---

## 🚀 Implementación de Lazy Loading

Para mejorar el rendimiento, considera implementar lazy loading:

```jsx
// Ejemplo con loading="lazy" nativo
<img 
  src={imagen} 
  loading="lazy" 
  alt="Descripción"
  className="w-full h-full object-cover"
/>

// Ejemplo con React Lazy Load Image Component
import { LazyLoadImage } from 'react-lazy-load-image-component';

<LazyLoadImage
  src={imagen}
  alt="Descripción"
  effect="blur"
  placeholderSrc={thumbnailUrl}
/>
```

---

## 📱 Responsive Images con srcset

Para servir diferentes tamaños según el dispositivo:

```jsx
<img
  src="imagen-1920.webp"
  srcSet="
    imagen-768.webp 768w,
    imagen-1024.webp 1024w,
    imagen-1920.webp 1920w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px"
  alt="Descripción"
  loading="lazy"
/>
```

---

## 🎨 Consideraciones de Diseño

### Colores y Contraste:
- Asegurar que el texto sobre imágenes sea legible
- Usar overlays oscuros (bg-black/40) para mejorar contraste
- Mantener consistencia en el estilo fotográfico

### Composición:
- Dejar espacio para texto en heroes (regla de tercios)
- Evitar elementos importantes en los bordes
- Mantener el sujeto principal centrado o en puntos focales

### Branding:
- Mantener paleta de colores consistente con Caborca
- Usar filtros/presets similares para todas las fotos
- Evitar marcas de agua visibles

---

## 🔧 Actualización del Código

### Modificación Recomendada en el Límite de Tamaño:

Actualmente el código tiene un límite de 1 MB, que es muy alto:

```jsx
// ACTUAL (en varios archivos)
if (file.size > 1024 * 1024) {
  toastError('El archivo excede 1 MB. Elige una imagen más pequeña');
  return;
}

// RECOMENDADO
if (file.size > 300 * 1024) { // 300 KB
  toastError('El archivo excede 300 KB. Por favor, comprime la imagen primero.');
  return;
}
```

### Validación de Dimensiones:

Agregar validación de dimensiones para asegurar calidad:

```jsx
const validateImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => {
        // Validar dimensiones mínimas
        if (img.width < 800 || img.height < 600) {
          reject('La imagen es muy pequeña. Mínimo 800x600 px');
        }
        // Validar dimensiones máximas
        if (img.width > 3840 || img.height > 2160) {
          reject('La imagen es muy grande. Máximo 3840x2160 px');
        }
        resolve(true);
      };
    };
    
    reader.readAsDataURL(file);
  });
};
```

---

## 📈 Impacto en Rendimiento

### Antes de Optimizar:
- Hero image: ~2 MB
- 5 productos: ~1.5 MB
- Total página: ~4-5 MB
- Tiempo de carga: 8-12 segundos (3G)

### Después de Optimizar:
- Hero image: ~150 KB
- 5 productos: ~400 KB
- Total página: ~800 KB - 1 MB
- Tiempo de carga: 2-3 segundos (3G)

**Mejora: 80-85% reducción en peso total**

---

## 🎓 Recursos Adicionales

- [Web.dev - Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebP Documentation](https://developers.google.com/speed/webp)
- [Responsive Images Guide](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

---

## 💡 Tips Finales

1. **Siempre comprime antes de subir** - No confíes en que el navegador lo hará
2. **Usa WebP cuando sea posible** - Es el estándar moderno
3. **Mantén un backup de originales** - Por si necesitas regenerar
4. **Prueba en dispositivos reales** - No solo en desktop
5. **Monitorea el rendimiento** - Usa Lighthouse regularmente
6. **Automatiza cuando puedas** - Scripts para redimensionar/comprimir
7. **Educa a los usuarios del CMS** - Proporciona esta guía

---

**Última actualización**: Febrero 2026
**Versión**: 1.0
**Autor**: Sistema CMS Caborca
