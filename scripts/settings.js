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

