// Ivan Design Landing Page JavaScript
// Author: AI Assistant
// Description: Interactive functionality for the landing page

document.addEventListener('DOMContentLoaded', function() {

    // Wistia Player API Integration
    let wistiaPlayer = null;
    const unmuteButton = document.getElementById('unmute-btn');
    let isMuted = true;

    // Initialize button state
    unmuteButton.classList.add('muted');

    // Initialize Wistia Player
    window._wq = window._wq || [];
    _wq.push({
        id: "oja8shuuvb",
        options: {
            autoPlay: true,
            muted: true,
            controlsVisibleOnLoad: true,
            playbar: true,
            playButton: true,
            settingsControl: true,
            volumeControl: true,
            fullscreenButton: true,
            qualityControl: true,
            playbackRateControl: true
        },
        onReady: function(video) {
            wistiaPlayer = video;
            console.log('Wistia player ready');
            
            // Ensure video starts muted and playing
            video.mute();
            video.play();
        }
    });

    // Unmute Button Functionality with real Wistia control
    unmuteButton.addEventListener('click', function() {
        if (!wistiaPlayer) {
            showNotification('Player no está listo aún...');
            return;
        }

        if (isMuted) {
            // Unmute the video
            wistiaPlayer.unmute();
            isMuted = false;
            
            // Switch to unmuted state
            this.classList.remove('muted');
            this.classList.add('unmuted');
            this.querySelector('.unmute-text').textContent = 'AUDIO ON';
            
            // Show notification
            showNotification('🔊 ¡Audio activado! Disfruta el video');
            
            // Add visual feedback
            this.style.transform = 'translate(-50%, -50%) translateY(-2px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%)';
            }, 150);

            // Hide button after 3 seconds
            setTimeout(() => {
                this.style.opacity = '0';
                this.style.transform = 'translate(-50%, -50%) scale(0.8)';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.style.display = 'none';
                }, 400);
            }, 3000);
            
        } else {
            // Mute the video (in case they want to mute again)
            wistiaPlayer.mute();
            isMuted = true;
            
            // Switch to muted state
            this.classList.remove('unmuted');
            this.classList.add('muted');
            this.querySelector('.unmute-text').textContent = 'DESMUTEAR';
            
            // Show notification
            showNotification('🔇 Video silenciado');
            
            // Add visual feedback
            this.style.transform = 'translate(-50%, -50%) translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%)';
            }, 150);
        }
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            if (this.contains(ripple)) {
                this.removeChild(ripple);
            }
        }, 600);
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.section-title, .about-content, .testimonial-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Video placeholder functionality removed - now using Wistia player

    // CTA Button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-3px) scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);
            
            // Redirect to WhatsApp with personalized message
            const whatsappMessage = encodeURIComponent('¡Hola! Me interesa obtener asesoramiento sobre cascos personalizados');
            const whatsappUrl = `https://wa.me/5492645679934?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Contact cards functionality is handled by the existing social media links code below
    // (No need for this code as contact-item class doesn't exist - now using contact-card)

    // Testimonial pills hover effect (updated to use correct class)
    const testimonialPills = document.querySelectorAll('.testimonial-pill');
    testimonialPills.forEach(pill => {
        pill.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
        });
        
        pill.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // Logo animation removed per user preference

    // Random testimonial rotation
    let testimonialIndex = 0;
    const testimonials = [
        {
            text: '"El trabajo de Iván es increíble. Mi casco se ve espectacular en la pista y refleja perfectamente mi personalidad como piloto."',
            name: '- Carlos Mendez',
            role: 'Piloto TC2000'
        },
        {
            text: '"Profesionalismo y arte unidos. Iván entendió exactamente lo que buscaba y lo plasmó de manera excepcional."',
            name: '- María Rodriguez',
            role: 'Piloto Karting'
        },
        {
            text: '"La calidad de los materiales y la atención al detalle son impresionantes. Totalmente recomendado."',
            name: '- Diego Fernandez',
            role: 'Piloto Turismo Nacional'
        },
        {
            text: '"Ivan Design transformó mi visión en realidad. El casco es una obra de arte que me acompaña en cada carrera."',
            name: '- Sofia Martinez',
            role: 'Piloto F4'
        },
        {
            text: '"La pasión por el automovilismo se nota en cada trazo. Trabajo excepcional y entrega puntual."',
            name: '- Ricardo Gomez',
            role: 'Piloto Rally'
        }
    ];

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to scroll to top
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Space bar to scroll to next section
        if (e.key === ' ' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            const currentScroll = window.pageYOffset;
            const sections = document.querySelectorAll('section');
            
            for (let section of sections) {
                if (section.offsetTop > currentScroll + 100) {
                    const headerHeight = 200; // Hero header height
                    window.scrollTo({
                        top: section.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                    break;
                }
            }
        }
    });

    // No mobile navigation needed

    // Utility function for notifications
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 2000;
            opacity: 0;
            transform: translateX(300px);
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(220,38,38,0.3);
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Console welcome message
    console.log('%c🏎️ Ivan Design - Landing Page Loaded Successfully! 🏎️', 
        'color: #dc2626; font-size: 16px; font-weight: bold;');
    console.log('%cDiseñado para la velocidad y la pasión del automovilismo', 
        'color: #666; font-style: italic;');
    console.log('%cVideo powered by Wistia', 
        'color: #54bbff; font-size: 12px;');

});

// CSS animations for logo and ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes logoSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
`;
document.head.appendChild(style);

// Social Media Links Functionality
document.addEventListener('DOMContentLoaded', function() {
    const socialCards = document.querySelectorAll('.contact-card[data-social]');
    
    const socialLinks = {
        instagram: 'https://www.instagram.com/ivandesign33',
        whatsapp: 'https://wa.me/5492645679934?text=' + encodeURIComponent('¡Hola! Me interesa obtener asesoramiento sobre cascos personalizados'),
        tiktok: 'https://www.tiktok.com/@ivandesign33?is_from_webapp=1&sender_device=pc'
    };
    
    socialCards.forEach(card => {
        card.addEventListener('click', function() {
            const socialType = this.getAttribute('data-social');
            const url = socialLinks[socialType];
            
            if (url) {
                window.open(url, '_blank');
            }
        });
        
        // Add hover effect for better UX
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smart Carousel System
function initializeSmartCarousel() {
    // Images from img/cascos/ folder
    const images = [
        { src: 'img/cascos/IMG_9366.jpg', alt: 'Diseño de casco personalizado Ivan Design' },
        { src: 'img/cascos/IMG_9668.jpg', alt: 'Diseño de casco personalizado Ivan Design' },
        { src: 'img/cascos/IMG_9710.jpg', alt: 'Diseño de casco personalizado Ivan Design' },
        { src: 'img/cascos/IMG_9729.jpg', alt: 'Diseño de casco personalizado Ivan Design' },
        { src: 'img/cascos/IMG_9737.jpg', alt: 'Diseño de casco personalizado Ivan Design' },
        { src: 'img/cascos/IMG_9855.jpg', alt: 'Diseño de casco personalizado Ivan Design' },
        { src: 'img/cascos/IMG_9856.jpg', alt: 'Diseño de casco personalizado Ivan Design' },
        { src: 'img/cascos/IMG_9857.jpg', alt: 'Diseño de casco personalizado Ivan Design' }
    ];
    
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (!carouselTrack || images.length === 0) {
        console.warn('Carrusel no encontrado o sin imágenes');
        return;
    }
    
    // Limpiar contenido existente
    carouselTrack.innerHTML = '';
    
    // Configuración del carrusel
    const minImagesForLoop = 4; // Mínimo de imágenes para hacer loop
    const hasEnoughImages = images.length >= minImagesForLoop;
    
    if (hasEnoughImages) {
        // MODO LOOP INFINITO - Suficientes imágenes
        console.log(`Modo LOOP: ${images.length} imágenes detectadas (≥${minImagesForLoop})`);
        
        // Crear el primer set de imágenes
        images.forEach((image, index) => {
            const slide = createCarouselSlide(image.src, image.alt, index + 1);
            carouselTrack.appendChild(slide);
        });
        
        // Crear el segundo set (duplicado) para el loop perfecto
        images.forEach((image, index) => {
            const slide = createCarouselSlide(image.src, image.alt, index + 1);
            carouselTrack.appendChild(slide);
        });
        
        // Aplicar animación de loop
        carouselTrack.style.animation = 'carousel-scroll 30s linear infinite';
        carouselContainer.classList.add('carousel-loop-mode');
        
        console.log(`Carrusel LOOP inicializado con ${images.length} imágenes únicas`);
        
    } else {
        // MODO ESTÁTICO - Pocas imágenes
        console.log(`Modo ESTÁTICO: ${images.length} imágenes detectadas (<${minImagesForLoop})`);
        
        // Crear solo un set de imágenes
        images.forEach((image, index) => {
            const slide = createCarouselSlide(image.src, image.alt, index + 1);
            carouselTrack.appendChild(slide);
        });
        
        // Remover animación y centrar
        carouselTrack.style.animation = 'none';
        carouselTrack.style.justifyContent = 'center';
        carouselContainer.classList.add('carousel-static-mode');
        
        console.log(`Carrusel ESTÁTICO inicializado con ${images.length} imágenes`);
    }
}

function createCarouselSlide(imageSrc, imageAlt, index) {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.onclick = () => openModal(imageSrc, imageAlt);
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.className = 'carousel-image';
    
    slide.appendChild(img);
    return slide;
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeSmartCarousel();
});

// Image Modal Functions
function openModal(imageSrc, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// Close modal when clicking outside the image
document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.querySelector('.modal-content');
    
    if (event.target === modal && !modalContent.contains(event.target)) {
        closeModal();
    }
});

// Touch Swipe Functionality for Gallery Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.getElementById('carouselTrack');
    
    if (!carouselContainer || !carouselTrack) return;
    
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    
    // Enable horizontal scrolling on touch devices
    carouselContainer.style.overflowX = 'auto';
    carouselContainer.style.cursor = 'grab';
    carouselContainer.style.userSelect = 'none';
    carouselContainer.style.webkitOverflowScrolling = 'touch';
    
    // Hide scrollbar
    const style = document.createElement('style');
    style.textContent = `
        .carousel-container::-webkit-scrollbar {
            display: none;
        }
        .carousel-container {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
    `;
    document.head.appendChild(style);
    
    // Mouse/Touch start
    carouselContainer.addEventListener('mousedown', startDragging);
    carouselContainer.addEventListener('touchstart', startDragging, { passive: true });
    
    // Mouse/Touch move
    carouselContainer.addEventListener('mousemove', drag);
    carouselContainer.addEventListener('touchmove', drag, { passive: true });
    
    // Mouse/Touch end
    carouselContainer.addEventListener('mouseup', stopDragging);
    carouselContainer.addEventListener('mouseleave', stopDragging);
    carouselContainer.addEventListener('touchend', stopDragging);
    
    function startDragging(e) {
        isDown = true;
        carouselContainer.style.cursor = 'grabbing';
        
        // Pause animation when interacting
        if (carouselTrack.style.animation) {
            carouselTrack.style.animationPlayState = 'paused';
        }
        
        const pageX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
        startX = pageX - carouselContainer.offsetLeft;
        scrollLeft = carouselContainer.scrollLeft;
        lastX = pageX;
        lastTime = Date.now();
        velocity = 0;
    }
    
    function drag(e) {
        if (!isDown) return;
        e.preventDefault();
        
        const pageX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
        const x = pageX - carouselContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        
        // Calculate velocity for momentum
        const currentTime = Date.now();
        const timeDiff = currentTime - lastTime;
        if (timeDiff > 0) {
            velocity = (pageX - lastX) / timeDiff;
        }
        lastX = pageX;
        lastTime = currentTime;
        
        carouselContainer.scrollLeft = scrollLeft - walk;
    }
    
    function stopDragging() {
        if (!isDown) return;
        isDown = false;
        carouselContainer.style.cursor = 'grab';
        
        // Resume animation after a delay
        setTimeout(() => {
            if (carouselTrack.style.animation) {
                carouselTrack.style.animationPlayState = 'running';
            }
        }, 2000);
        
        // Apply momentum scrolling
        if (Math.abs(velocity) > 0.5) {
            let momentum = velocity * 100;
            const startScroll = carouselContainer.scrollLeft;
            const startTime = Date.now();
            const duration = 500; // Momentum duration in ms
            
            function momentumScroll() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easing = 1 - Math.pow(1 - progress, 3); // Ease out cubic
                
                carouselContainer.scrollLeft = startScroll - (momentum * easing);
                
                if (progress < 1) {
                    requestAnimationFrame(momentumScroll);
                }
            }
            
            requestAnimationFrame(momentumScroll);
        }
    }
    
    // Prevent click events during drag
    carouselContainer.addEventListener('click', function(e) {
        if (Math.abs(velocity) > 0.5) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
});
