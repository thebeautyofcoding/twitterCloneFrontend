import axios from 'axios'


var loggedInUser = localStorage.getItem('user')
loggedInUser = JSON.parse(loggedInUser)
const state = {}


const getters = {

}

const mutations = {

}


const actions = {
  async uploadProfileAvatar ({ commit, rootState }, avatarImage) {

    const formData = new FormData()
    formData.append("image", avatarImage)
    console.log(formData)
    var response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/profile/avatar/${loggedInUser.id}`, formData, {
      headers: {
        Authorization: 'Bearer ' + rootState.currentUser.token,
        'Content-Type': avatarImage.type

      },
      responseType: 'blob'
    })
    const urlCreator = window.URL || window.webkitURL
    var logo = urlCreator.createObjectURL(response.data)
    return response, logo
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
