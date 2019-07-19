import ElementScrollHandler from "./components/mixins/ElementScrollHandler";

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
import VueTextareaAutosize from 'vue-textarea-autosize'
import 'swiper/dist/css/swiper.css'
import './registerServiceWorker'
import browserDetect from "vue-browser-detect-plugin";
import * as firebase from "firebase";
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

Vue.use(DatePick);
Vue.use(browserDetect);
Vue.use(VueAwesomeSwiper);
Vue.use(VueTextareaAutosize)
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
	i18n: (key, value) => i18n.t(key, value)
});

//*****************
// var config = {
//   apiKey: "AIzaSyDY179FlmkJHEKRK0LFDIwbRdl8hIHaSTo",
//   authDomain: "opinion-sn.firebaseapp.com",
//   databaseURL: "https://opinion-sn.firebaseio.com",
//   projectId: "opinion-sn",
//   storageBucket: "",
//   messagingSenderId: "850070172926",
//   appId: "1:850070172926:web:fc92d571935e2293"
// }; // 4. Get Firebase Configuration
// firebase.initializeApp(config);
//
// const messaging = firebase.messaging();
//
// messaging.usePublicVapidKey("BDA446p4uBe-pozosCxOnAKsk3uCr5vbz6SeklrhralhCeQTR0yMkynub7kyFTO4BLiSONemLn61qaLE-rfVEbY"); // 1. Generate a new key pair
//
// // Request Permission of Notifications
// messaging.requestPermission().then(() => {
//   console.log('Notification permission granted.');
//
//   // Get Token
//   messaging.getToken().then((token) => {
//     console.log(token)
//   })
// }).catch((err) => {
//   console.log('Unable to get permission to notify.', err);
// });

// moment.locale('ru');

// console.log(`Moment locale: ${moment.locale()}`);

export const nprogress = new NProgress('.nprogress-container');

//////////////////////

export const vueApp = new Vue({
	el: '#app',
	router,
	nprogress,
	store,
	i18n,
	moment,
	data() {
		return {
			mobile: window.innerWidth <= 500,
			scrolled_to_bottom: null
		}
	},
	mixins: [ElementScrollHandler],
	created() {
		addEventListener('resize', () => {
			this.mobile = innerWidth <= 500
		});

	},
	render: h => h(App)
});
