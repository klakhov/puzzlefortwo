/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

window.Vue = require('vue');
import VueNotification from "vue-notification";
import TextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueNotification);
Vue.use(TextareaAutosize);
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('header-link', require('./components/header/HeaderLinkComponent.vue').default);
Vue.component('profile-slider', require('./components/sliders/ProfileSliderComponent').default);
Vue.component('profile', require('./components/profile/ProfileComponent').default);
Vue.component('profile-edit', require('./components/profile/ProfileEditComponent').default);
Vue.component('room-list', require('./components/rooms/RoomsComponent').default);
// Vue.component('puzzle', require('./components/puzzle/PuzzleComponent').default);
Vue.component('home', require('./components/home/HomeComponent').default);
// Vue.component('our-canvas', require('./components/puzzle/PuzzleCanvasComponent').default);
Vue.component('room-chat', require('./components/chat/room-chat/RoomChat').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.mixin({
    data:function(){
        return{
            PREF_HOST:'http://127.0.0.1:8000/'
        }
    }
});

const app = new Vue({
    el: '#app',
});
