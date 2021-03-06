import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    productos: [],
    search: ''
  },
  mutations: {
    setProductos: (state, payload) => {
      state.productos = payload.map(producto => {

        let stock = []
        producto.sucursales.forEach(sucursal => {
          stock.push({
            sucursal_id: sucursal.id,
            cant: sucursal.pivot.cantidad,
            cant_min: sucursal.pivot.cantidad_minima
          })
        })

        return {
          id: producto.id,
          detalle: producto.detalle,
          estado: producto.estado,
          precio: producto.precio,
          total_stock: producto.total_stock ? producto.total_stock : 0,
          created_at: producto.created_at,
          updated_at: producto.updated_at,
          userAlta: producto.userAlta,
          img: producto.img,
          stock
        }
      })
    },
    setProducto: (state, payload) => {
      state.productos = state.productos
        .map(producto => producto.id === payload.id ? payload : producto)
    },
    setStateProducto: (state, payload) => {
      if(payload.estado == 2){
        state.productos = state.productos.filter(producto => producto.id !== payload.id)
      }else{
        state.productos = state.productos
          .map(producto => {
            if(producto.id === payload.id) {
              producto.estado = payload.estado
            }
            return producto
          })
      }
    },
    addProducto: (state, payload) => {
      state.productos.push(payload)
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
    },
    create: async ({commit}, form) => {
      try {
        const {data} = await Vue.axios({
          method: 'POST',
          url: 'new-producto',
          data: form,
          headers: {'Content-Type': 'multipart/form-data' }
        })
        if(data.status === 'ok') commit('addProducto', data.body.producto)
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar createProducto: ${e.message}`
        }
      }
    },
    update: async ({commit}, form) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'update-producto',
          data: form,
          headers: {'Content-Type': 'multipart/form-data' }
        })
        if(data.status === 'ok') commit('setProducto', data.body.producto)
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar updateProducto: ${e.message}`
        }
      }
    },
    changeState: async ({commit}, payload) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'change-state-producto',
          data: {producto_id: payload.id, new_state: payload.state}
        })
        if(data.status === 'ok') commit('setStateProducto', data.body.producto)
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar changeState: ${e.message}`
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
