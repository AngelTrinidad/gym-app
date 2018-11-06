import Vue from 'vue'
import Router from 'vue-router'

//pages
import Home from '../views/Home.vue'
import RegistrarCuota from '../views/cuota/registrarCuota.vue'
import ConsultarCuota from '../views/cuota/consultarCuota.vue'
import RegistrarSocio from '../views/socio/registrarSocio.vue'
import ConsultarSocio from '../views/socio/consultarSocio.vue'
import ConsultarIngreso from '../views/ingreso/consultarIngreso.vue'
import RegistrarProducto from '../views/producto/registrarProducto.vue'
import ConsultarProducto from '../views/producto/consultarProducto.vue'
import ActualizarStock from '../views/producto/stock.vue'
import VentaProducto from '../views/producto/venta.vue'
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
				tags: ['home', 'inicio']
			}
		},
		{
			path: '/cuota/registrarCuota',
			alias: '/Registrar cuota',
			name: 'Registrar cuota',
			component: RegistrarCuota,
			meta: {
				auth: true,
				searchable: true,
				tags: ['cuota', 'registrar', 'pago']
			}
		},
		{
			path: '/cuota/consultarCuota',
			alias: '/Consultar cuota',
			name: 'Consultar cuota',
			component: ConsultarCuota,
			meta: {
				auth: true,
				searchable: true,
				tags: ['cuota', 'consultar', 'pago']
			}
		},
		{
			path: '/socio/registrarSocio',
			alias: '/Registrar socio',
			name: 'Registrar socio',
			component: RegistrarSocio,
			meta: {
				auth: true,
				searchable: true,
				tags: ['socio', 'registrar']
			}
		},
		{
			path: '/socio/consultarSocio',
			alias: '/Consultar socio',
			name: 'Consultar socio',
			component: ConsultarSocio,
			meta: {
				auth: true,
				searchable: true,
				tags: ['socio', 'consultar']
			}
		},
		{
			path: '/ingreso/consultarIngreso',
			alias: '/Consultar ingreso',
			name: 'Consultar ingreso',
			component: ConsultarIngreso,
			meta: {
				auth: true,
				searchable: true,
				tags: ['ingreso', 'consultar', 'marcacion']
			}
		},
		{
			path: '/producto/consultarProducto',
			alias: '/Consultar producto',
			name: 'Consultar producto',
			component: ConsultarProducto,
			meta: {
				auth: true,
				searchable: true,
				tags: ['producto', 'consultar', 'stock']
			}
		},
		{
			path: '/producto/RegistrarProducto',
			alias: '/Registrar producto',
			name: 'Registrar producto',
			component: RegistrarProducto,
			meta: {
				auth: true,
				searchable: true,
				tags: ['producto', 'registrar','agregar', 'stock']
			}
		},
		{
			path: '/producto/stock',
			alias: '/stock',
			name: 'Actualizar stock',
			component: ActualizarStock,
			meta: {
				auth: true,
				searchable: true,
				tags: ['producto', 'stock','existencia', 'actualizar']
			}
		},
		{
			path: '/producto/venta',
			alias: '/venta',
			name: 'venta producto',
			component: VentaProducto,
			meta: {
				auth: true,
				searchable: true,
				tags: ['producto', 'venta']
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
