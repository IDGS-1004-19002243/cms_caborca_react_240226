import React, { useState, useEffect } from 'react'
import EditButton from '../componentes/EditButton'
import BotonesPublicar from '../componentes/BotonesPublicar'
import { useToast } from '../context/ToastContext'
import { textosService } from '../api/textosService'
import { uploadImage } from '../api/uploadService'

const EditarNosotros = () => {
  const defaultContent = {
    hero: {
      badge: 'NUESTRA HISTORIA',
      title: 'Quiénes Somos',
      subtitle: '45 años de tradición, pasión y maestría artesanal',
      imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    origen: {
      badge: 'NUESTRO ORIGEN',
      title: 'El inicio de una aventura',
      paragraphs: [
        "Nuestra aventura inicia más o menos hace 45 años en el ocaso de una de las décadas más emocionantes del siglo pasado. Al igual que algunos de los movimientos culturales más importantes de la historia, Botas Caborca, también nació en los 70's.",
        "Para probar suerte dentro del mundo zapatero, Luis Torres Muñoz y sus dos hijos Luis y José Manuel montaron un pequeño taller de bota en León, Guanajuato, una de las ciudades con mayor tradición zapatera en México y el mundo.",
        "Iniciaron pequeños, sólo eran 6 trabajadores y fabricaban 12 pares al día. A la empresa le pusieron Botas Caborca en honor a un pequeño pueblo del norte de México, iniciando operaciones en Abril de 1978."
      ],
      imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    crecimiento: {
      title: 'De lo local a lo global',
      paragraphs: [
        'Durante algunos años se dedicaron a fabricar la tradicional bota vaquera hecha a mano y se concentraron en vender solamente dentro del territorio mexicano. Poco a poco el antiguo oficio de hacer bota a mano se fue profesionalizando y el sueño comenzaba a tomar forma.',
        'El año de 1986 fue histórico porque fue el año en que se empezaron a exportar los primeros pares a Estados Unidos. A partir de ahí, esta empresa ha pasado a tener un nombre reconocido dentro del mundo del calzado a nivel mundial.',
        'Año con año la empresa se fue haciendo más fuerte y comenzó a exportar a otras partes del mundo como Canadá, Japón e Italia. La compañía "Botas Caborca" se transformó en "Caborca Group".'
      ],
      imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    caborcaHoy: {
      title: 'Caborca Group Hoy',
      subtitle: 'Números que reflejan nuestro compromiso y crecimiento',
      stats: [
        { label: 'AÑOS DE HISTORIA', value: '45' },
        { label: 'MARCAS PROPIAS', value: '5' },
        { label: 'COLABORADORES', value: '800+' },
        { label: 'PARES SEMANALES', value: '8,000' }
      ],
      paragraph: 'En la actualidad Caborca Group cuenta con 4 plantas manufactureras cubriendo un área total de 30,000 metros cuadrados donde fabricamos alrededor de 8,000 pares semanales con la ayuda de más de 800 colaboradores.'
    },
    artesania: {
      badge: 'NUESTRO ARTE',
      title: 'Artesanía con legado',
      subtitle: 'Es un arte que requiere maestría y experiencia',
      paragraphs: [
        'Estamos orgullosos y realmente privilegiados de ser maestros en la artesanía de las botas vaqueras y de contar con tantos colaboradores talentosos y comprometidos que logran crear verdaderas y únicas obras de arte en cada par que fabricamos.',
        'En Grupo Caborca, hemos logrado unir dos mundos: el mundo tradicional de las botas vaqueras hechas a mano y el mundo de los procesos modernos de fabricación de calzado, lo que nos ha permitido alcanzar una calidad impecable y una alta productividad.'
      ],
      imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    proceso: {
      badge: 'NUESTRO PROCESO',
      title: 'Pasión por el detalle',
      paragraphs: [
        'Todo lo que hacemos en Grupo Caborca lo hacemos con pasión; amamos nuestra artesanía y la hacemos bien.',
        'Creamos las botas vaqueras más hermosas y cada par que es producido se somete a un proceso de fabricación compuesto por más de 200 pasos realizados según los estándares de calidad más altos.',
        'Trabajamos con esfuerzo y pasión.',
        'Más de cuatro décadas de trabajo arduo, construyendo un legado de tradición que es evidente en cada par de botas hechas por las manos talentosas de nuestros artesanos mexicanos.'
      ],
      stat: '+200'
    },
    legado: {
      title: 'Nuestro Legado',
      paragraphs: [
        'Generaciones de trabajo duro han forjado este legado. En 45 años de trabajo arduo hemos logrado consolidar una gran empresa que ha dejado su legado bien cimentado en la tradición botera del país.',
        'Nos sentimos orgullosos de nuestras raíces al igual que nos sentimos orgullosos de nuestros productos porque en ellos hemos materializado el futuro de nuestro sudor, nuestro esfuerzo y nuestra entrega.'
      ],
      tagline: 'En cada par de botas dejamos el alma y entregamos nuestro ser.'
    }
  };

  const [content, setContent] = useState(defaultContent);
  const [activeEdit, setActiveEdit] = useState(null);
  const [form, setForm] = useState({ title: '', body: '', image: null, subtitle: '', stats: [] });
  const { success, error } = useToast();

  useEffect(() => {
    const fetchTextos = async () => {
      try {
        const data = await textosService.getTextos('nosotros');
        if (data && Object.keys(data).length > 0) {
          setContent(data);
        }
      } catch (e) {
        console.error('Error loading content', e);
      }
    };
    fetchTextos();
  }, []);

  function openEditor(section) {
    const sec = content[section] || {};

    let bodyText = '';
    if (Array.isArray(sec.paragraphs)) {
      bodyText = sec.paragraphs.join('\n\n');
    } else if (typeof sec.paragraph === 'string') {
      bodyText = sec.paragraph;
    } else if (typeof sec.subtitle === 'string' && section !== 'caborcaHoy') {
      bodyText = sec.subtitle;
    }

    setForm({
      title: sec.title || '',
      body: bodyText,
      image: sec.imagen || null,
      subtitle: sec.subtitle || '',
      stats: sec.stats ? JSON.parse(JSON.stringify(sec.stats)) : []
    });
    setActiveEdit(section);
  };

  useEffect(() => {
    // Allow opening editor from external events
    const handler = (e) => {
      const section = e.detail?.section;
      if (section) openEditor(section);
    };
    window.addEventListener('cms:edit-section', handler);
    return () => window.removeEventListener('cms:edit-section', handler);
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...form.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setForm(prev => ({ ...prev, stats: newStats }));
  };

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      console.error(err);
      alert('Error al subir la imagen');
    }
  };

  const saveChanges = () => {
    if (!activeEdit) return;
    setContent(prev => {
      const updated = { ...prev };

      if (activeEdit === 'caborcaHoy') {
        updated[activeEdit] = { ...prev[activeEdit], ...form };
      } else {
        const sec = { ...prev[activeEdit], title: form.title, imagen: form.image };
        if (form.subtitle) sec.subtitle = form.subtitle;
        if (typeof prev[activeEdit]?.paragraphs !== 'undefined') {
          sec.paragraphs = form.body.split('\n\n').filter(p => p.trim());
        } else if (typeof prev[activeEdit]?.paragraph !== 'undefined') {
          sec.paragraph = form.body;
        } else if (!sec.subtitle) {
          sec.subtitle = form.body;
        }
        updated[activeEdit] = sec;
      }

      // Solo enviamos la sección editada para evitar reescribir cosas no tocadas
      textosService.updateTextos('nosotros', { [activeEdit]: updated[activeEdit] }).catch(e => console.error(e));
      return updated;
    });

    success('Sección actualizada con éxito');
    setActiveEdit(null);
  };
  const guardarBorrador = async () => {
    await textosService.updateTextos('nosotros', content);
  };

  return (
    <div className="bg-white text-caborca-cafe font-sans pb-28">
      <BotonesPublicar onGuardar={guardarBorrador} />
      <main>
        {/* HERO SECTION */}
        <section className="relative bg-gray-50">
          <div className="w-full">
            <div className="w-full">
              <div className="relative overflow-hidden shadow-sm">
                <img
                  src="https://blocks.astratic.com/img/general-img-landscape.png"
                  alt="Nosotros Caborca Boots"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-4 relative">
                    <EditButton section="hero" onOpen={() => openEditor('hero')} className="absolute top-4 right-4" size="sm" />
                    <div className="inline-block bg-caborca-cafe px-6 py-2 rounded-lg mb-6">
                      <p className="text-sm md:text-base font-medium tracking-widest uppercase text-white">
                        {content.hero.badge}
                      </p>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">{content.hero.title}</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                      {content.hero.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ORIGEN - Inicio de la historia */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-block bg-caborca-beige-suave px-4 py-2 rounded-full mb-6 relative">
                    <EditButton section="origen" onOpen={() => openEditor('origen')} className="absolute -right-12 top-0" size="sm" />
                    <span className="text-caborca-cafe text-sm font-semibold tracking-wider">{content.origen.badge}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif mb-6 text-caborca-cafe">{content.origen.title}</h2>
                  <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                    {content.origen.paragraphs.map((p, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://blocks.astratic.com/img/general-img-landscape.png"
                    alt="Historia Caborca"
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CRECIMIENTO */}
        <section className="py-20 bg-caborca-beige-suave">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <div className="w-full h-[380px] rounded-lg flex items-center justify-center">
                      <img src="https://blocks.astratic.com/img/general-img-landscape.png" alt="Imagen crecimiento" className="object-contain w-3/4 h-3/4 opacity-40" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-block bg-white rounded-full px-4 py-2 mb-6 relative">
                    <EditButton section="crecimiento" onOpen={() => openEditor('crecimiento')} className="absolute -right-12 top-0" size="sm" />
                    <span className="text-sm font-semibold tracking-wider text-caborca-cafe">CRECIMIENTO</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-serif mb-6 text-caborca-cafe">{content.crecimiento.title}</h2>
                  <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                    {content.crecimiento.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CABORCA GROUP HOY - ESTADÍSTICAS */}
        <section className="py-10 text-white" style={{ backgroundColor: '#332B1E' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="relative">
                <EditButton section="caborcaHoy" onOpen={() => openEditor('caborcaHoy')} className="absolute top-0 right-0" size="sm" />
                <h2 className="text-5xl font-serif mb-4">{content.caborcaHoy.title}</h2>
                <p className="mb-12 text-lg text-white/80">{content.caborcaHoy.subtitle}</p>
              </div>
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                {content.caborcaHoy.stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-5xl md:text-6xl font-bold">{s.value}</div>
                    <div className="uppercase text-sm tracking-wider mt-2">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-white/90 max-w-3xl mx-auto">{content.caborcaHoy.paragraph}</p>
            </div>
          </div>
        </section>

        {/* NUESTRO ARTE - ARTESANÍA CON LEGADO */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-block bg-caborca-beige-suave px-4 py-2 rounded-full mb-6 relative">
                    <EditButton section="artesania" onOpen={() => openEditor('artesania')} className="absolute -right-12 top-0" size="sm" />
                    <span className="text-caborca-cafe text-sm font-semibold tracking-wider">{content.artesania.badge}</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-serif mb-4 text-caborca-cafe">{content.artesania.title}</h2>
                  <p className="text-2xl text-caborca-negro/80 mb-6">{content.artesania.subtitle}</p>
                  <div className="space-y-6 text-caborca-negro/80 leading-relaxed">
                    {content.artesania.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-gray-50 rounded-2xl p-10 shadow-2xl">
                    <div className="w-full h-[420px] flex items-center justify-center">
                      <img src="https://blocks.astratic.com/img/general-img-landscape.png" alt="Artesanía" className="object-contain w-3/4 h-3/4 opacity-40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NUESTRO PROCESO - PASIÓN POR EL DETALLE */}
        <section className="py-10 bg-caborca-beige-suave">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="bg-gray-50 rounded-2xl p-10 shadow-2xl">
                    <div className="w-full h-[420px] flex items-center justify-center">
                      <img src="https://blocks.astratic.com/img/general-img-landscape.png" alt="Nuestro proceso" className="object-contain w-3/4 h-3/4 opacity-40" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-block bg-white rounded-full px-4 py-2 mb-6 relative">
                    <EditButton section="proceso" onOpen={() => openEditor('proceso')} className="absolute -right-12 top-0" size="sm" />
                    <span className="text-sm font-semibold tracking-wider text-caborca-cafe">{content.proceso.badge}</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-serif mb-6 text-caborca-cafe">{content.proceso.title}</h2>
                  <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                    {content.proceso.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <div className="text-white rounded-lg px-8 py-6" style={{ backgroundColor: '#332B1E' }}>
                    <div className="text-4xl md:text-5xl font-bold">{content.proceso.stat}</div>
                    <div className="mt-3 text-sm text-white/90">Pasos en el proceso de fabricación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NUESTRO LEGADO */}
        <section className="py-20 text-white" style={{ backgroundColor: '#232B26' }} data-cms-section="legado">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative">
                <EditButton section="legado" onOpen={() => openEditor('legado')} className="absolute top-0 right-0" size="sm" />
                <h2 className="text-5xl font-serif mb-6">{content.legado.title}</h2>
              </div>
              {content.legado.paragraphs.map((p, i) => (
                <p key={i} className="mb-6 text-lg text-white/80">{p}</p>
              ))}
              <p className="text-2xl md:text-3xl font-serif">{content.legado.tagline}</p>
            </div>
          </div>
        </section>

        {/* EDIT MODAL */}
        {activeEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 m-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-caborca-cafe flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Sección: {activeEdit}
                </h3>
                <button onClick={() => setActiveEdit(null)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Título</div>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                  />
                </label>

                {activeEdit === 'caborcaHoy' && (
                  <label className="block">
                    <div className="text-sm font-semibold text-gray-700 mb-1">Subtítulo</div>
                    <input
                      name="subtitle"
                      value={form.subtitle}
                      onChange={handleInput}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </label>
                )}

                {activeEdit === 'caborcaHoy' && (
                  <div className="md:col-span-2 bg-gray-50 p-3 rounded border border-gray-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Estadísticas</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {form.stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-1 bg-white p-2 rounded shadow-sm">
                          <span className="text-[10px] text-gray-400 font-bold uppercase">Stat {i + 1}</span>
                          <input
                            value={stat.value}
                            onChange={e => handleStatChange(i, 'value', e.target.value)}
                            placeholder="Valor"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-1"
                          />
                          <input
                            value={stat.label}
                            onChange={e => handleStatChange(i, 'label', e.target.value)}
                            placeholder="Etiqueta"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <label className="block md:col-span-2">
                  <div className="text-sm font-semibold text-gray-700 mb-1">
                    {activeEdit === 'caborcaHoy' ? 'Contenido (Párrafo inferior)' : 'Contenido (separar párrafos con línea en blanco)'}
                  </div>
                  <textarea
                    name="body"
                    value={form.body}
                    onChange={handleInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none text-sm"
                    rows={5}
                  />
                </label>

                {activeEdit !== 'caborcaHoy' && (
                  <div className="md:col-span-2 flex items-start gap-4 border border-gray-200 p-3 rounded bg-gray-50">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-700 mb-1">Imagen (opcional)</div>
                      <div className="flex gap-2 items-center">
                        <label
                          htmlFor="file-upload"
                          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 cursor-pointer text-sm font-medium"
                        >
                          Seleccionar Imagen
                        </label>
                        <span className="text-xs text-gray-500">Max 1MB</span>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImage}
                          className="hidden"
                          id="file-upload"
                        />
                      </div>
                    </div>
                    {form.image && (
                      <div className="rounded overflow-hidden border border-gray-300 bg-white p-1">
                        <img src={form.image} alt="preview" className="h-20 w-auto object-cover" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setActiveEdit(null)}
                  className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  Cancelar
                </button>
                <button
                  onClick={saveChanges}
                  className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors font-semibold flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default EditarNosotros;
