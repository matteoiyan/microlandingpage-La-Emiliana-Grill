
const CONFIG = {
    whatsapp: {
        phone: '593987654321', 
        defaultMessage: '¡Hola! Me gustaría hacer una reserva en La Emiliana Grill.'
    },
    social: {
        facebook: 'https://facebook.com/laemilianagrill',
        instagram: 'https://instagram.com/laemilianagrill',
        tiktok: 'https://tiktok.com/@laemilianagrill'
    },
    pdf: {
        menu: href='assets/pdf/menu-la-emiliana.pdf'
    },
    location: {
        address: 'El Tingo, Valle de los Chillos, Ecuador'
    }
};


document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initSmoothScroll();
    initButtonRedirects();
    initImageGallery();
    initNavigation();
    initGrillEffects();
    
    console.log('🚀 La Emiliana Grill - Sistema completamente inicializado');
});

/**
 * SISTEMA DE ANIMACIONES
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.flotar, .latir, .brillo-parrilla').forEach(el => {
        observer.observe(el);
    });
}

/**
 * SCROLL SUAVE
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * SISTEMA DE REDIRECCIONES DE BOTONES
 */
function initButtonRedirects() {
    // Botón de Reservas → WhatsApp
    const reserveButtons = document.querySelectorAll('a[href*="reserva"], .reserve-btn');
    reserveButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            redirectToWhatsApp(this);
        });
    });
    
    // Botón de Menú → PDF
    const menuButtons = document.querySelectorAll('a[href*="menu"], .menu-btn');
    menuButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            redirectToPDF(this);
        });
    });
    
    // Botón de Ubicación → Google Maps
    const locationButtons = document.querySelectorAll('a[href*="ubicacion"], .location-btn');
    locationButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            redirectToMaps(this);
        });
    });
    
    // Botones de Redes Sociales
    initSocialRedirects();
}

/**
 * REDIRECCIÓN A WHATSAPP
 */
function redirectToWhatsApp(button) {
    const phoneNumber = CONFIG.whatsapp.phone;
    const defaultMessage = CONFIG.whatsapp.defaultMessage;
    const customMessage = button.getAttribute('data-message') || defaultMessage;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(customMessage)}`;
    
    animateButtonRedirect(button, 'WhatsApp');
    
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 800);
}

/**
 * REDIRECCIÓN A PDF
 */
function redirectToPDF(button) {
    const pdfUrl = button.getAttribute('data-pdf') || CONFIG.pdf.menu;
    
    animateButtonRedirect(button, 'PDF');
    
    setTimeout(() => {
        window.open(pdfUrl, '_blank');
    }, 800);
}

/**
 * REDIRECCIÓN A GOOGLE MAPS
 */
function redirectToMaps(button) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.location.address)}`;
    
    animateButtonRedirect(button, 'Mapa');
    
    setTimeout(() => {
        window.open(mapsUrl, '_blank');
    }, 800);
}

/**
 * REDIRECCIONES A REDES SOCIALES
 */
function initSocialRedirects() {
    // Facebook
    const facebookButtons = document.querySelectorAll('a[href*="facebook"], .facebook-btn');
    facebookButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            animateButtonRedirect(this, 'Facebook');
            setTimeout(() => {
                window.open(CONFIG.social.facebook, '_blank');
            }, 800);
        });
    });
    
    // Instagram
    const instagramButtons = document.querySelectorAll('a[href*="instagram"], .instagram-btn');
    instagramButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            animateButtonRedirect(this, 'Instagram');
            setTimeout(() => {
                window.open(CONFIG.social.instagram, '_blank');
            }, 800);
        });
    });
    
    // TikTok
    const tiktokButtons = document.querySelectorAll('a[href*="tiktok"], .tiktok-btn');
    tiktokButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            animateButtonRedirect(this, 'TikTok');
            setTimeout(() => {
                window.open(CONFIG.social.tiktok, '_blank');
            }, 800);
        });
    });
}

/**
 * ANIMACIÓN DE REDIRECCIÓN
 */
function animateButtonRedirect(button, destination) {
    const originalContent = button.innerHTML;
    
    button.innerHTML = `
        <svg class="redirect-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        Redirigiendo a ${destination}...
    `;
    
    button.style.opacity = '0.8';
    button.style.pointerEvents = 'none';
    
    createRedirectParticles(button);
    
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
    }, 2000);
}

/**
 * PARTÍCULAS DE REDIRECCIÓN
 */
function createRedirectParticles(button) {
    const rect = button.getBoundingClientRect();
    const particles = 6;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'button-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #FF6B35;
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            animation: particleFloat 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 800);
    }
}

/**
 * GALERÍA DE IMÁGENES
 */
function initImageGallery() {
    const images = document.querySelectorAll('.gallery-image');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
}

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-caption">${alt}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            document.body.removeChild(lightbox);
        }
    });
}

/**
 * NAVEGACIÓN RESPONSIVE
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

/**
 * EFECTOS ESPECIALES DEL ASADERO
 */
function initGrillEffects() {
    // Efecto de chispas aleatorias
    setInterval(() => {
        if (Math.random() > 0.7) {
            createSparkEffect();
        }
    }, 3000);
}

function createSparkEffect() {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        background: #FF6B35;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: sparkFloat 2s ease-out forwards;
    `;
    
    document.body.appendChild(spark);
    
    setTimeout(() => {
        if (spark.parentNode) {
            spark.parentNode.removeChild(spark);
        }
    }, 2000);
}

/**
 * SISTEMA DE NOTIFICACIONES
 */
function showReservationSuccess(reservationData = {}) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    if (reservationData.date) {
        const dateElement = document.getElementById('reservation-date');
        if (dateElement) dateElement.textContent = reservationData.date;
    }
    if (reservationData.time) {
        const timeElement = document.getElementById('reservation-time');
        if (timeElement) timeElement.textContent = reservationData.time;
    }
    if (reservationData.people) {
        const peopleElement = document.getElementById('reservation-people');
        if (peopleElement) peopleElement.textContent = reservationData.people;
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.remove('show');
    }
}

/**
 * UTILIDADES
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-EC', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 11 || month < 2) return 'verano';
    if (month >= 2 && month < 5) return 'otoño';
    if (month >= 5 && month < 8) return 'invierno';
    return 'primavera';
}

/**
 * INYECTAR ESTILOS DINÁMICOS
 */
function injectDynamicStyles() {
    const styles = `
        @keyframes particleFloat {
            0% { 
                transform: translate(0, 0) scale(1); 
                opacity: 1; 
            }
            100% { 
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0); 
                opacity: 0; 
            }
        }
        
        @keyframes sparkFloat {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        
        .button-particle {
            animation: particleFloat 0.8s ease-out forwards;
        }
        
        .spark {
            animation: sparkFloat 2s ease-out forwards;
        }
        
        .redirect-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 8px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 10px;
        }
    `;
    
    if (!document.querySelector('#dynamic-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'dynamic-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

/**
 * MANEJADOR DE ERRORES GLOBAL
 */
window.addEventListener('error', function(e) {
    console.error('Error en La Emiliana Grill:', e.error);
});

/**
 * EXPORTAR FUNCIONES GLOBALES
 */
window.LaEmiliana = {
    showReservationSuccess,
    hideNotification,
    formatCurrency,
    getCurrentSeason,
    redirectToWhatsApp,
    redirectToPDF,
    redirectToMaps
};

// Inyectar estilos dinámicos al cargar
injectDynamicStyles();

console.log('📜 Scripts de La Emiliana Grill cargados correctamente');