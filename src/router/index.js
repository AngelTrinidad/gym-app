import Vue from 'vue'
import Router from 'vue-router'

//pages
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

//vuex
import store from '../store'
Vue.use(Router)


const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			alias: '/home',
			name: 'home',
			component: Home,
			meta: {
				auth: true,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {

			}
		}
	]
})

//insert here login logic
const auth = {
	loggedIn() {
		return store.getters.isLogged
	},
	logout() {
		store.commit('setLogout')
	}
}

router.beforeEach((to, from, next) => {
	let authrequired = false
	if(to && to.meta && to.meta.auth)
		authrequired = true

	//console.log('authrequired', authrequired, to.name)

	if(authrequired) {
		if(auth.loggedIn()) {
			if(to.name === 'login') {
				window.location.href = '/'
				return false
			} else {
				next()
			}
		} else {
			if(to.name !== 'login'){
				window.location.href = '/login'
				return false
			}
			next()
		}
	} else {
		if(auth.loggedIn() && to.name === 'login'){
			window.location.href = '/'
			return false
		} else {
			next()
		}
	}

})

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500)
})

export default router
