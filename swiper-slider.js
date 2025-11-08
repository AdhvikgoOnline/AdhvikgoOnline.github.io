// swiper-slider.js

const SWIPER_CSS_URL = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
const SWIPER_JS_URL = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';

// // Static method to check if a script/link with a specific URL exists
// function assetExists(url, type) {
//     if (type === 'script') {
//         return document.querySelector(`script[src="${url}"]`) !== null;
//     } else if (type === 'link') {
//         return document.querySelector(`link[href="${url}"][rel="stylesheet"]`) !== null;
//     }
//     return false;
// }

// // Dynamically load CSS and JS
// async function loadSwiperAssets() {
//     const loadPromises = [];

//     // Load CSS
//     if (!assetExists(SWIPER_CSS_URL, 'link')) {
//         const link = document.createElement('link');
//         link.rel = 'stylesheet';
//         link.href = SWIPER_CSS_URL;
//         loadPromises.push(new Promise((resolve, reject) => {
//             link.onload = () => {
//                 // console.log(`Swiper CSS loaded: ${SWIPER_CSS_URL}`);
//                 resolve();
//             };
//             link.onerror = () => reject(new Error(`Failed to load CSS: ${SWIPER_CSS_URL}`));
//             document.head.appendChild(link);
//         }));
//     } else {
//         // console.log('Swiper CSS already loaded.');
//     }

//     // Load JS
//     if (!assetExists(SWIPER_JS_URL, 'script')) {
//         const script = document.createElement('script');
//         script.src = SWIPER_JS_URL;
//         loadPromises.push(new Promise((resolve, reject) => {
//             script.onload = () => {
//                 // console.log(`Swiper JS loaded: ${SWIPER_JS_URL}`);
//                 console.log(typeof Swiper); // Check if Swiper is defined
//                 // this.isSwiperLoaded = true;
//                 // this.initializeSwiper();
//                 resolve();
//             };
//             script.onerror = () => reject(new Error(`Failed to load JS: ${SWIPER_JS_URL}`));
//             document.head.appendChild(script);
//         }));
//     } else {
//         console.log(typeof Swiper); // Check if Swiper is defined
//         // this.isSwiperLoaded = true;
//         // this.initializeSwiper();
//         // console.log('Swiper JS already loaded.');
//     }

//     return Promise.all(loadPromises);
// }
// loadSwiperAssets();

/**
 * Dynamically loads external CSS and JavaScript files and executes a callback function
 * once all resources have been loaded.
 *
 * @param {string[]} cssUrls - An array of URLs for CSS files to load.
 * @param {string[]} jsUrls - An array of URLs for JavaScript files to load.
 * @param {Function} callback - The function to execute after all resources are loaded.
 */
function loadExternalResourcesAndExecuteTask(cssUrls, jsUrls, callback) {
    const head = document.head;
    const body = document.body;

    // Function to load a single CSS file
    const loadCss = (url) => {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = () => {
                console.log(`CSS loaded: ${url}`);
                resolve();
            };
            link.onerror = () => {
                console.error(`Failed to load CSS: ${url}`);
                reject(new Error(`Failed to load CSS: ${url}`));
            };
            head.appendChild(link);
        });
    };

    // Function to load a single JavaScript file
    const loadJs = (url) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true; // Load asynchronously
            script.onload = () => {
                console.log(`JS loaded: ${url}`);
                resolve();
            };
            script.onerror = () => {
                console.error(`Failed to load JS: ${url}`);
                reject(new Error(`Failed to load JS: ${url}`));
            };
            body.appendChild(script);
        });
    };

    //showMessage('Loading resources...', 'info');

    // Create promises for all CSS and JS files
    const cssPromises = cssUrls.map(loadCss);
    const jsPromises = jsUrls.map(loadJs);

    // Wait for all promises to resolve
    Promise.all([...cssPromises, ...jsPromises])
        .then(() => {
            console.log('All external resources loaded successfully!');
            //showMessage('All resources loaded! Executing task...', 'success');
            callback(); // Execute the task
        })
        .catch((error) => {
            console.error('Error loading one or more resources:', error);
            //showMessage(`Error loading resources: ${error.message}`, 'error');
        });
}
window.addEventListener('DOMContentLoaded', () => {
    const dswiper = document.querySelectorAll(".slider-container");
    if (dswiper.length > 0)
        loadExternalResourcesAndExecuteTask([SWIPER_CSS_URL], [SWIPER_JS_URL], () => {
            dswiper.forEach((sliderContainer, index) => {
                const swiperSlider = sliderContainer.innerHTML;
                sliderContainer.innerHTML = `<div is="swiper-slider1" class="swiper${index}" style="height:100%;">${swiperSlider}</div>`;
            });
        });
});


class SwiperSlider1 extends HTMLDivElement {
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
customElements.define('swiper-slider1', SwiperSlider1, { extends: "div" });
