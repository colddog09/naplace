// Theme Management
function initTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

// Initialize on load
initTheme();
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveScrollLink);
});

function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Exclude logo link (contains an image)
        if (link.querySelector('img')) {
            link.classList.remove('border-b-2', 'border-primary');
            return;
        }

        // Split href to ignore query params or hashes (e.g. index.html#about -> index.html)
        const showHref = href.split(/[?#]/)[0];
        const hasHash = href.includes('#');

        // If it has a hash (like #about), we don't underline it on load (handled by scroll)
        if (hasHash) {
            link.classList.remove('border-b-2', 'border-primary');
            return;
        }

        // Check if the link's href matches the current path
        if (
            (showHref && currentPath.endsWith(showHref)) ||
            (currentPath === '/' && (showHref === 'index.html' || showHref === '')) ||
            (currentPath.endsWith('/') && showHref === 'index.html')
        ) {
            // Exclude buttons styled with bg-secondary
            if (!link.classList.contains('bg-secondary')) {
                link.classList.add('text-primary', 'border-b-2', 'border-primary');
                // Remove default gray text classes if present to ensure primary color shows
                link.classList.remove('text-gray-600', 'dark:text-gray-300', 'text-slate-600', 'dark:text-slate-300');
            }
        } else {
            if (!link.classList.contains('bg-secondary') && !link.classList.contains('bg-primary')) {
                link.classList.remove('border-b-2', 'border-primary', 'text-primary');
                // Re-add default gray colors if they were stripped? 
                // It's safer to just rely on the base class or specific handling.
                // But let's restore the gray-600/300 combo which seems standard now.
                if (!link.classList.contains('font-bold')) { // Assuming bold links might be special (like recruit CTA) logic handled elsewhere or ignored
                    link.classList.add('text-gray-600', 'dark:text-gray-300');
                }
            }
        }
    });
}

function updateActiveScrollLink() {
    // Only run this on index.html or root
    const currentPath = window.location.pathname;
    const isIndex = currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/');

    if (!isIndex) return;

    // Adjust offset for sticky navbar
    const fromTop = window.scrollY + 100;
    const aboutSection = document.getElementById('about');

    if (!aboutSection) return;

    const navLinks = document.querySelectorAll('nav a[href*="#about"]');

    // Check intersection
    if (
        aboutSection.offsetTop <= fromTop &&
        aboutSection.offsetTop + aboutSection.offsetHeight > fromTop
    ) {
        navLinks.forEach(link => {
            link.classList.add('text-primary', 'border-b-2', 'border-primary');
            link.classList.remove('text-gray-600', 'dark:text-gray-300');
        });
    } else {
        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'border-b-2', 'border-primary');
            link.classList.add('text-gray-600', 'dark:text-gray-300');
        });
    }
}
