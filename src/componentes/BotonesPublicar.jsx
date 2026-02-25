import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { textosService } from '../api/textosService';
import { useToast } from '../context/ToastContext';

/**
 * BotonesPublicar - Botones flotantes reutilizables para todos los editores del CMS.
 * Props:
 *   onGuardar: función async que guarda el borrador (sin argumento de deploy)
 *   label?: texto del botón guardar (default: "Guardar Borrador")
 */
const BotonesPublicar = ({ onGuardar, label = 'Guardar Borrador' }) => {
    const { success, error: toastError } = useToast();
    const [guardando, setGuardando] = useState(false);
    const [publicando, setPublicando] = useState(false);
    const [domNode, setDomNode] = useState(null);

    useEffect(() => {
        setDomNode(document.getElementById('top-bar-actions'));
    }, []);

    const handleGuardar = async () => {
        setGuardando(true);
        try {
            await onGuardar();
            success('Borrador guardado correctamente.');
        } catch (err) {
            console.error(err);
            toastError('Error al guardar el borrador.');
        } finally {
            setGuardando(false);
        }
    };

    const handlePublicar = async () => {
        setPublicando(true);
        try {
            await onGuardar();
            await textosService.deployContent();
            success('¡Cambios PUBLICADOS! El portafolio ya muestra los nuevos contenidos.');
        } catch (err) {
            console.error(err);
            toastError('Error al publicar los cambios.');
        } finally {
            setPublicando(false);
        }
    };

    const disabled = guardando || publicando;

    const content = (
        <div className="flex items-center gap-3 mr-2">
            {/* Botón Guardar Borrador */}
            <button
                onClick={handleGuardar}
                disabled={disabled}
                className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-md font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${disabled ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-[#9C8A79] hover:bg-[#8A7968] text-white'
                    }`}
            >
                {guardando ? (
                    <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Guardando...</span>
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span>{label}</span>
                    </>
                )}
            </button>

            {/* Botón Publicar */}
            <button
                onClick={handlePublicar}
                disabled={disabled}
                className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-md font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${disabled ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-[#008035] hover:bg-[#00662a] text-white'
                    }`}
            >
                {publicando ? (
                    <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Publicando...</span>
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Publicar en Portafolio</span>
                    </>
                )}
            </button>
        </div>
    );

    if (domNode) {
        return createPortal(content, domNode);
    }

    return content;
};

export default BotonesPublicar;
