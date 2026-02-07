
export class FireworkManager {
    constructor(container) {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '999'; // Very high
        this.ctx = this.canvas.getContext('2d');
        container.appendChild(this.canvas);

        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.running = false;
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        this.running = true;
        this.loop();
        // Launch fireworks periodically
        this.interval = setInterval(() => this.launchRocket(), 800);
    }

    stop() {
        this.running = false;
        clearInterval(this.interval);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = [];
    }

    launchRocket() {
        const x = Math.random() * this.canvas.width;
        const y = this.canvas.height;
        const targetY = Math.random() * (this.canvas.height * 0.5);
        const color = `hsl(${Math.random() * 60 + 330}, 100%, 70%)`; // Pinks/Reds

        // Explosion immediately for simplicity in this context (Heart Burst)
        this.createHeartBurst(x, targetY, color);
    }

    createHeartBurst(x, y, color) {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            // Heart shape formula
            // x = 16sin^3(t)
            // y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
            // We verify t from 0 to 2PI

            // Normalized heart coordinates
            const tx = 16 * Math.pow(Math.sin(angle), 3);
            const ty = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));

            // Velocity scaling
            const velocity = 2 + Math.random() * 2;

            this.particles.push({
                x: x,
                y: y,
                vx: tx * (velocity / 10), // Scale down
                vy: ty * (velocity / 10),
                alpha: 1,
                color: color,
                decay: 0.01 + Math.random() * 0.01
            });
        }
    }

    loop() {
        if (!this.running) return;
        requestAnimationFrame(() => this.loop());

        // Fade out trail
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // Gravity
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
}
