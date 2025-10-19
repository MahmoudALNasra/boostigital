/**
 * Boostigital Unified Language Switcher
 * Handles language switching across all pages with consistent behavior
 */

class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('boostigitalLanguage') || 'ar'; // Default to Arabic
        this.languageButton = document.getElementById('language-button');
        this.init();
    }

    init() {
        if (!this.languageButton) return;

        // Apply saved language on page load
        if (this.currentLang === 'ar') {
            this.switchToArabic(false);
        } else {
            this.switchToEnglish(false);
        }

        // Add click event listener
        this.languageButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleLanguage();
        });
    }

    toggleLanguage() {
        const scrollY = window.scrollY;
        
        if (this.currentLang === 'en') {
            this.switchToArabic(true);
        } else {
            this.switchToEnglish(true);
        }

        // Maintain scroll position
        requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
        });

        // Save preference
        localStorage.setItem('boostigitalLanguage', this.currentLang);

        // Dispatch custom event for other scripts to listen to
        const event = new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        });
        document.dispatchEvent(event);
    }

    switchToEnglish(animate = false) {
        this.currentLang = 'en';
        
        // Update flag
        const flagImg = this.languageButton.querySelector('img');
        if (flagImg) {
            flagImg.src = 'https://flagcdn.com/w40/gb.png';
            flagImg.alt = 'English';
        }

        // Update all elements with data-lang
        document.querySelectorAll('[data-lang="en"]').forEach(el => {
            el.style.display = this.getDisplayType(el);
        });
        document.querySelectorAll('[data-lang="ar"]').forEach(el => {
            el.style.display = 'none';
        });

        // Update document attributes
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        document.body.dir = 'ltr';

        // Update navigation link texts if using data attributes
        this.updateNavLinks();
    }

    switchToArabic(animate = false) {
        this.currentLang = 'ar';
        
        // Update flag
        const flagImg = this.languageButton.querySelector('img');
        if (flagImg) {
            flagImg.src = 'https://flagcdn.com/w40/sa.png';
            flagImg.alt = 'Arabic';
        }

        // Update all elements with data-lang
        document.querySelectorAll('[data-lang="en"]').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('[data-lang="ar"]').forEach(el => {
            el.style.display = this.getDisplayType(el);
        });

        // Update document attributes
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        document.body.dir = 'rtl';

        // Update navigation link texts if using data attributes
        this.updateNavLinks();
    }

    updateNavLinks() {
        // Update links that use data-en and data-ar attributes
        document.querySelectorAll('.nav-link[data-en][data-ar]').forEach(link => {
            if (this.currentLang === 'ar') {
                link.textContent = link.getAttribute('data-ar');
            } else {
                link.textContent = link.getAttribute('data-en');
            }
        });
    }

    getDisplayType(element) {
        // Determine appropriate display type based on element
        if (element.tagName === 'SPAN' || element.tagName === 'A' || element.tagName === 'BUTTON') {
            return 'inline-block';
        } else if (element.tagName === 'LI') {
            return 'list-item';
        }
        return 'block';
    }
}

// Mobile menu toggle function
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitcher;
}
