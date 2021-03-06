import Vue from 'vue'
import Vuelidate from "vuelidate/src";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'


Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)

//=========== TEST, DELETE AFTER ==================
import LinkedAudioPlayer from "./core/AudioPlayer";

window.audio_player = new LinkedAudioPlayer();
//=========== TEST, DELETE AFTER ==================

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
