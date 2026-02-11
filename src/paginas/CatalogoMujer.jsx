import { useState, useEffect, useRef } from 'react';

export default function CatalogoMujer() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Bota Alta Elegante', precio: 4800, categoria: 'alta', stock: 20, destacado: false, imagen: '/images/bota-mujer-1.jpg' },
    { id: 2, nombre: 'Botín Casual', precio: 2800, categoria: 'botin', stock: 35, destacado: false, imagen: '/images/bota-mujer-2.jpg' },
    { id: 3, nombre: 'Bota Vaquera Femenina', precio: 4200, categoria: 'vaquera', stock: 15, destacado: false, imagen: '/images/bota-mujer-3.jpg' },
    { id: 4, nombre: 'Bota de Moda', precio: 3500, categoria: 'moda', stock: 22, destacado: false, imagen: '/images/bota-mujer-4.jpg' },
  ]);

  const [filtro, setFiltro] = useState('todos');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
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
  const [guardando, setGuardando] = useState(false);

  const categorias = ['todos', 'alta', 'botin', 'vaquera', 'moda'];

  const productosFiltrados = filtro === 'todos' 
    ? productos 
    : productos.filter(p => p.categoria === filtro);

  const abrirModal = (producto = null) => {
    setProductoEditando(producto || {
      id: Date.now(),
      nombre: '',
      precio: 0,
      categoria: 'alta',
      stock: 0,
      destacado: false,
      imagen: ''
    });
    setModalAbierto(true);
  };
  useEffect(() => {
    // On mount, load featured flags from shared localStorage (if any)
    try {
      const stored = JSON.parse(localStorage.getItem('cms:productos:featured') || '[]');
      if (Array.isArray(stored)) {
        const ids = stored.filter(p => p.origen === 'mujer').map(p => String(p.id));
        setProductos(prev => prev.map(prod => ({ ...prod, destacado: ids.includes(String(prod.id)) })));
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const persistProductos = (lista) => {
    // Merge this catalog's destacados into shared localStorage and dispatch update event
    try {
      const origen = 'mujer';
      const destacadosActuales = lista.filter(p => p.destacado).map(p => ({ ...p, origen }));
      let stored = [];
      try { stored = JSON.parse(localStorage.getItem('cms:productos:featured') || '[]'); } catch (e) { stored = []; }

      const otros = stored.filter(s => (s && s.origen) ? s.origen !== origen : true);
      const candidates = [...otros, ...destacadosActuales];

      const map = new Map();
      candidates.forEach(item => {
        const key = `${(item.origen || 'unknown')}-${item.id}`;
        map.set(key, { ...item, origen: item.origen || 'unknown' });
      });
      const merged = Array.from(map.values());

      localStorage.setItem('cms:productos:featured', JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('cms:productos:updated', { detail: { productos: merged } }));
    } catch (e) {
      console.error('Error dispatching productos updated event', e);
    }
  };
  const guardarProducto = () => {
    let nuevos;
    if (productos.find(p => p.id === productoEditando.id)) {
      nuevos = productos.map(p => p.id === productoEditando.id ? productoEditando : p);
    } else {
      nuevos = [...productos, productoEditando];
    }
    setProductos(nuevos);
    persistProductos(nuevos);
    setModalAbierto(false);
    setProductoEditando(null);
  };

  const inputFileRef = useRef(null);
  const manejarCargarImagen = (e) => {
    const archivo = e.target.files && e.target.files[0];
    if (!archivo) return;
    const maxBytes = 1024 * 1024; // 1MB
    if (archivo.size > maxBytes) {
      alert('El archivo es demasiado grande. Máximo 1 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const data = reader.result;
      setProductoEditando(prev => ({ ...prev, imagen: data }));
    };
    reader.readAsDataURL(archivo);
  };

  const eliminarProducto = (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      const nuevos = productos.filter(p => p.id !== id);
      setProductos(nuevos);
      persistProductos(nuevos);
    }
  };

  const toggleDestacado = (id) => {
    const nuevos = productos.map(p => p.id === id ? { ...p, destacado: !p.destacado } : p);
    setProductos(nuevos);
    persistProductos(nuevos);
  };

  const guardarCambios = async () => {
    setGuardando(true);
    try {
      console.log('Guardando catálogo mujer:', productos);
      persistProductos(productos);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('✅ Cambios guardados correctamente');
    } catch (error) {
      alert('❌ Error al guardar');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <>
      {/* Barra de editor removida */}

      <div className="space-y-6 mt-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-playfair text-caborca-cafe mb-2">
            Catálogo Mujer
          </h3>
          <p className="text-sm text-gray-600">
            Gestiona los productos del catálogo de mujer
          </p>
        </div>
        <button
          onClick={() => abrirModal()}
          className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors"
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
          <div className="flex space-x-2">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                  filtro === cat
                    ? 'bg-caborca-cafe text-white'
                    : 'bg-caborca-beige-suave text-caborca-cafe hover:bg-caborca-cafe/20'
                }`}
              >
                {cat === 'botin' ? 'Botín' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
            <div className="relative aspect-square bg-gray-200">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=Bota'; }}
              />
              {producto.destacado && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full">
                  ⭐ Destacado
                </span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button
                  onClick={() => abrirModal(producto)}
                  className="p-3 bg-white rounded-full hover:bg-blue-100 transition-colors"
                >
                  ✏️
                </button>
                <button
                  onClick={() => toggleDestacado(producto.id)}
                  className="p-3 bg-white rounded-full hover:bg-yellow-100 transition-colors"
                >
                  ⭐
                </button>
                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="p-3 bg-white rounded-full hover:bg-red-100 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-caborca-cafe mb-1">{producto.nombre}</h4>
              <p className="text-lg font-bold text-caborca-negro mb-2">
                ${producto.precio.toLocaleString('es-MX')}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="px-2 py-1 bg-caborca-beige-suave text-caborca-cafe rounded capitalize">
                  {producto.categoria === 'botin' ? 'Botín' : producto.categoria}
                </span>
                <span className={producto.stock < 10 ? 'text-red-500' : 'text-caborca-verde'}>
                  {producto.stock} en stock
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 m-4">
            <h3 className="text-xl font-playfair text-caborca-cafe mb-4">
              {productoEditando?.nombre ? 'Producto' : 'Nuevo Producto'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={productoEditando?.nombre || ''}
                  onChange={(e) => setProductoEditando({...productoEditando, nombre: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input
                    type="number"
                    value={productoEditando?.precio || 0}
                    onChange={(e) => setProductoEditando({...productoEditando, precio: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={productoEditando?.stock || 0}
                    onChange={(e) => setProductoEditando({...productoEditando, stock: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  value={productoEditando?.categoria || 'alta'}
                  onChange={(e) => setProductoEditando({...productoEditando, categoria: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe"
                >
                  <option value="alta">Bota Alta</option>
                  <option value="botin">Botín</option>
                  <option value="vaquera">Vaquera</option>
                  <option value="moda">Moda</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={productoEditando?.imagen || ''}
                    onChange={(e) => setProductoEditando({...productoEditando, imagen: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe"
                    placeholder="/images/producto.jpg"
                  />
                  <input ref={inputFileRef} type="file" accept="image/*" onChange={manejarCargarImagen} className="hidden" />
                  <button type="button" onClick={() => inputFileRef.current && inputFileRef.current.click()} className="px-4 py-2 bg-caborca-beige-suave text-caborca-cafe rounded">Cargar</button>
                </div>
                  {productoEditando?.imagen && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
                      <img src={productoEditando.imagen} alt="preview" className="w-32 h-32 object-cover rounded" />
                    </div>
                  )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="destacado"
                  checked={productoEditando?.destacado || false}
                  onChange={(e) => setProductoEditando({...productoEditando, destacado: e.target.checked})}
                  className="w-4 h-4 text-caborca-cafe"
                />
                <label htmlFor="destacado" className="text-sm text-gray-700">Marcar como destacado</label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setModalAbierto(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarProducto}
                className="px-4 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
