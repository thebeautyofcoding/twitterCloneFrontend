    <template>
  <!-- {{ populateModal }} -->
  <div class="max-wl-xl mx-auto">
    <article
      class="border-b border-gray-200 p-2 hover:bg-gray-100 cursor-pointer"
    >
      <div v-if="post.retweeted_by" class="text-gray-400 font-bold d-flex mb-1">
        Retweeted by
        {{
          post.retweeted_by.user &&
          post.retweeted_by.user.username === loggedInUser.username
            ? "me"
            : "@" + post.retweeted_by.user.username
        }}
      </div>
      <div v-if="post.replied">
        <span class="text-gray-500"> Replying to @</span
        ><span
          ><router-link style="color: rgb(29, 155, 240)" to="#">
            {{ post.user_id_posted_by.username }}</router-link
          ></span
        >
      </div>
      <div class="flex item-center w-full">
        <img
          :src="imageAdress(post.user_id_posted_by.id)"
          class="rounded-full w-12 h-12 mr-3"
        />
        <div class="flex flex-wrap justify-start items-start w-full">
          <div class="flex item-center">
            <div class="flex-1 flex items-center">
              <h3 class="mr-2 font-bold hover:underline">
                <router-link to="#"
                  >{{ post.user_id_posted_by.firstname }}
                  {{ post.user_id_posted_by.lastname }}</router-link
                >
              </h3>
              <span class="text-gray-400 text-sm"
                >@{{ post.user_id_posted_by.username }}</span
              >
              <span class="text-gray-600 text-sm mr-1">·</span>
              <span class="text-gray-400 text-sm">{{ transformDate }}</span>
            </div>
          </div>

          <div class="w-full flex justify-start flex-column">
            <p class="my-1 flex justify-start">{{ post.content }}</p>

            <div class="flex justify-between w-full">
              <ReplyButton :post="post" :id="post.id" />
              <RetweetButton
                :post="post"
                :id="post.id"
                :retweetHandler="retweetHandler"
              />

              <LikeButton
                :updateButtons="updateButtons"
                :post="post"
                :id="post.id"
                :likeHandler="likeHandler"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

    <script>
  import SvgIcon from "@jamescoyle/vue-icon";

  import moment from "moment";
  import RetweetButton from "./RetweetButton.vue";
  import LikeButton from "./LikeButton.vue";
  import ReplyButton from "./ReplyButton.vue";
  import { mapState } from "vuex";
  export default {
    name: "SinglePost",
    props: {
      post: Object,

      updateButtons: Function
    },
    computed: {
      // replied: function() {
      //   if (this.post && this.post.replies.length > 0) {
      //     this.post.replies.foreach(function(reply) {
      //       if (this.reply.user_id === this.loggedInUser.id) {
      //         return true;
      //       } else {
      //         return false;
      //       }
      //     });
      //   }
      // },
      transformDate() {
        return moment(this.post.created_at).fromNow();
      }

      // ...mapState({
      //   postFromState: state => state.posts.post
      // }),

      // populateModal: function() {
      //   console.log("RUNSO");
      //   if (this.replyModal === true) {
      //     this.store.dispatch("getPostByIdAction", this.post.id);
      //   }
      // }
    },

    components: {
      SvgIcon,
      RetweetButton,
      LikeButton,
      ReplyButton
    },
    data() {
      return {
        clickedRetweet: false,
        loggedInUser: {},

        postReply: {},
        user: {},

        singlePostForList: null,
        liked: false
      };
    },
    computed: {
      channel() {
        return window.Echo.private("likes" + this.post.user_id_posted_by.id);
      },
      retweets() {
        return window.Echo.private("posts");
      }
    },
    mounted() {
      this.channel.listen("LikeEvent", e => {
        console.log("LIKEEVENT gets called multiple times");
        console.log(e);

        // this.$store.dispatch("updatePostsViaEvent", e);
        this.$store.dispatch("updatePostViaEvent", e);
        // likeMessage = `${e.post.user_id_posted_by.username} just liked your post!`;
        // this.$toast.info(likeMessage, {
        //   positon: "top",
        //   duration: 1000
        // });
      });
      this.retweets.listen("RetweetEvent", e => {
        console.log("EVENT");
        this.$store.dispatch("retweetPostByEvent", e);
      });
    },

    created() {
      this.loggedInUser = localStorage.getItem("user");

      this.loggedInUser = JSON.parse(this.loggedInUser);
      // this.post.replies.length > 0 &&
      //   this.post.replies.forEach(reply => {
      //     if (reply.user_id === this.loggedInUser.id) {
      //       this.replied = true;
      //     }
      //   });
    },

    methods: {
      async onPopulatePostReplyModal(postId) {
        // this.showReplyModal = false;

        // this.showSpinner = true;
        await this.$store.dispatch("getPostByIdAction", postId).then(post => {});
      },

      // isAuthUserRetweeter: function(userId) {
      //   var userString = localStorage.getItem("user");
      //   var userJson = JSON.parse(userString);

      //   if (userId === userJson.id) {
      //     return userJson.username;
      //   } else {
      //     return null;
      //   }
      // },
      // async postReplyHandler(id) {
      //   this.replyToBePosted.belongsToPost = id;
      //   await this.$store.dispatch("replyToPost", this.replyToBePosted);

      //   this.$store.dispatch("getRepliesOfPost", id).then(response => {
      //     this.repliesToPost = response.repliesOfPost;
      //     this.posts = this.$store.getters.getterPosts;
      //     this.replyToBePosted.content = null;
      //   });
      //   await this.$store.dispatch("getPostsWithAllReplies");

      //   await this.$store.dispatch("getPosts");

      //   await this.$store.dispatch("setRepliedOnPostAction", id);

      //   this.posts = this.$store.getters.getterPosts;
      //   this.transFormPostsDate();
      // },
      // authUserJoined: function(userId) {
      //   var userString = localStorage.getItem("user");
      //   var userJson = JSON.parse(userString);
      //   if (userId === userJson.id) {
      //     return moment(userJson.created_at).fromNow();
      //   }
      // },

      async likeHandler(postId) {
        var likeMessage = null;
        await this.$store.dispatch("likePost", postId);
        // this.singlePostForList = response.post;
        console.log("LIKEEHANDLER gets called multiple times");
      },
      async retweetHandler(postId) {
        await this.$store.dispatch("retweetPost", postId);
      },
      imageAdress: function(id) {
        return `${process.env.VUE_APP_API_ENDPOINT}/profile/avatar/${id}`;
      }

      // populatePostReplyModal() {
      //   this.$emit("populate-post-reply-modal", {
      //     postReply: this.postReply,
      //     post: this.post
      //   });
      // }
    }
  };
</script>
