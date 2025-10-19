document.addEventListener('DOMContentLoaded', function() {
    // 1. Initial Logo Animation
    setTimeout(() => {
        const logoSubtext = document.querySelector('.logo-subtext');
        if (logoSubtext) {
            logoSubtext.style.animation = 'fadeIn 1s forwards';
        }
    }, 1000);

    // 2. Boost Section Animation - Fixed Version
    const boostSection = document.getElementById('boostSection');
    if (boostSection) {
        const boostWord = document.getElementById('boostWord');
        const businessLine = document.querySelector('.line-3');
        
        // Set initial state
        boostWord.style.opacity = '0';
        businessLine.style.opacity = '0';
        
        const boostObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // First blue word ("boost") animation
                    setTimeout(() => {
                        boostWord.style.transition = 'opacity 0.8s ease-out';
                        boostWord.style.opacity = '1';
                        
                        // Entire third line ("your business!") animation after delay
                        setTimeout(() => {
                            businessLine.style.transition = 'opacity 0.8s ease-out';
                            businessLine.style.opacity = '1';
                        }, 500);
                    }, 300);
                } else {
                    // Reset animations when leaving section
                    boostWord.style.opacity = '0';
                    businessLine.style.opacity = '0';
                }
            });
        }, { threshold: 0.3 });
        
        boostObserver.observe(boostSection);
    }

    // 3. Main Intersection Observer for All Other Sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Brand Showcase Animation
                if (entry.target.classList.contains('brand-showcase')) {
                    entry.target.style.animation = 'zoomIn 1.5s forwards';
                }
                
                // Social Section Animation
                else if (entry.target.classList.contains('social-section')) {
                    const leftElements = entry.target.querySelectorAll('.social-title-left, .social-subtitle-left');
                    const rightElements = entry.target.querySelectorAll('.social-title-right, .social-subtitle-right');
                    
                    leftElements.forEach((el, index) => {
                        el.style.animation = `slideInFromLeft 1s ${index * 0.1}s forwards`;
                    });
                    
                    rightElements.forEach((el, index) => {
                        el.style.animation = `slideInFromRight 1s ${index * 0.1}s forwards`;
                    });
                }
                
                // Concept Sections Animation
                else if (entry.target.classList.contains('social-description') || 
                        entry.target.classList.contains('concept-section')) {
                    const lines = entry.target.querySelectorAll('.title-line');
                    lines.forEach((line, i) => {
                        const delay = 0.3 + (i * 0.3);
                        line.style.animation = line.classList.contains('title-line-1') 
                            ? `slideInFromLeft 1s ${delay}s forwards` 
                            : `slideInFromRight 1s ${delay}s forwards`;
                    });
                    
                    const images = entry.target.querySelectorAll('.desc-image');
                    images.forEach((img, i) => {
                        img.style.animation = `slideInFromRight 1s ${0.5 + (i * 0.3)}s forwards`;
                    });
                }
                
                // Brand Promise Animation
                else if (entry.target.classList.contains('brand-promise')) {
                    entry.target.querySelector('.promise-box').style.animation = 'slideBoxIn 1.5s forwards';
                }
                
                // Image Grid Animation
                else if (entry.target.classList.contains('image-grid-section')) {
                    const topImages = entry.target.querySelectorAll('.top-image');
                    const bottomImages = entry.target.querySelectorAll('.bottom-image');
                    
                    topImages.forEach((img, i) => {
                        img.style.animation = `slideDown 1s ${i * 0.3}s forwards`;
                    });
                    
                    bottomImages.forEach((img, i) => {
                        img.style.animation = `slideUp 1s ${i * 0.3}s forwards`;
                    });
                }
                
                // Unconventional Section Animation
                else if (entry.target.classList.contains('unconventional-section')) {
                    entry.target.querySelector('.unconventional-headline').style.animation = 'fadeIn 1s 0.3s forwards';
                    
                    const phone1 = entry.target.querySelector('.phone-1');
                    const phone2 = entry.target.querySelector('.phone-2');
                    
                    phone1.style.animation = 'phoneRise 1s 0.5s forwards';
                    phone2.style.animation = 'phoneRise 1s 0.7s forwards';
                    
                    entry.target.querySelector('.signature-image').style.animation = 'fadeIn 1s 1.2s forwards';
                }
                
                // Business Adoption Animation
                else if (entry.target.classList.contains('business-adoption-section')) {
                    entry.target.querySelector('.section-title').style.animation = 'fadeIn 0.8s 0.3s forwards';
                    entry.target.querySelector('.stat-text').style.animation = 'fadeIn 0.8s 0.5s forwards';
                    
                    entry.target.querySelector('.did-you-know').style.animation = 'fadeIn 0.8s 0.4s forwards';
                    entry.target.querySelector('.right-stat-number').style.animation = 'fadeIn 0.8s 0.6s forwards';
                    entry.target.querySelector('.right-stat-text').style.animation = 'fadeIn 0.8s 0.8s forwards';
                }
            } else {
                // Exit Animations
                if (entry.target.classList.contains('brand-showcase')) {
                    entry.target.style.animation = 'zoomOut 1.5s forwards';
                }
                else if (entry.target.classList.contains('social-section')) {
                    const leftElements = entry.target.querySelectorAll('.social-title-left, .social-subtitle-left');
                    const rightElements = entry.target.querySelectorAll('.social-title-right, .social-subtitle-right');
                    
                    leftElements.forEach((el, index) => {
                        el.style.animation = `slideOutToLeft 1s ${index * 0.1}s forwards`;
                    });
                    
                    rightElements.forEach((el, index) => {
                        el.style.animation = `slideOutToRight 1s ${index * 0.1}s forwards`;
                    });
                }
                else if (entry.target.classList.contains('social-description') || 
                        entry.target.classList.contains('concept-section')) {
                    const lines = entry.target.querySelectorAll('.title-line');
                    lines.forEach((line, i) => {
                        const delay = 0.3 + (i * 0.3);
                        line.style.animation = line.classList.contains('title-line-1') 
                            ? `slideOutToLeft 1s ${delay}s forwards` 
                            : `slideOutToRight 1s ${delay}s forwards`;
                    });
                    
                    const images = entry.target.querySelectorAll('.desc-image');
                    images.forEach((img, i) => {
                        img.style.animation = `slideOutToRight 1s ${0.5 + (i * 0.3)}s forwards`;
                    });
                }
                else if (entry.target.classList.contains('brand-promise')) {
                    entry.target.querySelector('.promise-box').style.animation = 'slideBoxOut 1.5s forwards';
                }
                else if (entry.target.classList.contains('image-grid-section')) {
                    const topImages = entry.target.querySelectorAll('.top-image');
                    const bottomImages = entry.target.querySelectorAll('.bottom-image');
                    
                    topImages.forEach((img, i) => {
                        img.style.animation = `slideOutToLeft 1s ${i * 0.3}s forwards`;
                    });
                    
                    bottomImages.forEach((img, i) => {
                        img.style.animation = `slideOutToRight 1s ${i * 0.3}s forwards`;
                    });
                }
                else if (entry.target.classList.contains('unconventional-section')) {
                    entry.target.querySelector('.unconventional-headline').style.animation = 'fadeOut 1s forwards';
                    
                    const phones = entry.target.querySelectorAll('.phone-screen');
                    phones.forEach(phone => {
                        phone.style.animation = 'phoneFall 1s forwards';
                    });
                    
                    entry.target.querySelector('.signature-image').style.animation = 'fadeOut 1s forwards';
                }
                else if (entry.target.classList.contains('business-adoption-section')) {
                    entry.target.querySelectorAll('.section-title, .stat-text, .did-you-know, .right-stat-number, .right-stat-text').forEach(el => {
                        el.style.animation = 'fadeOut 0.8s forwards';
                    });
                }
            }
        });
    }, { threshold: 0.2 });

    // 4. Initialize All Sections
    document.querySelectorAll('section:not(#boostSection)').forEach(section => {
        observer.observe(section);
        
        // Set initial states
        if (section.classList.contains('social-section')) {
            const leftElements = section.querySelectorAll('.social-title-left, .social-subtitle-left');
            const rightElements = section.querySelectorAll('.social-title-right, .social-subtitle-right');
            
            leftElements.forEach(el => {
                el.style.transform = 'translateX(-100px)';
                el.style.opacity = '0';
            });
            
            rightElements.forEach(el => {
                el.style.transform = 'translateX(100px)';
                el.style.opacity = '0';
            });
        }
        else if (section.classList.contains('social-description') || 
                section.classList.contains('concept-section')) {
            const lines = section.querySelectorAll('.title-line');
            lines.forEach(line => {
                line.style.transform = line.classList.contains('title-line-1') 
                    ? 'translateX(-100%)' 
                    : 'translateX(100%)';
                line.style.opacity = '0';
            });
            
            const images = section.querySelectorAll('.desc-image');
            images.forEach(img => {
                img.style.transform = 'translateX(50px)';
                img.style.opacity = '0';
            });
        }
        else if (section.classList.contains('brand-promise')) {
            section.querySelector('.promise-box').style.transform = 'translateX(100%)';
            section.querySelector('.promise-box').style.opacity = '0';
        }
        else if (section.classList.contains('image-grid-section')) {
            const topImages = section.querySelectorAll('.top-image');
            const bottomImages = section.querySelectorAll('.bottom-image');
            
            topImages.forEach(img => {
                img.style.transform = 'translateY(-100%)';
                img.style.opacity = '0';
            });
            
            bottomImages.forEach(img => {
                img.style.transform = 'translateY(100%)';
                img.style.opacity = '0';
            });
        }
        else if (section.classList.contains('unconventional-section')) {
            section.querySelector('.unconventional-headline').style.opacity = '0';
            
            const phones = section.querySelectorAll('.phone-screen');
            phones.forEach(phone => {
                phone.style.transform = 'translateY(120px) rotate(0deg)';
                phone.style.opacity = '0';
            });
            
            section.querySelector('.signature-image').style.opacity = '0';
        }
        else if (section.classList.contains('business-adoption-section')) {
            section.querySelectorAll('.section-title, .stat-text, .did-you-know, .right-stat-number, .right-stat-text').forEach(el => {
                el.style.opacity = '0';
            });
        }
    });

    // 5. Dynamic Animation Styles
    const style = document.createElement('style');
    style.textContent = `
        /* Boost Section Fixes */
        .blue-text {
            opacity: 0;
            will-change: opacity;
        }
        .line-3 {
            opacity: 0;
            will-change: opacity;
        }
        
        /* Animation Keyframes */
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            to { opacity: 0; }
        }
        @keyframes zoomIn {
            to { transform: scale(1); opacity: 1; }
        }
        @keyframes zoomOut {
            to { transform: scale(0.9); opacity: 0; }
        }
        @keyframes slideInFromLeft {
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromRight {
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutToLeft {
            to { transform: translateX(-100px); opacity: 0; }
        }
        @keyframes slideOutToRight {
            to { transform: translateX(100px); opacity: 0; }
        }
        @keyframes slideDown {
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideUp {
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideBoxIn {
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideBoxOut {
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes phoneRise {
            to { transform: translateY(0) rotate(var(--target-rotation)); opacity: 1; }
        }
        @keyframes phoneFall {
            to { transform: translateY(120px) rotate(0deg); opacity: 0; }
        }
        
        /* Phone Rotation Variables */
        .phone-1 {
            --target-rotation: -8deg;
        }
        .phone-2 {
            --target-rotation: 8deg;
        }
    `;
    document.head.appendChild(style);
});
// Screen Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.screen-toggle');
    const laptopScreen = document.querySelector('.laptop-screen');
    
    if (toggleButton && laptopScreen) {
        laptopScreen.style.opacity = '1';
        
        toggleButton.addEventListener('click', function() {
            const isScreenVisible = laptopScreen.style.opacity === '0';
            laptopScreen.style.opacity = isScreenVisible ? '1' : '0';
            this.textContent = isScreenVisible ? 'Boost Screen' : 'Hide Screen';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const contactBtn = document.querySelector('.contact-btn');
  const callBtn = document.querySelector('.call-btn');
  const overlay = document.querySelector('.boostigital-overlay');
  const closeBtn = document.querySelector('.close-overlay');
  const instruction = document.querySelector('.animation-instruction');

  // Handle button clicks
  [contactBtn, callBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.style.display = 'block';
      instruction.textContent = "This is your boosting solution";
    });
  });

  // Handle close button
  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    instruction.textContent = "Click on 'Contact Us' or 'Call Us' to view details";
  });

  // Close when clicking outside image
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.style.display = 'none';
      instruction.textContent = "Click on 'Contact Us' or 'Call Us' to view details";
    }
  });
});

// Intersection Observer for animations
const conversionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('conversion-boost-section')) {
            entry.target.querySelector('.conversion-boost-title').style.animation = 'fadeIn 0.8s 0.3s forwards';
            entry.target.querySelector('.conversion-boost-text').style.animation = 'fadeIn 0.8s 0.5s forwards';
            entry.target.querySelector('.conversion-did-you-know').style.animation = 'fadeIn 0.8s 0.4s forwards';
            entry.target.querySelector('.conversion-big-number').style.animation = 'fadeIn 0.8s 0.6s forwards';
            entry.target.querySelector('.conversion-right-text').style.animation = 'fadeIn 0.8s 0.8s forwards';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.conversion-boost-section').forEach(section => {
    conversionObserver.observe(section);
});


// Hero Boost Section Animation
const heroBoostObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('hero-boost-section')) {
            const hero = entry.target;
            hero.querySelector('.hero-boost-logo').style.animation = 'fadeInUp 1s 0.3s forwards';
            hero.querySelector('.hero-boost-tagline').style.animation = 'fadeInUp 1s 0.6s forwards';
        }
    });
}, { threshold: 0.1 });

// Initialize observer
document.querySelectorAll('.hero-boost-section').forEach(section => {
    heroBoostObserver.observe(section);
});