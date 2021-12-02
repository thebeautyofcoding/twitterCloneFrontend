
import axios from 'axios'

const state = {
  currentUser: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token')
}
const getters = {
  getCurrentUser: function (state) {

    return state.currentUser
  }
}
const mutations =
{
  setCurrentToken (state, token) {
    state.token = token

  },
  setCurrentUser: function (state, user) {
    state.currentUser = user
  }
}

{
}
const actions = {
  async loginUser ({ commit }, user) {
    console.log(process.env.VUE_APP_API_ENDPOINT)


    const response = await window.apiClient.post(`${process.env.VUE_APP_API_ENDPOINT}/login`, {
      email: user.email,
      password: user.password
    })


    if (response.data.token) {
      localStorage.setItem('user', response.data.user)
      commit('setCurrentUser', response.data.user)
      commit('setCurrentToken', response.data.token)
      localStorage.setItem('token', response.data.token)
      const userStringified = JSON.stringify(response.data.user)
      localStorage.setItem('user', userStringified)
    }

    return response



  },

  logout ({ commit }, token) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_API_ENDPOINT}/logout`, {

      }, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(({ data, status }) => {
        if (status === 200) {
          localStorage.removeItem('token')
          commit('setCurrentUser', null)
          commit('setCurrentToken', '')
          resolve(true)
        }
      })
        .catch(err => {
          reject(err)
        })
    })
  },
  registerUser ({ commit, state }, user) {

    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_API_ENDPOINT}/register`, {
        email: user.email,
        password: user.password,
        username: user.username,
        password_confirmation: user.passwordConfirm,
        firstname: user.firstname,
        lastname: user.lastname,

      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(({ data, status }) => {

        if (status === 201) {
          console.log(data.user)
          commit('setCurrentToken', data.token)
          localStorage.setItem('token', data.token)
          const userStringified = JSON.stringify(data.user)
          localStorage.setItem('user', userStringified)

          commit('setCurrentUser', data.user)
          resolve(true)
        }
      })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export default {

  state,
  getters,
  actions,
  mutations
}
