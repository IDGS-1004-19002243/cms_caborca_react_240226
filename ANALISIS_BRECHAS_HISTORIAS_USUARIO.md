# Análisis de Brechas: Historias de Usuario vs Estado Actual del CMS

## 📊 Resumen Ejecutivo

**Estado Actual del Proyecto:** 
- ✅ CMS funcional con Login básico
- ✅ Edición de contenido Home (parcial)
- ⚠️ Múltiples funcionalidades faltantes según historias de usuario

**Cobertura Total:** ~25% de historias implementadas
**Historias Críticas Pendientes:** 28 de 35

---

## 🔴 SPRINT 2: Autenticación y Seguridad [PRIORIDAD CRÍTICA]

### ✅ **[Auth] Login de Administrador** - IMPLEMENTADO
**Estado:** Funcional en `Login.jsx`
- ✅ Validación de credenciales (hardcoded)
- ✅ Generación de token (localStorage)
- ✅ Redirección al Dashboard
**Ajustes Necesarios:**
- ⚠️ **Migrar a validación con backend/BD**
- ⚠️ **Implementar JWT real** (actualmente solo string estático)
- ⚠️ **Agregar hash de contraseñas** (bcrypt)

---

### ❌ **[Auth] Bloqueo de Sesión Simultánea** - NO IMPLEMENTADO
**Prioridad:** 1 | **Risk:** High | **Story Points:** 5
**Ajustes Requeridos:**
```javascript
// Agregar en Login.jsx después de validación exitosa:
- Verificar si existe token activo en BD (tabla sessions)
- Invalidar sesión anterior al hacer nuevo login
- Mostrar alerta: "Tu sesión anterior fue cerrada"
```
**Archivos a modificar:**
- `src/paginas/Login.jsx` → Agregar lógica de sesión única
- **CREAR:** Backend endpoint `/api/auth/logout-previous`
- **CREAR:** Tabla `sessions` en BD

---

### ⚠️ **[Auth] Gestión de Roles** - IMPLEMENTADO PARCIALMENTE
**Estado Actual:** Se guardan roles en localStorage pero no se usan
**Ajustes Necesarios:**
```javascript
// src/App.jsx - Agregar middleware de autorización
const RutaProtegidaSuperadmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('adminUser'));
  if (user?.rol !== 'superadmin') {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

// Proteger rutas sensibles:
<Route path="configuracion" element={
  <RutaProtegidaSuperadmin>
    <Configuracion />
  </RutaProtegidaSuperadmin>
} />
```
**Archivos a modificar:**
- `src/App.jsx` → Crear `RutaProtegidaSuperadmin`
- `src/componentes/LayoutAdmin.jsx` → Ocultar opciones según rol
- `src/paginas/Configuracion.jsx` → Validar permisos en acciones

---

### ✅ **[CMS] Dashboard Principal** - IMPLEMENTADO
**Estado:** Dashboard funcional en `Dashboard.jsx`
- ✅ Menú lateral responsivo
- ✅ Botón Logout funcional
- ✅ Bienvenida con nombre de usuario
**Mejoras Opcionales:**
- Agregar estadísticas del sitio (productos, distribuidores, mensajes)

---

### ❌ **[UX] Visibilidad de Contraseña** - NO IMPLEMENTADO
**Prioridad:** 3 | **Risk:** Low | **Story Points:** 1
**Ajustes Requeridos:**
```javascript
// src/paginas/Login.jsx - Agregar estado y botón
const [mostrarPassword, setMostrarPassword] = useState(false);

// En el input de password:
<div className="relative">
  <input 
    type={mostrarPassword ? 'text' : 'password'}
    ...
  />
  <button 
    type="button"
    onClick={() => setMostrarPassword(!mostrarPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2"
  >
    {mostrarPassword ? '🙈' : '👁️'}
  </button>
</div>
```
**Archivos a modificar:**
- `src/paginas/Login.jsx` → Agregar toggle de visibilidad

---

### ❌ **[Seguridad] Cambio de Contraseña** - NO IMPLEMENTADO
**Prioridad:** 2 | **Risk:** Medium | **Story Points:** 3
**Ajustes Requeridos:**
- **CREAR:** `src/paginas/CambiarPassword.jsx`
- **CREAR:** Backend endpoint `/api/auth/change-password`
- Agregar validación de complejidad (min 8 caracteres, mayúsculas, números)
- Agregar en menú de configuración

---

## 🟡 SPRINT 3: Internacionalización y Gestión de Contenido

### ✅ **[i18n] Selector de Idioma CMS** - IMPLEMENTADO
**Estado:** Funcional en `EditarInicio.jsx`
- ✅ Botones de banderas ES/EN
- ✅ Cambio de inputs al seleccionar idioma
- ✅ Indicador visual activo
**Validaciones Pendientes:**
- ⚠️ Falta validar que ambos idiomas tengan contenido antes de guardar

---

### ❌ **[CMS] Carga de Imágenes (No BD)** - IMPLEMENTADO SOLO localStorage
**Estado Actual:** `EditarInicio.jsx` usa FileReader → base64 → localStorage
**Ajustes Necesarios:**
- ⚠️ **Migrar a upload real:**
  - **CREAR:** Backend endpoint `/api/upload/image`
  - Guardar en FileSystem o Azure Blob Storage
  - Retornar URL pública
  - BD guarda solo la URL (no base64)
- Validar formatos (JPG, PNG, WebP)
- Validar tamaño máximo (2MB)

---

### ⚠️ **[CMS] Edición de Home y Nosotros** - IMPLEMENTADO PARCIAL
**Estado Actual:**
- ✅ `EditarInicio.jsx` → Funcional con previsualización
- ⚠️ `EditarNosotros.jsx` → Existe pero sin funcionalidad real
**Ajustes Necesarios:**
```javascript
// EditarNosotros.jsx - Implementar estructura similar a EditarInicio:
- Estado con secciones: hero, mision, vision, valores, timeline
- Campos bilingües (es/en)
- Previsualización en tiempo real
- Guardar en BD via API
```
**Archivos a modificar:**
- `src/paginas/EditarNosotros.jsx` → Completar implementación

---

### ❌ **[Catálogo] Alta de Productos** - NO IMPLEMENTADO
**Prioridad:** 1 | **Risk:** High | **Story Points:** 5
**Ajustes Requeridos:**
- **MODIFICAR:** `src/paginas/CatalogoHombre.jsx` y `CatalogoMujer.jsx`
  - Actualmente solo muestran productos hardcoded
  - Agregar botón "Nuevo Producto"
  - Formulario con: Nombre (ES/EN), Precio, Categoría, Género
  - Upload de imagen
- **CREAR:** Backend endpoints:
  - `POST /api/productos` → Crear producto
  - `GET /api/productos` → Listar con filtros
  - `PUT /api/productos/:id` → Actualizar
  - `DELETE /api/productos/:id` → Borrado lógico

---

### ❌ **[Catálogo] Edición/Baja de Productos** - NO IMPLEMENTADO
**Ajustes Requeridos:**
```javascript
// CatalogoHombre.jsx - Agregar acciones por producto
- Botón "Editar" → Abrir modal con formulario
- Botón "Eliminar" → Soft delete (campo deleted_at en BD)
- Cargar datos existentes del producto
```

---

### ❌ **[Catálogo] Subida de Foto Producto** - NO IMPLEMENTADO
**Ajustes Requeridos:**
- Integrar con endpoint de upload de imágenes
- Validar peso máximo (500KB recomendado para productos)
- Generar thumbnails automáticos (backend)

---

### ❌ **[UX] Confirmación de Borrado** - NO IMPLEMENTADO
**Ajustes Requeridos:**
```javascript
// Componente reutilizable ModalConfirmar.jsx
const ModalConfirmar = ({ titulo, mensaje, onConfirmar, onCancelar }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6">
      <h3>{titulo}</h3>
      <p>{mensaje}</p>
      <div className="flex gap-2">
        <button onClick={onCancelar} autoFocus>Cancelar</button>
        <button onClick={onConfirmar} className="bg-red-600">Eliminar</button>
      </div>
    </div>
  </div>
);
```

---

## 🟢 SPRINT 4: Frontend Público y Carga Masiva

### ❌ **[Front] Portafolio Grid** - NO IMPLEMENTADO EN CMS
**Estado Actual:** El portafolio público (`Portafolio_Caborca_React`) tiene grids
**Ajustes Necesarios:**
- El CMS debe consumir productos de BD
- El portafolio debe leer desde API (no hardcoded)

---

### ❌ **[Front] Detalle de Producto** - NO FUNCIONAL CON BD
**Ajustes Necesarios:**
- Crear endpoint `GET /api/productos/:id`
- Implementar ruta dinámica en portafolio

---

### ❌ **[Front] Filtros de Categoría** - NO IMPLEMENTADO
**Ajustes Necesarios:**
```javascript
// Portafolio - Agregar filtros sin recarga
const [filtroGenero, setFiltroGenero] = useState('todos');
const productosFiltrados = productos.filter(p => 
  filtroGenero === 'todos' || p.genero === filtroGenero
);
```

---

### ❌ **[Back] Carga Masiva CSV** - NO IMPLEMENTADO
**Prioridad:** 1 | **Risk:** High | **Story Points:** 8
**Ajustes Requeridos:**
- **CREAR:** `src/paginas/Distribuidores.jsx` → Sección "Carga Masiva"
- **CREAR:** Backend endpoint `POST /api/distribuidores/upload-csv`
- Validar estructura CSV (columnas: nombre, ciudad, estado, tipo, lat, lng)
- Insert masivo en BD
- Reporte de errores por fila

---

### ❌ **[Error] Validación Formato CSV** - NO IMPLEMENTADO
**Ajustes Requeridos:**
```javascript
// Backend - Validar CSV antes de insertar
- Verificar cabeceras requeridas
- Validar tipos de datos (lat/lng son números)
- Retornar array de errores con número de fila
```

---

## 🔵 SPRINT 5: Mapas y Formularios

### ❌ **[Map] Alta Manual Tienda** - NO IMPLEMENTADO
**Ajustes Requeridos:**
- `src/paginas/Distribuidores.jsx` → Formulario manual
- Campos: nombre, ciudad, estado, tipo, coordenadas
- Selector de ubicación en mapa (Google Maps API)

---

### ❌ **[Map] Mapa Interactivo** - NO IMPLEMENTADO EN CMS
**Estado Actual:** El portafolio tiene mockup de mapa
**Ajustes Necesarios:**
- Integrar Google Maps o Leaflet
- Cargar distribuidores desde BD
- Pines clicables con info

---

### ❌ **[Map] Geolocalización Cercanía** - NO IMPLEMENTADO
**Ajustes Requeridos:**
```javascript
// Portafolio - Obtener ubicación del usuario
navigator.geolocation.getCurrentPosition(pos => {
  const { latitude, longitude } = pos.coords;
  // Calcular distancia con fórmula Haversine
  // Ordenar tiendas por cercanía
});
```

---

### ❌ **[Prosp] Configuración Correos** - NO IMPLEMENTADO
**Ajustes Requeridos:**
- **CREAR:** Sección en `Configuracion.jsx` → "Destinatarios de Leads"
- CRUD de emails
- Guardar en tabla `configuracion` (key: 'emails_destinatarios', value: JSON)

---

### ❌ **[Prosp] Formulario Contacto** - EXISTE EN PORTAFOLIO
**Estado:** Formulario existe pero no envía emails
**Ajustes Necesarios:**
- **CREAR:** Backend endpoint `POST /api/contacto/enviar`
- Integrar con servicio de email (SendGrid, Mailgun, SMTP)
- Validar campos

---

### ❌ **[Sec] Anti-Spam** - NO IMPLEMENTADO
**Ajustes Requeridos:**
```javascript
// Portafolio - Agregar ReCAPTCHA v3
import ReCAPTCHA from "react-google-recaptcha";

<ReCAPTCHA 
  sitekey="YOUR_SITE_KEY"
  onChange={token => setRecaptchaToken(token)}
/>

// Backend - Validar token
await axios.post('https://www.google.com/recaptcha/api/siteverify', {
  secret: process.env.RECAPTCHA_SECRET,
  response: token
});
```

---

### ❌ **[UX] Feedback Envío** - NO IMPLEMENTADO
**Ajustes Requeridos:**
```javascript
// Portafolio - Mostrar modal de éxito
- Alerta tipo toast o modal
- Limpiar formulario
- Manejo de errores
```

---

### ❌ **[Legal] Aviso de Privacidad** - NO IMPLEMENTADO
**Ajustes Requeridos:**
- **CREAR:** `EditarAvisoPrivacidad.jsx` en CMS
- Editor de texto rico (TinyMCE o Quill)
- Checkbox obligatorio en formulario
- Link visible al aviso

---

## 🟣 SPRINT 6: Experiencia de Usuario

### ⚠️ **[UX] Responsividad Móvil** - IMPLEMENTADO PARCIAL
**Estado:** Tailwind hace el trabajo pesado
**Mejoras Necesarias:**
- Probar en dispositivos reales
- Ajustar menú móvil del CMS
- Verificar touch targets (min 44x44px)

---

### ❌ **[Perf] Optimización Imágenes** - NO IMPLEMENTADO
**Ajustes Requeridos:**
- Backend: Convertir uploads a WebP
- Implementar lazy loading en portafolio
- Comprimir imágenes con Sharp (Node.js)

---

### ❌ **[UX] Página 404** - NO IMPLEMENTADO
**Ajustes Requeridos:**
```javascript
// App.jsx - Agregar ruta catch-all
<Route path="*" element={<Pagina404 />} />
```

---

### ❌ **[UX] Indicadores de Carga** - NO IMPLEMENTADO
**Ajustes Requeridos:**
```javascript
// Componente global Spinner.jsx
const [cargando, setCargando] = useState(false);

{cargando && <Spinner />}
```

---

### ❌ **[Auth] Recuperación de Contraseña** - NO IMPLEMENTADO
**Ajustes Requeridos:**
- **CREAR:** `RecuperarPassword.jsx`
- **CREAR:** Backend endpoints:
  - `POST /api/auth/forgot-password` → Enviar email con token
  - `POST /api/auth/reset-password` → Validar token y cambiar password
- Token debe expirar en 1 hora

---

### ❌ **[Sec] Auditoría de Cambios (Logs)** - NO IMPLEMENTADO
**Ajustes Requeridos:**
- **CREAR:** Tabla `audit_logs` (usuario, acción, entidad, fecha)
- **CREAR:** `src/paginas/Logs.jsx` (solo Superadmin)
- Registrar acciones: crear, editar, eliminar productos/distribuidores
- Filtros por fecha y usuario

---

## 🔷 SPRINT 7: Documentación y Deploy

### ❌ **[Doc] Manual de Usuario** - NO IMPLEMENTADO
**Entregable:** PDF con capturas del CMS
**Contenido:**
- Cómo editar contenido
- Cómo subir productos
- Cómo gestionar distribuidores
- FAQ

---

### ❌ **[Deploy] Puesta en Producción** - NO IMPLEMENTADO
**Tareas:**
- Configurar servidor IIS/Azure App Service
- Base de datos productiva (SQL Server/PostgreSQL)
- SSL con certificado válido
- Variables de entorno (.env)
- CI/CD pipeline

---

## 🔶 SPRINT 8: Cierre

### ❌ **[Cierre] Entrega y Capacitación** - PENDIENTE
**Tareas:**
- Entregar código fuente (GitHub/Zip)
- Sesión de capacitación (2 horas)
- Credenciales finales
- Documentación técnica

---

## 📋 Plan de Acción Priorizado

### 🔴 **URGENTE - Semana 1-2**
1. Migrar autenticación a BD + JWT real
2. Implementar bloqueo de sesión simultánea
3. Completar CRUD de productos (alta/edición/baja)
4. Implementar upload de imágenes a servidor (no base64)

### 🟠 **IMPORTANTE - Semana 3-4**
5. Completar EditarNosotros.jsx
6. Implementar carga masiva CSV de distribuidores
7. Agregar confirmación de borrado
8. Implementar cambio de contraseña

### 🟡 **MEDIO - Semana 5-6**
9. Integrar mapas interactivos (Google Maps/Leaflet)
10. Implementar formulario de contacto con emails
11. Agregar ReCAPTCHA anti-spam
12. Crear página 404 y spinners

### 🟢 **BAJO - Semana 7-8**
13. Auditoría de cambios (logs)
14. Recuperación de contraseña
15. Optimización de imágenes
16. Manual de usuario PDF

---

## 📊 Métricas de Progreso

| Sprint | Historias | Implementadas | Pendientes | % Completado |
|--------|-----------|---------------|------------|--------------|
| 2      | 6         | 2             | 4          | 33%          |
| 3      | 7         | 2             | 5          | 29%          |
| 4      | 5         | 0             | 5          | 0%           |
| 5      | 8         | 0             | 8          | 0%           |
| 6      | 7         | 1             | 6          | 14%          |
| 7      | 2         | 0             | 2          | 0%           |
| 8      | 1         | 0             | 1          | 0%           |
| **TOTAL** | **36** | **5** | **31** | **14%** |

---

## 🎯 Recomendaciones Finales

1. **Backend es prioritario:** La mayoría de historias requieren API funcional
2. **Base de datos:** Diseñar esquema completo antes de continuar
3. **Autenticación:** Implementar JWT antes de agregar más funcionalidades
4. **Testing:** Agregar pruebas unitarias para funciones críticas
5. **Deploy temprano:** Configurar entorno de staging lo antes posible

---

**Generado:** 5 de febrero de 2026  
**Versión del CMS:** 1.0.0-alpha  
**Próxima revisión:** Después de completar Sprint 2
