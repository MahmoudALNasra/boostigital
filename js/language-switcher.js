// Stable Language Switcher with Layout Lock
document.addEventListener('DOMContentLoaded', function() {
    const langButton = document.getElementById('language-button');
    
    if (langButton) {
        langButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Lock layout dimensions
            const navItems = document.querySelectorAll('.main-nav li');
            const originalWidths = [];
            navItems.forEach(item => {
                originalWidths.push({
                    element: item,
                    width: item.offsetWidth
                });
                item.style.width = `${item.offsetWidth}px`;
            });
            
            // Get current state
            const flagImg = this.querySelector('img');
            const isEnglish = flagImg.src.includes('gb.svg');
            
            // Switch languages
            document.querySelectorAll('[data-lang="en"]').forEach(el => {
                el.style.display = isEnglish ? 'none' : 'flex';
            });
            document.querySelectorAll('[data-lang="ar"]').forEach(el => {
                el.style.display = isEnglish ? 'flex' : 'none';
            });
            
            // Update flag and attributes
            flagImg.src = isEnglish ? 'https://flagcdn.com/sa.svg' : 'https://flagcdn.com/gb.svg';
            flagImg.alt = isEnglish ? 'Arabic' : 'English';
            document.documentElement.lang = isEnglish ? 'ar' : 'en';
            document.documentElement.dir = isEnglish ? 'rtl' : 'ltr';
            
            // Restore original widths after layout settles
            setTimeout(() => {
                originalWidths.forEach(item => {
                    item.element.style.width = '';
                });
            }, 100);
        });
    }
});