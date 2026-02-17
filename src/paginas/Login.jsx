import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credenciales, setCredenciales] = useState({
    usuario: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const navigate = useNavigate();

  // Usuarios válidos
  const usuariosValidos = {
    admin: { password: 'admin123', nombre: 'Administrador', rol: 'admin' },
    superadmin: { password: 'super123', nombre: 'Super Administrador', rol: 'superadmin' }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setCredenciales(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (error) setError('');
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    // Simulación de login
    setTimeout(() => {
      const usuario = usuariosValidos[credenciales.usuario.toLowerCase()];

      if (usuario && usuario.password === credenciales.password) {
        // Guardar token o sesión
        localStorage.setItem('adminToken', 'token-simulado-12345');
        localStorage.setItem('adminUser', JSON.stringify({
          nombre: usuario.nombre,
          usuario: credenciales.usuario.toLowerCase(),
          rol: usuario.rol
        }));
        navigate('/editar-inicio');
      } else {
        setError('El usuario o la contraseña son incorrectos. Inténtalo de nuevo.');
        setCargando(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo - Imagen/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-caborca-beige-suave via-caborca-arena/30 to-caborca-beige-suave relative overflow-hidden">
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239B8674' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Contenido del panel izquierdo */}
        <div className="relative z-10 flex flex-col items-center justify-start p-12 w-full text-center">
          {/* Logo centrado y prominente */}
          <div className="mb-12">
            <img
              src="/logo-caborca.webp"
              alt="Caborca Boots"
              className="h-28 w-auto mx-auto drop-shadow-lg"
            />
          </div>

          {/* Información del sistema (se moverá arriba del footer) - temporalmente omitida aquí */}

          {/* Mensaje central */}
          <div className="space-y-4 max-w-lg">
            <h2 className="font-playfair text-4xl xl:text-5xl font-bold leading-tight text-caborca-negro">
              Sistema de Gestión
            </h2>
            <p className="text-caborca-negro/70 text-lg leading-relaxed">
              Administra productos, distribuidores y contenido de tu sitio web desde un solo lugar.
            </p>
          </div>

          {/* Características en fila horizontal */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span>📦</span>
              <span className="text-sm text-caborca-negro/80">Catálogo</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span>📍</span>
              <span className="text-sm text-caborca-negro/80">Distribuidores</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span>✉️</span>
              <span className="text-sm text-caborca-negro/80">Mensajes</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span>🌐</span>
              <span className="text-sm text-caborca-negro/80">Bilingüe</span>
            </div>
          </div>

          {/* Información del sistema eliminada del panel izquierdo */}

          {/* Footer del panel */}
          <div className="absolute bottom-8 text-caborca-cafe/50 text-sm">
            <p>© 2026 Caborca Boots • Todos los derechos reservados</p>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-linear-to-b from-caborca-beige-suave to-white">
        <div className="w-full max-w-md">
          {/* Logo móvil */}
          <div className="lg:hidden text-center mb-8">
            <img
              src="/logo-caborca.webp"
              alt="Caborca Boots"
              className="h-20 w-auto mx-auto"
            />
          </div>

          {/* Encabezado */}
          <div className="mb-8">
            <h2 className="font-playfair text-3xl text-caborca-negro font-bold mb-2">
              Bienvenido de vuelta
            </h2>
            <p className="text-caborca-negro/60">
              Ingresa tus credenciales para acceder al panel
            </p>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-fadeIn">
              <div className="flex items-center space-x-3">
                <div className="shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={manejarEnvio} className="space-y-5">
            {/* Usuario */}
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium text-caborca-negro mb-2">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={credenciales.usuario}
                  onChange={manejarCambio}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-caborca-cafe focus:ring-4 focus:ring-caborca-cafe/10 transition-all duration-200 text-caborca-negro placeholder-gray-400"
                  placeholder="Ingresa tu usuario"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-caborca-negro mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credenciales.password}
                  onChange={manejarCambio}
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-caborca-cafe focus:ring-4 focus:ring-caborca-cafe/10 transition-all duration-200 text-caborca-negro placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-caborca-cafe transition-colors"
                >
                  {mostrarPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Olvidé contraseña */}
            <div className="flex justify-start">
              <button type="button" className="text-sm text-caborca-cafe hover:text-caborca-negro transition-colors font-medium">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full relative bg-caborca-cafe text-white py-4 rounded-xl font-semibold text-lg hover:bg-caborca-negro focus:outline-none focus:ring-4 focus:ring-caborca-cafe/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className={`inline-flex items-center justify-center transition-all duration-300 ${cargando ? 'opacity-0' : 'opacity-100'}`}>
                Iniciar Sesión
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              {cargando && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </button>
          </form>

          {/* (Información del Sistema movida al panel izquierdo) */}

          {/* Credenciales de prueba */}
          <div className="mt-8 p-5 bg-linear-to-r from-caborca-cafe/5 to-caborca-arena/10 rounded-xl border border-caborca-cafe/20">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 bg-caborca-cafe/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-caborca-cafe" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-caborca-cafe text-sm mb-3">Credenciales de demostración</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-caborca-negro/60 text-xs mb-1">Administrador</p>
                    <p className="text-caborca-negro/80"><span className="font-medium">Usuario:</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">admin</code></p>
                    <p className="text-caborca-negro/80"><span className="font-medium">Pass:</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">admin123</code></p>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-caborca-negro/60 text-xs mb-1">Super Admin</p>
                    <p className="text-caborca-negro/80"><span className="font-medium">Usuario:</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">superadmin</code></p>
                    <p className="text-caborca-negro/80"><span className="font-medium">Pass:</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">super123</code></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información (debajo de credenciales) - alineada a los bordes */}
          <div className="mt-4 w-full text-sm text-caborca-negro/60">
            <div className="w-full flex items-center justify-between">
              <div className="text-left">Última actualización: <span className="font-semibold text-caborca-negro/80">4 feb 2026</span></div>
              <div className="text-right">Versión: <span className="font-semibold text-caborca-negro/80">1.0.0</span></div>
            </div>
          </div>

          {/* Footer móvil */}
          <div className="lg:hidden text-center mt-8 text-caborca-negro/50 text-sm">
            <p>© 2026 Caborca Boots</p>
          </div>
        </div>
      </div>
    </div>
  );
}
