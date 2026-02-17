# Estándar Universal de Imágenes - CMS Caborca

## 🎯 Filosofía: "Una Regla para Todas"

Para simplificar el proceso y mantener consistencia, usaremos **UN SOLO ESTÁNDAR** para la mayoría de las imágenes del sitio.

---

## ⭐ ESTÁNDAR UNIVERSAL RECOMENDADO

### Para el 90% de las imágenes del sitio:

```
📐 Dimensiones: 1920 x 1080 px (Full HD)
📦 Formato: WebP
⚖️ Peso máximo: 200 KB
🎨 Calidad: 80%
📏 Relación de aspecto: 16:9
```

### ¿Por qué este estándar?

1. **1920x1080** es Full HD - se ve bien en cualquier pantalla moderna
2. **WebP** reduce el peso 70-90% vs JPG
3. **200 KB** es un buen balance entre calidad y velocidad
4. **80% calidad** es imperceptible al ojo humano
5. **16:9** es el ratio más común en web

---

## 📋 Reglas Simples por Categoría

### 1. **IMÁGENES GRANDES** (Heroes, Banners, Fondos)
```
✅ Usar el estándar universal: 1920x1080, WebP, 200KB
```

### 2. **IMÁGENES DE PRODUCTOS**
```
✅ Dimensiones: 1000 x 1000 px (cuadradas)
✅ Formato: WebP
✅ Peso: 100 KB máximo
✅ Fondo: Blanco puro (#FFFFFF)
```

### 3. **LOGOS E ICONOS**
```
✅ Formato: SVG (siempre que sea posible)
✅ Si no es SVG: PNG con transparencia
✅ Tamaño: 512 x 512 px
✅ Peso: 50 KB máximo
```

---

## 🛠️ Proceso de 3 Pasos para Cualquier Imagen

### Paso 1: Redimensionar
Usa cualquier herramienta para ajustar al tamaño correcto:
- **Photoshop**: Image > Image Size
- **GIMP** (gratis): Image > Scale Image
- **Online**: https://www.iloveimg.com/resize-image

### Paso 2: Convertir a WebP
Usa **Squoosh** (https://squoosh.app/):
1. Arrastra tu imagen
2. Selecciona "WebP" en el panel derecho
3. Ajusta calidad a 80%
4. Descarga

### Paso 3: Verificar Peso
- Si pesa más de 200 KB, reduce la calidad a 75% o 70%
- Si pesa menos de 100 KB, ¡perfecto!

---

## 📊 Tabla de Referencia Rápida

| Tipo | Tamaño | Formato | Peso | Uso |
|------|--------|---------|------|-----|
| **Hero/Banner** | 1920x1080 | WebP | 200KB | Imágenes principales de cada página |
| **Producto** | 1000x1000 | WebP | 100KB | Catálogos, productos destacados |
| **Logo** | 512x512 | SVG/PNG | 50KB | Header, footer, iconos |
| **Cualquier otra** | 1920x1080 | WebP | 200KB | Default para todo lo demás |

---

## ✅ Checklist Ultra-Simple

Antes de subir CUALQUIER imagen:

1. [ ] ¿Es 1920x1080? (o 1000x1000 si es producto, o SVG si es logo)
2. [ ] ¿Es WebP?
3. [ ] ¿Pesa menos de 200 KB?
4. [ ] ¿Se ve bien visualmente?

**Si respondiste SÍ a todo, ¡súbela!**

---

## 🎨 Herramienta Única Recomendada

### **Squoosh** (https://squoosh.app/)

**¿Por qué solo esta?**
- Hace TODO: redimensiona, convierte, comprime
- Es gratis y online (no necesitas instalar nada)
- De Google (confiable)
- Muestra comparación visual
- Funciona en cualquier navegador

**Configuración estándar en Squoosh:**
```
1. Resize: 1920 x 1080 (o el tamaño que necesites)
2. Format: WebP
3. Quality: 80
4. Effort: 4 (balance)
```

---

## 📝 Convención de Nombres

Para mantener orden, usa este formato:

```
[seccion]-[descripcion]-[numero].webp
```

**Ejemplos:**
- `hero-inicio-botas-vaqueras.webp`
- `producto-bota-hombre-01.webp`
- `nosotros-fabrica-exterior.webp`
- `responsabilidad-pieles-proceso.webp`

**Reglas:**
- Todo en minúsculas
- Sin espacios (usa guiones)
- Sin acentos ni ñ
- Descriptivo pero corto

---

## 🚀 Automatización (Opcional pero Recomendado)

Si vas a procesar muchas imágenes, puedes crear un script simple:

### Script de Bash (Mac/Linux):

```bash
#!/bin/bash
# Convierte todas las imágenes JPG/PNG a WebP optimizado

for img in *.{jpg,jpeg,png}; do
  [ -f "$img" ] || continue
  filename="${img%.*}"
  cwebp -q 80 -resize 1920 1080 "$img" -o "${filename}.webp"
  echo "Convertido: ${filename}.webp"
done
```

### Script de PowerShell (Windows):

```powershell
# Requiere cwebp instalado
Get-ChildItem -Filter *.jpg,*.png | ForEach-Object {
    $output = $_.BaseName + ".webp"
    & cwebp -q 80 -resize 1920 1080 $_.FullName -o $output
    Write-Host "Convertido: $output"
}
```

---

## 💾 Organización de Archivos

Mantén tus imágenes organizadas en carpetas:

```
/assets/images/
  ├── heroes/          # Imágenes hero de cada página
  ├── productos/       # Imágenes de productos
  ├── secciones/       # Imágenes de secciones (nosotros, responsabilidad)
  ├── logos/           # Logos e iconos
  └── originales/      # IMPORTANTE: Guarda aquí los originales sin procesar
```

**⚠️ IMPORTANTE:** Siempre guarda una copia de las imágenes originales en alta resolución. Nunca sabes cuándo las necesitarás.

---

## 🎯 Casos Especiales

### ¿Qué pasa si necesito una imagen más grande?

**Respuesta:** Casi nunca lo necesitarás. 1920x1080 es suficiente para el 99% de los casos. Si realmente necesitas más:
- Máximo absoluto: 2560 x 1440 px
- Peso máximo: 300 KB
- Usa calidad 75% en lugar de 80%

### ¿Qué pasa si mi imagen original es más pequeña?

**Respuesta:** NO la agrandes. Usa el tamaño original si es menor a 1920x1080. Agrandar imágenes las hace ver borrosas.

### ¿Puedo usar JPG en lugar de WebP?

**Respuesta:** Sí, pero solo como último recurso. WebP es mucho mejor. Si usas JPG:
- Calidad: 85%
- Peso objetivo: 250 KB máximo
- Considera que pesará 2-3x más que WebP

---

## 📱 Responsive: ¿Necesito Múltiples Tamaños?

**Respuesta corta:** No, por ahora.

**Respuesta larga:** El navegador redimensionará automáticamente. Si en el futuro quieres optimizar más:

1. **Desktop**: 1920x1080 (200KB)
2. **Tablet**: 1024x576 (80KB)
3. **Mobile**: 768x432 (50KB)

Pero esto es optimización avanzada. Empieza con un solo tamaño.

---

## 🔍 Validación de Calidad

Después de comprimir, verifica:

1. **Zoom al 100%** - ¿Se ve nítida?
2. **Zoom al 200%** - ¿Los bordes están definidos?
3. **En móvil** - ¿Se carga rápido?

Si algo se ve mal, sube la calidad a 85% y vuelve a intentar.

---

## 📈 Métricas de Éxito

Tu sitio está bien optimizado si:

- ✅ Página de inicio carga en < 3 segundos (3G)
- ✅ Ninguna imagen pesa más de 200 KB
- ✅ Score de Lighthouse > 90 en Performance
- ✅ Total de imágenes por página < 2 MB

---

## 🎓 Recursos Mínimos Necesarios

Solo necesitas estas 2 herramientas:

1. **Squoosh** (https://squoosh.app/) - Para todo el procesamiento
2. **Google PageSpeed Insights** (https://pagespeed.web.dev/) - Para verificar rendimiento

---

## 💡 Regla de Oro

> **"Si dudas, usa 1920x1080 WebP a 80% de calidad"**

Esta configuración funciona para el 90% de los casos.

---

## 🚨 Errores Comunes a Evitar

❌ **NO HAGAS ESTO:**
- Subir imágenes directamente de la cámara (pesan 5-10 MB)
- Usar PNG para fotografías (pesa 3-5x más que WebP)
- Agregar imágenes más grandes "por si acaso"
- Olvidar comprimir antes de subir

✅ **HAZ ESTO:**
- Siempre procesa con Squoosh primero
- Usa WebP para todo (excepto logos con transparencia)
- Usa el tamaño exacto que necesitas
- Verifica el peso antes de subir

---

## 📋 Template de Configuración Squoosh

Copia y pega esta configuración cada vez:

```
Resize:
  Width: 1920
  Height: 1080
  Method: Lanczos3
  
Compress:
  Format: WebP
  Quality: 80
  Effort: 4
  
Advanced:
  ☑ Reduce palette (if applicable)
  ☑ Lossless
```

---

## 🎯 Resumen en 3 Líneas

1. **Tamaño**: 1920x1080 para todo (1000x1000 para productos)
2. **Formato**: WebP siempre
3. **Herramienta**: Squoosh a 80% de calidad

**¡Eso es todo!** 🎉

---

**Última actualización**: Febrero 2026  
**Versión**: 2.0 - Estándar Simplificado  
**Autor**: Sistema CMS Caborca
