# IPP Láminas - Landing Page Profesional

Sitio web corporativo y de conversión directa para **IPP Láminas**, empresa chilena especializada en instalación de láminas de seguridad, empavonados decorativos y control solar para cristales residenciales y comerciales.

- **Ventas y Consultas:** WhatsApp directo [+56 9 5174 5887](https://wa.me/56951745887)
- **Cobertura:** Región Metropolitana y Regiones de Chile.

---

## 🚀 Características Principales

- **Arquitectura Editorial & Moderna:** Diseño contemporáneo con inspiración arquitectónica en cristales y luz.
- **Doble Tema (Dark & Light Mode):** Modo oscuro predeterminado de alta gama con alternador instantáneo a modo claro y persistencia en `localStorage`.
- **Enfoque en Conversión Directa sin Carrito:** Múltiples puntos de contacto estratégicos conectados directamente a WhatsApp con mensajes pre-cargados.
- **Estudio Interactivo en Pantalla Dividida (Canvas Split-View):** Fichas técnicas interactivas para Láminas de Seguridad (4, 8 y 12 micras), Empavonados de privacidad y Control Solar con rechazo de hasta 82% de calor y 99% UV.
- **Muro Fotográfico Real:** 38 fotografías reales de proyectos ejecutados en condominios, retail (ej. vitrinas Salcobrand) y oficinas en altura, sin textos obstructivos y con lightbox de ampliación.
- **Optimizado para Móviles:** Barra táctil inferior fija y botón flotante con pulso animado.

---

## ⚡ Despliegue en Cloudflare Pages

Este repositorio está formateado y listo para ser desplegado en **Cloudflare Pages** sin pasos de compilación adicionales:

### Opción 1: Conexión Automática con Git (Recomendada)
1. Entra a tu panel de **Cloudflare Dashboard** > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Selecciona el repositorio `Manuel-GY/Ipp-Laminas`.
3. Configuración de Build:
   - **Framework preset:** `None`
   - **Build command:** *(dejar vacío)*
   - **Build output directory:** `/` *(o dejar vacío, utiliza el directorio raíz)*
4. Presiona **Save and Deploy**. Cloudflare detectará automáticamente `_headers` y `_redirects`.

### Opción 2: Despliegue con Wrangler CLI
```bash
npx wrangler pages deploy . --project-name=ipp-laminas
```

---

## 📁 Estructura del Proyecto

```
ipp-laminas/
├── _headers                 # Configuración de cabeceras HTTP y caché para Cloudflare
├── _redirects               # Redirecciones de Cloudflare (ej. /whatsapp)
├── wrangler.toml            # Archivo de configuración de Cloudflare Pages
├── index.html               # Página de aterrizaje principal
├── css/
│   └── styles.css           # Sistema de diseño, variables CSS y animaciones
├── js/
│   └── main.js              # Lógica de tema, estudio interactivo y lightbox
├── assets/
│   ├── logo-dark.svg        # Logotipo oficial (variante para modo oscuro)
│   ├── logo-light.svg       # Logotipo oficial (variante para modo claro)
│   ├── favicon.svg          # Favicon vectorial para pestañas
│   └── gallery/             # 38 fotografías de obras reales optimizadas
└── README.md
```

---

## 🛠️ Tecnologías

- **HTML5 Semántico**
- **CSS3 Moderno** (Flexbox, CSS Grid, Custom Properties, Backdrop Blur)
- **Vanilla JavaScript ES6+** (Cero dependencias pesadas, carga ultrarrápida)
- **SVG Vectorial** para logotipos e iconografía nítida en pantallas Retina y 4K.
