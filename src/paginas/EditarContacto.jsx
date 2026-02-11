import { useState, useRef, useEffect } from 'react'
import Header from '../componentes/Header'
import Footer from '../componentes/Footer'
import EditButton from '../componentes/EditButton'

export default function EditarContacto() {
  const [info, setInfo] = useState({
    telefono: '+52 123 456 789',
    email: 'contacto@caborcaboots.com',
    direccion: 'Caborca, Sonora, México',
  })

  const [formPreview, setFormPreview] = useState({
    titulo: 'Contáctanos',
    descripcion: 'Envía tus dudas o solicitudes y te responderemos a la brevedad.'
  })

  const [hero, setHero] = useState({
    badge: 'ESTAMOS AQUÍ PARA TI',
    titulo: 'Contacto',
    subtitulo: 'Nos encantaría saber de ti. Completa el formulario y nos pondremos en contacto contigo',
    imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
  })
  const [editarHero, setEditarHero] = useState(false)

  const [editarInfo, setEditarInfo] = useState(false)
  const [editarForm, setEditarForm] = useState(false)
  const [cards, setCards] = useState([
    { id: 'telefono', title: 'Teléfono', lines: ['+52 (555) 123-4567', 'Lun - Vie: 9:00 AM - 6:00 PM'] },
    { id: 'email', title: 'Correo Electrónico', lines: ['contacto@caborcaboots.com', 'Respuesta en 24-48 hrs'] },
    { id: 'ubicacion', title: 'Ubicación', lines: ['León, Guanajuato, México', 'Capital del calzado mexicano'] },
    { id: 'social', title: 'Síguenos', lines: ['instagram.com/caborca', 'facebook.com/caborca', 'tiktok.com/@caborca'] }
  ])
  const [activeCard, setActiveCard] = useState(null)
  const [cardForm, setCardForm] = useState({ id: '', title: '', lines: [] })
  const [editarMap, setEditarMap] = useState(false)
  const inputFileRef = useRef(null)
  const [guardando, setGuardando] = useState(false)

  const [idioma, setIdioma] = useState(() => {
    try { return localStorage.getItem('cms:editor:lang') || 'es'; } catch (e) { return 'es'; }
  });

  useEffect(() => {
    const handler = (e) => { const l = e && e.detail && e.detail.lang; if (l) setIdioma(l); };
    try { const stored = localStorage.getItem('cms:editor:lang'); if (stored) setIdioma(stored); } catch (e) {}
    window.addEventListener('cms:editor:lang-changed', handler);
    return () => window.removeEventListener('cms:editor:lang-changed', handler);
  }, []);

  const guardarCambios = async () => {
    setGuardando(true)
    try {
      // aquí debería ir la petición a backend
      await new Promise(r => setTimeout(r, 800))
      alert('✓ Cambios guardados')
    } catch (e) {
      alert('✗ Error al guardar')
    } finally {
      setGuardando(false)
      setEditarForm(false)
    }
  }

  const aplicarHero = () => {
    // ya estamos usando `hero` para renderizar, sólo cerramos el modal
    alert('✅ Cambios aplicados al hero')
    setEditarHero(false)
  }

  return (
    <>

        {/* HERO EDITABLE */}
        <section className="relative bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={hero.imagen} 
                  alt="Hero contacto" 
                  className="w-full h-[400px] md:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <div className="inline-block bg-caborca-cafe px-6 py-2 rounded-lg mb-6">
                      <p className="text-sm md:text-base font-medium tracking-widest uppercase text-white">
                        {hero.badge}
                      </p>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">{hero.titulo}</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                      {hero.subtitulo}
                    </p>
                  </div>
                </div>
                <EditButton section="hero" onOpen={() => setEditarHero(true)} className="absolute top-4 right-4 z-20" />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8 mt-8">

        <main className="space-y-12 mt-6">
          {/* Información de contacto */}
          <section data-cms-section="contacto-info" className="bg-white rounded-lg shadow p-6 relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif text-caborca-cafe mb-3">¿Cómo podemos ayudarte?</h2>
              <p className="text-caborca-cafe text-sm leading-relaxed max-w-2xl mx-auto">Nuestro equipo está listo para responder todas tus preguntas sobre nuestros productos, servicios o cualquier consulta que tengas.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cards.map(card => (
                <div key={card.id} className="bg-white p-5 rounded-lg shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow relative">
                  <EditButton section={`card:${card.id}`} onOpen={() => { setActiveCard(card.id); setCardForm({ ...card, lines: [...card.lines] }); }} className="absolute top-3 right-3 z-10" size="sm" />
                  <div className="w-12 h-12 bg-caborca-cafe rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-caborca-cafe text-sm mb-1">{card.title}</h3>
                    {card.lines.map((ln, i) => (<p key={i} className="text-caborca-cafe text-sm">{ln}</p>))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Formulario de contacto (estilo) */}
          <section data-cms-section="contacto-form" className="py-10 sm:py-17 relative" style={{backgroundColor: '#ECE7DF'}}>
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="text-center mb-6">
                  <h3 className="text-3xl md:text-4xl font-serif text-caborca-cafe mb-2">{formPreview.titulo}</h3>
                  <p className="text-sm text-caborca-cafe">{formPreview.descripcion}</p>
                </div>

                <form onSubmit={(e)=>{e.preventDefault(); alert('Formulario enviado (demo)')}} className="space-y-6">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-caborca-cafe mb-2">Nombre Completo</label>
                      <input placeholder="Tu nombre" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-caborca-cafe focus:ring-2 focus:ring-caborca-cafe/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-caborca-cafe mb-2">Correo Electrónico</label>
                      <input placeholder="correo@ejemplo.com" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-caborca-cafe focus:ring-2 focus:ring-caborca-cafe/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-caborca-cafe mb-2">Teléfono</label>
                      <input placeholder="+52 (555) 123-4567" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-caborca-cafe focus:ring-2 focus:ring-caborca-cafe/20 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-caborca-cafe mb-2">Mensaje</label>
                    <textarea placeholder="Cuéntanos cómo podemos ayudarte..." rows={6} className="w-full px-4 py-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-caborca-cafe focus:ring-2 focus:ring-caborca-cafe/20 transition-all resize-none" />
                  </div>

                  <div className="text-center pt-4">
                    <button type="submit" className="bg-caborca-cafe text-white font-bold tracking-wider text-sm px-12 py-4 rounded-lg shadow-lg hover:bg-caborca-negro transition-colors">
                      ENVIAR MENSAJE
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <EditButton section="form" onOpen={() => setEditarForm(true)} className="absolute top-4 right-4 z-10" size="sm" />
          </section>
        </main>

        {/* Modales */}
        {editarInfo && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-caborca-cafe">✏️ Información de Contacto</h3>
                <button onClick={() => setEditarInfo(false)} className="text-2xl">✕</button>
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Teléfono</label>
                <input value={info.telefono} onChange={(e) => setInfo(prev => ({ ...prev, telefono: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Email</label>
                <input value={info.email} onChange={(e) => setInfo(prev => ({ ...prev, email: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Dirección</label>
                <input value={info.direccion} onChange={(e) => setInfo(prev => ({ ...prev, direccion: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Horario</label>
                <input value={info.horario} onChange={(e) => setInfo(prev => ({ ...prev, horario: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Mapa (embed URL)</label>
                <input value={info.mapaUrl} onChange={(e) => setInfo(prev => ({ ...prev, mapaUrl: e.target.value }))} className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setEditarInfo(false)} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={guardarCambios} className="px-4 py-2 bg-caborca-cafe text-white rounded">✓ Aplicar</button>
              </div>
            </div>
          </div>
        )}

        {editarForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-caborca-cafe">✏️ Formulario</h3>
                <button onClick={() => setEditarForm(false)} className="text-2xl">✕</button>
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Título</label>
                <input value={formPreview.titulo} onChange={(e) => setFormPreview(prev => ({ ...prev, titulo: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Descripción</label>
                <textarea value={formPreview.descripcion} onChange={(e) => setFormPreview(prev => ({ ...prev, descripcion: e.target.value }))} className="w-full px-3 py-2 border rounded" rows={3} />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setEditarForm(false)} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={guardarCambios} className="px-4 py-2 bg-caborca-cafe text-white rounded">✓ Aplicar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: editar tarjeta individual */}
        {activeCard && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-caborca-cafe">✏️ Editar tarjeta: {cardForm.title}</h3>
                <button onClick={() => setActiveCard(null)} className="text-2xl">✕</button>
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Título</label>
                <input value={cardForm.title} onChange={(e) => setCardForm(prev => ({ ...prev, title: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Líneas (una por renglón)</label>
                <textarea value={cardForm.lines.join('\n')} onChange={(e) => setCardForm(prev => ({ ...prev, lines: e.target.value.split('\n') }))} className="w-full px-3 py-2 border rounded" rows={4} />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setActiveCard(null)} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={() => {
                  setCards(prev => prev.map(c => c.id === cardForm.id ? { ...c, title: cardForm.title, lines: cardForm.lines } : c));
                  setActiveCard(null);
                  alert('✅ Cambios aplicados');
                }} className="px-4 py-2 bg-caborca-cafe text-white rounded">✓ Aplicar</button>
              </div>
            </div>
          </div>
        )}

        {editarHero && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-caborca-cafe">✏️ Hero</h3>
                <button onClick={() => setEditarHero(false)} className="text-2xl">✕</button>
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Badge</label>
                <input value={hero.badge} onChange={(e) => setHero(prev => ({ ...prev, badge: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Título</label>
                <input value={hero.titulo} onChange={(e) => setHero(prev => ({ ...prev, titulo: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Subtítulo</label>
                <textarea value={hero.subtitulo} onChange={(e) => setHero(prev => ({ ...prev, subtitulo: e.target.value }))} className="w-full px-3 py-2 border rounded" rows={3} />
                <label className="block text-sm">Imagen (URL)</label>
                <input value={hero.imagen} onChange={(e) => setHero(prev => ({ ...prev, imagen: e.target.value }))} className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setEditarHero(false)} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={aplicarHero} className="px-4 py-2 bg-caborca-cafe text-white rounded">✓ Aplicar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}
