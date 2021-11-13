<template>
  <div class="max-wl-xl mx-auto my-6">
    <article
      class="
        border-t border-b border-gray-400
        p-2
        hover:bg-gray-100
        cursor-pointer
      "
    >
      <div v-if="post.retweetedByAuthUser" class="flex font-bold text-gray-400">
        Retweeted bye
        {{
          post &&
          post.retweetedByAuthUser &&
          post.retweetedByAuthUser.username === loggedInUser.username
            ? "@" + post.retweetedByAuthUser.username
            : "me"
        }}
        {{
          authUserJoined(
            post && post.retweetedByAuthUser && post.retweetedByAuthUser.user_id
          )
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
      <div class="flex item-center">
        <img
          :src="
            imageAdress(post.user_id_posted_by && post.user_id_posted_by.id)
          "
          class="rounded-full w-12 h-12 mr-3"
        />
        <div class="flex flex-wrap justify-start items-start w-full">
          <div class="flex item-center">
            <div class="flex-1 flex items-center">
              <h3 class="mr-2 font-bold hover:underline">
                <router-link to="#"
                  >{{
                    post.user_id_posted_by && post.user_id_posted_by.firstname
                  }}
                  {{
                    post.user_id_posted_by && post.user_id_posted_by.lastname
                  }}</router-link
                >
              </h3>
              <span class="text-gray-400 text-sm"
                >@{{
                  post.user_id_posted_by && post.user_id_posted_by.username
                }}</span
              >
              <span class="text-gray-600 text-sm mr-1">·</span>
              <span class="text-gray-400 text-sm">{{ post.created_at }}</span>
            </div>
          </div>

          <div class="w-full flex justify-start flex-column">
            <p class="my-1 flex justify-start">{{ post.content }}</p>

            <div class="flex justify-between">
              <ReplyButtonModal
                :post="post"
                :id="post.id"
                :loggedInUser="loggedInUser"
              />
              <RetweetButtonModal
                :post="post"
                :id="post.id"
                :retweetHandler="retweetHandler"
                :loggedInUser="loggedInUser"
              />

              <LikeButtonModal
                :post="post"
                :id="post.id"
                :likeHandler="likeHandlerModal"
                :loggedInUser="loggedInUser"
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
  import RetweetButtonModal from "./RetweetButtonModal.vue";
  import LikeButtonModal from "./LikeButtonModal.vue";
  import ReplyButtonModal from "./ReplyButtonModal.vue";
  import { mapState } from "vuex";
  export default {
    name: "SinglePostInModal",
    props: {
      nowGreen: Boolean,

      onPopulatePostReplyModal: Function
    },
    emits: ["update-posts"],
    components: {
      SvgIcon,
      RetweetButtonModal,
      LikeButtonModal,
      ReplyButtonModal
    },
    data() {
      return {
        clickedRetweet: false,
        loggedInUser: {},

        postReply: {},
        user: {},
        replied: false,
        postModal: {},

        style: ""
      };
    },
    computed: {
      ...mapState({
        post: state => state.posts.post
      })
    },

    mounted() {
      this.loggedInUser = localStorage.getItem("user");

      this.loggedInUser = JSON.parse(this.loggedInUser);
      this.post.replies &&
        this.post.replies.forEach(reply => {
          if (reply.user_id === this.loggedInUser.id) {
            this.replied = true;
          }
        });
    },

    methods: {
      isAuthUserRetweeter: function(userId) {
        var userString = localStorage.getItem("user");
        var userJson = JSON.parse(userString);
        if (userId === userJson.id) {
          return "me";
        }
      },
      retweetHandler(post) {
        this.$store.dispatch("retweetPost", post.id).then(response => {});
      },

      likeHandlerModal(post) {
        this.$store.dispatch("likePost", post.id).then(response => {
          // this.postModal=response.post
        });
      },

      authUserJoined: function(userId) {
        var userString = localStorage.getItem("user");
        var userJson = JSON.parse(userString);
        if (userId === userJson.id) {
          return moment(userJson.created_at).fromNow();
        }
      },

      imageAdress: function(id) {
        return `${process.env.VUE_APP_API_ENDPOINT}/profile/avatar/${id}`;
      }
    }
  };
</script>
