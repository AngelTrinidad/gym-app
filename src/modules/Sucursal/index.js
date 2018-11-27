import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    sucursales: []
  },
  mutations: {
    setSucursales: (state, payload) => {
      state.sucursales = payload
    },
    addSucursal: (state, payload) => {
      state.sucursales.push(payload)
    },
    setSucursal: (state, payload) => {
      state.sucursales = state.sucursales.map(sucursal => {
        if(sucursal.id === payload.id) return payload
        else return sucursal
      })
    }
  },
  actions: {
    get: async ({commit}) => {
      const {data} = await Vue.axios({
        method: 'GET',
        url: 'all-sucursal'
      })
      commit('setSucursales', data.body.sucursales)
    },
    new: async ({commit}, sucursal) => {
      try {
        const {data} = await Vue.axios({
          method: 'POST',
          url: 'new-sucursal',
          data: {sucursal}
        })
        if(data.status === 'ok'){
          commit('addSucursal', data.body.sucursal)
        }
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar newSucursal: ${e.message}`
        }
      }
    },
    update: async ({commit}, sucursal) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'update-sucursal',
          data: {sucursal}
        })
        if(data.status === 'ok'){
          commit('setSucursal', data.body.sucursal)
        }
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar updateSucursal: ${e.message}`
        }
      }
    },
    changeStatus: async ({commit}, id) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'change-state-sucursal',
          data: {sucursal_id: id}
        })
        commit('setSucursal', data.body.sucursal)
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: 'Error al procesar changeStatusSucursal'
        }
      }
    }
  },
  getters: {
    activos: (state) => {
      return state.sucursales.filter(sucursal => sucursal.estado === 1)
    },
    all: (state) => {
      return state.sucursales
    }
  }
}
