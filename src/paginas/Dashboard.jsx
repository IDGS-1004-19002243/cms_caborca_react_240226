import { Link } from 'react-router-dom';

export default function Dashboard() {
  const estadisticas = [
    {
      nombre: 'Total Productos',
      valor: '45',
      icono: '▣',
      cambio: '+5 este mes',
      color: 'bg-blue-500'
    },
    {
      nombre: 'Mensajes Nuevos',
      valor: '12',
      icono: '✉',
      cambio: '3 sin leer',
      color: 'bg-caborca-verde'
    },
    {
      nombre: 'Distribuidores',
      valor: '28',
      icono: '●',
      cambio: '2 pendientes',
      color: 'bg-purple-500'
    },
    {
      nombre: 'Visitas (mes)',
      valor: '2,450',
      icono: '◉',
      cambio: '+15% vs mes anterior',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Bienvenida */}
      <div className="bg-linear-to-r from-white to-caborca-beige-suave/40 rounded-2xl shadow-md border border-gray-100 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-3xl lg:text-4xl font-playfair text-caborca-cafe font-bold leading-tight">
              ¡Bienvenido al Panel de Administración!
            </h3>
            <p className="mt-2 text-base text-caborca-negro/75">
              Gestiona productos, distribuidores y contenido de tu sitio web Caborca Boots de forma rápida y segura.
            </p>
            {/* botones principales movidos al panel derecho */}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-caborca-cafe text-white px-4 py-2 rounded-lg shadow-sm hover:bg-caborca-cafe/90 transition">Ver sitio</a>
              <Link to="/editar-inicio" className="inline-flex items-center gap-2 border border-caborca-cafe text-caborca-cafe px-4 py-2 rounded-lg">Inicio</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {estadisticas.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icono}
              </div>
            </div>
            <h4 className="text-3xl font-bold text-caborca-cafe mb-1">
              {stat.valor}
            </h4>
            <p className="text-sm text-gray-600 mb-2">{stat.nombre}</p>
            <p className="text-xs text-gray-500">{stat.cambio}</p>
          </div>
        ))}
      </div>

      {/* Grid de dos columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Espacio reservado para futuras secciones */}
      </div>

      {/* Información del sistema eliminada del dashboard (mostrada en login) */}
    </div>
  );
}
