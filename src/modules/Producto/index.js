import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    productos: [],
    search: ''
  },
  mutations: {
    setProductos: (state, payload) => {
      state.productos = payload
    },
    setProducto: (state, payload) => {
      state.productos = state.productos
        .map(producto => producto.id === payload.id ? payload : producto)
    },
    setSearch: (state, search) => {
        state.search = search
    },
    clearSearch: (state) => {
      state.search = ''
    }
  },
  actions: {
    get: async ({commit}) => {
      try {
        const {data} = await Vue.axios({
          method: 'GET',
          url: 'all-producto'
        })
        if(data.status === 'ok'){
          commit('setProductos', data.body.products)
        }
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar getProducts: ${e.message}`
        }
      }
    }
  },
  getters: {
    all: state => state.products,
    search: state => state.search,
    filter: state => {
      let productos = state.productos
      productos = productos.filter(producto => producto.detalle.toLowerCase().includes(state.search))
      return productos
    }
  }
}
