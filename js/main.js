
import { story } from './story.js';
import { FireworkManager } from './fireworks.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('story-container');
    const bgMusic = document.getElementById('bg-music');
    let currentIndex = 0;

    // Initialize Fireworks
    const fw = new FireworkManager(document.getElementById('app'));

    // --- Wind Effect (Hearts & Roses) ---
    const nebulaBg = document.querySelector('.nebula-bg');
    if (nebulaBg) {
        // Create 35 drifting romantic elements
        const icons = ['❤️', '🌹', '✨', '💖', '🥀'];

        for (let i = 0; i < 35; i++) {
            const p = document.createElement('div');
            p.className = 'wind-particle';

            // Random Icon
            p.innerText = icons[Math.floor(Math.random() * icons.length)];

            // Random properties
            const size = Math.random() * 0.7 + 0.3; // 0.3rem - 1.0rem
            const top = Math.random() * 90 + 5; // 5-95% height
            const duration = Math.random() * 15 + 10; // 10-25s slow drift
            const delay = Math.random() * 10; // Start delays

            p.style.fontSize = `${size}rem`;
            p.style.top = `${top}%`;
            p.style.left = `-50px`; // Start off screen left
            p.style.animation = `floatWind ${duration}s linear infinite -${delay}s`;
            p.style.opacity = Math.random() * 0.2 + 0.1; // Very faint

            nebulaBg.appendChild(p);
        }
    }

    // Create DOM elements
    const textElement = document.createElement('div');
    textElement.className = 'story-text';
    container.appendChild(textElement);

    const btnNext = document.createElement('button');
    btnNext.className = 'btn-next';
    btnNext.innerText = 'Continue';
    container.appendChild(btnNext);

    const interactionContainer = document.createElement('div');
    interactionContainer.className = 'interaction-container';
    interactionContainer.style.display = 'none';
    container.appendChild(interactionContainer);

    // 4. Render Logic (Cinematic Fade)
    function renderSlide(index) {
        if (index >= story.length) return;
        const slide = story[index];

        // Reset Interactions
        gsap.to(btnNext, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
        interactionContainer.innerHTML = '';
        interactionContainer.style.display = 'none';

        // 1. Text Animation: Blur Out Old -> Blur In New
        gsap.to(textElement, {
            filter: "blur(10px)",
            opacity: 0,
            y: -10,
            duration: 0.6,
            onComplete: () => {
                // Update Content

                // Clear any previous media
                const existingMedia = container.querySelector('.memory-card');
                if (existingMedia) existingMedia.remove();

                const existingGallery = container.querySelector('.gallery-grid');
                if (existingGallery) existingGallery.remove();

                if (slide.gallery) {
                    // GALLERY MODE
                    textElement.innerHTML = '';

                    const grid = document.createElement('div');
                    grid.className = 'gallery-grid';

                    slide.gallery.forEach((src, idx) => {
                        const item = document.createElement('div');
                        item.className = 'gallery-item';
                        item.innerHTML = `<img src="${src}" class="gallery-img" onerror="this.src='https://placehold.co/200x200/e31b6d/white?text=${idx + 1}'; this.onerror=null;">`;
                        grid.appendChild(item);
                    });

                    container.insertBefore(grid, btnNext);

                    // Stagger Animation
                    gsap.from(grid.children, {
                        opacity: 0,
                        y: 30,
                        scale: 0.8,
                        rotation: () => Math.random() * 10 - 5,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "back.out(1.5)"
                    });

                    showControls(slide);

                } else if (slide.image) {
                    // SINGLE IMAGE MODE
                    textElement.innerHTML = '';

                    const card = document.createElement('div');
                    card.className = 'memory-card';
                    card.innerHTML = `
                        <img src="${slide.image}" class="memory-img" onerror="this.src='https://placehold.co/400x300/e31b6d/white?text=Your+Photo+Here'; this.onerror=null;">
                        <p class="memory-caption">${slide.caption || ''}</p>
                    `;

                    container.insertBefore(card, btnNext);

                    gsap.from(card, { opacity: 0, scale: 0.8, rotate: 5, duration: 1, ease: "back.out(1.2)" });
                    showControls(slide);

                } else {
                    // TEXT MODE
                    textElement.className = slide.style ? `story-text ${slide.style}` : 'story-text';
                    textElement.innerHTML = slide.text;

                    gsap.set(textElement, { filter: "blur(10px)", opacity: 0, y: 10 });

                    gsap.to(textElement, {
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        onComplete: () => {
                            showControls(slide);
                        }
                    });
                }
            }
        });

        // Special Actions: Music
        if (slide.action === "playMusic" && bgMusic.paused) {
            // Try to play
        }

        // Special Action: Fireworks
        if (slide.action === "fireworks") {
            fw.start();
        } else {
            fw.stop();
        }
    }

    function showControls(slide) {
        if (slide.yesNo) {
            renderYesNoButtons(slide);
        } else if (!slide.autoNext) {
            btnNext.innerText = slide.buttonText || "Continue ❤️";
            gsap.to(btnNext, { opacity: 1, pointerEvents: 'auto', duration: 0.8 });
        } else {
            setTimeout(nextSlide, slide.duration || 2500);
        }
    }

    function renderYesNoButtons(slide) {
        interactionContainer.style.display = 'flex';

        const btnYes = document.createElement('button');
        btnYes.className = 'btn-yes';
        btnYes.innerText = "Yes ❤️";

        const btnNo = document.createElement('button');
        btnNo.className = 'btn-no';
        btnNo.innerText = "No 💔";

        const noTexts = [
            "Are you sure? 🤨", "Really sure? 🥺", "Think again! 🤔", "Last chance! 😖",
            "Surely not? 😢", "You might regret this! 😩", "Give it another thought! 💭",
            "Are you absolutely certain? 🧐", "This could be a mistake! 🚫", "Have a heart! 💔",
            "Don't be so cold! 🥶", "Change of heart? 🔁", "Wouldn't you reconsider? 🥺",
            "Is that your final answer? 🔒", "You're breaking my heart ;( 💔"
        ];
        let noClickCount = 0;

        btnNo.addEventListener('click', () => {
            noClickCount++;
            btnNo.innerText = noTexts[Math.min(noClickCount, noTexts.length - 1)];

            const currentSize = 1.2 + (noClickCount * 0.5);
            const currentPadding = 12 + (noClickCount * 5);

            gsap.to(btnYes, {
                fontSize: `${currentSize}rem`,
                padding: `${currentPadding}px ${currentPadding * 2.5}px`,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });

        btnYes.addEventListener('click', () => nextSlide());

        interactionContainer.appendChild(btnYes);
        interactionContainer.appendChild(btnNo);

        gsap.from(interactionContainer, { opacity: 0, y: 20, duration: 1, delay: 0.5 });
    }

    function nextSlide() {
        if (currentIndex < story.length - 1) {
            currentIndex++;
            renderSlide(currentIndex);
        } else {
            // End of story - check for manual replay triggering or just stop
        }
    }

    btnNext.addEventListener('click', () => {
        if (bgMusic.paused) {
            // Skip intro (start at 4 seconds) if we are at the beginning
            if (bgMusic.currentTime < 4) {
                bgMusic.currentTime = 4;
            }
            bgMusic.play().catch(e => console.log("Audio requires interaction"));
        }

        // Replay Logic
        const currentSlide = story[currentIndex];
        if (currentSlide.replay) {
            location.reload();
        } else {
            nextSlide();
        }
    });

    // Start
    renderSlide(0);
});
