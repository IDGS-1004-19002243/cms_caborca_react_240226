-- =======================================================
-- SCRIPT COMPLETO BD - CMS CABORCA
-- Versión Final: Modelo Híbrido Relacional/Documental
-- =======================================================

CREATE DATABASE CaborcaDB;
GO

USE CaborcaDB;
GO

-- 1. SISTEMA Y SEGURIDAD
CREATE TABLE Usuarios (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    NombreUsuario NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Rol NVARCHAR(20) DEFAULT 'Admin',
    FechaRegistro DATETIME DEFAULT GETDATE(),
    UltimoAcceso DATETIME
);

CREATE TABLE BitacoraDespliegues (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioId INT,
    Seccion NVARCHAR(50), -- 'Home', 'Productos', 'Configuracion'
    FechaDespliegue DATETIME DEFAULT GETDATE(),
    Comentarios NVARCHAR(MAX)
);

-- =======================================================
-- 2. TABLAS DE PUBLICACIÓN (EL SITIO WEB LEE DE AQUÍ)
-- =======================================================
-- Esta tabla desacopla la edición del consumo público.
CREATE TABLE ContenidoPublicado (
    Clave NVARCHAR(50) PRIMARY KEY, -- Ej: 'HOME_DATA', 'PRODUCTOS_HOMBRE', 'CONFIG_SITIO'
    DatosJSON NVARCHAR(MAX),        -- JSON completo listo para consumir
    UltimaActualizacion DATETIME DEFAULT GETDATE(),
    Version INT DEFAULT 1
);

-- =======================================================
-- 3. CONFIGURACIÓN GLOBAL (EDICIÓN RELACIONAL)
-- =======================================================
CREATE TABLE ConfiguracionSitio (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    EmailContacto NVARCHAR(100),
    Telefono NVARCHAR(50),
    Direccion_ES NVARCHAR(200),
    Direccion_EN NVARCHAR(200),
    MapUrl NVARCHAR(MAX),
    -- Textos mapa distribuidores
    MapTitle_ES NVARCHAR(100),
    MapTitle_EN NVARCHAR(100),
    MapText_ES NVARCHAR(200),
    MapText_EN NVARCHAR(200)
);

CREATE TABLE RedesSociales (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Plataforma NVARCHAR(50),
    Url NVARCHAR(255),
    Icono NVARCHAR(50), -- Referencia al nombre del icono SVG
    Activo BIT DEFAULT 1
);

CREATE TABLE EmailsNotificaciones (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Tipo NVARCHAR(50), -- 'Contacto', 'Distribuidores'
    Email NVARCHAR(100)
);

-- =======================================================
-- 4. DISTRIBUIDORES
-- =======================================================
CREATE TABLE Distribuidores (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    NombreNegocio NVARCHAR(150),
    NombreContacto NVARCHAR(150),
    LogoUrl NVARCHAR(255),
    Clasificacion NVARCHAR(50) DEFAULT 'Nacional', -- Nacional, Internacional
    Pais NVARCHAR(50),
    Estado NVARCHAR(50),
    Ciudad NVARCHAR(50),
    Colonia NVARCHAR(50),
    Calle NVARCHAR(100),
    NumeroExt NVARCHAR(20),
    NumeroInt NVARCHAR(20),
    CodigoPostal NVARCHAR(10),
    TipoVenta NVARCHAR(50),
    SitioWeb NVARCHAR(255),
    Telefono NVARCHAR(50),
    Email NVARCHAR(100),
    Latitud DECIMAL(9,6),
    Longitud DECIMAL(9,6),
    Activo BIT DEFAULT 1
);

-- =======================================================
-- 5. CONTENIDO DEL HOME Y PÁGINAS (CMS DRAFT)
-- =======================================================

-- Headers de páginas internas
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

-- Carousel Principal del Home
CREATE TABLE HomeCarousel (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Subtitulo_ES NVARCHAR(100),
    Subtitulo_EN NVARCHAR(100),
    TextoBoton_ES NVARCHAR(50),
    TextoBoton_EN NVARCHAR(50),
    LinkBoton NVARCHAR(255),
    ImagenUrl NVARCHAR(255),
    Orden INT,
    Activo BIT DEFAULT 1
);

-- Secciones Estáticas del Home (Arte, Sustentabilidad, Dónde Comprar, Banner Distribuidores)
CREATE TABLE HomeSecciones (
    Clave NVARCHAR(50) PRIMARY KEY, -- 'ArteCreacion', 'Sustentabilidad', 'DondeComprar', 'DistribuidoresBanner', 'FormDistribuidor'
    
    -- Textos
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Subtitulo_ES NVARCHAR(200),
    Subtitulo_EN NVARCHAR(200),
    Descripcion_ES NVARCHAR(MAX),
    Descripcion_EN NVARCHAR(MAX),
    
    -- Visuales
    Badge_ES NVARCHAR(50),
    Badge_EN NVARCHAR(50),
    ImagenUrl NVARCHAR(255),
    VideoUrl NVARCHAR(255),
    
    -- Botones / Notas
    TextoBoton_ES NVARCHAR(50),
    TextoBoton_EN NVARCHAR(50),
    LinkBoton NVARCHAR(255),
    Nota_ES NVARCHAR(100),
    Nota_EN NVARCHAR(100),
    
    -- Datos Extra Específicos
    DatoExtra1 NVARCHAR(100), -- Ej: Años de Experiencia
    DatoExtra2 NVARCHAR(100)
);

-- Listas de características para secciones del Home
CREATE TABLE HomeSeccionFeatures (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    SeccionClave NVARCHAR(50) FOREIGN KEY REFERENCES HomeSecciones(Clave),
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Descripcion_ES NVARCHAR(MAX),
    Descripcion_EN NVARCHAR(MAX),
    Orden INT
);

-- Página Nosotros
CREATE TABLE SeccionNosotros (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Identificador NVARCHAR(50) NOT NULL, -- 'Hero', 'Origen', 'Valores', 'Proceso', 'Legado'
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Subtitulo_ES NVARCHAR(200),
    Subtitulo_EN NVARCHAR(200),
    Contenido_ES NVARCHAR(MAX),
    Contenido_EN NVARCHAR(MAX),
    ImagenUrl NVARCHAR(255),
    VideoUrl NVARCHAR(255),
    Badge_ES NVARCHAR(50),
    Badge_EN NVARCHAR(50),
    Stat NVARCHAR(20),     
    Tagline_ES NVARCHAR(200),
    Tagline_EN NVARCHAR(200),
    Orden INT
);

-- Página Responsabilidad Social
CREATE TABLE SeccionResponsabilidad (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Identificador NVARCHAR(50) NOT NULL, -- 'Hero', 'Shambhala', 'Energia'
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Contenido_ES NVARCHAR(MAX),
    Contenido_EN NVARCHAR(MAX),
    ImagenUrl NVARCHAR(255),
    VideoUrl NVARCHAR(255)
);

CREATE TABLE ResponsabilidadStats (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    SeccionId INT FOREIGN KEY REFERENCES SeccionResponsabilidad(Id),
    Valor NVARCHAR(50), -- Ej: "+500"
    Label_ES NVARCHAR(100),
    Label_EN NVARCHAR(100),
    Orden INT
);

-- Página Contacto (Tarjetas Informativas)
CREATE TABLE SeccionContactoCards (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Titulo_ES NVARCHAR(100),
    Titulo_EN NVARCHAR(100),
    Contenido_ES NVARCHAR(MAX),
    Contenido_EN NVARCHAR(MAX),
    Icono NVARCHAR(50),
    Tipo NVARCHAR(50) -- 'Direccion', 'Telefono', 'Email'
);

-- =======================================================
-- 6. CATÁLOGO DE PRODUCTOS (CMS DRAFT)
-- =======================================================
CREATE TABLE Categorias (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre_ES NVARCHAR(50),
    Nombre_EN NVARCHAR(50),
    Codigo NVARCHAR(50) UNIQUE -- 'vaquera', 'casual', 'trabajo'
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
    Badge_ES NVARCHAR(50),
    Badge_EN NVARCHAR(50),
    FechaCreacion DATETIME DEFAULT GETDATE(),
    
    -- Especificaciones
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
    Url NVARCHAR(255),
    Orden INT
);

CREATE TABLE ProductoTags (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductoId INT FOREIGN KEY REFERENCES Productos(Id) ON DELETE CASCADE,
    Tag_ES NVARCHAR(50),
    Tag_EN NVARCHAR(50)
);
GO
