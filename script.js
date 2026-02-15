/* 
  Sueste Creative Agency - Final Premium Script
*/

document.addEventListener("DOMContentLoaded", () => {
    initWaves();
    initTypedEffect();
    initHeader();
    initIphoneScroll();
    initMobileMenu();
    initScrollReveal();
});

/* -----------------------------------------------------------
   1. Canvas Waves (Atmosphere)
----------------------------------------------------------- */
function initWaves() {
    const canvas = document.getElementById('canvas-waves');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let waves = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function init() {
        resize();
        waves = [];
        // Create 3 layers of waves
        for (let i = 0; i < 3; i++) {
            waves.push({
                y: height / 2 + (i * 20),
                length: 0.005,
                amplitude: 50 + (i * 20),
                frequency: 0.01,
                offset: i,
                speed: 0.005 + (i * 0.002)
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        waves.forEach((wave, i) => {
            ctx.beginPath();
            for (let x = 0; x < width; x++) {
                const y = height / 2 + Math.sin(x * wave.length + wave.offset) * wave.amplitude;
                ctx.lineTo(x, y);
            }

            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, `rgba(59, 130, 246, ${0.1 - (i * 0.02)})`);
            gradient.addColorStop(1, `rgba(96, 165, 250, ${0.1 - (i * 0.02)})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();

            wave.offset += wave.speed;
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
}

/* -----------------------------------------------------------
   2. Typed Effect (Hero)
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
        setTimeout(tick, (j > 0 && j < slow.length) ? 140 : 40);
    }

    setTimeout(tick, 500);
}

/* -----------------------------------------------------------
   3. Scroll Reveal (Fade Up)
----------------------------------------------------------- */
function initScrollReveal() {
    const elements = document.querySelectorAll('.fade-up, .fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

/* -----------------------------------------------------------
   4. iPhone Scroll Logic (Parallax)
----------------------------------------------------------- */
function initIphoneScroll() {
    const phone = document.getElementById('iphone-mockup');
    const section = document.getElementById('mobile');

    if (!phone || !section) return;

    function update() {
        if (window.innerWidth < 1024) return; // Disable on tablet/mobile

        const rect = section.getBoundingClientRect();
        const windowH = window.innerHeight;

        // Logic: 0% at center screen. 100% off screen right.
        // Range of motion: from rect.top = windowH (entry) to rect.top = 0 (center)

        // Progress 0 = entering viewport. Progress 1 = centered.
        let progress = Math.max(0, Math.min(1, 1 - (rect.top / (windowH * 0.8))));

        // Start at 100% translate (right). End at 0% (center).
        let translate = 100 - (progress * 100);
        let opacity = progress; // Fade in as it arrives
        let rotate = -20 + (progress * 20); // Rotate from -20 to 0

        phone.style.transform = `translateX(${translate}%) rotateY(${rotate}deg)`;
        phone.style.opacity = opacity;
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(update);
    });
}

/* -----------------------------------------------------------
   5. Mobile Menu & Header
----------------------------------------------------------- */
function initMobileMenu() {
    const btn = document.querySelector('.mobile-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');

    if (btn) {
        btn.addEventListener('click', () => overlay.classList.toggle('active'));
        overlay.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => overlay.classList.remove('active'));
        });
    }
}

function initHeader() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}
