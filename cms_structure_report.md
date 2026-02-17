# CMS Page Structure and Form Definition Report

## 1. Homepage (`EditarInicio.jsx`)
- **Hero Section**: `badge`, `title`, `subtitle`, `backgroundImage`.
- **Carousel**: List of slides (`image`, `title`, `subtitle`, `link`).
- **Featured Products**: List of products, Section title/subtitle.
- **Distributor Form**: Title, subtitle, background image.
- **Sustainability Banner**: Title, link, image.

## 2. Catalog Pages (`CatalogoHombre.jsx`, `CatalogoMujer.jsx`)
- **Header Section**: `badge`, `title`, `description`, `coverImage`.
- **Product Edit Modal**:
  - `nombre` (Text)
  - `precio` (Number)
  - `categoria` (Select)
  - `modelo` (Text)
  - `color` (Text)
  - `descripcion` (Textarea)
  - `imagenes` (Array of URLs/Files)
  - `tallas` (Array of available sizes)
  - `destacado` (Boolean)

## 3. About Us (`EditarNosotros.jsx`)
- **Sections**:
  - `hero`: `badge`, `title`, `subtitle`, `imagen`
  - `origen`: `badge`, `title`, `paragraphs` (HTML), `imagen`
  - `crecimiento`: `title`, `paragraphs`, `imagen`
  - `caborcaHoy`: `title`, `subtitle`, `stats` (Array), `paragraph`
  - `artesania`: `badge`, `title`, `subtitle`, `paragraphs`, `imagen`
  - `proceso`: `badge`, `title`, `paragraphs`, `stat`
  - `legado`: `title`, `paragraphs`, `tagline`

## 4. Contact (`EditarContacto.jsx`)
- **Hero**: `badge`, `title`, `subtitulo`, `imagen`
- **Contact Info**: `telefono`, `email`, `direccion`, `horario`, `mapaUrl`
- **Contact Form Preview**: `titulo`, `descripcion`
- **Cards**: List of info cards (`title`, `lines`)

## 5. Distributors (`EditarDistribuidores.jsx`)
- **Hero**: `badge`, `title`, `subtitulo`, `imagen`
- **Search Filters**: `purchasePlaceholder`, `estadoPlaceholder`
- **Map Settings**: `mapTitle`, `mapText`, `mapSrc` (iframe URL)
- **Form Preview**: `titulo`, `subtitulo`, `submitLabel`, `responseMessage`
- **Counters**: `distribuidores` (count), `estados` (count)

## 6. Social Responsibility (`EditarResponsabilidad.jsx`)
- **Sections**:
  - `hero`: `badge`, `title`, `subtitle`, `image`
  - `compania`: `title`, `p1`, `p2`, `highlight`, `image`
  - `energia`: `title`, `p1`, `p2`, `stat1`, `stat1Label`, `stat2`, `stat2Label`, `image`
  - `video`: `title`, `description`, `videoUrl`
  - `pieles`: `title`, `p1`, `p2`, `image`
  - `shambhala`: `title`, `subtitle`, `missionTitle`, `missionText`, `granjaTitle`, `granjaText`, `educTitle`, `educText`, `statNumber`, `statLabel`, `statDesc`, `image`, `thumb1`, `thumb2`

## 7. Configuration (`Configuracion.jsx`)
- **Site Status**: `maintenanceMode` (Boolean), `nextDeployment` (Date)
- **Social Media**: List (`facebook`, `instagram`, `tiktok`, `whatsapp` - URL + Enabled)
- **Contact Emails**: List of strings
- **Distributor Emails**: List of strings
- **Distributor Management**:
  - `nombre`, `direccion`, `telefono`, `lat`, `lng`, `tipo` (tienda/online/ambos), `logo`
- **Security**: `currentPassword`, `newPassword`

## 8. Maintenance Page (`EditarMantenimiento.jsx`)
- **Main Content**: `titulo`, `subtitulo`, `mensaje`
- **Background**: `imagenFondo`
- **Social Media**: Same structure as global config but specific overrides if needed.

## 9. Not Found Page (`EditarNotFound.jsx`)
- **Content**: `titulo`, `mensaje`, `textoBoton`
- **Background**: `imagenFondo`
