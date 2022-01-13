
import axios from 'axios'

const state = {
  chat: {},
  showUpdateDialog: false
}
const actions = {
  async getChat ({ commit, rootState }, username) {
    const response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/private-messages/${username}`, {
      headers: {
        Authorization: 'Bearer ' + rootState.currentUser.token
      }
    })
    commit('setChat', response.data.chat)
    return response
  }
}

const mutations = {

  setChat (state, chat) {
    state.chat = chat

  },

  setShowUpdateDialog ({ commit }, visibility) {
    return state.showUpdateDialog = visibility
  }
}
const getters = {}



export default {
  getters,
  actions,
  state,
  mutations
}
