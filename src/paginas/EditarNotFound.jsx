import { useState, useEffect } from 'react';

export default function EditarNotFound() {
    const [content, setContent] = useState({
        titulo: 'Página No Encontrada',
        mensaje: 'Lo sentimos, la página que buscas no existe o ha sido movida.',
        textoBoton: 'Volver al Inicio'
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
                    <h3 className="text-xl font-playfair text-caborca-cafe mb-2">Página 404 (No Encontrada)</h3>
                    <p className="text-sm text-gray-600">Personaliza el mensaje de error cuando un usuario navega a una ruta inexistente.</p>
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
                <div className="grid gap-6 max-w-2xl">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título Grande</label>
                        <input
                            type="text"
                            value={content.titulo}
                            onChange={(e) => handleChange('titulo', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje Explicativo</label>
                        <textarea
                            rows={4}
                            value={content.mensaje}
                            onChange={(e) => handleChange('mensaje', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Texto del Botón</label>
                        <input
                            type="text"
                            value={content.textoBoton}
                            onChange={(e) => handleChange('textoBoton', e.target.value)}
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
            </div>
        </div>
    );
}
