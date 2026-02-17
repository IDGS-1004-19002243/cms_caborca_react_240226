import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

export default function EditarMantenimiento() {
    const { success, error: toastError } = useToast();
    const [content, setContent] = useState({
        titulo: 'Página en Construcción',
        subtitulo: 'ESTAMOS PREPARANDO ALGO INCREÍBLE',
        mensaje: 'Estamos trabajando arduamente para traerte una experiencia renovada.',
        imagenFondo: 'https://blocks.astratic.com/img/general-img-landscape.png',
        redes: {
            whatsapp: { url: 'https://wa.me/525551234567', enabled: true },
            facebook: { url: 'https://facebook.com', enabled: true },
            instagram: { url: 'https://instagram.com', enabled: true },
            tiktok: { url: 'https://tiktok.com', enabled: true },
            email: { url: 'mailto:contacto@caborca.com', enabled: true }
        }
    });
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('cms:mantenimiento');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Migrate old string format to object format if necessary
                const migratedRedes = {};
                if (parsed.redes) {
                    Object.keys(parsed.redes).forEach(key => {
                        const val = parsed.redes[key];
                        if (typeof val === 'string') {
                            migratedRedes[key] = { url: val, enabled: !!val };
                        } else {
                            migratedRedes[key] = val;
                        }
                    });
                    parsed.redes = { ...content.redes, ...migratedRedes };
                }
                setContent({ ...content, ...parsed });
            }
        } catch (e) { }
    }, []);

    const handleChange = (field, value) => {
        setContent(prev => ({ ...prev, [field]: value }));
    };

    const handleRedesChange = (network, field, value) => {
        setContent(prev => ({
            ...prev,
            redes: {
                ...prev.redes,
                [network]: {
                    ...prev.redes[network],
                    [field]: value
                }
            }
        }));
    };

    const guardarCambios = async () => {
        setGuardando(true);
        try {
            localStorage.setItem('cms:mantenimiento', JSON.stringify(content));
            await new Promise(r => setTimeout(r, 800));
            success('Configuración guardada correctamente');
        } catch (e) {
            toastError('Error al guardar');
        } finally {
            setGuardando(false);
        }
    };

    // Helper para iconos de redes (reutilizado)
    const getSocialIcon = (key) => {
        switch (key) {
            case 'whatsapp': return "M3 21l1.65-3.8C3.3 15.6 2.6 13.9 2.6 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10c-1.9 0-3.6-.7-5.2-1.9L3 21z";
            case 'facebook': return "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z";
            case 'instagram': return "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";
            case 'tiktok': return "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z";
            case 'email': return "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
            default: return "";
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] gap-6">
            {/* Panel de Edición (Izquierda o Arriba en móviles) */}
            <div className="w-full lg:w-2/5 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center bg-stripes-caborca">
                    <h3 className="font-bold text-caborca-cafe">Sección: Mantenimiento</h3>
                    <button
                        onClick={guardarCambios}
                        disabled={guardando}
                        className="text-xs bg-caborca-cafe text-white px-3 py-1.5 rounded hover:bg-caborca-negro disabled:opacity-50 transition-colors"
                    >
                        {guardando ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300">
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase border-b pb-1 tracking-wider">Contenido Principal</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                                <input
                                    type="text"
                                    value={content.titulo}
                                    onChange={(e) => handleChange('titulo', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Subtítulo (Uppercase)</label>
                                <input
                                    type="text"
                                    value={content.subtitulo}
                                    onChange={(e) => handleChange('subtitulo', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none uppercase"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Mensaje</label>
                                <textarea
                                    rows={3}
                                    value={content.mensaje}
                                    onChange={(e) => handleChange('mensaje', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-500 uppercase border-b pb-1 tracking-wider">Imagen de Fondo</h4>
                        <div className="bg-gray-50 p-3 rounded border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Preview & Carga (URL o Archivo)</label>
                            <div className="flex gap-4 items-start">
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
                                        <label className="cursor-pointer inline-flex items-center gap-1 bg-caborca-beige-suave text-caborca-cafe px-2 py-1 rounded text-xs font-bold hover:bg-caborca-cafe hover:text-white transition-colors whitespace-nowrap">
                                            <span>📂 Cargar</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onload = () => handleChange('imagenFondo', reader.result);
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase border-b pb-1 tracking-wider">Redes Sociales</h4>
                        <div className="divide-y divide-gray-100">
                            {['whatsapp', 'facebook', 'instagram', 'tiktok', 'email'].map((key) => (
                                <div key={key} className="py-3 flex items-start gap-3">
                                    <div className={`mt-2 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${content.redes?.[key]?.enabled ? 'bg-caborca-cafe text-white' : 'bg-gray-200 text-gray-400'}`}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={getSocialIcon(key)} /></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-bold uppercase text-gray-600">{key}</span>
                                            <input
                                                type="checkbox"
                                                checked={content.redes?.[key]?.enabled ?? true}
                                                onChange={(e) => handleRedesChange(key, 'enabled', e.target.checked)}
                                                className="rounded text-caborca-cafe focus:ring-caborca-cafe h-4 w-4 border-gray-300 cursor-pointer"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={content.redes?.[key]?.url || ''}
                                            onChange={(e) => handleRedesChange(key, 'url', e.target.value)}
                                            disabled={!(content.redes?.[key]?.enabled ?? true)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 transition-colors text-sm"
                                            placeholder={`https://${key}...`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Vista Previa (Derecha) - CLON EXACTO DE ENCONSTRUCCION.JSX */}
            <div className="w-full lg:w-3/5 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative group">

                <div className="relative w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white font-sans overflow-hidden p-6 text-center">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        {content.imagenFondo && (
                            <img
                                src={content.imagenFondo}
                                alt="Fondo"
                                className="w-full h-full object-cover opacity-50 transition-all duration-500"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 w-full max-w-2xl mx-auto transform scale-75 lg:scale-90 origin-center transition-transform duration-300">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-2xl tracking-tight">
                            {content.titulo}
                        </h1>

                        <p className="text-caborca-bronce font-bold text-lg md:text-xl mb-8 uppercase tracking-[0.2em] shadow-black drop-shadow-md">
                            {content.subtitulo}
                        </p>

                        <div className="w-24 h-1.5 bg-caborca-bronce mx-auto mb-8 rounded-full shadow-lg opacity-80"></div>

                        <p className="text-lg text-gray-200 max-w-lg mx-auto mb-10 leading-relaxed font-light drop-shadow-md whitespace-pre-wrap">
                            {content.mensaje}
                        </p>

                        <div className="flex justify-center gap-6">
                            {['whatsapp', 'facebook', 'instagram', 'tiktok', 'email'].map(key => {
                                const config = content.redes?.[key];
                                if (!config?.enabled || !config?.url) return null;
                                return (
                                    <div key={key} className="text-white opacity-80 hover:opacity-100 hover:text-caborca-cafe transition-all transform hover:scale-110 duration-300 cursor-default">
                                        <svg className="w-6 h-6 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={getSocialIcon(key)} />
                                        </svg>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
