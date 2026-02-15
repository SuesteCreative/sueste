/* 
  Sueste Creative Agency
  Main Scripts - Interaction, Waves, Scroll
*/

document.addEventListener("DOMContentLoaded", () => {
    initWaves();
    initSmoothScroll();
    initHeader();
});

/* -----------------------------------------------------------
   1. Header Interaction
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
   2. Smooth Anchor Scrolling
----------------------------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

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

/* -----------------------------------------------------------
   3. Wave Animation (Canvas)
   Concept: "Invisible forces" - gentle, flowing sine waves
----------------------------------------------------------- */
function initWaves() {
    const canvas = document.getElementById('canvas-waves');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let waves = [];

    // Configuration
    const waveCount = 3;
    const waveColors = ['rgba(97, 144, 232, 0.1)', 'rgba(77, 154, 185, 0.08)', 'rgba(255, 255, 255, 0.03)'];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function init() {
        resize();
        for (let i = 0; i < waveCount; i++) {
            waves.push({
                y: height / 2,
                length: 0.005 + i * 0.001,
                amplitude: 50 + i * 20,
                frequency: 0.01 + i * 0.005,
                offset: Math.random() * 100,
                speed: 0.005 + i * 0.002
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        waves.forEach((wave, index) => {
            ctx.beginPath();
            ctx.moveTo(0, height / 2);

            for (let i = 0; i < width; i++) {
                // Sine wave formula: y = amplitude * sin(x * length + offset)
                const y = height / 2 +
                    Math.sin(i * wave.length + wave.offset) * wave.amplitude * Math.sin(wave.offset);

                ctx.lineTo(i, y);
            }

            ctx.strokeStyle = waveColors[index];
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Animate movement
            wave.offset += wave.speed;
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
}
