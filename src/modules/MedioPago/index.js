import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    mediosPagos: []
  },
  mutations: {
    setMediosPago: (state, mediosPago) => {
      state.mediosPagos = mediosPago
    },
    setMedioPago: (state, payload) => {
      state.mediosPagos = state.mediosPagos.map( medioPago => medioPago.id === payload.id ? payload : medioPago)
    }
  },
  actions: {
    get: async ({commit}) => {
      try {
        const {data} = await Vue.axios({
          method: 'GET',
          url: 'all-mediosPago'
        })
        if(data.status === 'ok'){
          commit('setMediosPago', data.body.mediosPago)
        }
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar getMedioPago: ${e.message}`
        }
      }
      
    },
    changeState: async ({commit}, payload) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'change-state-mediosPago',
          data: {medioPago_id: payload.id, new_state: payload.state}
        })
        if(data.status === 'ok'){
          commit('setMedioPago', data.body.medioPago)
        }
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar changeStateMedioPago: ${e.message}`
        }
      }
    }
  },
  getters: {
    all: state => state.mediosPagos
  }
}
