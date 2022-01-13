import axios from "axios"
var loggedInUser = localStorage.getItem('user')

loggedInUser = JSON.parse(loggedInUser)

const state = {
  followed: false,
  following: []
}

const getters = {

}


const mutations = {
  followOrUnfollow (state, followed) {
    if (followed === true) {
      state.followed = true
    } else {
      state.followed = false
    }
  },
  setFollowing (state, following) {
    state.following = following
  },
  setFollowers (state, followers) {
    state.followers = followers
  }
}

const actions = {
  async followOrUnfollow ({ commit }, userId) {
    var response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/followers/${userId}`, {}, {
      headers: {
        Authorization: 'Bearer ' + rootState.currentUser.token,


      }
    })
    console.log(response.data)
    commit('setCurrentUser', response.data)
    return response
  },

  async getFollowing ({ commit }, username) {
    var response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/profile/following/${username}`, {
      headers: {
        Authorization: 'Bearer ' + rootState.currentUser.token,


      }

    })
    commit('setFollowing', response.data.following)
    return response.data.following
  },
  async getFollowers ({ commit }, username) {
    var response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/profile/followers/${username}`, {
      headers: {
        Authorization: 'Bearer ' + rootState.currentUser.token,


      }

    })
    commit('setFollowers', response.data.followers)
    return response.data.followers
  },

}



export default {
  actions,
  getters,
  state,
  mutations
}
