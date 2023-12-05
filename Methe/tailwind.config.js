/** @type {import('tailwindcss').Config} */
const colors = require('@/src/constants/colors');

module.exports = {
    theme: {
        extend: {
            colors: {
                ...colors,
            },
        },
    },
};
