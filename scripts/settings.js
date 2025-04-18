// Layout switcher script
(() => {
    'use strict'

    const storedLayout = window.location.href.toLowerCase().indexOf('amatyaz') >= 0 ? localStorage.getItem('alayout') : localStorage.getItem('layout')

    const getPreferredLayout = () => {
        if (storedLayout) {
            return storedLayout
        }

        return 1
    }

    const setLayout = function (layout) {
        document.querySelector('.layout').className = 'layout layout-' + layout
    }

    setLayout(getPreferredLayout())

    const showActiveLayout = (layout, focus = false) => {
        const layoutSwitcher = document.querySelector('input[name=bslayout]')

        if (!layoutSwitcher) {
            return
        }
        document.querySelectorAll('input[name=bslayout]').forEach((emt) => {
            emt.checked = (emt.value == layout);
        })

        if (focus) {
            layoutSwitcher.focus()
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        showActiveLayout(getPreferredLayout())

        document.querySelectorAll('input[name=bslayout]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const layout = toggle.getAttribute('value')
                    localStorage.setItem(window.location.href.toLowerCase().indexOf('amatyaz') >= 0 ? 'alayout' : 'layout', layout)
                    setLayout(layout)
                    showActiveLayout(layout, true)
                })
            })
    })
})();


// Bootstrap theme switcher script
// This script allows users to switch between light and dark themes on a webpage.
(() => {
    'use strict'

    const storedTheme = window.location.href.toLowerCase().indexOf('amatyaz') >= 0 ? localStorage.getItem('atheme') : localStorage.getItem('theme')

    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = function (theme) {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector('input[name=bstheme]')

        if (!themeSwitcher) {
            return
        }
        document.querySelectorAll('input[name=bstheme]').forEach((emt) => {
            emt.checked = (emt.value == theme);
        })

        if (focus) {
            themeSwitcher.focus()
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (storedTheme !== 'light' || storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())

        document.querySelectorAll('input[name=bstheme]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('value')
                    localStorage.setItem(window.location.href.toLowerCase().indexOf('amatyaz') >= 0 ? 'atheme' : 'theme', theme)
                    setTheme(theme)
                    showActiveTheme(theme, true)
                })
            })
    })
})()

// sticky observer script on scroll
const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
    { threshold: [1] }
);

const el = document.querySelectorAll("table th")
observer.observe(el[0]);

// Expanding and collapsing un ordered lists
// Create a class for the element
class ExpandingList extends HTMLUListElement {
    constructor() {
        // Always call super first in constructor
        // Return value from super() is a reference to this element
        self = super();
    }

    connectedCallback() {
        // Get ul and li elements that are a child of this custom ul element
        // li elements can be containers if they have uls within them
        const uls = Array.from(self.querySelectorAll("ul"));
        const lis = Array.from(self.querySelectorAll("li"));
        // Hide all child uls
        // These lists will be shown when the user clicks a higher level container
        uls.forEach((ul) => {
            ul.style.display = "none";
        });

        // Look through each li element in the ul
        lis.forEach((li) => {
            // If this li has a ul as a child, decorate it and add a click handler
            if (li.querySelectorAll("ul").length > 0) {
                // Add an attribute which can be used  by the style
                // to show an open or closed icon
                li.setAttribute("class", "closed");
                //debugger;
                const childText = li.childNodes[0];

                //const newSpan = document.createElement("span");
                const newSpan = childText.nextSibling;
                if(newSpan.tagName !== "A"){
                    return;
                }
                //newSpan.style.cursor = "pointer";
                //newSpan.innerHTML = `<i class="bi-bookmark"></i>${childText.textContent}`;

                newSpan.addEventListener("click", (e) => {
                    // next sibling to the span should be the ul
                    const nextul = e.target.nextElementSibling;

                    // Toggle visible state and update class attribute on ul
                    if (nextul.style.display == "block") {
                        nextul.style.display = "none";
                        nextul.parentNode.setAttribute("class", "closed");
                    } else {
                        nextul.style.display = "block";
                        nextul.parentNode.setAttribute("class", "open");
                    }
                });
                // Add the span and remove the bare text node from the li
                //childText.parentNode.insertBefore(newSpan, childText);
                //childText.parentNode.removeChild(childText);
            }
        });
    }
}

// Define the new element
customElements.define("expanding-list", ExpandingList, { extends: "ul" });

