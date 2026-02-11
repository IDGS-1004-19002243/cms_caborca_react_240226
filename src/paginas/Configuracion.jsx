import { useState } from 'react';

export default function Configuracion() {
  const [guardando, setGuardando] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState('general');
  const [idioma, setIdioma] = useState('es');

  useEffect(() => {
    const handler = (e) => {
      const l = e && e.detail && e.detail.lang;
      if (l) setIdioma(l);
    };
    try { const stored = localStorage.getItem('cms:editor:lang'); if (stored) setIdioma(stored); } catch (e) {}
    window.addEventListener('cms:editor:lang-changed', handler);
    return () => window.removeEventListener('cms:editor:lang-changed', handler);
  }, []);

  const [config, setConfig] = useState({
    general: {
      nombreSitio: 'Caborca Boots',
      descripcion: 'Botas artesanales de la más alta calidad',
      email: 'contacto@caborcaboots.com',
      telefono: '+52 662 123 4567',
      direccion: 'Av. Principal #123, Caborca, Sonora, México'
    },
    redesSociales: {
      facebook: 'https://facebook.com/caborcaboots',
      instagram: 'https://instagram.com/caborcaboots',
      twitter: 'https://twitter.com/caborcaboots',
      youtube: ''
    },
    seo: {
      metaTitulo: 'Caborca Boots | Botas Artesanales Mexicanas',
      metaDescripcion: 'Descubre las mejores botas artesanales de México. Tradición y calidad en cada par.',
      palabrasClave: 'botas, calzado, artesanal, mexicano, vaquero, western'
    },
    apariencia: {
      colorPrimario: '#9B8674',
      colorSecundario: '#D2B48C',
      mostrarPrecios: true,
      moneda: 'MXN'
    }
  });

  const secciones = [
    { id: 'general', nombre: 'General', icono: '⚙️' },
    { id: 'redesSociales', nombre: 'Redes Sociales', icono: '🌐' },
    { id: 'seo', nombre: 'SEO', icono: '🔍' },
    { id: 'apariencia', nombre: 'Apariencia', icono: '🎨' },
    { id: 'seguridad', nombre: 'Seguridad', icono: '🔒' }
  ];

  const guardarCambios = async () => {
    setGuardando(true);
    try {
      console.log('Guardando configuración:', config);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('✅ Configuración guardada correctamente');
    } catch (error) {
      alert('❌ Error al guardar');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-30">
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-6 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-caborca-cafe">
              Editor Visual - Configuración
            </h3>
            <div className="flex bg-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => setIdioma('es')}
                className={`px-3 py-1 text-sm transition-colors ${
                  idioma === 'es'
                    ? 'bg-caborca-cafe text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                🇲🇽 ES
              </button>
              <button
                onClick={() => setIdioma('en')}
                className={`px-3 py-1 text-sm transition-colors ${
                  idioma === 'en'
                    ? 'bg-caborca-cafe text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                🇺🇸 EN
              </button>
            </div>
          </div>
            <button
              onClick={guardarCambios}
              disabled={guardando}
              className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors disabled:opacity-50 font-semibold"
            >
              {guardando ? '⏳ Guardando...' : '💾 Guardar Cambios'}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-playfair text-caborca-cafe mb-2">
            Configuración del Sistema
          </h3>
          <p className="text-sm text-gray-600">
            Ajusta la configuración general del sitio web
          </p>
        </div>
        <button
          onClick={guardarCambios}
          disabled={guardando}
          className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro disabled:opacity-50"
        >
          {guardando ? '⏳ Guardando...' : '💾 Guardar Cambios'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de navegación */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-1">
              {secciones.map(seccion => (
                <button
                  key={seccion.id}
                  onClick={() => setSeccionActiva(seccion.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    seccionActiva === seccion.id
                      ? 'bg-caborca-cafe text-white'
                      : 'hover:bg-caborca-beige-suave text-caborca-negro'
                  }`}
                >
                  <span className="text-xl">{seccion.icono}</span>
                  <span className="text-sm font-medium">{seccion.nombre}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenido */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* General */}
            {seccionActiva === 'general' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-caborca-cafe mb-4">⚙️ Configuración General</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del sitio</label>
                    <input
                      type="text"
                      value={config.general.nombreSitio}
                      onChange={(e) => setConfig({...config, general: {...config.general, nombreSitio: e.target.value}})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email de contacto</label>
                    <input
                      type="email"
                      value={config.general.email}
                      onChange={(e) => setConfig({...config, general: {...config.general, email: e.target.value}})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={config.general.descripcion}
                    onChange={(e) => setConfig({...config, general: {...config.general, descripcion: e.target.value}})}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={config.general.telefono}
                      onChange={(e) => setConfig({...config, general: {...config.general, telefono: e.target.value}})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                    <input
                      type="text"
                      value={config.general.direccion}
                      onChange={(e) => setConfig({...config, general: {...config.general, direccion: e.target.value}})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Redes Sociales */}
            {seccionActiva === 'redesSociales' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-caborca-cafe mb-4">🌐 Redes Sociales</h4>
                
                {Object.entries(config.redesSociales).map(([red, url]) => (
                  <div key={red}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{red}</label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setConfig({
                        ...config, 
                        redesSociales: {...config.redesSociales, [red]: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder={`https://${red}.com/caborcaboots`}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* SEO */}
            {seccionActiva === 'seo' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-caborca-cafe mb-4">🔍 Optimización SEO</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Título</label>
                  <input
                    type="text"
                    value={config.seo.metaTitulo}
                    onChange={(e) => setConfig({...config, seo: {...config.seo, metaTitulo: e.target.value}})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">{config.seo.metaTitulo.length}/60 caracteres</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Descripción</label>
                  <textarea
                    value={config.seo.metaDescripcion}
                    onChange={(e) => setConfig({...config, seo: {...config.seo, metaDescripcion: e.target.value}})}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">{config.seo.metaDescripcion.length}/160 caracteres</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Palabras Clave</label>
                  <input
                    type="text"
                    value={config.seo.palabrasClave}
                    onChange={(e) => setConfig({...config, seo: {...config.seo, palabrasClave: e.target.value}})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Separadas por comas"
                  />
                </div>
              </div>
            )}

            {/* Apariencia */}
            {seccionActiva === 'apariencia' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-caborca-cafe mb-4">🎨 Apariencia</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Primario</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.apariencia.colorPrimario}
                        onChange={(e) => setConfig({...config, apariencia: {...config.apariencia, colorPrimario: e.target.value}})}
                        className="w-12 h-12 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.apariencia.colorPrimario}
                        onChange={(e) => setConfig({...config, apariencia: {...config.apariencia, colorPrimario: e.target.value}})}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Secundario</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.apariencia.colorSecundario}
                        onChange={(e) => setConfig({...config, apariencia: {...config.apariencia, colorSecundario: e.target.value}})}
                        className="w-12 h-12 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.apariencia.colorSecundario}
                        onChange={(e) => setConfig({...config, apariencia: {...config.apariencia, colorSecundario: e.target.value}})}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                    <select
                      value={config.apariencia.moneda}
                      onChange={(e) => setConfig({...config, apariencia: {...config.apariencia, moneda: e.target.value}})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="MXN">MXN - Peso Mexicano</option>
                      <option value="USD">USD - Dólar Estadounidense</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-3 pt-8">
                    <input
                      type="checkbox"
                      id="mostrarPrecios"
                      checked={config.apariencia.mostrarPrecios}
                      onChange={(e) => setConfig({...config, apariencia: {...config.apariencia, mostrarPrecios: e.target.checked}})}
                      className="w-5 h-5"
                    />
                    <label htmlFor="mostrarPrecios" className="text-sm text-gray-700">Mostrar precios en el sitio</label>
                  </div>
                </div>
              </div>
            )}

            {/* Seguridad */}
            {seccionActiva === 'seguridad' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-caborca-cafe mb-4">🔒 Seguridad</h4>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Ten cuidado al modificar estas opciones. Cambios incorrectos pueden afectar el acceso al sistema.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cambiar Contraseña</label>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Contraseña actual"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder="Nueva contraseña"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder="Confirmar nueva contraseña"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <button className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro">
                  Actualizar Contraseña
                </button>

                <hr className="my-6" />

                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Sesiones Activas</h5>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Windows • Chrome</p>
                        <p className="text-sm text-gray-500">Sesión actual • Ciudad de México</p>
                      </div>
                      <span className="px-3 py-1 bg-caborca-verde-light text-caborca-verde rounded-full text-sm">Activa</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
