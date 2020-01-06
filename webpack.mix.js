const mix = require('laravel-mix');

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

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
    // .js('resources/puzzle/js/vars.js','public/js/puzzle')
    // .js('resources/puzzle/js/classes/base/Component.js','public/js/puzzle/classes/base')
    // .js('resources/puzzle/js/classes/Field.js','public/js/puzzle/classes')
    // .js('resources/puzzle/js/classes/Canvas.js','public/js/puzzle/classes')
    // .js('resources/puzzle/js/classes/Panel.js','public/js/puzzle/classes')
    // .js('resources/puzzle/js/classes/BlankField.js','public/js/puzzle/classes')
    // .js('resources/puzzle/js/classes/places/PanelPlace.js','public/js/puzzle/classes/places')
    // .js('resources/puzzle/js/classes/PanelButton.js','public/js/puzzle/classes')
    // .js('resources/puzzle/js/classes/Menu.js','public/js/puzzle/classes')
    // .js('resources/puzzle/js/classes/places/MenuPlace.js','public/js/puzzle/classes/places')
    // .js('resources/puzzle/js/classes/FragmentGroup.js','public/js/puzzle/classes')
    // .js('resources/puzzle/js/classes/Fragment.js','public/js/puzzle/classes')
    // .js('resources/puzzle/js/classes/FragmentList.js','public/js/puzzle/classes')
    // .js('resources/puzzle/js/script.js','public/js/puzzle')
    // .js('resources/puzzle/js/sockets.js','public/js/puzzle')
    // .js('resources/puzzle/js/classes/Broadcaster.js','public/js/puzzle/classes')
    // .js('resources/puzzle/js/classes/PuzzleWorker.js','public/js/puzzle/classes');


