// Enhanced Header Functionality
// 1. Toggle menu
// 2. Smart scroll (show on scroll up, hide on scroll down)
// 3. Close menu when clicking outside

class HeaderManager {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.hamburger = document.querySelector('.hamburger');
        this.mainNav = document.getElementById('mainNav');
        this.lastScrollTop = 0;
        this.scrollThreshold = 10; // Increased for smoother detection
        this.isMenuOpen = false;
        this.backdrop = null;
        
        this.init();
    }
    
    init() {
        if (!this.header || !this.hamburger || !this.mainNav) {
            console.error('Header elements not found');
            return;
        }
        
        console.log('HeaderManager initialized');
        
        // Create backdrop element
        this.createBackdrop();
        
        // Initialize scroll position
        this.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scroll listener for smart header
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Check initial scroll position
        this.handleScroll();
        
        // Remove onclick attribute if exists and add proper event listener
        this.hamburger.removeAttribute('onclick');
        
        // Hamburger click - use addEventListener without stopPropagation initially
        this.hamburger.addEventListener('click', (e) => {
            console.log('Hamburger clicked');
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });
        
        // Prevent clicks inside menu from closing it
        this.mainNav.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Add click outside listener after a short delay
        setTimeout(() => {
            document.addEventListener('click', (e) => this.handleClickOutside(e));
        }, 100);
    }
    
    createBackdrop() {
        // Create backdrop element
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'menu-backdrop';
        document.body.appendChild(this.backdrop);
        
        // Backdrop click closes menu
        this.backdrop.addEventListener('click', () => {
            console.log('Backdrop clicked');
            this.closeMenu();
        });
    }
    
    toggleMenu() {
        console.log('toggleMenu called, isMenuOpen:', this.isMenuOpen);
        this.isMenuOpen = !this.isMenuOpen;
        this.mainNav.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        console.log('Menu toggled, new state:', this.isMenuOpen);
        
        // Toggle backdrop
        if (this.backdrop) {
            this.backdrop.classList.toggle('active');
            console.log('Backdrop toggled');
        }
        
        // Add animation to hamburger
        if (this.isMenuOpen) {
            this.hamburger.setAttribute('aria-expanded', 'true');
            // Prevent body scroll when menu is open on mobile
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            }
        } else {
            this.hamburger.setAttribute('aria-expanded', 'false');
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }
    
    closeMenu() {
        if (this.isMenuOpen) {
            this.isMenuOpen = false;
            this.mainNav.classList.remove('active');
            this.hamburger.classList.remove('active');
            this.hamburger.setAttribute('aria-expanded', 'false');
            
            // Hide backdrop
            if (this.backdrop) {
                this.backdrop.classList.remove('active');
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // If at top of page, always show header
        if (scrollTop <= 100) {
            this.header.classList.remove('header-hidden');
            return;
        }
        
        // Scrolling down - hide header
        if (scrollTop > this.lastScrollTop + this.scrollThreshold) {
            console.log('Hiding header - scrolling down');
            this.header.classList.add('header-hidden');
            this.closeMenu(); // Close menu when scrolling down
        } 
        // Scrolling up - show header
        else if (scrollTop < this.lastScrollTop - this.scrollThreshold) {
            console.log('Showing header - scrolling up');
            this.header.classList.remove('header-hidden');
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    handleClickOutside(e) {
        // Check if click is outside both hamburger and menu
        if (this.isMenuOpen && 
            !this.mainNav.contains(e.target) && 
            !this.hamburger.contains(e.target)) {
            this.closeMenu();
        }
    }
}

// Legacy function for existing onclick handlers
function toggleMenu() {
    if (window.headerManager) {
        window.headerManager.toggleMenu();
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.headerManager = new HeaderManager();
    });
} else {
    window.headerManager = new HeaderManager();
}

