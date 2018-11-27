import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    user: null,
    logged: !!window.localStorage.getItem('_token')
  },
  mutations: {
    setUser: (state) => {
      if(window.localStorage.getItem('_token')){
          const token = window.localStorage.getItem('_token');
          const jwtDecode = require('jwt-decode');
          state.user = jwtDecode(token).data;
          state.logged = true;
      }else{
          state.logged = false;
          state.user = null;
      }
    },
    setLogged: (state, logged) => {
      state.logged = logged
    }
  },
  actions: {
    login: async ({commit}, userInput) => {
      try {
        const {data} = await Vue.axios({
          method: 'POST',
          url: 'login-user',
          data: {user: userInput}
        })
        if(data.status === 'ok'){
          window.localStorage.setItem('_token', data.body.token)
          commit('setUser')
          return data
        }else{
          return {
            status: 'error',
            msg: 'Error al procesar el login'
          }
        }
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar el login: ${e.message}`
        }
      }
    },
    logout: ({commit}) => {
      window.localStorage.removeItem('_token');
      commit('setUser');
    },
    forgoutPass: async (context, email) => {
      try {
        const {data} = await Vue.axios({
          method: 'POST',
          url: 'forgout-pass-user',
          data: {email}
        })
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar el forgoutPass: ${e.message}`
        }
      }
    },
    updateUser: async ({commit}, user) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'update-user',
          data: {user: user}
        })
        if(data.status === 'ok'){
          window.localStorage.setItem('_token', data.body.token)
          commit('setUser')
        }
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar el update: ${e.message}`
        }
      }
    },
    verify: async (context, payload) => {
      try {
        let body = {
          field: payload.field,
          value: payload.value
        }
        if(payload.exclude){
          body.exclude = payload.exclude
        }
        const {data} = await Vue.axios({
          method: 'POST',
          url: 'verify-field-user',
          data: body
        })
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar la verificación: ${e.message}`
        }
      }
    },
    changePass: async (context, payload) => {
      try {
        const {data} = await Vue.axios({
          method: 'PUT',
          url: 'change-pass-user',
          data: {
            password: payload.password,
            password_repeat: payload.password_repeat
          }
        })
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: `Error al procesar changePass: ${e.message}`
        }
      }
    }
  },
  getters: {
    user: (state) => {
      return state.user
    },
    logged: (state) => {
      return state.logged
    }
  }
}
