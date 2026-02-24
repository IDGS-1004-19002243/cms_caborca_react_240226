import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { uploadImage } from '../api/uploadService';

export default function EditarNotFound() {
    const { success, error: toastError } = useToast();
    const [content, setContent] = useState({
        titulo: '¡Esa ruta no existe, vaquero!',
        mensaje: 'Parece que te has alejado demasiado del camino.\nNo te preocupes, endereza las riendas y vuelve con nosotros.',
        textoBoton: 'Volver al pueblito',
        imagenFondo: 'https://blocks.astratic.com/img/general-img-landscape.png'
    });
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('cms:notfound');
            if (stored) setContent(JSON.parse(stored));
        } catch (e) { }
    }, []);

    const handleChange = (field, value) => {
        setContent(prev => ({ ...prev, [field]: value }));
    };

    const guardarCambios = async () => {
        setGuardando(true);
        try {
            localStorage.setItem('cms:notfound', JSON.stringify(content));
            await new Promise(r => setTimeout(r, 800));
            success('Configuración guardada');
        } catch (e) {
            toastError('Error al guardar');
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] gap-6">
            {/* Panel de Edición (Izquierda o Arriba en móviles) */}
            <div className="w-full lg:w-2/5 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-caborca-cafe">Sección: Página no Encontrada (404)</h3>
                    <button
                        onClick={guardarCambios}
                        disabled={guardando}
                        className="text-xs bg-caborca-cafe text-white px-3 py-1.5 rounded hover:bg-caborca-negro disabled:opacity-50 transition-colors"
                    >
                        {guardando ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Título Principal</label>
                            <input
                                type="text"
                                value={content.titulo}
                                onChange={(e) => handleChange('titulo', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Texto del Botón</label>
                            <input
                                type="text"
                                value={content.textoBoton}
                                onChange={(e) => handleChange('textoBoton', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Mensaje</label>
                            <textarea
                                rows={3}
                                value={content.mensaje}
                                onChange={(e) => handleChange('mensaje', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Imagen de Fondo</label>
                        <div className="bg-gray-50 p-3 rounded border border-gray-200">
                            <div className="flex gap-4 items-center">
                                <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0 border border-gray-300">
                                    {content.imagenFondo ? (
                                        <img src={content.imagenFondo} alt="Fondo" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-1">Sin imagen</div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={content.imagenFondo}
                                            onChange={(e) => handleChange('imagenFondo', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                            placeholder="URL de la imagen"
                                        />
                                    </div>
                                    <div className="text-right">
                                        <label className="cursor-pointer inline-flex items-center gap-2 bg-caborca-beige-suave text-caborca-cafe px-3 py-1 rounded text-xs font-bold hover:bg-caborca-cafe hover:text-white transition-colors">
                                            <span>📂 Cargar</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        try {
                                                            const url = await uploadImage(file);
                                                            handleChange('imagenFondo', url);
                                                        } catch (err) {
                                                            toastError('Error al subir la imagen');
                                                        }
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {content.imagenFondo && (
                                <div className="mt-2 text-right">
                                    <button
                                        onClick={() => handleChange('imagenFondo', '')}
                                        className="text-xs text-red-500 hover:text-red-700 underline font-semibold"
                                    >
                                        Eliminar imagen actual
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Vista Previa (Derecha) - CLON EXACTO DE NOTFOUND.JSX */}
            <div className="w-full lg:w-3/5 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative group">

                {/* Contenido Clonado */}
                <div className="relative w-full h-full flex items-center justify-center bg-gray-900 text-white font-sans overflow-hidden p-6">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        {content.imagenFondo && (
                            <img
                                src={content.imagenFondo}
                                alt="Página no encontrada"
                                className="w-full h-full object-cover opacity-50 transition-all duration-500"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center w-full max-w-2xl mx-auto transform scale-75 lg:scale-90 origin-center transition-transform duration-300">
                        <h1 className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-serif font-bold text-caborca-bronce leading-none select-none opacity-80 animate-pulse" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                            404
                        </h1>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-caborca-beige tracking-wide uppercase">
                            {content.titulo}
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed whitespace-pre-line">
                            {content.mensaje}
                        </p>
                        <button className="bg-caborca-cafe hover:bg-caborca-negro text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-caborca-cafe/50 flex items-center gap-2 mx-auto">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>{content.textoBoton}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
