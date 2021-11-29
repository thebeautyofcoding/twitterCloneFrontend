import axios from "axios"
var loggedInUser = localStorage.getItem('user')
var token = localStorage.getItem('token')
var token = localStorage.getItem('token')
loggedInUser = JSON.parse(loggedInUser)




const state = {
  conversationPartners: [],
  messages: [],
  chat: {},
  setValueEmpty: false,
  chats: [],
  error: '',
  privateChat: {}
}

const getters = {

}


const mutations = {
  addPrivateMessageToChat (state, message) {
    state.privateChat.messages = message
  },

  setConversationPartners (state, partners) {

    state.conversationPartners = partners
  },
  setError (state, error) {
    console.log(error)
    state.error = error
  },
  setChats (state, chats) {
    state.chats = chats
  },

  setValueEmpty (state, setValueEmpty) {
    if (setValueEmpty === true) {
      state.setValueEmpty = true
    } else {
      state.setValueEmpty = false
    }

  },
  setChat (state, chat) {
    state.chat = chat
  },
  updateMessages (state, message) {
    console.log('ICH WERDE MEHRMALS GECALLED')
    state.chat.messages.push(message)
    console.log(state.chat.messages.length)

  },

  addMessage (state, message) {



    var index = state.chat.messages.findIndex(m => {

      m.id === message.id
    })
    if (index < 0)
      console.log('HMMMM')
    state.chat.messages.push(message)

  },

  deleteOneConversationPartner (state, user) {
    console.log(user)
    const i = state.conversationPartners.findIndex((partner) => partner.id === user.id)
    if (i === 0 || i > 0) {



      return state.conversationPartners.splice(i, 1)
      console.log(state.conversationPartners)

    }








  }
}

const actions = {

  setValueEmpty ({ commit }, setValueEmpty) {
    console.log(setValueEmpty)
    commit('setValueEmpty', setValueEmpty)
  },

  updateMessages ({ commit }, message) {
    commit('addMessage', message)
  },
  setConversationPartners ({ commit }, partners) {
    console.log(partners)
    commit('setConversationPartners', partners)
  },
  deleteOneConversationPartner ({ commit }, partner) {

    commit('deleteOneConversationPartner', partner)
  },
  async createChat ({ commit }, chatUsers) {
    var response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/messages/new`, { chatUsers: chatUsers }, {
      headers: {
        Authorization: 'Bearer ' + token,


      },

    })

    commit('setConversationPartners', [])
    if (response.data.error) {

      console.log(response.data.error)

      return commit('setError', response.data.error)

    } else {


      ; return response
    }

  },


  async getChats ({ commit }) {

    var response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/messages`, {
      headers: {
        Authorization: 'Bearer ' + token,


      },

    })
    console.log(response.data.chatsWithUsers)
    commit('setChats', response.data.chatsWithUsers)
    return response.data.chatsWithUsers
  },


  async getChatById ({ commit }, id) {
    var response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/messages/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,


      },

    })
    commit('setChat', response.data.chat)
    return response.data.chat
  },

  async sendMessage ({ commit }, data) {
    window.apiClient.defaults.headers.common['X-Socket-Id'] = window.Echo.socketId()

    var response = await window.apiClient.post(`${process.env.VUE_APP_API_ENDPOINT}/messages`, data, {
      headers: {
        Authorization: 'Bearer ' + token,

        'Access-Control-Allow-Origin': '*',




      },

    })
    commit('addMessage', response.data.message)
    return response.data.message
  },

  async sendPrivateMessage ({ commit }, data) {
    window.apiClient.defaults.headers.common['X-Socket-Id'] = window.Echo.socketId()

    var response = await window.apiClient.post(`${process.env.VUE_APP_API_ENDPOINT}/private-messages`, data, {
      headers: {
        Authorization: 'Bearer ' + token,

        'Access-Control-Allow-Origin': '*',




      },

    })
    commit('addPrivateMessageToChat', response.data.message)
    return response.data.message
  }

}



export default {
  actions,
  getters,
  state,
  mutations
}
