import Vue from 'vue'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    clientes: [],
    search: ''
  },
  mutations: {
    setClientes: (state, clientes) => {

      state.clientes = clientes.map(cliente => {
        return {
          id: cliente.id,
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
          fecha_nacimiento: cliente.fecha_nacimiento,
          sexo: cliente.sexo,
          sucursal: cliente.sucursal,
          total_servicios: cliente.__meta__.total_servicios,
          ingreso: cliente.ingresos.length !== 0 ? {
            data: moment(cliente.ingresos[0].created_at).format('DD/MM/YYYY hh:mm'),
            sucursal: cliente.ingresos[0].sucursal.detalle
          } : null
        }
      })
    },
    setCliente: (state, payload) => {
      if(payload.estado == 2){
        state.clientes = state.clientes.filter(cliente => cliente.id !== payload.id)
      }else{
        state.clientes = state.clientes
          .map(cliente => cliente.id === payload.id ? payload : cliente)
      }
    },
    addCliente: (state, payload) => {
      state.clientes.push(payload)
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
          url: 'all-cliente'
        })
        if(data.status === 'ok'){
          commit('setClientes', data.body.clientes)
        }
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar getClientes: ${e.message}`
        }
      }
    }
  },
  create: async({commit}, user) => {
    try {
      const {data} = await Vue.axios({
        method: 'POST',
        url: 'new-cliente',
        data:{user}
      })
      if(data.status === 'ok'){
        commit('addCliente', data.body.cliente)
      }
      return data
    } catch (e) {
      return {
        status: 'error',
        msg: 'Error al procesar createCliente'
      }
    }
  },
  update: async ({commit}, user) => {
    try {
      const {data} = await Vue.axios({
        method: 'PUT',
        url: 'update-other-user',
        data: {user}
      })
      if(data.status === 'ok'){
        commit('setUser', data.body.user)
      }
      return data
    } catch (e) {
      return {
        status: 'error',
        msg: `Error al procesar updateUser: ${e.message}`
      }
    }
  },
  changeStatus: async ({commit}, id) => {
    try {
      const {data} = await Vue.axios({
        method: 'PUT',
        url: 'change-state-user',
        data: {user_id: id}
      })
      commit('setUser', data.body.user)
      return data
    } catch (e) {
      return {
        status: 'error',
        msg: 'Error al procesar changeStatusUser'
      }
    }
  },
  getters: {
    all: state => state.clientes,
    search: state => state.search,
    filter: state => {
      return state.clientes.filter(cliente =>
        cliente.nro_documento === state.search ||
        cliente.nombre.toLowerCase().includes(state.search) ||
        cliente.apellido.toLowerCase().includes(state.search)
      )
    }
  }
}
