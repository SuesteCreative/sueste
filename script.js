/* 
  Sueste Creative Agency - Final Scripts
*/

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMobileMenu();
    initTypedEffect();
    initIphoneScroll();
    initVideoFix();
    initSmoothScroll();
});

/* -----------------------------------------------------------
   1. Header State
----------------------------------------------------------- */
function initHeader() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* -----------------------------------------------------------
   2. Mobile Menu
----------------------------------------------------------- */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (!toggle || !overlay) return;

    const closeMenu = () => {
        overlay.classList.remove('active');
    };

    toggle.addEventListener('click', () => {
        if (overlay.classList.contains('active')) {
            closeMenu();
        } else {
            overlay.classList.add('active');
        }
    });

    overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* -----------------------------------------------------------
   3. Hero Typed Effect
----------------------------------------------------------- */
function initTypedEffect() {
    const prefixEl = document.getElementById("typed-prefix");
    const slowEl = document.getElementById("typed-slow");
    const hiEl = document.getElementById("typed-highlight");

    if (!prefixEl) return;

    const prefix = prefixEl.getAttribute("data-text") || "";
    const slow = slowEl.getAttribute("data-text") || "";
    const hi = hiEl.getAttribute("data-text") || "";

    prefixEl.textContent = "";
    slowEl.textContent = "";
    hiEl.textContent = "";

    let i = 0, j = 0, k = 0;

    function tick() {
        if (i < prefix.length) {
            i++;
            prefixEl.textContent = prefix.slice(0, i);
        } else if (j < slow.length) {
            j++;
            slowEl.textContent = slow.slice(0, j);
        } else if (k < hi.length) {
            k++;
            hiEl.textContent = hi.slice(0, k);
        } else {
            return;
        }
        const speed = (j > 0 && j < slow.length) ? 120 : 50;
        setTimeout(tick, speed);
    }

    setTimeout(tick, 500);
}

/* -----------------------------------------------------------
   4. iPhone Animation (Scroll Trigger)
----------------------------------------------------------- */
function initIphoneScroll() {
    const phone = document.getElementById('iphone-mockup');
    const section = document.getElementById('mobile-first');

    if (!phone || !section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Only animate on desktop if width > 900, else it's static via CSS
            if (window.innerWidth > 900) {
                if (entry.isIntersecting) {
                    phone.classList.add('in-view');
                }
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}

/* -----------------------------------------------------------
   5. Video Fix
----------------------------------------------------------- */
function initVideoFix() {
    const v = document.getElementById("heroVideo");
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.play().catch(() => { });
}

/* -----------------------------------------------------------
   6. Smooth Scroll
----------------------------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const target = document.querySelector(targetId);
            if (target) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}
