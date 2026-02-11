import { useState, useEffect } from 'react';

export default function Configuracion() {
  const [guardando, setGuardando] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState('redesSociales');
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
      instagram: { url: 'https://instagram.com/caborcaboots', show: true },
      facebook: { url: 'https://facebook.com/caborcaboots', show: true },
      twitter: { url: 'https://twitter.com/caborcaboots', show: false },
      email: { url: 'contacto@caborcaboots.com', show: true },
      youtube: { url: '', show: false },
      tiktok: { url: 'https://tiktok.com/@caborca', show: false }
    },
    emails: {
      contacto: ['contacto@caborca.com'],
      distribuidores: ['distribuidores@caborca.com']
    },
    distribuidoresMap: {
      mapTitle: 'Encuentra a nuestros distribuidores',
      mapText: 'Ubica los puntos de venta oficiales en el mapa',
      mapSrc: ''
    }
    ,
    distribuidoresList: []
  });

  const secciones = [
    { id: 'redesSociales', nombre: 'Medio de contacto', icono: '📬' },
    { id: 'emailsContacto', nombre: 'Emails Contacto', icono: '✉️' },
    { id: 'emailsDistribuidores', nombre: 'Emails Distribuidores', icono: '📨' },
    
    { id: 'distribuidores', nombre: 'Gestión Distribuidores', icono: '📍' },
    { id: 'seguridad', nombre: 'Seguridad', icono: '🔒' }
  ];

  const guardarCambios = async () => {
    setGuardando(true);
    try {
      console.log('Guardando configuración:', config);
      try {
        localStorage.setItem('cms:config:medioContacto', JSON.stringify(config.redesSociales));
        localStorage.setItem('cms:config:general', JSON.stringify(config.general));
        localStorage.setItem('cms:config:emails', JSON.stringify(config.emails));
        localStorage.setItem('cms:config:distribuidoresMap', JSON.stringify(config.distribuidoresMap));
        localStorage.setItem('cms:config:distribuidoresList', JSON.stringify(config.distribuidoresList || []));
      } catch (e) {
        console.warn('No se pudo persistir la configuración en localStorage', e);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('✅ Configuración guardada correctamente');
    } catch (error) {
      alert('❌ Error al guardar');
    } finally {
      setGuardando(false);
    }
  };

  // Cargar configuración persistida (si existe)
  useEffect(() => {
    try {
      const storedRedes = localStorage.getItem('cms:config:medioContacto');
      if (storedRedes) {
        const parsed = JSON.parse(storedRedes);
        if (parsed && typeof parsed === 'object') {
          setConfig(prev => ({ ...prev, redesSociales: { ...prev.redesSociales, ...parsed } }));
        }
      }
    } catch (e) {}
    try {
      const storedGeneral = localStorage.getItem('cms:config:general');
      if (storedGeneral) {
        const parsedG = JSON.parse(storedGeneral);
        if (parsedG && typeof parsedG === 'object') {
          setConfig(prev => ({ ...prev, general: { ...prev.general, ...parsedG } }));
        }
      }
    } catch (e) {}
    try {
      const storedEmails = localStorage.getItem('cms:config:emails');
      if (storedEmails) {
        const parsedE = JSON.parse(storedEmails);
        if (parsedE && typeof parsedE === 'object') {
          setConfig(prev => ({ ...prev, emails: { ...prev.emails, ...parsedE } }));
        }
      }
    } catch (e) {}
    try {
      const storedMap = localStorage.getItem('cms:config:distribuidoresMap');
      if (storedMap) {
        const parsedM = JSON.parse(storedMap);
        if (parsedM && typeof parsedM === 'object') {
          setConfig(prev => ({ ...prev, distribuidoresMap: { ...prev.distribuidoresMap, ...parsedM } }));
        }
      }
    } catch (e) {}
    try {
      const storedList = localStorage.getItem('cms:config:distribuidoresList');
      if (storedList) {
        const parsedL = JSON.parse(storedList);
        if (Array.isArray(parsedL)) {
          setConfig(prev => ({ ...prev, distribuidoresList: parsedL }));
        }
      }
    } catch (e) {}
  }, []);

  // Estados locales para formulario de distribuidores
  const [distribuidorForm, setDistribuidorForm] = useState({
    id: null,
    contactoNombre: '',
    negocioNombre: '',
    pais: '',
    estado: '',
    ciudad: '',
    colonia: '',
    calle: '',
    numeroExt: '',
    numeroInt: '',
    cp: '',
    tipoVenta: '',
    sitioWeb: '',
    telefono: '',
    email: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  const resetDistribuidorForm = () => setDistribuidorForm({
    id: null, contactoNombre: '', negocioNombre: '', pais: '', estado: '', ciudad: '', colonia: '', calle: '', numeroExt: '', numeroInt: '', cp: '', tipoVenta: '', sitioWeb: '', telefono: '', email: ''
  });

  const saveDistribuidorLocal = (list) => {
    try { localStorage.setItem('cms:config:distribuidoresList', JSON.stringify(list)); } catch (e) {}
  };

  const handleAddOrUpdateDistribuidor = () => {
    const item = { ...distribuidorForm, id: distribuidorForm.id || Date.now() };
    let next = [];
    if (editIndex === null) {
      next = [...(config.distribuidoresList || []), item];
    } else {
      next = (config.distribuidoresList || []).map((d, i) => i === editIndex ? item : d);
    }
    setConfig(prev => ({ ...prev, distribuidoresList: next }));
    saveDistribuidorLocal(next);
    resetDistribuidorForm();
    setEditIndex(null);
  };

  const handleEditDistribuidor = (index) => {
    const d = config.distribuidoresList[index];
    if (!d) return;
    setDistribuidorForm({ ...d });
    setEditIndex(index);
  };

  const handleDeleteDistribuidor = (index) => {
    const next = (config.distribuidoresList || []).filter((_, i) => i !== index);
    setConfig(prev => ({ ...prev, distribuidoresList: next }));
    saveDistribuidorLocal(next);
    if (editIndex === index) { resetDistribuidorForm(); setEditIndex(null); }
  };

  return (
    <>

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
            

            {/* Medio de contacto */}
            {seccionActiva === 'redesSociales' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-caborca-cafe mb-4">📬 Medio de contacto</h4>

                <p className="text-sm text-gray-600">Elige qué iconos sociales se muestran en el pie de página y edita sus enlaces.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(config.redesSociales).map(([red, data]) => (
                    <div key={red} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 capitalize">{red}</label>
                        <label className="inline-flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={!!data.show}
                            onChange={(e) => setConfig({
                              ...config,
                              redesSociales: { ...config.redesSociales, [red]: { ...data, show: e.target.checked } }
                            })}
                            className="w-4 h-4"
                          />
                          <span className="text-xs text-gray-500">Mostrar</span>
                        </label>
                      </div>

                          <div className="mt-2">
                            <input
                              type={red === 'email' ? 'email' : 'url'}
                              value={data.url || ''}
                              onChange={(e) => setConfig({
                                ...config,
                                redesSociales: { ...config.redesSociales, [red]: { ...data, url: e.target.value } }
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder={red === 'email' ? 'correo@ejemplo.com' : `https://${red}.com/tu-cuenta`}
                            />
                          </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emails Contacto */}
            {seccionActiva === 'emailsContacto' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-caborca-cafe mb-4">✉️ Emails — Formulario Contacto</h4>
                <p className="text-sm text-gray-600">Escribe una dirección de email por línea. Estos serán los destinatarios cuando se envíe el formulario de contacto.</p>
                <textarea
                  rows={6}
                  value={(config.emails.contacto || []).join('\n')}
                  onChange={(e) => setConfig({ ...config, emails: { ...config.emails, contacto: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            {/* Emails Distribuidores */}
            {seccionActiva === 'emailsDistribuidores' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-caborca-cafe mb-4">📨 Emails — Formulario Distribuidores</h4>
                <p className="text-sm text-gray-600">Escribe una dirección de email por línea. Estos serán los destinatarios cuando se envíe el formulario de distribuidores.</p>
                <textarea
                  rows={6}
                  value={(config.emails.distribuidores || []).join('\n')}
                  onChange={(e) => setConfig({ ...config, emails: { ...config.emails, distribuidores: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            

            {/* Gestión Distribuidores */}
            {seccionActiva === 'distribuidores' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-caborca-cafe mb-4">📍 Gestión de Distribuidores</h4>

                <p className="text-sm text-gray-600">Administra distribuidores validados. Completa los datos para que aparezcan en el mapa y listados públicos.</p>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Distribuidores existentes</h5>
                    {(config.distribuidoresList || []).length === 0 ? (
                      <p className="text-xs text-gray-500">No hay distribuidores aún.</p>
                    ) : (
                      <ul className="space-y-2">
                        {(config.distribuidoresList || []).map((d, i) => (
                          <li key={d.id || i} className="flex items-start justify-between bg-white rounded-lg p-3 border">
                            <div>
                              <div className="font-medium">{d.negocioNombre || d.contactoNombre || 'Sin nombre'}</div>
                              <div className="text-xs text-gray-500">{d.calle} {d.numeroExt}{d.numeroInt ? ' Int. ' + d.numeroInt : ''}, {d.colonia}, {d.ciudad}, {d.estado}, {d.pais} {d.cp}</div>
                                {d.tipoVenta && <div className="inline-block mt-2 text-xs px-2 py-1 bg-caborca-beige-suave text-caborca-cafe rounded">{d.tipoVenta === 'tienda' ? 'Tienda física' : d.tipoVenta === 'online' ? 'Venta en línea' : d.tipoVenta === 'ambas' ? 'Tienda y en línea' : d.tipoVenta}</div>}
                              {d.sitioWeb && <a href={d.sitioWeb} target="_blank" rel="noreferrer" className="text-xs text-caborca-cafe/80">{d.sitioWeb}</a>}
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleEditDistribuidor(i)} className="px-3 py-1 bg-caborca-cafe text-white rounded">Editar</button>
                              <button onClick={() => handleDeleteDistribuidor(i)} className="px-3 py-1 bg-red-500 text-white rounded">Eliminar</button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <h5 className="font-medium text-sm mb-3">{editIndex === null ? 'Agregar distribuidor' : 'Editar distribuidor'}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de contacto</label>
                        <input placeholder="Ej. Juan Pérez" value={distribuidorForm.contactoNombre} onChange={(e)=>setDistribuidorForm({...distribuidorForm, contactoNombre: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Nombre de contacto" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del negocio</label>
                        <input placeholder="Ej. Zapatería López" value={distribuidorForm.negocioNombre} onChange={(e)=>setDistribuidorForm({...distribuidorForm, negocioNombre: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Nombre del negocio" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                        <input placeholder="Ej. México" value={distribuidorForm.pais} onChange={(e)=>setDistribuidorForm({...distribuidorForm, pais: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="País" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <input placeholder="Ej. Sonora" value={distribuidorForm.estado} onChange={(e)=>setDistribuidorForm({...distribuidorForm, estado: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Estado" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                        <input placeholder="Ej. Caborca" value={distribuidorForm.ciudad} onChange={(e)=>setDistribuidorForm({...distribuidorForm, ciudad: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Ciudad" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de venta</label>
                        <select value={distribuidorForm.tipoVenta} onChange={(e)=>setDistribuidorForm({...distribuidorForm, tipoVenta: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Tipo de venta">
                          <option value="">Seleccionar...</option>
                          <option value="tienda">Tienda física</option>
                          <option value="online">Venta en línea</option>
                          <option value="ambas">Ambas</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Colonia</label>
                        <input placeholder="Ej. Centro" value={distribuidorForm.colonia} onChange={(e)=>setDistribuidorForm({...distribuidorForm, colonia: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Colonia" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Calle</label>
                        <input placeholder="Ej. Av. Principal" value={distribuidorForm.calle} onChange={(e)=>setDistribuidorForm({...distribuidorForm, calle: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Calle" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Número exterior</label>
                        <input placeholder="Ej. 123" value={distribuidorForm.numeroExt} onChange={(e)=>setDistribuidorForm({...distribuidorForm, numeroExt: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Número exterior" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Número interior</label>
                        <input placeholder="Ej. A" value={distribuidorForm.numeroInt} onChange={(e)=>setDistribuidorForm({...distribuidorForm, numeroInt: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Número interior" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Código postal</label>
                        <input placeholder="Ej. 85000" value={distribuidorForm.cp} onChange={(e)=>setDistribuidorForm({...distribuidorForm, cp: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Código postal" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sitio web</label>
                        <input placeholder="https://ejemplo.com" value={distribuidorForm.sitioWeb} onChange={(e)=>setDistribuidorForm({...distribuidorForm, sitioWeb: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Sitio web" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input placeholder="(662) 123-4567" value={distribuidorForm.telefono} onChange={(e)=>setDistribuidorForm({...distribuidorForm, telefono: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Teléfono" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input placeholder="correo@ejemplo.com" value={distribuidorForm.email} onChange={(e)=>setDistribuidorForm({...distribuidorForm, email: e.target.value})} className="w-full px-3 py-2 border rounded" aria-label="Email" />
                      </div>
                    </div>
                    <div className="mt-3 flex gap-3">
                      <button onClick={handleAddOrUpdateDistribuidor} className="px-4 py-2 bg-caborca-cafe text-white rounded">{editIndex === null ? 'Agregar' : 'Guardar'}</button>
                      <button onClick={() => { resetDistribuidorForm(); setEditIndex(null); }} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                    </div>
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
