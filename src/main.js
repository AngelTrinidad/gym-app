import 'es6-promise/auto'
import _ from 'lodash'
import moment from 'moment-timezone' //Configuracion de tiempo
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Vuebar from 'vuebar'
import Fullscreen from 'vue-fullscreen'
import VueLazyload from 'vue-lazyload' //Gestor de carga de imagen
import VueResize from 'vue-resize' //Detector de cambio de tamaño de elementos en el DOM
import 'vue-resize/dist/vue-resize.css'
import VueGoodTable from 'vue-good-table'
import V2Table from 'v2-table'
import 'v2-table/dist/index.css'
import { StatusIndicator } from 'vue-status-indicator' //Notificaciones
import 'vue-status-indicator/styles.css'
import Peity from 'vue-peity' //No bien implementado en el home
import VuePerfectScrollbar from './components/vue-ps'
import './assets/scss/global.scss'
import 'flex.box'
import 'animate.css'
import 'flag-icon-css/css/flag-icon.css'
import '../node_modules/mdi/scss/materialdesignicons.scss'
import Affix from './directives/affix'
import App from './App.vue'
import router from './router/'
import store from './store'

//----- Vue Resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://127.0.0.1:3333/api/v1/';
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`);
  next();
});
//.---- Vue Resource

Vue.config.productionTip = false
Vue.component('StatusIndicator', StatusIndicator)
Vue.component('Peity', Peity)
Vue.use(VueResize)
Vue.use(Fullscreen)
Vue.use(Element, {locale})
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgc3R5bGU9ImZpbGw6I2UyZTNlNTsiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSIzMDAiIHI9IjE1NSIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2Utd2lkdGg6NDdweDtzdHJva2U6I2JjYmRiZjsiLz48cmVjdCB4PSIxNjAiIHk9IjIyMyIgd2lkdGg9IjI3NSIgaGVpZ2h0PSIxNjYiIHN0eWxlPSJmaWxsOiNlM2U1ZTQ7Ii8+PHBhdGggZD0iTTQ0MC41LDM5NC41bC0yODYsMGwwLC0xNzdsMjg2LDBsMCwxNzdaTTE2NS41LDIyOC41bDAsMTU1bDI2NCwwbDAsLTE1NWwtMjY0LDBaIiBzdHlsZT0iZmlsbDojZmZmOyIvPjxwYXRoIGQ9Ik00MDQuNDM0LDE3MC44NzdsLTIzMi45NCwyMzIuOTQxbDM1LjM1NSwzNS4zNTVsMjMyLjk0MSwtMjMyLjk0bC0zNS4zNTYsLTM1LjM1NloiIHN0eWxlPSJmaWxsOiNiY2JkYmY7Ii8+PC9zdmc+',
	loading: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwcHgiICBoZWlnaHQ9IjEwMHB4IiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJsZHMtcmlwcGxlIiBzdHlsZT0iYmFja2dyb3VuZDogbm9uZTsiPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjI4LjY2ODUiIGZpbGw9Im5vbmUiIG5nLWF0dHItc3Ryb2tlPSJ7e2NvbmZpZy5jMX19IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgc3Ryb2tlPSIjNGE1OTZhIiBzdHJva2Utd2lkdGg9IjIiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDszMCIga2V5VGltZXM9IjA7MSIgZHVyPSIyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgYmVnaW49Ii0xcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIyIiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49Ii0xcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48L2NpcmNsZT48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxNS45ODI4IiBmaWxsPSJub25lIiBuZy1hdHRyLXN0cm9rZT0ie3tjb25maWcuYzJ9fSIgbmctYXR0ci1zdHJva2Utd2lkdGg9Int7Y29uZmlnLndpZHRofX0iIHN0cm9rZT0iIzg5YWRlOCIgc3Ryb2tlLXdpZHRoPSIyIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7MzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMiIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIyIiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjwvY2lyY2xlPjwvc3ZnPg==',
	attempt: 1
})
Vue.directive('affix', Affix)
Vue.use(Vuebar)
Vue.use(VueGoodTable)
Vue.use(V2Table)
Vue.component('vue-scroll', VuePerfectScrollbar)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
