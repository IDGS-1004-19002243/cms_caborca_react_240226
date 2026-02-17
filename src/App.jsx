import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Login from './paginas/Login';
import LayoutAdmin from './componentes/LayoutAdmin';

import EditarInicio from './paginas/EditarInicio';
import EditarNosotros from './paginas/EditarNosotros';
import EditarContacto from './paginas/EditarContacto';
import CatalogoHombre from './paginas/CatalogoHombre';
import CatalogoMujer from './paginas/CatalogoMujer';
import EditarResponsabilidad from './paginas/EditarResponsabilidad';
import EditarDistribuidores from './paginas/EditarDistribuidores';
// import Mensajes from './paginas/Mensajes'; // Acceso a Mensajes comentado
import Configuracion from './paginas/Configuracion';
import EditarMantenimiento from './paginas/EditarMantenimiento';
import EditarNotFound from './paginas/EditarNotFound';

// Componente para proteger rutas
function RutaProtegida({ children }) {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta de login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas del admin */}
          <Route
            path="/"
            element={
              <RutaProtegida>
                <LayoutAdmin />
              </RutaProtegida>
            }
          >
            <Route index element={<Navigate to="/editar-inicio" replace />} />
            <Route path="editar-inicio" element={<EditarInicio />} />

            <Route path="editar-nosotros" element={<EditarNosotros />} />
            <Route path="editar-contacto" element={<EditarContacto />} />

            <Route path="editar-catalogo-hombre" element={<CatalogoHombre />} />
            <Route path="editar-catalogo-mujer" element={<CatalogoMujer />} />
            <Route path="editar-responsabilidad" element={<EditarResponsabilidad />} />
            <Route path="editar-distribuidores" element={<EditarDistribuidores />} />

            {/* Ruta de mensajes comentada */}
            {/* <Route path="mensajes" element={<Mensajes />} /> */}

            <Route path="editar-configuracion" element={<Configuracion />} />
            <Route path="editar-mantenimiento" element={<EditarMantenimiento />} />
            <Route path="editar-notfound" element={<EditarNotFound />} />
          </Route>

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
