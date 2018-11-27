import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    setUsers: (state, payload) => {
      state.users = payload
    },
    addUser: (state, payload) => {
      state.users.push(payload)
    },
    setUser: (state, payload) => {
      state.users = state.users.map(user => {
        if(user.id === payload.id) return payload
        else return user
      })

    }
  },
  actions: {
    get: async ({commit}) => {
      try {
        const {data} = await Vue.axios({
          method: 'GET',
          url: 'all-user'
        })
        if(data.status === 'ok'){
          commit('setUsers', data.body.users)
        }
      } catch (e) {
        console.log(e)
      }
    },
    create: async({commit}, user) => {
      try {
        const {data} = await Vue.axios({
          method: 'POST',
          url: 'new-user',
          data:{user}
        })
        if(data.status === 'ok'){
          commit('addUser', data.body.user)
        }
        return data
      } catch (e) {
        return {
          status: 'error',
          msg: 'Error al procesar createUser'
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
    }
  },
  getters: {
    all: (state, getters, rootState) => {
      return state.users.filter(user => user.id !== rootState.auth.user.id)
    }
  }
}
