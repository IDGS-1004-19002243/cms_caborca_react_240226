import { useState, useEffect } from 'react';

export default function EditarMantenimiento() {
    const [content, setContent] = useState({
        titulo: 'Sitio en Mantenimiento',
        mensaje: 'Estamos trabajando para mejorar tu experiencia. Regresamos pronto.',
        imagenFondo: '',
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
            alert('✅ Configuración guardada');
        } catch (e) {
            alert('❌ Error al guardar');
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-playfair text-caborca-cafe mb-2">Página de Mantenimiento</h3>
                    <p className="text-sm text-gray-600">Configura el mensaje que verán los usuarios cuando el sitio esté en mantenimiento.</p>
                </div>
                <button
                    onClick={guardarCambios}
                    disabled={guardando}
                    className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro disabled:opacity-50"
                >
                    {guardando ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: General Info */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-gray-800 border-b pb-2">Información General</h4>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input
                                type="text"
                                value={content.titulo}
                                onChange={(e) => handleChange('titulo', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe"
                                placeholder="Página en Construcción"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                            <input
                                type="text"
                                value={content.subtitulo || ''}
                                onChange={(e) => handleChange('subtitulo', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe"
                                placeholder="ESTAMOS PREPARANDO ALGO INCREÍBLE"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                            <textarea
                                rows={4}
                                value={content.mensaje}
                                onChange={(e) => handleChange('mensaje', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de Fondo</label>
                            <div className="flex items-center gap-4">
                                {content.imagenFondo && (
                                    <img src={content.imagenFondo} alt="Fondo" className="w-20 h-20 object-cover rounded border border-gray-200" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;
                                        const reader = new FileReader();
                                        reader.onload = () => handleChange('imagenFondo', reader.result);
                                        reader.readAsDataURL(file);
                                    }}
                                    className="block w-full text-sm text-gray-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-caborca-cafe file:text-white
                                      hover:file:bg-caborca-negro
                                    "
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Social Media */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2 mb-4">
                            <div>
                                <h4 className="text-lg font-bold text-gray-800">Redes Sociales</h4>
                                <p className="text-xs text-gray-500">Gestiona tus enlaces.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 shadow-sm overflow-hidden">
                            {[
                                { key: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/52...', icon: 'M3 21l1.65-3.8C3.3 15.6 2.6 13.9 2.6 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10c-1.9 0-3.6-.7-5.2-1.9L3 21z' },
                                { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                                { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z' },
                                { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@...', icon: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z' },
                                { key: 'email', label: 'Email', placeholder: 'mailto:contacto@caborca.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                            ].map((social) => (
                                <div key={social.key} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 transition-colors group">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${content.redes?.[social.key]?.enabled ? 'bg-caborca-cafe text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline justify-between">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{social.label}</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={content.redes?.[social.key]?.url || ''}
                                            onChange={(e) => handleRedesChange(social.key, 'url', e.target.value)}
                                            disabled={!(content.redes?.[social.key]?.enabled ?? true)}
                                            className="w-full p-0 border-0 focus:ring-0 bg-transparent text-sm text-gray-700 placeholder-gray-300 disabled:text-gray-300 h-5"
                                            placeholder={social.placeholder}
                                        />
                                    </div>

                                    <div className="flex-shrink-0 pl-2">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={content.redes?.[social.key]?.enabled ?? true}
                                                onChange={(e) => handleRedesChange(social.key, 'enabled', e.target.checked)}
                                            />
                                            <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-caborca-cafe"></div>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
