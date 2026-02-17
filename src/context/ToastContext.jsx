import React, { createContext, useContext, useState, useEffect } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    };

    const success = (message) => addToast(message, 'success');
    const error = (message) => addToast(message, 'error');
    const info = (message) => addToast(message, 'info');

    return (
        <ToastContext.Provider value={{ addToast, success, error, info }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
              min-w-[300px] px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300 animate-slide-in
              ${toast.type === 'success' ? 'bg-caborca-cafe text-white' : ''}
              ${toast.type === 'error' ? 'bg-red-600 text-white' : ''}
              ${toast.type === 'info' ? 'bg-blue-600 text-white' : ''}
            `}
                    >
                        {toast.type === 'success' && (
                            <svg className="w-5 h-5 bg-white text-caborca-cafe rounded-full p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        {toast.type === 'error' && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                        <p className="font-medium text-sm">{toast.message}</p>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
