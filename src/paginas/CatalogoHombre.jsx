import { useState, useEffect, useRef } from 'react';

export default function CatalogoHombre() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Bota Vaquera Clásica', sku: 'HV-001', descripcion: 'Bota vaquera tradicional hecha a mano.', materiales: ['piel', 'suela cuero'], marca: 'Caborca', categoria: 'vaquera', destacado: false, imagen: '/images/bota-hombre-1.jpg', imagenes: ['/images/bota-hombre-1.jpg'], tags: ['vaquera','clásica'] },
    { id: 2, nombre: 'Bota Casual Premium', sku: 'HV-002', descripcion: 'Bota casual para uso diario con acabado premium.', materiales: ['piel'], marca: 'Caborca', categoria: 'casual', destacado: false, imagen: '/images/bota-hombre-2.jpg', imagenes: ['/images/bota-hombre-2.jpg'], tags: ['casual'] },
    { id: 3, nombre: 'Bota de Trabajo Industrial', sku: 'HV-003', descripcion: 'Diseñada para trabajo rudo, refuerzos y plantilla antideslizante.', materiales: ['piel','goma'], marca: 'Caborca', categoria: 'trabajo', destacado: false, imagen: '/images/bota-hombre-3.jpg', imagenes: ['/images/bota-hombre-3.jpg'], tags: ['trabajo'] },
  ]);

  const [filtro, setFiltro] = useState('todos');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [idioma, setIdioma] = useState('es');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const l = e && e.detail && e.detail.lang;
      if (l) setIdioma(l);
    };
    try { const stored = localStorage.getItem('cms:editor:lang'); if (stored) setIdioma(stored); } catch (e) {}
    window.addEventListener('cms:editor:lang-changed', handler);
    return () => window.removeEventListener('cms:editor:lang-changed', handler);
  }, []);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('cms:productos:featured') || '[]');
      if (Array.isArray(stored)) {
        const ids = stored.filter(p => p.origen === 'hombre').map(p => String(p.id));
        setProductos(prev => prev.map(prod => ({ ...prod, destacado: ids.includes(String(prod.id)) })));
      }
    } catch (e) {}
  }, []);

  const categorias = ['todos', 'vaquera', 'casual', 'trabajo'];
  const productosFiltrados = filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro);

  const abrirModal = (producto = null) => {
    setProductoEditando(producto ? { ...producto, imagenes: producto.imagenes || (producto.imagen ? [producto.imagen] : []) } : {
      id: Date.now(), nombre: '', sku: '', descripcion: '', materiales: [], marca: '', dimension: '', peso: '', cuidado: '', tags: [], categoria: 'vaquera', destacado: false, imagen: '', imagenes: []
    });
    setModalAbierto(true);
  };

  const persistProductos = (lista) => {
    try {
      const origen = 'hombre';
      const destacadosActuales = lista.filter(p => p.destacado).map(p => ({ ...p, origen }));
      let stored = [];
      try { stored = JSON.parse(localStorage.getItem('cms:productos:featured') || '[]'); } catch (e) { stored = []; }

      const otros = stored.filter(s => (s && s.origen) ? s.origen !== origen : true);
      const candidates = [...otros, ...destacadosActuales];
      const map = new Map();
      candidates.forEach(item => map.set(`${item.origen || 'unknown'}-${item.id}`, { ...item, origen: item.origen || 'unknown' }));
      const merged = Array.from(map.values());
      localStorage.setItem('cms:productos:featured', JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('cms:productos:updated', { detail: { productos: merged } }));
    } catch (e) { console.error('Error updating destacados', e); }
  };

  const guardarProducto = () => {
    let nuevos;
    if (productos.find(p => p.id === productoEditando.id)) nuevos = productos.map(p => p.id === productoEditando.id ? productoEditando : p);
    else nuevos = [...productos, productoEditando];
    setProductos(nuevos);
    persistProductos(nuevos);
    setModalAbierto(false);
    setProductoEditando(null);
  };

  const inputFileRef = useRef(null);
  const manejarCargarImagenes = async (e) => {
    const archivos = Array.from(e.target.files || []);
    if (archivos.length === 0) return;
    const maxFiles = 5; const maxBytesPerFile = 2 * 1024 * 1024;
    const allowed = archivos.slice(0, maxFiles);
    const readers = allowed.map(file => new Promise((res, rej) => {
      if (file.size > maxBytesPerFile) return rej(new Error('Un archivo excede el tamaño máximo de 2 MB')); const r = new FileReader(); r.onloadend = () => res(r.result); r.onerror = rej; r.readAsDataURL(file);
    }));
    try { const dataUrls = await Promise.all(readers); setProductoEditando(prev => ({ ...prev, imagenes: Array.from(new Set([...(prev.imagenes || []), ...dataUrls])).slice(0, maxFiles) })); }
    catch (err) { alert(err.message || 'Error al leer imágenes'); }
    if (inputFileRef.current) inputFileRef.current.value = null;
  };

  const eliminarImagen = (index) => setProductoEditando(prev => ({ ...prev, imagenes: (prev.imagenes || []).filter((_, i) => i !== index) }));
  const eliminarProducto = (id) => { if (confirm('¿Estás seguro de eliminar este producto?')) { const nuevos = productos.filter(p => p.id !== id); setProductos(nuevos); persistProductos(nuevos); } };
  const toggleDestacado = (id) => { const nuevos = productos.map(p => p.id === id ? { ...p, destacado: !p.destacado } : p); setProductos(nuevos); persistProductos(nuevos); };

  const guardarCambios = async () => { setGuardando(true); try { persistProductos(productos); await new Promise(r => setTimeout(r, 800)); alert('✅ Cambios guardados'); } catch (e) { alert('❌ Error'); } finally { setGuardando(false); } };

  return (
    <>
      <div className="space-y-6 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-playfair text-caborca-cafe mb-2">Catálogo Hombre</h3>
            <p className="text-sm text-gray-600">Gestiona los productos del catálogo de hombre</p>
          </div>
          <button onClick={() => abrirModal()} className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors">+ Nuevo Producto</button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
            <div className="flex space-x-2">
              {categorias.map(cat => (
                <button key={cat} onClick={() => setFiltro(cat)} className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${filtro === cat ? 'bg-caborca-cafe text-white' : 'bg-caborca-beige-suave text-caborca-cafe hover:bg-caborca-cafe/20'}`}>{cat}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
              <div className="relative aspect-square bg-gray-200">
                <img src={(producto.imagenes && producto.imagenes[0]) || producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=Bota'; }} />
                {producto.destacado && <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full">⭐ Destacado</span>}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button onClick={() => abrirModal(producto)} className="p-3 bg-white rounded-full hover:bg-blue-100 transition-colors">✏️</button>
                  <button onClick={() => toggleDestacado(producto.id)} className="p-3 bg-white rounded-full hover:bg-yellow-100 transition-colors">⭐</button>
                  <button onClick={() => eliminarProducto(producto.id)} className="p-3 bg-white rounded-full hover:bg-red-100 transition-colors">🗑️</button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-caborca-cafe mb-1">{producto.nombre}</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="px-2 py-1 bg-caborca-beige-suave text-caborca-cafe rounded capitalize">{producto.categoria}</span>
                  <span className="text-xs text-gray-500">SKU: {producto.sku}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalAbierto && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl p-6 m-4">
              <h3 className="text-xl font-playfair text-caborca-cafe mb-4">{productoEditando?.nombre ? 'Producto' : 'Nuevo Producto'}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Rellena los datos del producto. Puedes subir hasta 5 imágenes (arriba a la derecha verás la galería).</p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" value={productoEditando?.nombre || ''} onChange={(e) => setProductoEditando({ ...productoEditando, nombre: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                      <input type="text" value={productoEditando?.sku || ''} onChange={(e) => setProductoEditando({ ...productoEditando, sku: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                      <input type="text" value={productoEditando?.marca || ''} onChange={(e) => setProductoEditando({ ...productoEditando, marca: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea rows={3} value={productoEditando?.descripcion || ''} onChange={(e) => setProductoEditando({ ...productoEditando, descripcion: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Materiales (separados por coma)</label>
                    <input type="text" value={(productoEditando?.materiales || []).join(', ')} onChange={(e) => setProductoEditando({ ...productoEditando, materiales: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensiones / Peso / Cuidado (opcional)</label>
                    <input type="text" placeholder="Ej. 30x12x10 cm / 1.2kg / Limpiar con paño húmedo" value={productoEditando?.dimension || ''} onChange={(e) => setProductoEditando({ ...productoEditando, dimension: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (separados por coma)</label>
                    <input type="text" value={(productoEditando?.tags || []).join(', ')} onChange={(e) => setProductoEditando({ ...productoEditando, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select value={productoEditando?.categoria || 'vaquera'} onChange={(e) => setProductoEditando({ ...productoEditando, categoria: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe">
                      <option value="vaquera">Vaquera</option>
                      <option value="casual">Casual</option>
                      <option value="trabajo">Trabajo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Galería de imágenes (máx. 5)</label>
                    <div className="flex items-center gap-2 mb-3">
                      <input ref={inputFileRef} type="file" accept="image/*" multiple onChange={manejarCargarImagenes} className="hidden" />
                      <button type="button" onClick={() => inputFileRef.current && inputFileRef.current.click()} className="px-4 py-2 bg-caborca-beige-suave text-caborca-cafe rounded">Subir imágenes</button>
                      <span className="text-sm text-gray-500">Selecciona hasta 5 imágenes (2 MB máx c/u)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(productoEditando?.imagenes || []).map((img, idx) => (
                        <div key={idx} className="relative">
                          <img src={img} alt={`img-${idx}`} className="w-full h-24 object-cover rounded" />
                          <button type="button" onClick={() => eliminarImagen(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">✕</button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                      <input type="checkbox" id="destacado" checked={productoEditando?.destacado || false} onChange={(e) => setProductoEditando({ ...productoEditando, destacado: e.target.checked })} className="w-4 h-4 text-caborca-cafe" />
                      <label htmlFor="destacado" className="text-sm text-gray-700">Marcar como destacado</label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción completa</label>
                    <textarea rows={8} value={productoEditando?.descripcion || ''} onChange={(e) => setProductoEditando({ ...productoEditando, descripcion: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Materiales</label>
                      <input type="text" value={(productoEditando?.materiales || []).join(', ')} onChange={(e) => setProductoEditando({ ...productoEditando, materiales: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={() => setModalAbierto(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Cancelar</button>
                <button onClick={guardarProducto} className="px-4 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors">Guardar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
