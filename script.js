// Ivan Design Landing Page JavaScript
// Author: AI Assistant
// Description: Interactive functionality for the landing page

document.addEventListener('DOMContentLoaded', function() {

    // YouTube Player API Integration
    let youtubePlayer = null;
    const unmuteButton = document.getElementById('unmute-btn');
    let isMuted = true;

    // Initialize button state
    unmuteButton.classList.add('muted');

    // YouTube API ready function
    window.onYouTubeIframeAPIReady = function() {
        youtubePlayer = new YT.Player('youtube-player', {
            width: '100%',
            height: '100%',
            videoId: 'UZrh5BDQKlw', // Your video ID
            playerVars: {
                autoplay: 1,
                mute: 1,
                loop: 1,
                playlist: 'UZrh5BDQKlw',
                controls: 1,
                showinfo: 0,
                rel: 0,
                modestbranding: 1,
                iv_load_policy: 3
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });
    };

    function onPlayerReady(event) {
        // Player is ready
        console.log('YouTube player ready');
    }

    function onPlayerStateChange(event) {
        // Handle player state changes if needed
    }

    // Unmute Button Functionality with real YouTube control
    unmuteButton.addEventListener('click', function() {
        if (!youtubePlayer) {
            showNotification('Player no está listo aún...');
            return;
        }

        if (isMuted) {
            // Unmute the video
            youtubePlayer.unMute();
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
            youtubePlayer.mute();
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

    // Video placeholder click functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const playButton = document.querySelector('.play-button');
    
    videoPlaceholder.addEventListener('click', function() {
        // Add pulse animation
        playButton.style.animation = 'pulse 0.3s ease';
        
        // Simulate video loading
        this.style.background = 'rgba(220, 38, 38, 0.2)';
        
        // Show loading message
        const videoText = this.querySelector('.video-text');
        const originalText = videoText.textContent;
        videoText.textContent = 'CARGANDO VIDEO...';
        
        setTimeout(() => {
            videoText.textContent = 'VIDEO NO DISPONIBLE';
            setTimeout(() => {
                videoText.textContent = originalText;
                videoPlaceholder.style.background = 'rgba(255,255,255,0.1)';
            }, 2000);
        }, 1500);
        
        // Reset animation
        setTimeout(() => {
            playButton.style.animation = '';
        }, 300);
    });

    // CTA Button functionality
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'translateY(-3px) scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
        }, 150);
        
        // Scroll to contact section
        const contactSection = document.querySelector('#contacto');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });

    // Contact items click functionality
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            
            // Add click animation
            this.style.transform = 'translateY(-10px) scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
            
            // Simulate opening social media or contact
            if (title.includes('INSTAGRAM')) {
                // Simulate Instagram opening
                showNotification('Abriendo Instagram... @ivandesign');
            } else if (title.includes('WSP')) {
                // Simulate WhatsApp opening
                showNotification('Abriendo WhatsApp... +54 9 11 1234-5678');
            } else if (title.includes('TIKTOK')) {
                // Simulate TikTok opening
                showNotification('Abriendo TikTok... @ivandesign');
            }
        });
    });

    // Testimonial cards hover effect
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 20px 40px rgba(220,38,38,0.3), 0 0 20px rgba(220,38,38,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 20px 40px rgba(220,38,38,0.2)';
        });
    });

    // Logo animation on page load
    const logoImg = document.querySelector('.logo-img');
    const footerLogo = document.querySelector('.footer-logo img');
    
    // Add rotation animation
    setTimeout(() => {
        logoImg.style.animation = 'logoSpin 2s ease-in-out';
        if (footerLogo) {
            footerLogo.style.animation = 'logoSpin 2s ease-in-out';
        }
    }, 500);

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
        whatsapp: 'https://wa.me/+5491123456789', // Replace with actual WhatsApp number
        tiktok: 'https://tiktok.com/@ivandesign33' // Replace with actual TikTok username
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
