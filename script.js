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

    console.log("Alexandra's Floral website loaded.");

});