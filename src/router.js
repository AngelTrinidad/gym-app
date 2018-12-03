import Vue from 'vue'
import Router from 'vue-router'
import layouts from './layout'
import store from './store'
import Dashboard from './views/apps/Dashboard.vue'
import Login from './views/pages/authentication/Login.vue'
import ForgotPassword from './views/pages/authentication/ForgotPassword.vue'
import ChangePassword from './views/pages/authentication/ChangePassword.vue'
import Profile from './views/pages/Profile.vue'
import Users from './views/pages/Users.vue'
import Sucursales from './views/pages/Sucursales.vue'
import Productos from './views/pages/Productos.vue'
import Servicios from './views/pages/Servicios.vue'
import Clientes from './views/pages/Clientes.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			alias: 'home',
			name: 'home',
			component: Dashboard,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app'],
				title: 'Home'
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				layout: layouts.contenOnly,
				title: 'Iniciar sesión'
			}
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				layout: layouts.contenOnly,
				title: 'Contraseña olvidada'
			}
		},
		{
			path: '/change-password/:cc/:uid',
			name: 'change-password',
			component: ChangePassword,
			meta: {
				layout: layouts.contenOnly,
				title: 'Cambiar contraseña'
			}
		},
		{
			path: '/logout',
			beforeEnter (to, from, next) {
				store.dispatch('auth/logout')
				next({path:'/login'})
			}
		},
		{
			path: '/profile',
			alias: 'profile',
			name: 'profile',
			component: Profile,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['profile', 'perfil'],
				title: 'Mi perfil'
			}
		},
		{
			path: '/users',
			alias: 'users',
			name: 'users',
			component: Users,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['users'],
				title: 'Usuarios'
			}
		},
		{
			path: '/sucursales',
			alias: 'sucursales',
			name: 'sucursales',
			component: Sucursales,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['sucursal', 'sucursales'],
				title: 'Sucursales'
			}
		},
		{
			path: '/productos',
			alias: 'productos',
			name: 'productos',
			component: Productos,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['producto', 'productos'],
				title: 'Productos'
			}
		},
		{
			path: '/servicios',
			alias: 'servicios',
			name: 'servicios',
			component: Servicios,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['servicios', 'servicio'],
				title: 'Servicios'
			}
		},
		{
			path: '/clientes',
			alias: 'clientes',
			name: 'clientes',
			component: Clientes,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['cliente', 'clientes'],
				title: 'Clientes'
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: () => import('./views/pages/NotFound.vue'),
			meta: {
				layout: layouts.contenOnly
			}
		}
	]
})


const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly, {root: true})
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft, {root: true})
	},
	navRight(){
		store.commit('setLayout', layouts.navRight, {root: true})
	},
	navTop(){
		store.commit('setLayout', layouts.navTop, {root: true})
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom, {root: true})
	},
	set(layout){
		store.commit('setLayout', layout, {root: true})
	}
}

router.beforeEach((to, from, next) => {
	let authrequired = false
	if(to && to.meta && to.meta.auth) authrequired = true

	if(to && to.meta && to.meta.title) document.title = to.meta.title

	if(to.path === '/login' && store.state.auth.logged){
		window.location.href= '/'
		return false
	}

	if(authrequired) {
		if(store.state.auth.logged) {
			next()
		} else {
			window.location = '/login'
			return false
		}
	} else {
		next()
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}
})

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('setSplashScreen', false, {root: true})
	}, 500)
})

export default router
