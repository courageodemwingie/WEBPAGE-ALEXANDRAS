/* ========================================
   ALEXANDRA'S FLORAL
   JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const heroSlider = new Swiper(".hero-slider", {

        loop: true,

        effect: "fade",

        fadeEffect: {
            crossFade: true
        },

        speed: 900,

        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },

        pagination: {
            el: ".hero-slider .swiper-pagination",
            clickable: true
        },

        keyboard: {
            enabled: true
        }

    });


    /* ========================================
       FLOATING WHATSAPP
       Show when Collections is reached
    ======================================== */

    const collectionsSection = document.querySelector("#collections");
    const whatsappButton = document.querySelector(".whatsapp-float");

    if (collectionsSection && whatsappButton) {

        const whatsappObserver = new IntersectionObserver(
            ([entry]) => {

                whatsappButton.classList.toggle(
                    "is-visible",
                    entry.isIntersecting
                );

            },
            {
                threshold: 0.05
            }
        );

        whatsappObserver.observe(collectionsSection);
    }


    console.log("Alexandra's Floral website loaded.");

});