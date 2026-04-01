/* ═══════════════════════════════════════════════
   PRELOADER
   ═══════════════════════════════════════════════ */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => preloader.classList.add('hidden'), 1000);
    }
});

/* ═══════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════ */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (dot && ring) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .studio-item, .shop-card, .arthaus-compact-item, .playground-item, .branch-card').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
}

/* ═══════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════ */
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 100);
    });
}

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ═══════════════════════════════════════════════
   ACTIVE NAV LINK HIGHLIGHT
   ═══════════════════════════════════════════════ */
(function() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
})();

/* ═══════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════
   LAZY LOADING
   ═══════════════════════════════════════════════ */
const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => img.classList.add('loaded');
            imgObserver.unobserve(img);
        }
    });
}, { rootMargin: '300px' });

document.querySelectorAll('.lazy-img').forEach(img => imgObserver.observe(img));

/* ═══════════════════════════════════════════════
   LIGHTBOX
   ═══════════════════════════════════════════════ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

if (lightbox && lightboxImg) {
    document.querySelectorAll('.studio-item, .arthaus-compact-item, .playground-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && (img.src || img.dataset.src)) {
                lightboxImg.src = img.src || img.dataset.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close') || e.target.closest('.lightbox-close')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ═══════════════════════════════════════════════
   PARALLAX ON HERO (home page only)
   ═══════════════════════════════════════════════ */
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.2;
        }
    });
}

/* ═══════════════════════════════════════════════
   BACK TO TOP
   ═══════════════════════════════════════════════ */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 600);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL FOR SAME-PAGE HASH LINKS
   ═══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
