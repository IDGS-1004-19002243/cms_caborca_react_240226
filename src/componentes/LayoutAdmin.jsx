import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function LayoutAdmin() {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const cerrarSesion = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  const menuItems = [
    {
      nombre: 'Dashboard',
      icono: '■',
      ruta: '/dashboard'
    },
    {
      nombre: 'Inicio',
      icono: '⌂',
      ruta: '/editar-inicio'
    },
    {
      nombre: 'Nosotros',
      icono: '♦',
      ruta: '/editar-nosotros'
    },
    {
      nombre: 'Catálogo Hombre',
      icono: '▣',
      ruta: '/editar-catalogo-hombre'
    },
    {
      nombre: 'Catálogo Mujer',
      icono: '▤',
      ruta: '/editar-catalogo-mujer'
    },
    {
      nombre: 'Responsabilidad Ambiental',
      icono: '✿',
      ruta: '/editar-responsabilidad'
    },
    {
      nombre: 'Distribuidores',
      icono: '●',
      ruta: '/editar-distribuidores'
    },
    {
      nombre: 'Contacto',
      icono: '✆',
      ruta: '/editar-contacto'
    },
    
    {
      nombre: 'Configuración',
      icono: '⚙',
      ruta: '/editar-configuracion'
    }
  ];

  const usuarioAdmin = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('cms:editor:lang') || 'es'; } catch (e) { return 'es'; }
  });

  useEffect(() => {
    // Ensure initial broadcast so pages can sync
    try {
      window.dispatchEvent(new CustomEvent('cms:editor:lang-changed', { detail: { lang } }));
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-[#5C4A3A] text-white transition-all duration-300 ${
          menuAbierto ? 'w-64' : 'w-20'
        } flex flex-col z-40`}
      >
        {/* Header del Sidebar */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {menuAbierto ? (
                <img 
                  src="/logo-caborca.webp" 
                  alt="Caborca Boots" 
                  className="h-8 w-auto"
                />
              ) : (
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">C</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="p-2 hover:bg-white/10 rounded transition-colors text-white"
            >
              {menuAbierto ? '◀' : '▶'}
            </button>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const estaActivo = location.pathname === item.ruta;
              return (
                <li key={item.ruta}>
                  <Link
                    to={item.ruta}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      estaActivo
                        ? 'bg-white/20'
                        : 'hover:bg-white/10'
                    }`}
                    title={!menuAbierto ? item.nombre : ''}
                  >
                    <span className="text-xl">{item.icono}</span>
                    {menuAbierto && (
                      <span className="text-sm text-white font-semibold">{item.nombre}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Usuario: mostrar solo botón de cerrar sesión */}
        <div className="p-4 border-t border-white/20">
          <div className="mb-0">
            <button
              onClick={cerrarSesion}
              className="w-full bg-caborca-negro hover:bg-caborca-negro/80 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>🚪</span>
              {menuAbierto && <span className="text-sm font-medium">Cerrar Sesión</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        menuAbierto ? 'ml-64' : 'ml-20'
      }`}>
        {/* Header superior */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-playfair text-caborca-cafe">
              {menuItems.find(item => item.ruta === location.pathname)?.nombre || 'Panel de Administración'}
            </h2>
            <div className="flex items-center space-x-4">
              {location.pathname !== '/dashboard' && (
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => {
                      const lang = 'es';
                      localStorage.setItem('cms:editor:lang', lang);
                      window.dispatchEvent(new CustomEvent('cms:editor:lang-changed', { detail: { lang } }));
                      setLang(lang);
                    }}
                    className={`px-3 py-1 text-sm transition-colors ${
                      (typeof window !== 'undefined' && (localStorage.getItem('cms:editor:lang') || 'es') === 'es')
                        ? 'bg-caborca-cafe text-white rounded'
                        : 'text-gray-600 hover:bg-gray-200 rounded'
                    }`}
                  >
                    🇲🇽 ES
                  </button>
                  <button
                    onClick={() => {
                      const lang = 'en';
                      localStorage.setItem('cms:editor:lang', lang);
                      window.dispatchEvent(new CustomEvent('cms:editor:lang-changed', { detail: { lang } }));
                      setLang(lang);
                    }}
                    className={`px-3 py-1 text-sm transition-colors ${
                      (typeof window !== 'undefined' && (localStorage.getItem('cms:editor:lang') || 'es') === 'en')
                        ? 'bg-caborca-cafe text-white rounded'
                        : 'text-gray-600 hover:bg-gray-200 rounded'
                    }`}
                  >
                    🇺🇸 EN
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Área de contenido */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
