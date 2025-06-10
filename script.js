document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    document.querySelectorAll('.hero-section, .about-section, .projects-section, .services-section, .packages-section, .contact-section, .carousel-track')
        .forEach(section => {
            observer.observe(section);
        });
    
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".fa-angle-left");
    const nextBtn = document.querySelector(".fa-angle-right");

    let index = 0;
    const totalItems = document.querySelectorAll(".project-card").length;
    const visibleCards = 3;
    const cardGap = 10;
    const cardWidth = track.firstElementChild.offsetWidth + cardGap;

    function updateCarousel() {
        const offset = index * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener("click", () => {
        index++;
        if (index >= totalItems - visibleCards + 1) {
        index = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        index--;
        if (index < 0) {
        index = totalItems - visibleCards;
        }
        updateCarousel();
    });
    
});