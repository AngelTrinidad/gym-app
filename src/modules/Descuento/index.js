import Vue from 'vue'
const moment = require('moment')
export default {
  namespaced: true,
  state: {
    descuentos: []
  },
  mutations: {
    setDescuentos: (state, descuentos) => {
      state.descuentos = descuentos.map(descuento => {
        return {
          id: descuento.id,
          descripcion: descuento.descripcion,
          monto_descuento: descuento.monto_descuento,
          porcentaje_descuento: descuento.porcentaje_descuento,
          fecha_inicio: moment(descuento.fecha_inicio).toDate(),
          fecha_fin: descuento.fecha_fin ? moment(descuento.fecha_fin).toDate() : ''
        }
      })
    },
    addDescuento: (state, descuento) => {
      state.descuentos.push({
        id: descuento.id,
        descripcion: descuento.descripcion,
        monto_descuento: descuento.monto_descuento,
        porcentaje_descuento: descuento.porcentaje_descuento,
        fecha_inicio: moment(descuento.fecha_inicio).toDate(),
        fecha_fin: descuento.fecha_fin ? moment(descuento.fecha_fin).toDate() : ''
      })
    },
    setDescuento: (state, payload) => {
      if(payload.estado == 2){
        state.descuentos = state.descuentos.filter(descuento => descuento.id !== payload.id)
      }else{
        state.descuentos = state.descuentos
          .map(descuento => descuento.id === payload.id ? {
            id: payload.id,
            descripcion: payload.descripcion,
            monto_descuento: payload.monto_descuento,
            porcentaje_descuento: payload.porcentaje_descuento,
            fecha_inicio: moment(payload.fecha_inicio).toDate(),
            fecha_fin: payload.fecha_fin ? moment(payload.fecha_fin).toDate() : ''
          } : descuento)
      }
    }
  },
  actions: {
    get: async ({commit}) => {
      try {
        const {data} = await Vue.axios({
          method: 'GET',
          url: 'all-descuento'
        })
        if(data.status === 'ok'){
          commit('setDescuentos', data.body.descuentos)
        }
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar getDescuento: ${e.message}`
        }
      }
    },
    create: async ({commit}, descuento) => {
      try {
        const {data} = await Vue.axios({
          method: 'POST',
          url: 'new-descuento',
          data: {descuento}
        })
        if(data.status === 'ok'){
          commit('addDescuento', data.body.descuento)
        }
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar createDescuento: ${e.message}`
        }
      }
    },
    update: async ({commit}, descuento) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'update-descuento',
          data: {descuento}
        })
        if(data.status === 'ok'){
          commit('setDescuento', data.body.descuento)
        }
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar updateDescuento: ${e.message}`
        }
      }
    },
    changeState: async ({commit}, payload) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'change-state-descuento',
          data: {descuento_id: payload.id, new_state: payload.state}
        })
        if(data.status === 'ok'){
          commit('setDescuento', data.body.descuento)
        }
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar changeStateDescuento: ${e.message}`
        }
      }
    }
  },
  getters: {
    all: state => state.descuentos
  }
}
