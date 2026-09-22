/* ========================================
   ALEXANDRA'S FLORAL
   JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       HERO SLIDER
    ======================================== */

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
       Show from Roses through Collections
    ======================================== */

    const rosesSection = document.querySelector("#bouquet-arrangements");
    const bridalSection = document.querySelector("#bridal-lookbook");
    const whatsappButton = document.querySelector(".whatsapp-float");

    if (rosesSection && whatsappButton) {

        const checkWhatsAppVisibility = () => {

            const scrollPosition = window.scrollY + (window.innerHeight * 0.5);

            const rosesTop = rosesSection.offsetTop;

            let collectionsEnd = Infinity;

            if (bridalSection) {
                collectionsEnd =
                    bridalSection.offsetTop +
                    bridalSection.offsetHeight;
            }

            if (
                scrollPosition >= rosesTop &&
                scrollPosition <= collectionsEnd
            ) {
                whatsappButton.classList.add("is-visible");
            } else {
                whatsappButton.classList.remove("is-visible");
            }

        };

        window.addEventListener(
            "scroll",
            checkWhatsAppVisibility,
            { passive: true }
        );

        checkWhatsAppVisibility();
    }


    console.log("Alexandra's Floral website loaded.");

});