let mix         = require('laravel-mix');
let tailwindcss = require('tailwindcss');

require('laravel-mix-purgecss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('./')
   .js('src/app.js', 'dist/js')
   .sass('src/app.scss', 'dist/css')
   .options({
       processCssUrls : false,
       postCss        : [tailwindcss('tailwind.config.js')]
   })
   .copy('src/img', 'dist/img')
   .purgeCss({
       folders : ['dist']
   })
   .version();
