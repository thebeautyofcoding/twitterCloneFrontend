const state = {
  replyModal: {
    replyModal: false,
    close: false,
  }
}
const getters = {
  getReplyModalState: (state) => {
    return state.open
  }
}
const mutations = {
  setReplyModalState: (state, replyModal) => {
    state.replyModal = replyModal
  }
}

const actions = {
  setButtonClicked: ({ commit }, replyModal) => {
    commit('setReplyModalState', replyModal)
  }
}





export default {
  state,
  getters,
  actions,
  mutations
}


