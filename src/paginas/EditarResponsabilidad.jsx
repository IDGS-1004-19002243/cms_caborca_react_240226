import React, { useState, useEffect } from 'react';
import EditButton from '../componentes/EditButton';

export default function EditarResponsabilidad() {
  const defaultContent = {
    hero: {
      badge: 'COMPROMISO CON EL FUTURO',
      title: 'Responsabilidad Ambiental',
      subtitle: 'Nuestro compromiso con el planeta y las futuras generaciones a través de prácticas sostenibles',
      image: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    compania: {
      title: 'Compañía\nresponsable',
      p1: 'Como empresa, elegimos conscientemente preocuparnos por mejorar el mundo social, económico y ambiental que nos rodea. Por lo tanto, somos una empresa socialmente responsable que busca lograr un equilibrio mediante la adopción de prácticas, programas, actividades y sistemas de gestión adecuados.',
      p2: 'También basamos nuestras decisiones en ideales éticos y valores humanos, prestamos especial atención a las leyes laborales y a los estándares relacionados con el medio ambiente y el desarrollo sostenible.',
      highlight: 'Hemos asumido la tarea de crear programas estratégicos para dar un destino a todos los elementos y materiales que participan directa o indirectamente en la fabricación de nuestras botas.',
      image: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    energia: {
      title: 'Consumo de\nelectricidad',
      p1: 'Para reducir el impacto del calentamiento global, hemos instalado un sistema de paneles de energía solar que contribuye a un mejor desarrollo sostenible.',
      p2: 'La energía solar no genera residuos ni contaminación del agua, un factor muy importante teniendo en cuenta la escasez de agua.',
      stat1: '0%',
      stat1Label: 'Emisiones CO₂',
      stat2: '100%',
      stat2Label: 'Energía Limpia',
      image: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    video: {
      title: 'Nuestro compromiso en acción',
      description: 'Descubre cómo transformamos nuestros valores en acciones concretas cada día',
      videoUrl: 'https://www.youtube.com/embed/3nT5QS6h-tY'
    },
    pieles: {
      title: 'Pieles libres de\nmetales pesados',
      p1: 'Tenemos nuestro propio analizador de metales X-MET7500, un dispositivo de tecnología avanzada que utilizamos para garantizar que nuestros productos estén libres de plomo y productos químicos tóxicos.',
      p2: 'Realizamos inspecciones diarias en todas las pieles que recibimos de nuestros proveedores y, por lo tanto, en nuestros productos solo utilizamos aquellos materiales que pasan las pruebas.',
      image: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    shambhala: {
      title: 'Un lugar para renacer',
      subtitle: 'Un ecosistema biodiverso donde la naturaleza y la producción sostenible se encuentran en perfecta armonía',

      missionTitle: 'Nuestra Misión',
      missionText: 'Shambhala es un proyecto que nació con el objetivo de convertirse en parte de los pulmones del planeta Tierra.',
      granjaTitle: 'Granja Biodinámica',
      granjaText: 'Esta granja biodinámica es uno de nuestros mayores logros, produciendo frutas, verduras, huevos, miel y más de forma orgánica.',
      educTitle: 'Educación Ambiental',
      educText: 'Realizamos talleres y charlas sobre ecología, reciclaje y concienciación de recursos naturales para nuestros colaboradores y sus familias.',
      statNumber: '148',
      statLabel: 'ACRES DE ESPACIO\nAgroecológico',
      statDesc: 'Un ciclo natural donde los desechos orgánicos enriquecen el suelo y nutren las verduras.',
      image: 'https://blocks.astratic.com/img/general-img-landscape.png',
      thumb1: 'https://blocks.astratic.com/img/general-img-landscape.png',
      thumb2: 'https://blocks.astratic.com/img/general-img-landscape.png'
    }
  };

  const [content, setContent] = useState(defaultContent);
  const [activeEdit, setActiveEdit] = useState(null);
  const [form, setForm] = useState({
    title: '', p1: '', image: null, videoUrl: '',

    missionTitle: '', missionText: '', granjaTitle: '', granjaText: '', educTitle: '', educText: '', statNumber: '', statLabel: '', statDesc: '', thumb1: '', thumb2: ''
  });

  useEffect(() => {
    const handler = (e) => {
      const section = e.detail?.sectionId || e.detail?.section;
      if (section && content[section]) openEditor(section);
    };
    window.addEventListener('cms:edit-section', handler);
    try {
      const qp = new URLSearchParams(window.location.search);
      const edit = qp.get('edit');
      if (edit && content[edit]) openEditor(edit);
    } catch (e) { }
    return () => window.removeEventListener('cms:edit-section', handler);
  }, [content]);

  const openEditor = (section) => {
    const data = content[section] || {};

    setForm({
      title: data.title || data.badge || '',
      p1: data.p1 || data.subtitle || '',
      image: data.image || null,
      videoUrl: data.videoUrl || '',
      stat1: data.stat1 || '',
      stat1Label: data.stat1Label || '',
      stat2: data.stat2 || '',
      stat2Label: data.stat2Label || '',
      // shambhala
      missionTitle: data.missionTitle || data.missionTitle || '',
      missionText: data.missionText || '',
      granjaTitle: data.granjaTitle || '',
      granjaText: data.granjaText || '',
      educTitle: data.educTitle || '',
      educText: data.educText || '',
      statNumber: data.statNumber || '',
      statLabel: data.statLabel || '',
      statDesc: data.statDesc || '',
      thumb1: data.thumb1 || '',
      thumb2: data.thumb2 || ''
    });
    setActiveEdit(section);
  };

  const handleImageNamed = (e) => {
    const field = e.target.dataset.field;
    const file = e.target.files?.[0];
    if (!file || !field) return;
    if (file.size > 1024 * 1024) {
      alert('El archivo excede 1 MB. Elige una imagen más pequeña');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, [field]: reader.result }));
    reader.readAsDataURL(file);
  };

  const closeEditor = () => {
    setActiveEdit(null);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert('El archivo excede 1 MB. Elige una imagen más pequeña');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const saveChanges = () => {
    setContent(prev => ({
      ...prev,
      [activeEdit]: {
        ...prev[activeEdit],
        title: form.title || prev[activeEdit].title,
        p1: form.p1 || prev[activeEdit].p1,
        image: form.image || prev[activeEdit].image,
        videoUrl: form.videoUrl || prev[activeEdit].videoUrl,
        // stats (energia)
        stat1: form.stat1 || prev[activeEdit].stat1,
        stat1Label: form.stat1Label || prev[activeEdit].stat1Label,
        stat2: form.stat2 || prev[activeEdit].stat2,
        stat2Label: form.stat2Label || prev[activeEdit].stat2Label,
        // shambhala specific
        missionTitle: form.missionTitle || prev[activeEdit].missionTitle,
        missionText: form.missionText || prev[activeEdit].missionText,
        granjaTitle: form.granjaTitle || prev[activeEdit].granjaTitle,
        granjaText: form.granjaText || prev[activeEdit].granjaText,
        educTitle: form.educTitle || prev[activeEdit].educTitle,
        educText: form.educText || prev[activeEdit].educText,
        statNumber: form.statNumber || prev[activeEdit].statNumber,
        statLabel: form.statLabel || prev[activeEdit].statLabel,
        statDesc: form.statDesc || prev[activeEdit].statDesc,
        thumb1: form.thumb1 || prev[activeEdit].thumb1,
        thumb2: form.thumb2 || prev[activeEdit].thumb2
      }
    }));
    alert('✅ Cambios aplicados correctamente');
    closeEditor();
  };

  const renderTitle = (raw) => raw?.split('\n').map((line, i) => <span key={i}>{line}{i < raw.split('\n').length - 1 && <br />}</span>);

  return (
    <div className="bg-white text-caborca-cafe font-sans">
      <main>
        {/* HERO */}
        <section data-cms-section="hero" className="relative bg-gray-50">
          <div className="w-full">
            <div className="w-full">
              <div className="relative overflow-hidden shadow-sm">
                <img src={content.hero.image} alt="Responsabilidad Ambiental Caborca Boots" className="w-full h-[600px] object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <div className="inline-block bg-caborca-cafe px-6 py-2 rounded-lg mb-6">
                      <p className="text-sm md:text-base font-medium tracking-widest uppercase text-white">{content.hero.badge}</p>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">{content.hero.title}</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">{content.hero.subtitle}</p>
                  </div>
                </div>
                <EditButton section="hero" onOpen={() => openEditor('hero')} className="absolute top-4 right-4 z-20" />
              </div>
            </div>
          </div>
        </section>

        {/* COMPAÑÍA RESPONSABLE */}
        <section data-cms-section="compania" className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-caborca-cafe rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-caborca-cafe font-semibold tracking-wider text-sm uppercase">Empresa Socialmente Responsable</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-caborca-cafe leading-tight">{renderTitle(content.compania.title)}</h2>
                  <div className="w-24 h-1 bg-caborca-cafe"></div>
                  <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                    <p>{content.compania.p1}</p>
                    <p>{content.compania.p2}</p>
                    <p className="font-medium text-caborca-cafe">{content.compania.highlight}</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-8 -left-8 w-full h-full bg-caborca-cafe/5 rounded-2xl"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img src={content.compania.image} alt="Responsabilidad Ambiental" className="w-full h-[500px] object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-caborca-cafe mb-1">ESR</div>
                      <div className="text-xs text-caborca-negro/60 uppercase tracking-wide">Certificación</div>
                    </div>
                  </div>
                  <EditButton section="compania" onOpen={() => openEditor('compania')} className="absolute top-4 right-4 z-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONSUMO DE ELECTRICIDAD */}
        <section data-cms-section="energia" className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="absolute -top-8 -right-8 w-full h-full bg-yellow-400/10 rounded-2xl"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img src="https://blocks.astratic.com/img/general-img-landscape.png" alt="Paneles Solares" className="w-full h-[500px] object-cover" />
                  </div>
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-6 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                    </div>
                    <span className="text-caborca-cafe font-semibold tracking-wider text-sm uppercase">Energía Limpia</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-serif text-caborca-cafe leading-tight">Consumo de<br />electricidad</h2>
                      <div className="w-24 h-1 bg-yellow-400 mt-2"></div>
                    </div>
                    <div className="ml-4">
                      <EditButton section="energia" onOpen={() => openEditor('energia')} className="z-20" />
                    </div>
                  </div>
                  <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                    <p>Para reducir el impacto del calentamiento global, hemos instalado un sistema de paneles de energía solar que contribuye a un mejor desarrollo sostenible.</p>
                    <p className="font-medium text-caborca-cafe">La energía solar no genera residuos ni contaminación del agua, un factor muy importante teniendo en cuenta la escasez de agua.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <div className="text-3xl font-bold text-yellow-500 mb-2">0%</div>
                      <div className="text-sm text-caborca-negro/70">Emisiones CO₂</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <div className="text-3xl font-bold text-yellow-500 mb-2">100%</div>
                      <div className="text-sm text-caborca-negro/70">Energía Limpia</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VIDEO */}
        <section data-cms-section="video" className="py-16 bg-caborca-cafe relative overflow-hidden">
          <EditButton section="video" onOpen={() => openEditor('video')} className="absolute top-6 right-6 z-20" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                  <span className="text-white/80 font-semibold tracking-wider text-sm uppercase">Nuestro Compromiso</span>
                </div>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">{content.video.title}</h2>
                </div>
                <div className="w-32 h-1 bg-white mx-auto mb-4"></div>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">{content.video.description}</p>
              </div>
              <div className="relative group">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <iframe width="100%" height="100%" src={content.video.videoUrl} title="Responsabilidad Ambiental Caborca Boots" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PIELES LIBRES DE METALES PESADOS */}
        <section data-cms-section="pieles" className="py-24 bg-white relative">
          <EditButton section="pieles" onOpen={() => openEditor('pieles')} className="absolute top-6 right-6 z-20" />
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-caborca-cafe font-semibold tracking-wider text-sm uppercase">Tecnología Avanzada</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-caborca-cafe leading-tight">{renderTitle(content.pieles.title)}</h2>
                  <div className="w-24 h-1 bg-green-500"></div>
                  <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                    <p>{content.pieles.p1}</p>
                    <p className="font-medium text-caborca-cafe">{content.pieles.p2}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-caborca-cafe mb-4 flex items-center gap-2">Sustancias eliminadas</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Plomo</div>
                      <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Arsénico</div>
                      <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Cadmio</div>
                      <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Cloroformo</div>
                      <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Cromo hexavalente</div>
                      <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Mercurio</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-8 -left-8 w-full h-full bg-caborca-cafe/5 rounded-2xl"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img src={content.pieles.image} alt="Pieles" className="w-full h-[500px] object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROYECTO AGROECOLÓGICO SHAMBHALA - REDISEÑO */}
        <section data-cms-section="shambhala" className="py-24 bg-green-50 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 mb-4 justify-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 6.5L21 9l-5 3.6L17.5 20 12 16.9 6.5 20 7 12.6 2 9l6.5-0.5L12 2z" fill="currentColor" /></svg>
                </div>
                <span className="text-green-700 font-semibold tracking-wider text-sm uppercase">PROYECTO AGROECOLÓGICO</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-caborca-cafe leading-tight mb-3">{renderTitle(content.shambhala.title)}</h2>
              <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
              <p className="text-caborca-negro/80 leading-relaxed max-w-3xl mx-auto">Un ecosistema biodiverso donde la naturaleza y la producción sostenible se encuentran en perfecta armonía</p>
            </div>

            <div className="max-w-7xl mx-auto mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* LEFT: stacked feature cards + large stat card */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 6.5L21 9l-5 3.6L17.5 20 12 16.9 6.5 20 7 12.6 2 9l6.5-0.5L12 2z" fill="currentColor" /></svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-caborca-cafe">Nuestra Misión</h4>
                        <p className="text-sm text-caborca-negro/70">Shambhala es un proyecto que nació con el objetivo de convertirse en parte de los pulmones del planeta Tierra.</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-caborca-cafe">Granja Biodinámica</h4>
                        <p className="text-sm text-caborca-negro/70">Esta granja biodinámica es uno de nuestros mayores logros, produciendo frutas, verduras y más de forma orgánica.</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 7 7 13 7 13s7-6 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" /></svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-caborca-cafe">Educación Ambiental</h4>
                        <p className="text-sm text-caborca-negro/70">Realizamos talleres y charlas sobre ecología, reciclaje y concienciación de recursos naturales.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="text-4xl font-bold">148</div>
                    <div className="uppercase text-sm tracking-wide mt-1">Acres de espacio Agroecológico</div>
                    <p className="mt-3 text-sm opacity-90">Un ciclo natural donde los desechos orgánicos enriquecen el suelo y nutren las verduras.</p>
                  </div>
                </div>

                {/* RIGHT: image grid */}
                <div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
                    <img src={content.shambhala.image} alt="Proyecto Shambhala" className="w-full h-[460px] object-cover rounded-2xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="rounded-2xl overflow-hidden shadow-md bg-white h-44 flex items-center justify-center border border-gray-100">
                      <img src={content.shambhala.image} alt="thumb" className="w-full h-full object-cover rounded-2xl" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md bg-white h-44 flex items-center justify-center border border-gray-100">
                      <img src={content.shambhala.image} alt="thumb" className="w-full h-full object-cover rounded-2xl" />
                    </div>
                  </div>

                  <EditButton section="shambhala" onOpen={() => openEditor('shambhala')} className="absolute top-4 right-4 z-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODAL EDITOR GLOBAL */}
        {activeEdit && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-caborca-cafe flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Sección: {activeEdit}
                </h3>
                <button onClick={closeEditor} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6 space-y-4">

                {activeEdit === 'video' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">URL del video (embed)</label>
                    <input name="videoUrl" value={form.videoUrl} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                  </div>
                )}

                {activeEdit === 'shambhala' && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Título principal</label>
                        <input name="title" value={form.title} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subtítulo</label>
                        <input name="p1" value={form.p1} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe" />
                      </div>
                    </div>

                    <h4 className="font-semibold">Bloques informativos</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Misión (título)</label>
                        <input name="missionTitle" value={form.missionTitle} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                        <label className="block text-sm font-semibold text-gray-700 mb-2 mt-3">Misión (texto)</label>
                        <textarea name="missionText" value={form.missionText} onChange={handleInput} rows={3} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Granja (título)</label>
                        <input name="granjaTitle" value={form.granjaTitle} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                        <label className="block text-sm font-semibold text-gray-700 mb-2 mt-3">Granja (texto)</label>
                        <textarea name="granjaText" value={form.granjaText} onChange={handleInput} rows={3} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Educación (título)</label>
                        <input name="educTitle" value={form.educTitle} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                        <label className="block text-sm font-semibold text-gray-700 mb-2 mt-3">Educación (texto)</label>
                        <textarea name="educText" value={form.educText} onChange={handleInput} rows={3} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Estadística (número)</label>
                        <input name="statNumber" value={form.statNumber} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                        <label className="block text-sm font-semibold text-gray-700 mb-2 mt-3">Estadística (etiqueta)</label>
                        <input name="statLabel" value={form.statLabel} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                        <label className="block text-sm font-semibold text-gray-700 mb-2 mt-3">Descripción estadística</label>
                        <textarea name="statDesc" value={form.statDesc} onChange={handleInput} rows={2} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                      </div>
                    </div>

                    <h4 className="font-semibold">Imágenes de galería</h4>
                    <div className="grid md:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen principal (URL)</label>
                        <input name="image" value={form.image || ''} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                        <label className="inline-flex items-center gap-2 mt-2 bg-[#EBDCC0] text-caborca-cafe px-3 py-2 rounded-lg cursor-pointer border border-gray-200">
                          <span className="font-medium">Cargar</span>
                          <input data-field="image" type="file" accept="image/*" onChange={handleImageNamed} className="hidden" />
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Miniatura 1 (URL)</label>
                        <input name="thumb1" value={form.thumb1 || ''} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                        <label className="inline-flex items-center gap-2 mt-2 bg-[#EBDCC0] text-caborca-cafe px-3 py-2 rounded-lg cursor-pointer border border-gray-200">
                          <span className="font-medium">Cargar</span>
                          <input data-field="thumb1" type="file" accept="image/*" onChange={handleImageNamed} className="hidden" />
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Miniatura 2 (URL)</label>
                        <input name="thumb2" value={form.thumb2 || ''} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
                        <label className="inline-flex items-center gap-2 mt-2 bg-[#EBDCC0] text-caborca-cafe px-3 py-2 rounded-lg cursor-pointer border border-gray-200">
                          <span className="font-medium">Cargar</span>
                          <input data-field="thumb2" type="file" accept="image/*" onChange={handleImageNamed} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeEdit === 'energia' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Párrafo 1</label>
                      <textarea name="p1" value={form.p1} onChange={handleInput} rows={3} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Párrafo 2</label>
                      <textarea name="p2" value={form.p2 || ''} onChange={handleInput} rows={3} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen de sección (URL)</label>
                      <div className="flex gap-3">
                        <input name="image" value={form.image || ''} onChange={handleInput} className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg" />
                        <label className="inline-flex items-center gap-2 bg-[#FFF3D9] text-yellow-700 px-4 py-3 rounded-lg cursor-pointer border border-yellow-200">
                          <span className="font-medium">Cargar</span>
                          <input data-field="image" type="file" accept="image/*" onChange={handleImageNamed} className="hidden" />
                        </label>
                      </div>
                      <div className="mt-3 border rounded-lg p-4 bg-gray-50">
                        {form.image ? (
                          <img src={form.image} alt="preview" className="w-full h-40 object-contain rounded" />
                        ) : (
                          <div className="w-full h-40 flex items-center justify-center text-gray-300">Vista previa</div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Stat 1 (valor)</label>
                        <input name="stat1" value={form.stat1} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Stat 1 (etiqueta)</label>
                        <input name="stat1Label" value={form.stat1Label} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Stat 2 (valor)</label>
                        <input name="stat2" value={form.stat2} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Stat 2 (etiqueta)</label>
                        <input name="stat2Label" value={form.stat2Label} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button onClick={closeEditor} className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  Cancelar
                </button>
                <button onClick={saveChanges} className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro flex items-center gap-2">
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
}
