
import axios from 'axios'
const token = localStorage.getItem('token')
const state = {
  chat: {}
}
const actions = {
  async getChat ({ commit }, username) {
    const response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/private-messages/${username}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    commit('setChat', response.data.chat)
    return response
  }
}

const mutations = {

  setChat (state, chat) {
    state.chat = chat

  }
}
const getters = {}



export default {
  getters,
  actions,
  state,
  mutations
}
