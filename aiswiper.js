function LoadSwiper(dswiper) {
    dswiper.forEach((sliderContainer, index) => {
        const swiperSlider = sliderContainer.innerHTML;
        sliderContainer.innerHTML = `<div is="swiper-slider" class="swiper${index}" style="height:100%;">${swiperSlider}</div>`;
    });
}

class SwiperSlider extends HTMLDivElement {
    constructor() {
        super();
        this.isSwiperLoaded = false;
        this.sliderInstance = null; // To hold the Swiper instance
    }
    connectedCallback() {
        this.render(); // Initial render to set up the basic structure
        this.isSwiperLoaded = true;
        this.initializeSwiper();
    }

    // Render the basic structure of the slider
    render() {
        let mycontent = this.innerHTML;
        this.innerHTML = `
                <div class="swiper-wrapper">
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-scrollbar"></div>
            `; // Set up the basic structure of the slider
        this.querySelector('.swiper-wrapper').innerHTML = mycontent; // Populate slides from innerHTML
    }

    // Initialize Swiper after assets are loaded
    initializeSwiper() {
        // Double-check if Swiper is available, though the Promise chain should ensure it
        if (!this.isSwiperLoaded || typeof Swiper === 'undefined') {
            console.warn('Swiper not yet loaded or not available. Cannot initialize.');
            return;
        }

        let options = {};
        const optionsAttr = this.parentElement.getAttribute('data-options');
        if (optionsAttr) {
            try {
                options = JSON.parse(optionsAttr);
            } catch (e) {
                console.error('Invalid JSON in data-options attribute:', e);
                // Fallback to default options if parsing fails
            }
        }

        // Default Swiper options
        const defaultOptions = {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        };

        // Merge user-provided options with defaults
        const finalOptions = { ...defaultOptions, ...options };

        // Ensure the Swiper instance is destroyed if it already exists (e.g., on attribute change)
        if (this.sliderInstance) {
            this.sliderInstance.destroy(true, true);
        }

        try {
            this.sliderInstance = new Swiper(this, finalOptions);
            this.parentElement.classList.remove('loading'); // Remove loading class once Swiper is initialized
        } catch (e) {
            console.error('Error initializing Swiper instance:', e);
            // Optionally, display an error message inside the component
            this.innerHTML = '<p style="color: red;">Error initializing slider. See console.</p>';
        }
    }

    // Lifecycle callback: Called when an attribute is added, removed, or changed.
    static get observedAttributes() {
        return ['data-options'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-options' && oldValue !== newValue) {
            // Re-initialize Swiper with new options if already loaded
            if (this.isSwiperLoaded) {
                this.initializeSwiper();
            }
        }
    }

    // Lifecycle callback: Called when the element is removed from the DOM.
    disconnectedCallback() {
        if (this.sliderInstance) {
            this.sliderInstance.destroy(true, true);
            this.sliderInstance = null;
        }
    }
}

// Define the custom element
customElements.define('swiper-slider', SwiperSlider, { extends: "div" });
