# 🎨 CV Builder Pro

<div align="center">

![CV Builder Pro](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Crea tu CV profesional en minutos con una interfaz moderna e intuitiva**

[🚀 Demo en Vivo](https://japs01.github.io/CV_Wizz/) | [📖 Documentación](#características) | [🐛 Reportar Bug](https://github.com/JAPS01/CV_Wizz/issues)

</div>

---

## 📋 Descripción

**CV Builder Pro** es una aplicación web moderna y elegante diseñada para crear currículums vitae profesionales de manera rápida y sencilla. Con una interfaz intuitiva dividida en paneles de edición y vista previa en tiempo real, puedes diseñar tu CV perfecto sin necesidad de software de diseño complejo.

### ✨ Características Principales

- **📝 Editor Intuitivo** - Sistema de pestañas organizado para editar información personal, experiencia, educación y habilidades
- **👁️ Vista Previa en Tiempo Real** - Visualiza instantáneamente todos los cambios mientras escribes
- **📄 Formato A4 Profesional** - Diseño optimizado para impresión con dimensiones estándar A4 (210mm x 297mm)
- **🎨 Diseño Moderno** - Interfaz elegante con tema azul marino y blanco, altamente profesional
- **📸 Foto de Perfil** - Agrega tu foto profesional con preview en tiempo real
- **💾 Exportación JSON** - Guarda y carga tus datos en formato JSON para ediciones futuras
- **🖨️ Impresión/PDF Directo** - Genera PDFs de calidad profesional desde el navegador
- **📱 Responsive** - Funciona perfectamente en dispositivos móviles, tablets y escritorio
- **🌐 100% Offline** - Una vez cargado, funciona completamente sin conexión a internet

---

## 🚀 Tecnologías Utilizadas

| Tecnología | Descripción |
|------------|-------------|
| ⚛️ **React 19** | Biblioteca de JavaScript para interfaces de usuario |
| ⚡ **Vite 7** | Herramienta de compilación ultrarrápida |
| 🎨 **Tailwind CSS 4** | Framework CSS utility-first para diseño moderno |
| 🎯 **Lucide React** | Biblioteca de iconos modernos y elegantes |
| 📦 **ESLint** | Linter para mantener código limpio y consistente |

---

## 📦 Instalación

### Prerequisitos

- Node.js 18+ y npm 8+ instalados
- Git instalado en tu sistema

### Pasos de Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/JAPS01/CV_Wizz.git

# 2. Navega al directorio del proyecto
cd CV_Wizz

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🎯 Uso

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo con hot-reload
npm run dev

# Compilar para producción
npm run build

# Preview del build de producción
npm run preview

# Ejecutar linter
npm run lint
```

### Deployment a GitHub Pages

```bash
# Compilar y deployar automáticamente
npm run deploy
```

---

## 📸 Capturas de Pantalla

<div align="center">

### Editor y Vista Previa

*Interfaz dividida para edición y preview en tiempo real*

### Vista de Impresión

*CV profesional listo para imprimir en formato A4*

</div>

---

## 🎨 Estructura del Proyecto

```
cv-app/
├── public/              # Archivos estáticos
├── src/
│   ├── App.jsx         # Componente principal con toda la lógica
│   ├── App.css         # Estilos específicos del componente
│   ├── index.css       # Estilos globales y Tailwind
│   ├── main.jsx        # Punto de entrada de la aplicación
│   └── assets/         # Recursos (imágenes, fuentes, etc.)
├── index.html          # HTML principal
├── vite.config.js      # Configuración de Vite
├── tailwind.config.js  # Configuración de Tailwind CSS
└── package.json        # Dependencias y scripts
```

---

## 🔧 Configuración

### Personalizar Colores del CV

Edita `src/App.jsx` y modifica los colores en las clases de Tailwind:

```javascript
// Cambiar color del sidebar (actualmente azul marino #0e2a5c)
style={{ background: 'linear-gradient(to right, #TU_COLOR 32%, white 32%)' }}
```

### Modificar Tamaño de Página

Para cambiar el formato de A4 a Letter u otro tamaño, ajusta en `src/App.jsx`:

```javascript
// A4: 210mm x 297mm
// Letter: 8.5in x 11in (216mm x 279mm)
className="w-[210mm] min-h-[297mm]"
```

---

## 📝 Funcionalidades Detalladas

### 1️⃣ Información Personal

- Nombres y apellidos
- Título profesional
- Resumen/Perfil profesional
- Datos de contacto (email, teléfono, dirección)
- LinkedIn
- Foto de perfil

### 2️⃣ Experiencia Laboral

- Múltiples trabajos con:
  - Cargo/Posición
  - Empresa
  - Fechas (inicio - fin)
  - Descripción de responsabilidades
- Orden cronológico inverso
- Vista de timeline elegante

### 3️⃣ Educación

- Múltiples títulos académicos
- Institución educativa
- Ciudad/Ubicación
- Fecha de graduación

### 4️⃣ Habilidades e Idiomas

- Lista de habilidades técnicas
- Idiomas con nivel de dominio
- Interfaz de tags para fácil edición

### 5️⃣ Guardar/Cargar Datos

- Exporta todos tus datos a JSON
- Importa datos previamente guardados
- Mantén múltiples versiones de tu CV

---

## 🌐 Deployment

Este proyecto está configurado para deployment automático en **GitHub Pages**.

### Configuración Inicial

Ya está configurado con:

- `homepage` en package.json apuntando a GitHub Pages
- Script `deploy` que compila y publica automáticamente
- `vite.config.js` con el base path correcto

### Deployar Cambios

```bash
npm run deploy
```

Esto automáticamente:

1. Compila el proyecto (`npm run build`)
2. Publica la carpeta `dist/` a la rama `gh-pages`
3. GitHub Pages serve tu sitio en minutos

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Si quieres mejorar el proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 🐛 Reportar Problemas

Si encuentras algún bug o tienes una sugerencia:

1. Ve a la sección [Issues](https://github.com/JAPS01/CV_Wizz/issues)
2. Crea un nuevo issue describiendo el problema
3. Incluye capturas de pantalla si es posible

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

**JAPS01**

- GitHub: [@JAPS01](https://github.com/JAPS01)
- Proyecto: [CV_Wizz](https://github.com/JAPS01/CV_Wizz)

---

## 🙏 Agradecimientos

- [React](https://react.dev/) - Por la increíble biblioteca de UI
- [Vite](https://vitejs.dev/) - Por la herramienta de build ultrarrápida
- [Tailwind CSS](https://tailwindcss.com/) - Por el framework de diseño
- [Lucide Icons](https://lucide.dev/) - Por los hermosos iconos

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella en GitHub! ⭐**

Made with ❤️ by JAPS01

</div>
