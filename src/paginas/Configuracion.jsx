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
    try { const stored = localStorage.getItem('cms:editor:lang'); if (stored) setIdioma(stored); } catch (e) { }
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
    { id: 'redesSociales', nombre: 'Medio de contacto', icono: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
    { id: 'emailsContacto', nombre: 'Emails Contacto', icono: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { id: 'emailsDistribuidores', nombre: 'Emails Distribuidores', icono: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg> },
    { id: 'distribuidores', nombre: 'Gestión Distribuidores', icono: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { id: 'seguridad', nombre: 'Seguridad', icono: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> }
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
    } catch (e) { }
    try {
      const storedGeneral = localStorage.getItem('cms:config:general');
      if (storedGeneral) {
        const parsedG = JSON.parse(storedGeneral);
        if (parsedG && typeof parsedG === 'object') {
          setConfig(prev => ({ ...prev, general: { ...prev.general, ...parsedG } }));
        }
      }
    } catch (e) { }
    try {
      const storedEmails = localStorage.getItem('cms:config:emails');
      if (storedEmails) {
        const parsedE = JSON.parse(storedEmails);
        if (parsedE && typeof parsedE === 'object') {
          setConfig(prev => ({ ...prev, emails: { ...prev.emails, ...parsedE } }));
        }
      }
    } catch (e) { }
    try {
      const storedMap = localStorage.getItem('cms:config:distribuidoresMap');
      if (storedMap) {
        const parsedM = JSON.parse(storedMap);
        if (parsedM && typeof parsedM === 'object') {
          setConfig(prev => ({ ...prev, distribuidoresMap: { ...prev.distribuidoresMap, ...parsedM } }));
        }
      }
    } catch (e) { }
    try {
      const storedList = localStorage.getItem('cms:config:distribuidoresList');
      if (storedList) {
        const parsedL = JSON.parse(storedList);
        if (Array.isArray(parsedL)) {
          setConfig(prev => ({ ...prev, distribuidoresList: parsedL }));
        }
      }
    } catch (e) { }
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
    email: '',
    logo: '',
    clasificacion: 'nacional'
  });
  const [editIndex, setEditIndex] = useState(null);

  const resetDistribuidorForm = () => setDistribuidorForm({
    id: null, contactoNombre: '', negocioNombre: '', pais: '', estado: '', ciudad: '', colonia: '', calle: '', numeroExt: '', numeroInt: '', cp: '', tipoVenta: '', sitioWeb: '', telefono: '', email: '', logo: '', clasificacion: 'nacional'
  });

  const saveDistribuidorLocal = (list) => {
    try { localStorage.setItem('cms:config:distribuidoresList', JSON.stringify(list)); } catch (e) { }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDistribuidorForm(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
            {guardando ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Guardando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Guardar Cambios
              </span>
            )}
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
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${seccionActiva === seccion.id
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
                  <h4 className="text-lg font-semibold text-caborca-cafe mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    Medio de contacto
                  </h4>

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
                  <h4 className="text-lg font-semibold text-caborca-cafe mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Emails — Formulario Contacto
                  </h4>
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
                  <h4 className="text-lg font-semibold text-caborca-cafe mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                    Emails — Formulario Distribuidores
                  </h4>
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
                  <h4 className="text-lg font-semibold text-caborca-cafe mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Gestión de Distribuidores
                  </h4>

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
                              <div className="flex gap-3">
                                {d.logo && (
                                  <div className="h-16 w-16 flex-shrink-0 bg-gray-50 border rounded p-1 flex items-center justify-center">
                                    <img src={d.logo} alt={d.negocioNombre} className="max-h-full max-w-full object-contain" />
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium flex items-center gap-2">
                                    {d.negocioNombre || d.contactoNombre || 'Sin nombre'}
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${d.clasificacion === 'internacional' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                      {d.clasificacion || 'nacional'}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-500">{d.calle} {d.numeroExt}{d.numeroInt ? ' Int. ' + d.numeroInt : ''}, {d.colonia}, {d.ciudad}, {d.estado}, {d.pais} {d.cp}</div>
                                  {d.tipoVenta && <div className="inline-block mt-2 text-xs px-2 py-1 bg-caborca-beige-suave text-caborca-cafe rounded">{d.tipoVenta === 'tienda' ? 'Tienda física' : d.tipoVenta === 'online' ? 'Venta en línea' : d.tipoVenta === 'ambas' ? 'Tienda y en línea' : d.tipoVenta}</div>}
                                  {d.sitioWeb && <div className="mt-1"><a href={d.sitioWeb} target="_blank" rel="noreferrer" className="text-xs text-caborca-cafe/80 hover:underline">{d.sitioWeb}</a></div>}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button onClick={() => handleEditDistribuidor(i)} className="p-2 bg-caborca-cafe text-white rounded hover:bg-caborca-negro" title="Editar">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </button>
                                <button onClick={() => handleDeleteDistribuidor(i)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600" title="Eliminar">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <h5 className="font-medium text-sm mb-3">{editIndex === null ? 'Agregar distribuidor' : 'Editar distribuidor'}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="col-span-1 md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Logo de la empresa</label>
                          <div className="flex items-center gap-4">
                            {distribuidorForm.logo && (
                              <img src={distribuidorForm.logo} alt="Preview" className="h-12 w-auto object-contain border rounded p-1" />
                            )}
                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-caborca-beige-suave file:text-caborca-cafe hover:file:bg-caborca-beige-suave/80" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Clasificación</label>
                          <select value={distribuidorForm.clasificacion || 'nacional'} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, clasificacion: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Clasificación">
                            <option value="nacional">Nacional</option>
                            <option value="internacional">Internacional</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de contacto</label>
                          <input placeholder="Ej. Juan Pérez" value={distribuidorForm.contactoNombre} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, contactoNombre: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Nombre de contacto" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del negocio</label>
                          <input placeholder="Ej. Zapatería López" value={distribuidorForm.negocioNombre} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, negocioNombre: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Nombre del negocio" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                          <input placeholder="Ej. México" value={distribuidorForm.pais} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, pais: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="País" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                          <input placeholder="Ej. Sonora" value={distribuidorForm.estado} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, estado: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Estado" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                          <input placeholder="Ej. Caborca" value={distribuidorForm.ciudad} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, ciudad: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Ciudad" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de venta</label>
                          <select value={distribuidorForm.tipoVenta} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, tipoVenta: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Tipo de venta">
                            <option value="">Seleccionar...</option>
                            <option value="tienda">Tienda física</option>
                            <option value="online">Venta en línea</option>
                            <option value="ambas">Ambas</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Colonia</label>
                          <input placeholder="Ej. Centro" value={distribuidorForm.colonia} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, colonia: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Colonia" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Calle</label>
                          <input placeholder="Ej. Av. Principal" value={distribuidorForm.calle} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, calle: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Calle" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Número exterior</label>
                          <input placeholder="Ej. 123" value={distribuidorForm.numeroExt} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, numeroExt: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Número exterior" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Número interior</label>
                          <input placeholder="Ej. A" value={distribuidorForm.numeroInt} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, numeroInt: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Número interior" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Código postal</label>
                          <input placeholder="Ej. 85000" value={distribuidorForm.cp} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, cp: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Código postal" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sitio web</label>
                          <input placeholder="https://ejemplo.com" value={distribuidorForm.sitioWeb} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, sitioWeb: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Sitio web" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                          <input placeholder="(662) 123-4567" value={distribuidorForm.telefono} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, telefono: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Teléfono" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input placeholder="correo@ejemplo.com" value={distribuidorForm.email} onChange={(e) => setDistribuidorForm({ ...distribuidorForm, email: e.target.value })} className="w-full px-3 py-2 border rounded" aria-label="Email" />
                        </div>
                      </div>
                      <div className="mt-3 flex gap-3">
                        <button onClick={handleAddOrUpdateDistribuidor} className="px-4 py-2 bg-caborca-cafe text-white rounded flex items-center gap-2">
                          {editIndex === null ? (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                              Agregar
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                              Guardar
                            </>
                          )}
                        </button>
                        <button onClick={() => { resetDistribuidorForm(); setEditIndex(null); }} className="px-4 py-2 bg-gray-200 rounded flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}





              {/* Seguridad */}
              {seccionActiva === 'seguridad' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-caborca-cafe mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Seguridad
                  </h4>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-yellow-800 text-sm">
                      <svg className="w-5 h-5 inline mr-1 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      Ten cuidado al modificar estas opciones. Cambios incorrectos pueden afectar el acceso al sistema.
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

                  <button className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
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
