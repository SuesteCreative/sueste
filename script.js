/* 
  Sueste Creative Agency - Professional Logic
*/

document.addEventListener("DOMContentLoaded", () => {
    initWaves();
    initHeader();
    initMobileMenu();
    initIphoneScroll();
});

/* -----------------------------------------------------------
   1. Sticky Header
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
    const overlay = document.querySelector('.mobile-nav-overlay');
    const links = document.querySelectorAll('.mobile-nav-links a');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        overlay.classList.toggle('active');
        // Change toggle icon state here if needed
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
        });
    });
}

/* -----------------------------------------------------------
   3. iPhone Scroll Animation
   Logic: Calculate scroll percentage of the section.
   Move iPhone from right (translateX > 0) to center (translateX 0).
   Reverse when scrolling up.
----------------------------------------------------------- */
function initIphoneScroll() {
    const section = document.getElementById('digital-impact');
    const phone = document.getElementById('iphone-mockup');

    if (!section || !phone) return;

    window.addEventListener('scroll', () => {
        // Get section position relative to viewport
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Start animation when section enters viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
            // Calculate progress: 0 when top enters bottom of screen, 1 when it's fully visible/centered
            // We adjust the range to make it feel responsive
            const range = viewportHeight + rect.height;
            const current = viewportHeight - rect.top;
            let progress = current / range; // 0 to 1 approx

            // Clamp progress
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            // Animation Logic: 
            // Start at translateX(100%), End at translateX(0%)
            // We want it to be fully available (0%) around center screen

            // Let's map it: at progress 0.2 -> 100%, at progress 0.6 -> 0%
            let moveX = 150 - (progress * 350);

            // Clamp values so it sits at 0 or moves out
            if (moveX < 0) moveX = 0;
            if (moveX > 150) moveX = 150;

            // Apply
            phone.style.transform = `translateX(${moveX}%) rotateY(-15deg)`;
        }
    });
}


/* -----------------------------------------------------------
   4. Background Waves (Subtle)
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
        for (let i = 0; i < 3; i++) {
            waves.push({
                y: height / 2,
                length: 0.005 + i * 0.001,
                amplitude: 80 + i * 20,
                frequency: 0.01,
                offset: i * 2,
                speed: 0.005 + i * 0.001
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        waves.forEach((wave, index) => {
            ctx.beginPath();
            for (let i = 0; i < width; i++) {
                const y = height / 2 + Math.sin(i * wave.length + wave.offset) * wave.amplitude;
                ctx.lineTo(i, y);
            }
            const grad = ctx.createLinearGradient(0, 0, width, 0);
            grad.addColorStop(0, "rgba(97, 144, 232, 0.05)");
            grad.addColorStop(1, "rgba(77, 154, 185, 0.05)");

            ctx.strokeStyle = grad;
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
