/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'hamburger-one': "url('/src/assets/hamburgerOne.jpeg')",     
                'frontpage':"linear-gradient(to left bottom, rgba(43, 108, 176, 0.6), rgba(43, 108, 176, 0.1)), url('/src/assets/FrontpagePic.jpg')"
            }
},
    },
    plugins: [],
}