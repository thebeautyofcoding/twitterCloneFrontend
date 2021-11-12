import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Chat from '../views/Chat.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Follower from '../views/Follower.vue'
import Message from '../views/Message.vue'
import NewChat from '../views/NewChat.vue'
import GroupChat from '../views/GroupChat.vue'
import PrivateMessage from '../views/PrivateMessage.vue'
import store from '../store'
const routes = [
  {
    path: '/chat',
    name: 'chat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Chat
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile/following/:username',
    name: 'Follower',
    component: Follower
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/messages/new/',
    name: 'NewChat',
    component: NewChat
  },
  {
    path: '/messages/:id/',
    name: 'GroupChat',
    component: GroupChat
  },
  {
    path: '/private-messages/:id/',
    name: 'PrivateMessage',
    component: PrivateMessage
  },
  {
    path: '/messages/',
    name: 'Message',
    component: Message
  },

  {
    path: '/search/',
    name: 'Search',
    component: Search
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  console.log(store.state.currentUser.currentUser)
  if (to.name !== 'Login' && to.name !== 'Register' && store.state.currentUser.currentUser && !store.state.currentUser.currentUser.id || store.state.currentUser.currentUser && store.state.currentUser.currentUser.user && store.state.currentUser.currentUser.user.id) next('/login')
  else next()
})

export default router
