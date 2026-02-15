/* 
  Sueste Creative Agency - Logic
*/

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMobileMenu();
    initTypedEffect();
    initIphoneScroll();
    initVideoFix();
});

/* -----------------------------------------------------------
   1. Header Scroll State
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

    toggle.addEventListener('click', () => {
        // Toggle active classes
        const isActive = overlay.classList.contains('active');

        if (isActive) {
            overlay.classList.remove('active');
            toggle.classList.remove('open');
        } else {
            overlay.classList.add('active');
            toggle.classList.add('open');
        }
    });

    // Close on link click
    overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
            toggle.classList.remove('open');
        });
    });
}

/* -----------------------------------------------------------
   3. Hero Typed Effect (Restored Logic)
----------------------------------------------------------- */
function initTypedEffect() {
    const prefixEl = document.getElementById("typed-prefix");
    const slowEl = document.getElementById("typed-slow");
    const hiEl = document.getElementById("typed-highlight");

    if (!prefixEl) return; // Only runs if we are on the homepage

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
        const speed = (j > 0 && j < slow.length) ? 150 : 50; // Slow down for middle part
        setTimeout(tick, speed);
    }

    setTimeout(tick, 500);
}

/* -----------------------------------------------------------
   4. iPhone Scroll Animation (Refined)
----------------------------------------------------------- */
function initIphoneScroll() {
    const phone = document.getElementById('iphone-mockup');
    const section = document.getElementById('digital-mockup');

    if (!phone || !section) return;

    // Use IntersectionObserver for better performance than scroll event
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Toggle class when in view
            if (entry.isIntersecting) {
                phone.classList.add('in-view');
            } else {
                // Optional: remove class to replay animation when scrolling back up
                // phone.classList.remove('in-view');
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% visible

    observer.observe(section);
}

/* -----------------------------------------------------------
   5. Video Autoplay Fix
----------------------------------------------------------- */
function initVideoFix() {
    const v = document.getElementById("heroVideo");
    if (!v) return;

    v.muted = true;
    v.playsInline = true;
    v.play().catch(() => { });
}
