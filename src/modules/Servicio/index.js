import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    servicios: [],
    search: ''
  },
  mutations: {
    setServicios: (state, servicios) => {
      state.servicios = servicios
    },
    setServicio: (state, payload) => {
      if(payload.estado == 2){
        state.servicios = state.servicios.filter(servicio => servicio.id !== payload.id)
      }else{
        state.servicios = state.servicios
          .map(servicio => servicio.id === payload.id ? payload : servicio)
      }
    },
    addServicio: (state, payload) => {
      state.servicios.push(payload)
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
          url: 'all-servicio'
        })

        if(data.status === 'ok'){
          commit('setServicios', data.body.servicios)
        }
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar getServicios: ${e.message}`
        }
      }
    },
    create: async ({commit}, servicio) => {
      try {
        const {data} = await Vue.axios({
          method: 'POST',
          url: 'new-servicio',
          data: {servicio}
        })
        if(data.status === 'ok') commit('addServicio', data.body.servicio)
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar createServicio: ${e.message}`
        }
      }
    },
    update: async ({commit}, servicio) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'update-servicio',
          data: {servicio}
        })
        if(data.status === 'ok') commit('setServicio', data.body.servicio)
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar updateServicio: ${e.message}`
        }
      }
    },
    changeState: async ({commit}, payload) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'change-state-servicio',
          data: {servicio_id: payload.id, new_state: payload.state}
        })
        if(data.status === 'ok') commit('setServicio', data.body.servicio)
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
    all: state => state.servicios,
    search: state => state.search,
    filter: state => state.servicios.filter(producto => producto.detalle.toLowerCase().includes(state.search))
  }
}
