require('./styles.scss');
import Vue from 'vue'
import App from './App'
import PortalVue from 'portal-vue'
import router from './router/index'
import store from './store/store'
import './registerServiceWorker'
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
import browserDetect from "vue-browser-detect-plugin";
// import * as firebase from "firebase";
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import PopupPlugin from "./plugins/PopupPlugin";
import ElementScrollHandler from "./components/mixins/ElementScrollHandler";
import VueYoutube from 'vue-youtube'
import VueMeta from 'vue-meta'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Vue.use(VueMeta)
Vue.use(PortalVue);
Vue.use(VueYoutube);
Vue.use(DatePick);
Vue.use(browserDetect);
Vue.use(VueAwesomeSwiper);
Vue.use(VueTextareaAutosize);
Vue.use(PerfectScrollbar);
Vue.use(VueTheMask);
Vue.use(Croppa);
Vue.use(NProgress);
Vue.use(VueI18n);
Vue.use(moment);
Vue.use(PopupPlugin, {
	store: new PopupPlugin.Store()
});


Sentry.init({
	dsn: 'https://d06ac1809c18451ea9bcc3defd237837@sentry.io/1812671',
	integrations: [new Integrations.Vue({Vue, attachProps: true})],
});
//*****************

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

/**
 * @description Фильтр для корректной обработки ссылок на ассеты
 */
Vue.filter('addAssetsPath',
	/**
	 * @param {string} value ссылка на ассет
	 * @param {boolean} raw триггер отключающий обработку для возврата "как есть"
	 * @returns {string} отфильтрованный путь
	 */
	function (value, raw) {

		if (!value) return process.env.VUE_APP_ASSETS + '/assets/ava.png';

		let isBlob = value.indexOf('blob:') !== -1;
		let isExternalUrl = value.indexOf('https') !== -1;

		switch (true) {
			case isBlob:
			case isExternalUrl:
			case raw:
				return value;
			default:
				return process.env.VUE_APP_ASSETS + value;
		}

	});

export const vueApp = new Vue({
	el: '#app',
	router,
	nprogress,
	store,
	moment,
	data() {
		return {
			is_eng: window.location.hostname === "eng.opinionsn.com",
			is_mobile_device: null,
			mobile: window.innerWidth <= 863,
			scrolled_to_bottom: null,
			scroll_top: 0,
			timer_id: null,
			timer_duration: 0,
			temp_selected_option: null,
			search_keyword: '',
		}
	},
	mixins: [ElementScrollHandler],
	created() {
		let is_mobile_device = {
			Android() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any() {
				return !!(this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
			}
		};

		this.mobile = is_mobile_device.any() || window.innerWidth <= 863;

		window.addEventListener('resize', () => {
			this.mobile = is_mobile_device.any() || window.innerWidth <= 863;
		});

	},
	render: h => h(App)
});
