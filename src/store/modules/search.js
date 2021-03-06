import axios from 'axios'


const state = {
  searchResults: [],
  postsResults: [],
  usersResults: [],
  searchQuery: '',

  activePostsTab: true,

}


const getters = {
  usersResults: (state) => {
    return state.searchResults.filter((searchResult) => {

      return typeof searchResult.content === String
    })
  },

  postsResults: (state) => {
    return state.searchResults.filter((searchResult) => {

      return typeof searchResult.username === String
    })
  },
  results: (state) => {
    return state.searchResults
  }
}

const mutations = {
  updateSearchPosts (state, data) {

    console.log(data)
    return state.postsResults = [...state.postsResults.map((post) => {


      return post.id === data.id ? data : post
    })]

  },
  setSearchQuery (state, query) {
    state.searchQuery = query
  },
  setResults (state, results) {
    state.searchResults = results
  },
  setUsersResults (state, results) {
    state.usersResults = results
  },
  setPostsResults (state, results) {
    state.postsResults = results
  },

  setActivePostsTabMutation (state, falsOrTrue) {
    console.log(falsOrTrue)
    state.activePostsTab = falsOrTrue
  },
  setActiveUsersTabMutation (state, falsOrTrue) {
    console.log(falsOrTrue)
    state.activeUsersTab = falsOrTrue
  }
}
const actions = {
  setSearchQueryAction ({ commit, rootState }, query) {
    commit('setSearchQuery', query)
  },
  setActivePostsTabAction ({ commit, rootState }, trueOrFalse) {
    commit('setActivePostsTabMutation', trueOrFalse)
  },
  setActiveUsersTabAction ({ commit, rootState }, trueOrFalse) {
    commit('setActiveUsersTabMutation', trueOrFalse)
  },

  async searchUsers ({ commit, rootState }, value) {
    console.log(value)

    console.log(rootState.currentUser.token)
    var response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/search/users`, { value: value }, {
      headers: {
        Authorization: 'Bearer ' + rootState.currentUser.token,

      }
    })
    var results = response.data.users
    commit('setResults', results)

    // commit('setPost', data.post)
    console.log(results)
    commit('setUsersResults', results)

  },

  async searchPosts ({ commit, rootState }, value) {


    var response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/search/posts`, { value: value }, {
      headers: {
        Authorization: 'Bearer ' + rootState.currentUser.token,

      }
    })
    var results = response.data.posts
    commit('setResults', results)

    // commit('setPost', data.post)
    console.log(results)
    commit('setPostsResults', results)

  },

  setUsersResults ({ commit }, users) {
    commit('setUsersResults', users)
  },

}





export default {

  state,
  getters,
  actions,
  mutations
}

