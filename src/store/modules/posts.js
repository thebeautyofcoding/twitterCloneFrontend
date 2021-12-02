
import axios from 'axios'

var state = {
  posts: [],
  post: {},
  loggedInUser: {},
  posts: [],
  replies: [],



}

const getters = {
  getterPosts: state => {

    return state.posts
  },

  getPostById: (state) => (id) => {
    return state.posts.find(post => post.id === id)
  },
  getPostForReplyModal: (state) => {

    return state.post
  },

  loggedInUser: (state, getters, rootState) => {

    return rootState.currentUser
  },


}

const mutations = {

  setLoggedInUser (state, user) {
    console.log(user)
    state.loggedInUser = user.currentUser
  },
  setPost (state, post) {
    return state.post = post


  },
  setPosts (state, posts) {


    return state.posts = posts



  },
  setPostToPosts (state, post) {

    return state.posts.unshift(post)
  },
  setRepliedToPosts (state, postId) {

    state.posts = [...state.posts.map(post => {
      return post.id === postId ? { ...post, replied: true } : post
    })]



  },
  setRepliedToPost (state, post) {

    state.post = { ...post, replied: true }



  },


  setLikedToPosts (state, data) {
    console.log(data.post)
    return state.posts = [...state.posts.map(post => {


      if (post.id !== data.post.id) {
        return post
      }
      console.log('erstens')

      if (post.id === data.post.id && data.liked === false) {


        return { ...post, liked: false, post_likes_post: data.post.post_likes_post }

      }

      if (post.id === data.post.id && data.liked === true) {

        console.log('zweitens')
        return {
          ...post, liked: true, post_likes_post: data.post.post_likes_post
        }
      }
      if (post.id === data.post.id && data.liked === undefined) {

        console.log('drittens')
        return {
          ...post, liked: true, post_likes_post: data.post.post_likes_post
        }
      }






    })]
  },
  setLikedToPost (state, data) {
    console.log(data.post)
    return state.posts = [...state.posts.map(post => {


      if (post.id !== data.post.id) {
        return post
      }
      console.log('erstens')

      if (post.id === data.post.id && data.liked === false) {


        return { ...post, liked: false, post_likes_post: data.post.post_likes_post }

      }

      if (post.id === data.post.id && data.liked === true) {

        console.log('zweitens')
        return {
          ...post, liked: true, post_likes_post: data.post.post_likes_post
        }
      }
      if (post.id === data.post.id && data.liked === undefined) {

        console.log('drittens')
        return {
          ...post, liked: true, post_likes_post: data.post.post_likes_post
        }
      }






    })]
  },
  // setLikes(state, data) {
  //   // if (likeId.filter(id => state.likes.indexOf(id) !== -1){

  //   // }

  //   state.LastPostLiked.postId = data[0]
  //   state.LastPostLiked.likeId = data[1]



  // },
  updatePost (state, data) {

    console.log(data)



    return state.post = data.post

  },
  updateReplyToPost (state, data) {

    var post_to_reply_for = data.postReply


    state.posts = [...state.posts.map((post) => {

      if (post.post_to_reply_for) {
        return post.id === data ? { ...post, post_to_reply_for: null } : post
      }
      return post.id === data ? { ...post, post_to_reply_for } : post
    })]
  },
  updateRepliesToPost (state, data) {
    console.log(data)


    state.posts = [...state.posts.map((post) => {

      if (data.post.replies === null) {
        return { ...post, replies: null }
      }
      return { ...post, replies: data.repliesOfPost }

    })]
  },
  updateRepliesToPosts (state, data) {

    state.posts = [...state.posts.map(function (post) {

      console.log(post.id === data.postWithReplies.id)
      return post.id === data.postWithReplies.id ? { ...post, replies: [...data.postWithReplies.replies] } : post

    })]


  },
  // setRepliesOnPost(state, data) {
  //   console.log(data)
  //   state.posts.map(post => {
  //     post.replies = []
  //     return { ...post, replies: data.post.replies }
  //   })
  // },

  updatePosts (state, data) {

    console.log(data)
    return state.posts = [...state.posts.map((post) => {


      return post.id === data.id ? data : post
    })]

  },

  updateReplies (state, data) {

    console.log(data)
    return state.replies = [...state.replies.map((post) => {


      return post.id === data.id ? data : post
    })]

  },
  setReplies (state, replies) {
    state.replies = replies
  }

  // prepopulateModal() {

  // },

}
/* eslint-disable */
const actions = {

  updatePostsViaEvent ({ commit }, post) {
    console.log(post)

    commit('setPostToPosts', post.post)
  },
  updatePostViaEvent ({ commit }, post) {


    commit('updatePosts', post)
  },



  async getProfileUser ({ commit, rootState }, username) {


    const response = await axios(`${process.env.VUE_APP_API_ENDPOINT}/profile/${username}`,
      {
        headers: {
          Authorization: 'Bearer ' + rootState.currentUser.token
        }
      })
    return response.data.user
  },

  setLoggedInUserAction ({ commit, getters }) {

    var user = getters.loggedInUser
    console.log(user)

    commit('setLoggedInUser', user)
  },
  async getPosts ({ commit, rootState }) {
    const token1 = localStorage.getItem('token')
    console.log(token1)
    const response = await axios(`${process.env.VUE_APP_API_ENDPOINT}/posts`,
      {
        headers: {
          Authorization: 'Bearer ' + rootState.currentUser.token,
          'Accept': ' application/json'
        }
      })

    commit('setPosts', response.data.posts)



  },
  likePost ({ commit, rootState }, postId) {

    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_API_ENDPOINT}/posts/like`, { postId: postId }, {
        headers: {
          Authorization: 'Bearer ' + rootState.currentUser.token
        }
      }).then(({ data, status }) => {
        if (status === 200) {

          // commit('setLikedToPost', data)

          console.log(data.post)
          // commit('setPost', data.post)
          commit('updateSearchPosts', data.post, { root: true })
          commit('updatePosts', data.post)
          // commit('setPosts', data.post)






          resolve(data)
        }
      })
        .catch(err => reject(err))
    })
  },

  getPostsByUsername ({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_API_ENDPOINT}/profile/posts/bluemotion86`, {
        headers: {
          Authorization: 'Bearer ' + rootState.currentUser.token
        }
      }).then(({ data, status }) => {
        // if (status === 201) {
        //   commit('updatePosts', data)
        //   commit('setPost', data.post)
        //   resolve(data.post)
        // } else {
        //   commit('updatePosts', data)
        //   commit('setPost', data.post)
        commit('setPosts', data.posts)
        resolve(data.post)

        // }
      }).catch(err => reject(err))
    })
  },
  retweetPostByEvent ({ commit }, data) {

    commit('updatePosts', data)
    commit('setPost', data.post)
  },
  retweetPost ({ commit, rootState }, postId) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_API_ENDPOINT}/posts/retweet`, { postId: postId }, {
        headers: {
          Authorization: 'Bearer ' + rootState.currentUser.token
        }
      }).then(({ data, status }) => {
        if (status === 201) {
          commit('updateSearchPosts', data.post, { root: true })
          commit('updatePosts', data.post)
          commit('updatePost', data.post)
          commit('setPost', data.post)
          resolve(data.post)
        } else {
          commit('updateSearchPosts', data.post, { root: true })
          commit('updatePosts', data.post)
          commit('setPost', data.post)
          commit('updatePost', data.post)

          resolve(data.post)

        }
      }).catch(err => reject(err))
    })
  },
  getPostByIdAction ({ commit, rootState }, postId) {

    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_API_ENDPOINT}/posts/${postId}`, {
        headers: {
          Authorization: 'Bearer ' + rootState.currentUser.token
        }
      }).then(({ status, data }) => {
        if (status === 200) {
          resolve(data)
          console.log(data.post)
          commit('setPost', data.post)
        }
      }).catch((err) => {
        reject(err)
      })
    })

    // commit('updateReplyToPost', data)
  },

  replyToPost ({ commit, rootState }, reply) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_API_ENDPOINT}/posts/reply`, { reply: reply }, {
        headers: {
          Authorization: 'Bearer ' + rootState.currentUser.token
        }
      }).then(({ data, status }) => {

        if (status === 201) {
          console.log(data)

          commit('setPost', data.post)


          resolve(data.post)
        }
      }).catch(err => reject(err))
    })
  },
  async getRepliesOfPost ({ commit, rootState }, postId) {

    var response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/posts/replies/${postId}`, {
      headers: {
        Authorization: 'Bearer ' + rootState.currentUser.token
      }
    })


    commit('updateRepliesToPosts', response.data)
    commit('setPost', response.data.postWithReplies)





  },
  addPostToPosts ({ commit, rootState }, value) {
    var token = localStorage.getItem("token")
    var user = localStorage.getItem(('user'))
    user = JSON.parse(user)

    axios
      .post(
        `${process.env.VUE_APP_API_ENDPOINT}/create/posts/${user.id}`,
        { content: value },
        {
          headers: {
            Authorization: "Bearer " + rootState.currentUser.token,

          }
        }
      )
      .then(response => {
        console.log(response.data)
        commit('setPostToPosts', response.data.post)
      })
  },

  getPostsWithAllReplies ({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_API_ENDPOINT}/posts`, {
        headers: {
          Authorization: 'Bearer ' + rootState.currentUser.token
        }
      }).then(({ data, status }) => {

        commit('setPost', data.post)


        resolve(data)

      }).catch(err => reject(err))
    })

  },
  setRepliedOnPostAction ({ commit }, post) {

    commit('setRepliedToPost', post)
    commit('setRepliedToPosts', post.id)

  },

  async getReplies ({ commit, rootState }, username) {
    const res = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/replies/${username}`, {
      headers: {
        Authorization: 'Bearer ' + rootState.currentUser.token
      }
    })
    // commit('setReplies', res.data.replies)
    // commit('updatePosts', res.data.replies)
    commit('setPosts', res.data.replies)
    return res
  }
}
export default {

  state,
  getters,
  actions,
  mutations
}
/* eslint-disable */
