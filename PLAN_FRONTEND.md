# Plan de Desarrollo Frontend - CMS Caborca

## 🎯 Objetivo
Completar toda la interfaz del CMS para que esté lista cuando se implemente el backend.

---

## ✅ FASE 1: Componentes Base y UX (1-2 días)

### 1.1 Componentes Reutilizables
- [x] **ModalConfirmacion.jsx** - Confirmación antes de eliminar
- [ ] **Spinner.jsx** - Indicador de carga global
- [ ] **Toast.jsx** - Notificaciones tipo toast
- [ ] **InputImagen.jsx** - Upload de imagen reutilizable
- [ ] **EditorTextoRico.jsx** - Para textos largos (opcional)

### 1.2 Mejoras de Autenticación
- [ ] **Toggle visibilidad de contraseña** en Login.jsx
- [ ] **Pantalla Recuperar Contraseña** (UI, sin envío real)
- [ ] **Pantalla Cambiar Contraseña** en Configuración

### 1.3 Páginas de Error
- [ ] **Pagina404.jsx** - Página no encontrada
- [ ] **PaginaError.jsx** - Error boundary

---

## ✅ FASE 2: Gestión de Productos (2-3 días)

### 2.1 Catálogo Hombre (CatalogoHombre.jsx)
- [ ] **Grid de productos** con datos simulados
- [ ] **Modal "Nuevo Producto"** con formulario completo
  - Nombre (ES/EN)
  - Precio
  - Categoría (dropdown)
  - Descripción (ES/EN)
  - Upload de imagen (simulado)
  - Marca como "Destacado" (checkbox)
- [ ] **Modal "Editar Producto"** (mismo formulario, pre-cargado)
- [ ] **Botón Eliminar** con confirmación
- [ ] **Filtros:** Por categoría, destacados, precio
- [ ] **Búsqueda** por nombre
- [ ] **Paginación** (10 productos por página)

### 2.2 Catálogo Mujer (CatalogoMujer.jsx)
- [ ] Misma funcionalidad que Catálogo Hombre

### 2.3 Vista Previa Producto
- [ ] **Card de producto mejorado** con hover effects
- [ ] **Modal vista rápida** (quick view)

---

## ✅ FASE 3: Edición de Contenido (2-3 días)

### 3.1 Completar EditarNosotros.jsx
- [ ] **Hero Section** (título, subtítulo, imagen)
- [ ] **Misión** (texto ES/EN)
- [ ] **Visión** (texto ES/EN)
- [ ] **Valores** (lista editable de 4-6 valores)
- [ ] **Timeline Historia** (años/eventos)
- [ ] **Equipo** (opcional, fotos + nombres)
- [ ] **Previsualización en tiempo real**

### 3.2 EditarResponsabilidad.jsx
- [ ] Verificar que funcione correctamente
- [ ] Agregar más campos si es necesario

### 3.3 Validar EditarInicio.jsx
- [x] Verificar que todas las secciones funcionen
- [ ] Agregar validaciones de campos vacíos
- [ ] Mejorar previsualización

---

## ✅ FASE 4: Distribuidores y Mapa (2 días)

### 4.1 Distribuidores.jsx
- [ ] **Tabla de distribuidores** con datos simulados
- [ ] **Botón "Agregar Distribuidor"** con formulario:
  - Nombre de tienda
  - Ciudad
  - Estado (dropdown)
  - Tipo (Tienda / Distribuidor / Ambos)
  - Coordenadas (inputs numéricos)
  - Email
  - Teléfono
- [ ] **Edición inline** o modal
- [ ] **Botón Eliminar** con confirmación
- [ ] **Carga Masiva CSV:**
  - Input file CSV
  - Vista previa de datos
  - Validación de formato (frontend)
  - Tabla de resultados (éxitos/errores simulados)
- [ ] **Exportar a CSV** (datos actuales)
- [ ] **Filtros:** Por estado, tipo

### 4.2 Integración de Mapa (Opcional para ahora)
- [ ] Vista previa del mapa con Google Maps
- [ ] Click en mapa para obtener coordenadas

---

## ✅ FASE 5: Mensajes y Leads (1-2 días)

### 5.1 Mensajes.jsx
- [ ] **Tabla de mensajes** simulados del formulario de contacto
- [ ] Campos: Fecha, Nombre, Email, Teléfono, Mensaje, Estado
- [ ] **Filtros:** Por fecha, leído/no leído
- [ ] **Marcar como leído**
- [ ] **Responder** (abrir cliente de email)
- [ ] **Eliminar** con confirmación
- [ ] **Paginación**

### 5.2 Estadísticas (Dashboard mejorado)
- [ ] Cards con números simulados:
  - Total productos
  - Productos destacados
  - Distribuidores activos
  - Mensajes sin leer
- [ ] Gráfica simple (opcional con Chart.js)

---

## ✅ FASE 6: Configuración (1-2 días)

### 6.1 Configuracion.jsx
- [ ] **Sección Perfil:**
  - Ver datos del usuario
  - Cambiar contraseña (UI)
- [ ] **Sección Emails Destinatarios:**
  - Lista de emails para recibir leads
  - Agregar/Eliminar emails
  - Validación de formato
- [ ] **Sección SEO:**
  - Meta título del sitio
  - Meta descripción
  - Keywords
- [ ] **Sección Redes Sociales:**
  - URLs de Facebook, Instagram, Twitter
- [ ] **Sección Aviso de Privacidad:**
  - Editor de texto para aviso legal
  - Vista previa
- [ ] **Solo Superadmin:** Gestión de usuarios
  - Lista de usuarios
  - Crear nuevo admin
  - Cambiar roles
  - Desactivar usuario

---

## ✅ FASE 7: Mejoras de UX (1-2 días)

### 7.1 Responsividad
- [ ] Menú lateral colapsable en móvil
- [ ] Tablas responsivas (scroll horizontal o cards en móvil)
- [ ] Modales adaptados a móvil
- [ ] Touch targets mínimo 44x44px

### 7.2 Indicadores de Estado
- [ ] Spinners en botones "Guardar"
- [ ] Skeleton loaders en tablas
- [ ] Animaciones de transición
- [ ] Feedback visual en acciones (toast notifications)

### 7.3 Validaciones
- [ ] Validar campos requeridos antes de guardar
- [ ] Validar formatos (email, teléfono, URL)
- [ ] Validar rangos (precio > 0)
- [ ] Mostrar errores en inputs

### 7.4 Accesibilidad
- [ ] Labels en todos los inputs
- [ ] Focus visible en elementos interactivos
- [ ] Navegación por teclado
- [ ] Alt text en imágenes

---

## ✅ FASE 8: Protección de Rutas y Roles (1 día)

### 8.1 Middleware de Roles
- [ ] Componente `RutaProtegidaSuperadmin`
- [ ] Aplicar a rutas de Configuración (usuarios)
- [ ] Ocultar opciones de menú según rol

### 8.2 Menú Lateral Dinámico
- [ ] Mostrar/ocultar "Configuración Avanzada" según rol
- [ ] Badge "Admin" o "Superadmin" en header

---

## 📊 Estimación Total: 10-14 días de desarrollo

---

## 🎨 Prioridad de Implementación

### 🔴 **ALTA (Implementar primero):**
1. Componentes base (Modal, Spinner, Toast)
2. Toggle visibilidad de contraseña
3. CRUD Productos (completo con modales)
4. Completar EditarNosotros.jsx
5. Página 404

### 🟡 **MEDIA (Implementar después):**
6. Distribuidores + Carga CSV
7. Mensajes
8. Configuración (perfil + emails)
9. Validaciones de formularios
10. Responsividad mejorada

### 🟢 **BAJA (Opcional/Refinamiento):**
11. Estadísticas en Dashboard
12. Animaciones y transiciones
13. Gestión de usuarios (solo Superadmin)
14. Editor de texto rico

---

## 🚀 Próximo Paso

**Comenzar con:** Componentes base (ModalConfirmacion, Spinner, Toast) y luego implementar CRUD completo de Productos.

¿Comenzamos con la implementación?
