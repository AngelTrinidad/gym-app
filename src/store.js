import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth']
})

//---- modules
import auth from './modules/Authentication'
import sucursal from './modules/Sucursal'
import user from './modules/User'
import producto from './modules/Producto'
import servicio from './modules/Servicio'
import cliente from './modules/Cliente'
import descuento from './modules/Descuento'
import mediosPago from './modules/MedioPago'
//---- /modules

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const url = 'http://localhost:3333/'
export default new Vuex.Store({
	state: {
		layout: {
			navPos: 'left', //top, bottom, left, right, false
			toolbar: 'top', //top, bottom, false
			footer: true, //above, below, false
			boxed: false, //true, false
			roundedCorners: false, //true, false
			viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
		},
		splashScreen: true,
    apiURL: `${url}api/v1/`,
    apiImages: `${url}images/`
	},
	mutations: {
		setLayout(state, payload) {
			if(payload && payload.navPos !== undefined)
				state.layout.navPos = payload.navPos

			if(payload && payload.toolbar !== undefined)
				state.layout.toolbar = payload.toolbar

			if(payload && payload.footer !== undefined)
				state.layout.footer = payload.footer

			if(payload && payload.boxed !== undefined)
				state.layout.boxed = payload.boxed

			if(payload && payload.roundedCorners !== undefined)
				state.layout.roundedCorners = payload.roundedCorners

			if(payload && payload.viewAnimation !== undefined)
				state.layout.viewAnimation = payload.viewAnimation
		},
		setSplashScreen(state, payload) {
			state.splashScreen = payload
		}
	},
	getters: {
		layout(state, getters) {
			return state.layout
		},
		navPos(state, getters) {
			return state.layout.navPos
		},
		toolbar(state, getters) {
			return state.layout.toolbar
		},
		footer(state, getters) {
			return state.layout.footer
		},
		boxed(state, getters) {
			return state.layout.boxed
		},
		roundedCorners(state, getters) {
			return state.layout.roundedCorners
		},
		viewAnimation(state, getters) {
			return state.layout.viewAnimation
		},
		splashScreen(state, getters) {
			return state.splashScreen
		}
	},
	modules: {
		auth, sucursal, user, producto, servicio, cliente, descuento, mediosPago
	},
	strict: debug,
	plugins: [vuexLocal.plugin]
})
