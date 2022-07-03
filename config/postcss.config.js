const PATHS = require('./paths');
const tailwind = PATHS.config('tailwind.config.js');

module.exports = {
    // syntax: 'postcss-lit',
    plugins: {
        tailwindcss: { config: tailwind },
        autoprefixer: {},
    }
}