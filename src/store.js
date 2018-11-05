import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
		layout: {
			viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
		},
		splashScreen: true,
		logged: true
	},
	mutations: {
		setLayout(state, payload) {
			if(payload && payload.viewAnimation !== undefined)
				state.layout.viewAnimation = payload.viewAnimation
		},
		setLogin(state, payload) {
			state.logged = true
		},
		setLogout(state, payload) {
			state.layout.navPos = null
			state.layout.toolbar = null
			state.logged = false
		},
		setSplashScreen(state, payload) {
			state.splashScreen = payload
		}
	},
	actions: {

	},
	getters: {
		layout(state, getters) {
			return state.layout
		},
		viewAnimation(state, getters) {
			return state.layout.viewAnimation
		},
		isLogged(state, getters) {
			return state.logged
		},
		splashScreen(state, getters) {
			return state.splashScreen
		}
	},
	plugins: [createPersistedState({paths: ['layout']})],
	strict: debug
})
