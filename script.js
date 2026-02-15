/* 
  Sueste Creative Agency - Premium Script
*/

document.addEventListener("DOMContentLoaded", () => {
    initTypedEffect();
    initHeader();
    initIphoneScroll();
    initMobileMenu();
});

/* -----------------------------------------------------------
   1. Typed Effect (Hero)
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
        const speed = (j > 0 && j < slow.length) ? 140 : 40;
        setTimeout(tick, speed);
    }

    setTimeout(tick, 800);
}

/* -----------------------------------------------------------
   2. Header Scroll Effect
----------------------------------------------------------- */
function initHeader() {
    const header = document.querySelector('.site-header');
    const heroH = window.innerHeight - 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* -----------------------------------------------------------
   3. iPhone Scroll Animation
   Logic: Calculate scroll percentage ONLY when section is visible
----------------------------------------------------------- */
function initIphoneScroll() {
    const phone = document.getElementById('iphone-mockup');
    const section = document.getElementById('mobile');

    if (!phone || !section) return;

    function update() {
        // Check if section is in viewport
        const rect = section.getBoundingClientRect();
        const windowH = window.innerHeight;

        // Start range: Section top enters bottom of screen
        // End range: Section bottom leaves top of screen

        // We want the phone to be at 0% translation (centered) when the section is centered
        // It starts at 120% (right off screen)

        const triggerPoint = windowH * 0.8;
        const isVisible = rect.top < triggerPoint && rect.bottom > 0;

        if (isVisible) {
            // Calculate a progress value 0 to 1
            // 0 = just entered, 1 = fully centered/scrolled

            // Simpler approach: Map scroll position to translation
            // When rect.top is at windowH (just entering) -> 120%
            // When rect.top is at 0 (top of screen) -> 0%

            let percentage = rect.top / windowH;
            // percentage goes from 1 (bottom) to 0 (top)

            let translate = percentage * 120;

            // Constraints
            if (translate < 0) translate = 0; // Don't go past center leftwards
            if (translate > 120) translate = 120; // Don't go past right

            // Enhance: Add negative rotation as it comes in
            const rotate = -20 + ((1 - percentage) * 20); // Goes from -20 to 0

            // Only apply on desktop
            if (window.innerWidth > 900) {
                phone.style.transform = `translateX(${translate}%) rotateY(-20deg)`;
            } else {
                phone.style.transform = 'none';
            }
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(update);
    });
}

/* -----------------------------------------------------------
   4. Mobile Menu Toggle
----------------------------------------------------------- */
function initMobileMenu() {
    const btn = document.querySelector('.mobile-toggle');
    const ov = document.querySelector('.mobile-nav-overlay');

    if (!btn) return;

    btn.addEventListener('click', () => {
        ov.classList.toggle('active');
    });

    ov.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            ov.classList.remove('active');
        });
    });
}
