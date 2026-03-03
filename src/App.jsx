import React, { useState, useEffect, useRef } from 'react';
import {
  Download, Plus, Trash2, User, Briefcase, GraduationCap,
  Wrench, Globe, Mail, Phone, MapPin, Linkedin, Layout, Image as ImageIcon,
  Upload, Save, Award, Users
} from 'lucide-react';

// Script loader removed as we are using window.print()

export default function App() {

  const [activeTab, setActiveTab] = useState('personal');
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);

  // Estado inicial con los datos extraídos de tu PDF
  // Estado inicial vacío
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      title: "",
      summary: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      photo: null
    },
    experience: [],
    education: [],
    courses: [],
    references: [],
    skills: [],
    languages: []
  });

  // Handlers
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData(prev => ({
          ...prev,
          personal: { ...prev.personal, photo: reader.result }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Generic handlers for arrays (Experience, Education)
  const handleArrayChange = (section, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = (section, template) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [template, ...prev[section]]
    }));
  };

  const removeItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, "Nueva Habilidad"] }));
  };

  const removeSkill = (index) => {
    const newSkills = resumeData.skills.filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  const addLanguage = () => {
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, { language: "", level: "" }]
    }));
  };

  const removeLanguage = (index) => {
    const newLanguages = resumeData.languages.filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, languages: newLanguages }));
  };

  // JSON Import/Export Functions
  const handleJsonDownload = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CV ${resumeData.personal.firstName} ${resumeData.personal.lastName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleJsonUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);

        // Backward compatibility: ensure new arrays exist even in old JSONs
        const safeData = {
          ...importedData,
          courses: importedData.courses || [],
          references: importedData.references || []
        };

        setResumeData(safeData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Error al leer el archivo JSON. Asegúrate de que sea un archivo válido.");
      }
    };
    reader.readAsText(file);
    // Reset value so same file can be selected again if needed
    e.target.value = '';
  };

  const triggerJsonUpload = () => {
    fileInputRef.current.click();
  };

  // Browser Print Function (New Tab Strategy)
  const handlePrint = () => {
    const printContent = document.getElementById('resume-preview');
    const printWindow = window.open('', '', 'width=900,height=1200');

    if (!printContent || !printWindow) {
      alert("Error al intentar imprimir. Por favor, asegúrate de permitir ventanas emergentes.");
      return;
    }

    printWindow.document.write('<html><head><title>Imprimir CV</title>');

    // Copy existing styles (Tailwind, etc.)
    const styles = document.querySelectorAll('link[rel="stylesheet"], style');
    styles.forEach(style => {
      printWindow.document.write(style.outerHTML);
    });

    // Add specific print alignment styles with higher specificity
    printWindow.document.write(`
      <style>
        * {
          box-sizing: border-box;
        }
        body { 
          margin: 0; 
          padding: 0; 
          background-color: white; 
        }
        /* Force grid layout by targeting all possible selectors */
        #resume-preview,
        div#resume-preview {
          display: grid !important;
          grid-template-columns: 32% 68% !important;
          grid-template-rows: auto !important;
          margin: 0 auto !important;
          box-shadow: none !important;
          width: 210mm !important;
          max-width: 210mm !important;
          min-height: 297mm !important;
          background: linear-gradient(to right, #0e2a5c 32%, white 32%) !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          /* Override any flex properties */
          flex-direction: initial !important;
          align-items: initial !important;
          justify-content: initial !important;
        }
        #print-sidebar {
          grid-column: 1 !important;
          grid-row: 1 !important;
          width: 100% !important;
          background: transparent !important;
          display: flex !important;
          flex-direction: column !important;
        }
        #print-main {
          grid-column: 2 !important;
          grid-row: 1 !important;
          width: 100% !important;
          background: transparent !important;
          display: flex !important;
          flex-direction: column !important;
        }
        @media print {
          @page { margin: 0; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #resume-preview,
          div#resume-preview {
            display: grid !important;
            grid-template-columns: 32% 68% !important;
            min-height: 297mm !important;
          }
        }
      </style>
    `);

    printWindow.document.write('</head><body>');

    // Clone and modify the element
    const clonedContent = printContent.cloneNode(true);
    // Remove flex class and add inline grid style
    clonedContent.style.display = 'grid';
    clonedContent.style.gridTemplateColumns = '32% 68%';

    printWindow.document.write(clonedContent.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();

    // Wait for styles to apply
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-slate-800">

      {/* Header */}
      <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Layout className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold tracking-wide">CV Builder <span className="text-blue-400">Pro</span></h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={triggerJsonUpload}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            title="Cargar datos desde JSON"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Cargar</span>
          </button>
          <button
            onClick={handleJsonDownload}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            title="Guardar datos como JSON"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Guardar</span>
          </button>
          <div className="h-6 w-px bg-slate-700 mx-2"></div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Imprimir / PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
        {/* Hidden Input for JSON Upload */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".json"
          onChange={handleJsonUpload}
        />
      </header>

      {/* Main Content - Mobile: Scrollable stack, Desktop: Fixed height split */}
      <div className="flex flex-1 flex-col lg:flex-row lg:overflow-hidden lg:h-[calc(100vh-64px)] h-auto">

        {/* LEFT PANEL: EDITOR */}
        <div className="w-full lg:w-5/12 bg-white border-r border-gray-200 lg:overflow-y-auto shadow-inner custom-scrollbar">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700">
              <Wrench className="w-5 h-5" />
              Editor de Contenido
            </h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: 'personal', icon: User, label: 'Perfil' },
                { id: 'experience', icon: Briefcase, label: 'Exp.' },
                { id: 'education', icon: GraduationCap, label: 'Edu.' },
                { id: 'courses', icon: Award, label: 'Cursos' },
                { id: 'references', icon: Users, label: 'Ref.' },
                { id: 'skills', icon: Layout, label: 'Skills' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                    ? 'bg-slate-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Forms */}
            <div className="space-y-6">

              {activeTab === 'personal' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-4 mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow">
                      {resumeData.personal.photo ? (
                        <img src={resumeData.personal.photo} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-full h-full p-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="cursor-pointer bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors flex items-center w-fit gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Subir Foto
                        <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Recomendado: 400x400px</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Nombres" name="firstName" value={resumeData.personal.firstName} onChange={handlePersonalChange} />
                    <InputGroup label="Apellidos" name="lastName" value={resumeData.personal.lastName} onChange={handlePersonalChange} />
                  </div>
                  <InputGroup label="Título Profesional" name="title" value={resumeData.personal.title} onChange={handlePersonalChange} />
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Perfil Profesional</label>
                    <textarea
                      name="summary"
                      value={resumeData.personal.summary}
                      onChange={handlePersonalChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Email" name="email" value={resumeData.personal.email} onChange={handlePersonalChange} />
                    <InputGroup label="Teléfono" name="phone" value={resumeData.personal.phone} onChange={handlePersonalChange} />
                  </div>
                  <InputGroup label="Ciudad/Dirección" name="address" value={resumeData.personal.address} onChange={handlePersonalChange} />
                  <InputGroup label="LinkedIn (URL)" name="linkedin" value={resumeData.personal.linkedin} onChange={handlePersonalChange} />
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <button
                    onClick={() => addItem('experience', { id: Date.now(), role: "Nuevo Cargo", company: "Empresa", startDate: "2024-01", endDate: "Presente", description: "" })}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:border-blue-500 hover:text-blue-500 transition-colors flex justify-center items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Agregar Experiencia
                  </button>

                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group">
                      <button
                        onClick={() => removeItem('experience', exp.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <InputGroup label="Cargo" value={exp.role} onChange={(e) => handleArrayChange('experience', exp.id, 'role', e.target.value)} />
                        <InputGroup label="Empresa" value={exp.company} onChange={(e) => handleArrayChange('experience', exp.id, 'company', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <InputGroup label="Inicio" type="text" placeholder="YYYY-MM" value={exp.startDate} onChange={(e) => handleArrayChange('experience', exp.id, 'startDate', e.target.value)} />
                        <InputGroup label="Fin" type="text" placeholder="Presente" value={exp.endDate} onChange={(e) => handleArrayChange('experience', exp.id, 'endDate', e.target.value)} />
                      </div>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                        rows={3}
                        placeholder="Descripción de responsabilidades..."
                        value={exp.description}
                        onChange={(e) => handleArrayChange('experience', exp.id, 'description', e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <button
                    onClick={() => addItem('education', { id: Date.now(), degree: "Título", school: "Institución", location: "", startDate: "", endDate: "" })}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:border-blue-500 hover:text-blue-500 transition-colors flex justify-center items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Agregar Educación
                  </button>

                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group">
                      <button
                        onClick={() => removeItem('education', edu.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <InputGroup label="Título/Grado" value={edu.degree} onChange={(e) => handleArrayChange('education', edu.id, 'degree', e.target.value)} />
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <InputGroup label="Institución" value={edu.school} onChange={(e) => handleArrayChange('education', edu.id, 'school', e.target.value)} />
                        <InputGroup label="Ciudad" value={edu.location} onChange={(e) => handleArrayChange('education', edu.id, 'location', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <InputGroup label="Inicio" value={edu.startDate} onChange={(e) => handleArrayChange('education', edu.id, 'startDate', e.target.value)} />
                        <InputGroup label="Fin" value={edu.endDate} onChange={(e) => handleArrayChange('education', edu.id, 'endDate', e.target.value)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <button
                    onClick={() => addItem('courses', { id: Date.now(), name: "Nombre del curso o certificado", date: "YYYY-MM" })}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:border-blue-500 hover:text-blue-500 transition-colors flex justify-center items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Agregar Curso/Certificado
                  </button>

                  {resumeData.courses && resumeData.courses.map((course) => (
                    <div key={course.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group">
                      <button
                        onClick={() => removeItem('courses', course.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <InputGroup label="Nombre del curso o certificado" value={course.name} onChange={(e) => handleArrayChange('courses', course.id, 'name', e.target.value)} />
                      <div className="mt-3">
                        <InputGroup label="Fecha de realización" type="text" placeholder="YYYY-MM" value={course.date} onChange={(e) => handleArrayChange('courses', course.id, 'date', e.target.value)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'references' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <button
                    onClick={() => addItem('references', { id: Date.now(), name: "Nombre", role: "Cargo", company: "Empresa", contact: "Contacto" })}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:border-blue-500 hover:text-blue-500 transition-colors flex justify-center items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Agregar Referencia
                  </button>

                  {resumeData.references && resumeData.references.map((ref) => (
                    <div key={ref.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group">
                      <button
                        onClick={() => removeItem('references', ref.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <InputGroup label="Nombre" value={ref.name} onChange={(e) => handleArrayChange('references', ref.id, 'name', e.target.value)} />
                        <InputGroup label="Cargo" value={ref.role} onChange={(e) => handleArrayChange('references', ref.id, 'role', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <InputGroup label="Empresa" value={ref.company} onChange={(e) => handleArrayChange('references', ref.id, 'company', e.target.value)} />
                        <InputGroup label="Contacto" value={ref.contact} onChange={(e) => handleArrayChange('references', ref.id, 'contact', e.target.value)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Habilidades Técnicas</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center bg-white border border-gray-300 rounded-lg pl-3 pr-1 py-1 shadow-sm">
                          <input
                            type="text"
                            className="bg-transparent border-none outline-none text-sm w-32 text-gray-700"
                            value={skill}
                            onChange={(e) => handleSkillChange(idx, e.target.value)}
                          />
                          <button onClick={() => removeSkill(idx)} className="text-gray-400 hover:text-red-500 p-1">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addSkill}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 text-sm hover:bg-blue-100"
                      >
                        <Plus className="w-3 h-3" /> Añadir
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Idiomas</h3>
                    {resumeData.languages.map((lang, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input
                          className="flex-1 p-2 border rounded-md text-sm"
                          placeholder="Idioma"
                          value={lang.language}
                          onChange={(e) => {
                            const newLangs = [...resumeData.languages];
                            newLangs[idx].language = e.target.value;
                            setResumeData(prev => ({ ...prev, languages: newLangs }));
                          }}
                        />
                        <input
                          className="flex-1 p-2 border rounded-md text-sm"
                          placeholder="Nivel"
                          value={lang.level}
                          onChange={(e) => {
                            const newLangs = [...resumeData.languages];
                            newLangs[idx].level = e.target.value;
                            setResumeData(prev => ({ ...prev, languages: newLangs }));
                          }}
                        />
                        <button onClick={() => removeLanguage(idx)} className="text-gray-400 hover:text-red-500 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addLanguage}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 text-sm hover:bg-blue-100"
                    >
                      <Plus className="w-3 h-3" /> Añadir
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* RIGHT PANEL: PREVIEW */}
        <div className="w-full lg:w-7/12 bg-gray-500 lg:overflow-y-auto p-4 lg:p-8 flex justify-center items-start min-h-screen lg:min-h-0">
          <div
            id="preview-wrapper"
            className="scale-[0.5] sm:scale-[0.6] md:scale-[0.8] lg:scale-[0.9] origin-top transition-transform duration-300"
          >
            {/* THIS IS THE CV RENDER - A4 Dimensions in CSS pixels (approx 794x1123) */}
            <div
              id="resume-preview"
              className="bg-white shadow-2xl flex w-[210mm] min-h-[297mm] mx-auto text-slate-800 font-sans"
              style={{ background: 'linear-gradient(to right, #0e2a5c 32%, white 32%)' }}
              ref={previewRef}
            >

              {/* LEFT COLUMN (Blue Sidebar) */}
              <div id="print-sidebar" className="w-[32%] text-white flex flex-col p-3 items-center text-center">

                {/* Photo */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-6 shadow-lg mt-6 bg-gray-700 mx-auto shrink-0">
                  {resumeData.personal.photo ? (
                    <img src={resumeData.personal.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
                      <User size={48} />
                    </div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="w-full space-y-6 text-left mb-8">
                  <SectionTitleLight>Contacto</SectionTitleLight>

                  <ContactItem icon={MapPin} title="Dirección" value={resumeData.personal.address} />
                  <ContactItem icon={Phone} title="Teléfono" value={resumeData.personal.phone} />
                  <ContactItem icon={Mail} title="Email" value={resumeData.personal.email} />
                  {resumeData.personal.linkedin && (
                    <ContactItem icon={Linkedin} title="LinkedIn" value={resumeData.personal.linkedin} link={true} />
                  )}
                </div>

                {/* Skills */}
                <div className="w-full text-left mb-8">
                  <SectionTitleLight>Skills</SectionTitleLight>
                  <div className="flex flex-col gap-2">
                    {resumeData.skills.map((skill, i) => (
                      <span key={i} className="text-sm font-light border-b border-white/10 pb-1">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="w-full text-left">
                  <SectionTitleLight>Idiomas</SectionTitleLight>
                  <div className="flex flex-col gap-3">
                    {resumeData.languages.map((lang, i) => (
                      <div key={i}>
                        <div className="text-sm font-bold">{lang.language}</div>
                        <div className="text-xs text-blue-200">{lang.level}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN (Main Content) */}
              <div id="print-main" className="w-[68%] p-6 pt-8 flex flex-col">

                {/* Header Name */}
                <div className="mb-8 border-b-2 border-slate-200 pb-4">
                  <h1 className="text-5xl font-extrabold text-[#0e2a5c] uppercase leading-tight tracking-tight">
                    {resumeData.personal.firstName} <br />
                    <span className="font-light">{resumeData.personal.lastName}</span>
                  </h1>
                  <h2 className="text-xl text-blue-600 font-medium mt-2 tracking-widest uppercase">
                    {resumeData.personal.title}
                  </h2>
                </div>

                {/* Summary */}
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed text-justify">
                    {resumeData.personal.summary}
                  </p>
                </div>

                {/* Work History */}
                <div className="mb-8">
                  <SectionTitleDark icon={Briefcase}>Historial de Trabajo</SectionTitleDark>

                  <div className="space-y-6 mt-4">
                    {resumeData.experience.map((job) => (
                      <div key={job.id} className="flex gap-4" style={{ pageBreakInside: 'avoid' }}>
                        {/* Timeline Date */}
                        <div className="w-24 flex-shrink-0 pt-1 text-right">
                          <div className="text-xs font-bold text-slate-900">{job.endDate}</div>
                          <div className="text-xs text-gray-500">{job.startDate}</div>
                        </div>

                        {/* Line & Content */}
                        <div className="flex-1 border-l-2 border-blue-100 pl-4 pb-2 relative">
                          <div className="absolute -left-[5px] top-[6px] w-2 h-2 rounded-full bg-blue-600"></div>
                          <h3 className="font-bold text-slate-800 uppercase text-sm">{job.role}</h3>
                          <div className="text-blue-600 font-medium text-xs mb-1">{job.company}, {job.location}</div>
                          <p className="text-xs text-slate-600 leading-relaxed mt-2 whitespace-pre-line">
                            {job.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <SectionTitleDark icon={GraduationCap}>Educación</SectionTitleDark>
                  <div className="space-y-4 mt-4">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="flex gap-4" style={{ pageBreakInside: 'avoid' }}>
                        <div className="w-24 flex-shrink-0 pt-1 text-right">
                          <div className="text-xs font-bold text-slate-900">{edu.endDate.split('-')[0]}</div>
                        </div>
                        <div className="flex-1 border-l-2 border-blue-100 pl-4 relative">
                          <div className="absolute -left-[5px] top-[6px] w-2 h-2 rounded-full bg-blue-600"></div>
                          <h3 className="font-bold text-slate-800 text-sm uppercase">{edu.degree}</h3>
                          <div className="text-sm text-slate-600">{edu.school}</div>
                          <div className="text-xs text-gray-400">{edu.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courses & References */}
                {(resumeData.courses && resumeData.courses.length > 0) && (resumeData.references && resumeData.references.length > 0) ? (
                  <div className="mt-8 grid grid-cols-2 gap-8">
                    {/* Courses (Side-by-side) */}
                    <div>
                      <SectionTitleDark icon={Award}>Cursos y Certificaciones</SectionTitleDark>
                      <div className="space-y-4 mt-4">
                        {resumeData.courses.map((course) => (
                          <div key={course.id} className="flex gap-4" style={{ pageBreakInside: 'avoid' }}>
                            <div className="w-16 flex-shrink-0 pt-1 text-right">
                              <div className="text-xs font-bold text-slate-900 leading-tight">{course.date}</div>
                            </div>
                            <div className="flex-1 border-l-2 border-blue-100 pl-4 relative">
                              <div className="absolute -left-[5px] top-[6px] w-2 h-2 rounded-full bg-blue-600"></div>
                              <h3 className="font-bold text-slate-800 text-sm leading-tight">{course.name}</h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* References (Side-by-side) */}
                    <div>
                      <SectionTitleDark icon={Users}>Referencias Personales</SectionTitleDark>
                      <div className="space-y-5 mt-4">
                        {resumeData.references.map((ref) => (
                          <div key={ref.id} style={{ pageBreakInside: 'avoid' }}>
                            <h3 className="font-bold text-slate-800 text-sm">{ref.name}</h3>
                            <div className="text-sm text-slate-600 font-medium">{ref.role}</div>
                            <div className="text-xs text-blue-600 mb-1">{ref.company}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {ref.contact}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Courses & Certifications (Solo) */}
                    {resumeData.courses && resumeData.courses.length > 0 && (
                      <div className="mt-8">
                        <SectionTitleDark icon={Award}>Cursos y Certificaciones</SectionTitleDark>
                        <div className="space-y-4 mt-4">
                          {resumeData.courses.map((course) => (
                            <div key={course.id} className="flex gap-4" style={{ pageBreakInside: 'avoid' }}>
                              <div className="w-24 flex-shrink-0 pt-1 text-right">
                                <div className="text-xs font-bold text-slate-900">{course.date}</div>
                              </div>
                              <div className="flex-1 border-l-2 border-blue-100 pl-4 relative">
                                <div className="absolute -left-[5px] top-[6px] w-2 h-2 rounded-full bg-blue-600"></div>
                                <h3 className="font-bold text-slate-800 text-sm">{course.name}</h3>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* References (Solo) */}
                    {resumeData.references && resumeData.references.length > 0 && (
                      <div className="mt-8">
                        <SectionTitleDark icon={Users}>Referencias Personales</SectionTitleDark>
                        <div className="grid grid-cols-2 gap-6 mt-4">
                          {resumeData.references.map((ref) => (
                            <div key={ref.id} style={{ pageBreakInside: 'avoid' }}>
                              <h3 className="font-bold text-slate-800 text-sm">{ref.name}</h3>
                              <div className="text-sm text-slate-600 font-medium">{ref.role}</div>
                              <div className="text-xs text-blue-600 mb-1">{ref.company}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Phone className="w-3 h-3" /> {ref.contact}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-Components for Cleaner Code
const InputGroup = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
    />
  </div>
);

const SectionTitleLight = ({ children }) => (
  <h3 className="text-lg font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-4 text-blue-200">
    {children}
  </h3>
);

const SectionTitleDark = ({ children, icon: Icon }) => (
  <h3 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-200 pb-2 flex items-center gap-2 text-[#0e2a5c]">
    {Icon && <Icon className="w-5 h-5 text-blue-600" />}
    {children}
  </h3>
);

const ContactItem = ({ icon: Icon, title, value, link }) => (
  <div className="mb-4">
    <div className="flex items-center gap-2 text-blue-200 mb-1">
      <Icon className="w-4 h-4" />
      <span className="text-xs font-bold uppercase">{title}</span>
    </div>
    <div className="text-sm break-all font-light">
      {link ? (
        <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline decoration-blue-400/50">
          {value.replace(/^https?:\/\//, '')}
        </a>
      ) : value}
    </div>
  </div>
);
