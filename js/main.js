/**
 * IPP LÁMINAS - Arquitectura Editorial & Moderna
 * WhatsApp: +56 9 5174 5887
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initStudioTabs();
  initPhotoWall();
  initSmoothScroll();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   1. TEMA CLARO / OSCURO (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('ipp-theme') || 'dark';
  setTheme(savedTheme);

  function setTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      updateThemeIcons('light');
      localStorage.setItem('ipp-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
      updateThemeIcons('dark');
      localStorage.setItem('ipp-theme', 'dark');
    }
  }

  function updateThemeIcons(theme) {
    const isLight = theme === 'light';
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    
    sunIcons.forEach(icon => icon.style.display = isLight ? 'none' : 'block');
    moonIcons.forEach(icon => icon.style.display = isLight ? 'block' : 'none');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  }
}

/* ==========================================================================
   2. ESTUDIO INTERACTIVO (LOS 3 PILARES EN SPLIT-VIEW)
   ========================================================================== */
function initStudioTabs() {
  // Configuración de pestañas globales
  window.selectStudioTab = function(tabName) {
    const tabs = ['seguridad', 'empavonado', 'solar'];
    
    tabs.forEach(tab => {
      const btn = document.getElementById(`tab-btn-${tab}`);
      const panel = document.getElementById(`panel-${tab}`);
      
      if (btn && panel) {
        if (tab === tabName) {
          btn.classList.add('active');
          panel.classList.add('active');
        } else {
          btn.classList.remove('active');
          panel.classList.remove('active');
        }
      }
    });

    const targetSec = document.getElementById('soluciones');
    if (targetSec && window.scrollY < targetSec.offsetTop - 200) {
      targetSec.scrollIntoView({ behavior: 'smooth' });
    }
  };
}

/* ==========================================================================
   3. MURO FOTOGRÁFICO LIMPIO (38 IMÁGENES SIN TEXTOS OBSTRUCTIVOS)
   ========================================================================== */
const GALLERY_ITEMS = [
  { id: 1, img: 'galeria-01.jpg', cat: 'solar' },
  { id: 2, img: 'galeria-02.jpg', cat: 'empavonado' },
  { id: 3, img: 'galeria-03.jpg', cat: 'comercial' },
  { id: 4, img: 'galeria-04.jpg', cat: 'empavonado' },
  { id: 5, img: 'galeria-05.jpg', cat: 'comercial' },
  { id: 6, img: 'galeria-06.jpg', cat: 'solar' },
  { id: 7, img: 'galeria-07.jpg', cat: 'solar' },
  { id: 8, img: 'galeria-08.jpg', cat: 'solar' },
  { id: 9, img: 'galeria-09.jpg', cat: 'seguridad' },
  { id: 10, img: 'galeria-10.jpg', cat: 'solar' },
  { id: 11, img: 'galeria-11.jpg', cat: 'seguridad' },
  { id: 12, img: 'galeria-12.jpg', cat: 'solar' },
  { id: 13, img: 'galeria-13.jpg', cat: 'empavonado' },
  { id: 14, img: 'galeria-14.jpg', cat: 'seguridad' },
  { id: 15, img: 'galeria-15.jpg', cat: 'solar' },
  { id: 16, img: 'galeria-16.jpg', cat: 'empavonado' },
  { id: 17, img: 'galeria-17.jpg', cat: 'solar' },
  { id: 18, img: 'galeria-18.jpg', cat: 'seguridad' },
  { id: 19, img: 'galeria-19.jpg', cat: 'solar' },
  { id: 20, img: 'galeria-20.jpg', cat: 'seguridad' },
  { id: 21, img: 'galeria-21.jpg', cat: 'solar' },
  { id: 22, img: 'galeria-22.jpg', cat: 'empavonado' },
  { id: 23, img: 'galeria-23.jpg', cat: 'solar' },
  { id: 24, img: 'galeria-24.jpg', cat: 'comercial' },
  { id: 25, img: 'galeria-25.jpg', cat: 'seguridad' },
  { id: 26, img: 'galeria-26.jpg', cat: 'solar' },
  { id: 27, img: 'galeria-27.jpg', cat: 'solar' },
  { id: 28, img: 'galeria-28.jpg', cat: 'empavonado' },
  { id: 29, img: 'galeria-29.jpg', cat: 'solar' },
  { id: 30, img: 'galeria-30.jpg', cat: 'seguridad' },
  { id: 31, img: 'galeria-31.jpg', cat: 'solar' },
  { id: 32, img: 'galeria-32.jpg', cat: 'empavonado' },
  { id: 33, img: 'galeria-33.jpg', cat: 'comercial' },
  { id: 34, img: 'galeria-34.jpg', cat: 'comercial' },
  { id: 35, img: 'galeria-35.jpg', cat: 'seguridad' },
  { id: 36, img: 'galeria-36.jpg', cat: 'comercial' },
  { id: 37, img: 'galeria-37.jpg', cat: 'comercial' },
  { id: 38, img: 'galeria-38.jpg', cat: 'solar' }
];

let currentFilter = 'all';
let currentLightboxIndex = 0;
let filteredItems = [...GALLERY_ITEMS];

function initPhotoWall() {
  const grid = document.getElementById('photo-wall-grid');
  const filterBtns = document.querySelectorAll('.mosaic-filter-btn');
  const loadMoreBtn = document.getElementById('mosaic-load-more');

  if (!grid) return;

  let visibleCount = 12;

  function renderGrid() {
    filteredItems = currentFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(item => item.cat === currentFilter || (currentFilter === 'comercial' && item.cat === 'comercial'));

    const toShow = filteredItems.slice(0, visibleCount);

    grid.innerHTML = toShow.map((item, index) => {
      return `
        <div class="photo-tile" onclick="openLightbox(${index})" title="Ver trabajo">
          <img src="assets/gallery/${item.img}" alt="Obra IPP Láminas" loading="lazy" />
          <div class="tile-hover-overlay">
            <div class="tile-zoom-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (loadMoreBtn) {
      loadMoreBtn.style.display = visibleCount >= filteredItems.length ? 'none' : 'inline-flex';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      visibleCount = 12;
      renderGrid();
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += 12;
      renderGrid();
    });
  }

  renderGrid();
  initLightbox();
}

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!modal) return;

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => changeLightboxImage(-1));
  nextBtn.addEventListener('click', () => changeLightboxImage(1));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightboxImage(-1);
    if (e.key === 'ArrowRight') changeLightboxImage(1);
  });

  // Soporte de deslizamiento táctil en móviles (Touch Swipe)
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) changeLightboxImage(1);
      else changeLightboxImage(-1);
    }
  }, { passive: true });
}

window.openLightbox = function(index) {
  const modal = document.getElementById('lightbox-modal');
  currentLightboxIndex = index;
  updateLightboxContent();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function changeLightboxImage(delta) {
  currentLightboxIndex = (currentLightboxIndex + delta + filteredItems.length) % filteredItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = filteredItems[currentLightboxIndex];
  if (!item) return;

  const imgEl = document.getElementById('lightbox-img');
  const counterEl = document.getElementById('lightbox-counter');
  const waBtnEl = document.getElementById('lightbox-wa-btn');

  imgEl.src = `assets/gallery/${item.img}`;
  if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${filteredItems.length}`;

  const message = `Hola IPP Láminas, vi esta foto en su portafolio (${item.img}) y me gustaría cotizar una instalación similar para mis ventanales. ¿Podrían asesorarme?`;
  if (waBtnEl) waBtnEl.href = `https://wa.me/56951745887?text=${encodeURIComponent(message)}`;
}

/* ==========================================================================
   4. NAVEGACIÓN Y SMOOTH SCROLL
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   5. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   6. CAJA DE CONSULTAS A IPPLAMINAS@GMAIL.COM (FORM VIA AJAX)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.querySelector('span').textContent = 'Enviando a ipplaminas@gmail.com...';
    }

    const formData = new FormData(form);
    const dataObj = {};
    formData.forEach((value, key) => { dataObj[key] = value; });

    try {
      const response = await fetch('https://formsubmit.co/ajax/ipplaminas@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataObj)
      });

      const resData = await response.json().catch(() => ({}));

      // FormSubmit responde con HTTP 200 incluso cuando el estado es success: false (ej: requiere activación)
      const isSuccess = response.ok && (resData.success === 'true' || resData.success === true);

      if (isSuccess) {
        if (statusEl) {
          statusEl.className = 'form-status-alert success';
          statusEl.style.display = 'block';
          statusEl.innerHTML = '✅ <strong>¡Consulta enviada con éxito!</strong><br>Hemos recibido tus datos directamente en <code>ipplaminas@gmail.com</code>. Te contactaremos a la brevedad.';
        }
        form.reset();
      } else if (resData.message && resData.message.includes('Activation')) {
        if (statusEl) {
          statusEl.className = 'form-status-alert error';
          statusEl.style.display = 'block';
          statusEl.innerHTML = '⚠️ <strong>Activación inicial requerida en la casilla:</strong><br>FormSubmit envió un correo de confirmación a <code>ipplaminas@gmail.com</code>. Abre ese correo y haz clic en <strong>"Activate Form"</strong> (se hace una sola vez) para comenzar a recibir todas las consultas.';
        }
      } else {
        throw new Error(resData.message || 'Error al enviar la consulta');
      }
    } catch (err) {
      if (statusEl) {
        statusEl.className = 'form-status-alert error';
        statusEl.style.display = 'block';
        statusEl.innerHTML = '⚠️ <strong>Hubo un problema al procesar el envío:</strong><br>' + (err.message || 'Por favor contáctanos directamente a nuestro WhatsApp +56 9 5174 5887 o al correo ipplaminas@gmail.com.');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.querySelector('span').textContent = 'Enviar Consulta a ipplaminas@gmail.com';
      }
    }
  });
}
