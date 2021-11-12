import { createStore } from 'vuex'
import currentUser from './modules/currentUser'
import posts from './modules/posts'
import replyModal from './modules/replyModal'
import search from './modules/search'
import images from './modules/images'
import followers from './modules/followers'
import profile from './modules/profile'
import chat from './modules/chat'
export default createStore({

  modules: {
    currentUser,
    posts,
    replyModal,
    search,
    images,
    followers,
    profile,
    chat
  }
})
