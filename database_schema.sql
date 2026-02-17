-- Script Base de Datos CMS Caborca (Corregido y Actualizado)
-- Generado para SQL Server (.NET Backend)
-- Cambios: 
-- 1. Añadido soporte multilingüe (_ES, _EN) en tablas de contenido.
-- =============================================
-- 1. SISTEMA Y AUTENTICACIÓN
-- =============================================

CREATE TABLE Usuarios (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    NombreUsuario NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Rol NVARCHAR(20) DEFAULT 'Admin', -- Admin, Editor
    FechaRegistro DATETIME DEFAULT GETDATE(),
    UltimoAcceso DATETIME
);

-- =============================================
-- 2. CONFIGURACIÓN GENERAL
-- =============================================

CREATE TABLE ConfiguracionSitio (
    Id INT IDENTITY(1,1) PRIMARY KEY, -- Singleton (solo 1 registro)
    EmailContacto NVARCHAR(100),
    Telefono NVARCHAR(50),
    Direccion_ES NVARCHAR(200),
    Direccion_EN NVARCHAR(200),
    MapUrl NVARCHAR(MAX),
    -- Textos mapa distribuidores (Multilingüe)
    MapTitle_ES NVARCHAR(100),
    MapTitle_EN NVARCHAR(100),
    MapText_ES NVARCHAR(200),
    MapText_EN NVARCHAR(200)
);

CREATE TABLE RedesSociales (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Plataforma NVARCHAR(50) NOT NULL, -- Facebook, Instagram, etc.
    Url NVARCHAR(255),
    Activo BIT DEFAULT 1
);

CREATE TABLE EmailsNotificaciones (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Tipo NVARCHAR(50) NOT NULL, -- 'Contacto', 'Distribuidores'
    Email NVARCHAR(100) NOT NULL
);

-- =============================================
-- 3. CATÁLOGO DE PRODUCTOS
-- =============================================

CREATE TABLE Categorias (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre_ES NVARCHAR(50) NOT NULL,
    Nombre_EN NVARCHAR(50) NOT NULL,
    Codigo NVARCHAR(50) NOT NULL UNIQUE -- vaquera, casual, trabajo
);

CREATE TABLE Productos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre_ES NVARCHAR(150),
    Nombre_EN NVARCHAR(150),
    SKU NVARCHAR(50) UNIQUE,
    Descripcion_ES NVARCHAR(MAX),
    Descripcion_EN NVARCHAR(MAX),
    Marca NVARCHAR(50) DEFAULT 'Caborca',
    CategoriaId INT FOREIGN KEY REFERENCES Categorias(Id),
    Genero NVARCHAR(20), -- 'Hombre', 'Mujer'
    ImagenPortada NVARCHAR(255),
    Destacado BIT DEFAULT 0,
    Badge_ES NVARCHAR(50), -- 'NUEVO'
    Badge_EN NVARCHAR(50), -- 'NEW'
    FechaCreacion DATETIME DEFAULT GETDATE(),
    
    -- Especificaciones Técnicas (Multilingüe)
    MaterialCorte_ES NVARCHAR(100),
    MaterialCorte_EN NVARCHAR(100),
    Suela_ES NVARCHAR(100),
    Suela_EN NVARCHAR(100),
    Construccion_ES NVARCHAR(100),
    Construccion_EN NVARCHAR(100),
    Horma_ES NVARCHAR(100),
    Horma_EN NVARCHAR(100)
);

CREATE TABLE ProductoImagenes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductoId INT FOREIGN KEY REFERENCES Productos(Id) ON DELETE CASCADE,
    Url NVARCHAR(255) NOT NULL,
    Orden INT DEFAULT 0
);

CREATE TABLE ProductoTags (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductoId INT FOREIGN KEY REFERENCES Productos(Id) ON DELETE CASCADE,
    Tag_ES NVARCHAR(50),
    Tag_EN NVARCHAR(50)
);

-- =============================================
-- 4. DISTRIBUIDORES
-- =============================================

CREATE TABLE Distribuidores (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    NombreNegocio NVARCHAR(150),
    NombreContacto NVARCHAR(150),
    LogoUrl NVARCHAR(255),
    Clasificacion NVARCHAR(50) DEFAULT 'Nacional', -- Nacional, Internacional
    
    -- Dirección
    Pais NVARCHAR(50),
    Estado NVARCHAR(50),
    Ciudad NVARCHAR(50),
    Colonia NVARCHAR(50),
    Calle NVARCHAR(100),
    NumeroExt NVARCHAR(20),
    NumeroInt NVARCHAR(20),
    CodigoPostal NVARCHAR(10),
    
    -- Contacto y Web
    TipoVenta NVARCHAR(50), -- Tienda física, Online, Ambas
    SitioWeb NVARCHAR(255),
    Telefono NVARCHAR(50),
    Email NVARCHAR(100),
    
    Latitud DECIMAL(9,6),
    Longitud DECIMAL(9,6),
    Activo BIT DEFAULT 1
);

-- =============================================
-- 5. CONTENIDO DE PÁGINAS (CMS)
-- =============================================

-- HEADERS DE PÁGINAS INTERNAS (Catálogo H/M, Contacto, etc)
CREATE TABLE PaginaHeaders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PaginaClave NVARCHAR(50) UNIQUE, -- 'CatalogoHombre', 'CatalogoMujer', 'Contacto'
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Subtitulo_ES NVARCHAR(200),
    Subtitulo_EN NVARCHAR(200),
    ImagenUrl NVARCHAR(255),
    MostrarPortada BIT DEFAULT 1
);

-- HOME: Carousel
CREATE TABLE HomeCarousel (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ImagenUrl NVARCHAR(255),
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Subtitulo_ES NVARCHAR(100),
    Subtitulo_EN NVARCHAR(100),
    TextoBoton_ES NVARCHAR(50),
    TextoBoton_EN NVARCHAR(50),
    LinkBoton NVARCHAR(255),
    Orden INT DEFAULT 0,
    Activo BIT DEFAULT 1
);

-- HOME: Secciones Estáticas
CREATE TABLE HomeSecciones (
    Clave NVARCHAR(50) PRIMARY KEY, -- 'ArteCreacion', 'Sustentabilidad', 'DondeComprar', 'DistribuidoresBanner', 'FormDistribuidor'
    
    -- Textos Principales
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Subtitulo_ES NVARCHAR(200), -- O Descripción Corta
    Subtitulo_EN NVARCHAR(200),
    Descripcion_ES NVARCHAR(MAX),
    Descripcion_EN NVARCHAR(MAX),
    
    -- Elementos Visuales
    Badge_ES NVARCHAR(50),
    Badge_EN NVARCHAR(50),
    ImagenUrl NVARCHAR(255),
    VideoUrl NVARCHAR(255), -- Nuevo campo si aplica
    
    -- Botones / Notas
    TextoBoton_ES NVARCHAR(50),
    TextoBoton_EN NVARCHAR(50),
    LinkBoton NVARCHAR(255),
    Nota_ES NVARCHAR(100),
    Nota_EN NVARCHAR(100),
    
    -- Datos Específicos (JSON para flexibilidad o columnas fijas)
    DatoExtra1 NVARCHAR(100), -- Ej: AnosExperiencia en Arte
    DatoExtra2 NVARCHAR(100)
);

-- Features dinámicos (Home Arte, Home Sustentabilidad)
CREATE TABLE HomeSeccionFeatures (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    SeccionClave NVARCHAR(50) FOREIGN KEY REFERENCES HomeSecciones(Clave),
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Descripcion_ES NVARCHAR(MAX),
    Descripcion_EN NVARCHAR(MAX),
    Orden INT
);

-- NOSOTROS
CREATE TABLE SeccionNosotros (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Identificador NVARCHAR(50) NOT NULL, -- 'Hero', 'Origen', 'Valores', 'Proceso', 'Legado'
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Subtitulo_ES NVARCHAR(200),
    Subtitulo_EN NVARCHAR(200),
    Contenido_ES NVARCHAR(MAX), -- Párrafos
    Contenido_EN NVARCHAR(MAX),
    ImagenUrl NVARCHAR(255),
    VideoUrl NVARCHAR(255),
    
    -- Campos Específicos detectados
    Badge_ES NVARCHAR(50), -- Para sección 'Proceso'
    Badge_EN NVARCHAR(50),
    Stat NVARCHAR(20),     -- Ej: '+200'
    Tagline_ES NVARCHAR(200), -- Para sección 'Legado'
    Tagline_EN NVARCHAR(200),
    
    Orden INT
);

-- RESPONSABILIDAD SOCIAL
CREATE TABLE SeccionResponsabilidad (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Identificador NVARCHAR(50) NOT NULL, -- 'Hero', 'Shambhala', 'Energia'
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Contenido_ES NVARCHAR(MAX),
    Contenido_EN NVARCHAR(MAX),
    ImagenUrl NVARCHAR(255),
    VideoUrl NVARCHAR(255),
    StatsJson NVARCHAR(MAX) -- Mantener JSON para estadísticas variables
);

-- CONTACTO (Info Cards)
CREATE TABLE SeccionContactoCards (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Contenido_ES NVARCHAR(MAX),
    Contenido_EN NVARCHAR(MAX),
    Icono NVARCHAR(50),
    Tipo NVARCHAR(50) -- 'Direccion', 'Telefono', 'Email'
);
