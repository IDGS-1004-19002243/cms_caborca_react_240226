# Análisis de Arquitectura de Base de Datos y Estrategia de Despliegue

Este documento define la estructura final de la base de datos para el CMS Caborca, integrando la funcionalidad de "Despliegue" (Deploy) y garantizando la integridad de los datos multilingües.

## 1. Estrategia de Despliegue (Draft vs. Live)

El sistema funcionará bajo un modelo de **Edición (Relacional) vs. Publicación (Documental/Snapshot)**. Esto permite una edición estructurada y robusta en el CMS, y una lectura ultrarrápida en el sitio web público.

### A. Entorno de Edición (CMS - "Draft")
El CMS interactúa con **Tablas Relacionales Normalizadas**.
- **Propósito:** Garantizar la integridad de los datos, relaciones (Foreign Keys) y tipos de datos correctos durante la edición.
- **Estado:** Estos datos representan el "Borrador". Los cambios aquí **NO** se ven inmediatamente en el sitio público.
- **Tablas:** `Productos`, `HomeSecciones`, `SeccionNosotros`, `ConfiguracionSitio`, etc.

### B. Entorno de Publicación (Portafolio - "Live")
El Sitio Web lee de una tabla unificada de **Contenido Publicado**.
- **Propósito:** Rendimiento y desacoplamiento. El sitio web no necesita hacer 10 JOINS para armar el Home; solo lee un registro JSON pre-procesado.
- **Estado:** Representa la versión "En Vivo".
- **Tabla:** `Publicaciones` (Clave, JSON, Fecha).

### C. Proceso de Despliegue (El "Botón Mágico")
Cuando el administrador presiona "Desplegar" en el CMS:
1.  El Backend (.NET) lee los datos de las Tablas Relacionales ("Draft").
2.  Procesa y serializa estos datos a un JSON optimizado (DTO).
3.  Inserta/Actualiza este JSON en la tabla `Publicaciones` con la clave correspondiente (ej: `HOME_CONTENT`, `CATALOGO_HOMBRE`).
4.  El sitio web consume este JSON directamente.

---

## 2. Mapa de Tablas (Schema Definition)

### Módulo: Sistema
| Tabla | Descripción |
|-------|-------------|
| `Usuarios` | Acceso al CMS (Admin/Editor). |
| `BitacoraDespliegues` | Historial de quién desplegó qué y cuándo. |

### Módulo: Configuración Global
| Tabla | Descripción |
|-------|-------------|
| `ConfiguracionSitio` | Datos de contacto, teléfonos y textos del mapa (Multilingüe). |
| `RedesSociales` | URLs y estado activo de FB, IG, etc. |
| `Distribuidores` | Lista maestra de distribuidores con Logo, Clasificación y Datos. |

### Módulo: Contenido (CMS Draft)
Estas tablas tienen columnas sufijadas `_ES` y `_EN`.

| Tabla | Descripción |
|-------|-------------|
| `PaginaHeaders` | Títulos e imágenes portada de páginas internas (Catálogos, Contacto). |
| `HomeCarousel` | Slides del banner principal. |
| `HomeSecciones` | Textos estáticos (Arte, Sustentabilidad, Dónde Comprar). |
| `HomeSeccionFeatures` | Elementos de lista dinámicos para las secciones del home. |
| `SeccionNosotros` | Bloques de texto (Proceso, Legado) con campos específicos (Badge, Stat). |
| `SeccionResponsabilidad` | Bloques de responsabilidad social. |

### Módulo: Productos (CMS Draft)
| Tabla | Descripción |
|-------|-------------|
| `Categorias` | Vaquera, Casual, Trabajo. |
| `Productos` | Datos maestros del producto. |
| `ProductoImagenes` | Galería. |
| `ProductoTags` | Etiquetas para filtrado. |

---

## 3. Ejemplo de Flujo de Datos

**Escenario:** El admin cambia el título del Home de "Bienvenidos" a "Hola".

1.  **Edición:** SQL `UPDATE HomeSecciones SET Titulo_ES = 'Hola' ...`
    *   *Estado:* CMS ve "Hola". Sitio Web sigue viendo "Bienvenidos".
2.  **Despliegue:** Admin hace click en "Publicar Home".
    *   Backend lee `HomeSecciones`.
    *   Backend genera JSON: `{ "titulo_es": "Hola", ... }`.
    *   Backend ejecuta `UPDATE Publicaciones SET DatosJson = '...' WHERE Clave = 'HOME'`.
3.  **Resultado:** Sitio Web lee `Publicaciones` y ahora muestra "Hola".
