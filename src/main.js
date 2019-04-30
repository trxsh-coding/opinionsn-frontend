require('./styles.scss');
import Vue from 'vue'
import App from './App'
import router from './router/'
import store from './store/store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale'
import langRu from 'element-ui/lib/locale/lang/ru-RU'
import langEng from 'element-ui/lib/locale/lang/en'
import VueI18n from 'vue-i18n';
import NProgress from 'vue-nprogress'
import Croppa from 'vue-croppa'
import 'nprogress/nprogress.css'
import 'vue-croppa/dist/vue-croppa.css'
import moment from 'moment'
import VueTheMask from 'vue-the-mask'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper);
Vue.use(PerfectScrollbar);
Vue.use(VueTheMask);
Vue.use(Croppa);
Vue.use(NProgress);
locale.use(langRu);
Vue.use(VueI18n);
Vue.use(moment);
//*****************

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    ru: {
      ...langRu
    },
    en: {
      ...langEng
    }
  }
});

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)});

//*****************

// moment.locale('ru');

// console.log(`Moment locale: ${moment.locale()}`);



// Vue.use(VueYandexMetrika, {
//   id: 53480629,
//   router: router,
//   env: 'production',
//   options: {
//     webvisor: true
//   }
//   // other options
// })


export const nprogress = new NProgress(  '.nprogress-container' );

//////////////////////

export const vueApp = new Vue({
  el: '#app',
  router,
  nprogress,
  store,
  i18n,
  moment,
  data(){
    return {
      mobile:window.innerWidth <= 500
    }
  },
  created(){
    addEventListener('resize', () => {
      this.mobile = innerWidth <= 500
    })
  },
  render: h => h(App)
});
