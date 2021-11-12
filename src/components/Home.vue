  <template>
  <PostReplyModal />

  <div class="p-0 p md flex-column border-solid border-2 border-light-grey-500">
    <div class="border-b-3 border-gray-500">
      <textarea
        class="w-full outline-none p-4 text-xl resize-none rounded-lg"
        rows="1"
        v-model="value"
        placeholder="Your Tweet, Bro..."
      />
    </div>
    <div id="preview">
      <img v-if="url" :src="url" class="w-20 h-auto" />
    </div>
    <div class="flex hover:text-blue-500 mt-3" style="color: rgb(29, 155, 240)">
      <div class="w-7 h-7 hover:bg-blue-200 rounded-full hover:text-blue-500">
        <label for="fileInput">
          <input
            type="file"
            id="fileInput"
            style="display: none"
            @change="onFileChange"
            accept="image/*"
          />

          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="h-7 w-7 fill-current"
          >
            <g>
              <path
                d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"
              ></path>
              <circle cx="8.868" cy="8.309" r="1.542"></circle>
            </g>
          </svg>
        </label>
      </div>
    </div>
    <div class="flex justify-end m-4">
      <button
        @click="submitHandler"
        class="
          bg-blue-300
          hover:bg-blue-500
          text-white
          font-bold
          py-1
          px-2
          rounded-full
        "
      >
        Tweet
      </button>
    </div>

    <SinglePostList />
  </div>
</template>

  <script>
  import axios from "axios";
  import SinglePost from "./SinglePost.vue";
  import moment from "moment";
  import { mapState } from "vuex";
  import PostReplyModal from "./PostReplyModal.vue";
  import SinglePostList from "./SinglePostList.vue";

  export default {
    name: "Home",

    components: {
      PostReplyModal,
      SinglePost,
      SinglePostList
    },

    data() {
      return {
        url: null,

        post: null,
        value: null,
        user: {},

        postIds: [],

        repliesToPost: [],
        loggedInUser: {},

        retweetButtonColor: "",
        clickedRetweet: false,

        postToPutInModal: null,
        postReply: null,

        replied: false,
        showReplyModal: false,
        showSpinner: true,
        replyModal: false
      };
    },

    updated() {},
    beforeMounted() {},
    updated() {},
    created() {},
    computed: {
      channel() {
        return window.Echo.private("posts");
      }
    },
    mounted() {
      this.channel.listen("PostPostedEvent", e => {
        // this.$store.dispatch("updatePostsViaEvent", e);

        if (this.loggedInUser.id !== e.post.user_id_posted_by.id)
          this.$store.dispatch("updatePostsViaEvent", e);
        // likeMessage = `${e.post.user_id_posted_by.username} just liked your post!`;
        // this.$toast.info(likeMessage, {
        //   positon: "top",
        //   duration: 1000
        // });
      });
      // this.$store.dispatch("getPosts");
      // this.posts = this.$store.state.posts;
    },
    beforeCreated() {},
    async created() {
      this.loggedInUser = localStorage.getItem("user");

      this.loggedInUser = JSON.parse(this.loggedInUser);

      // this.transFormPostsDate();
    },
    methods: {
      onFileChange(e) {
        console.log(e);
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);
      },

      closeModalHandler() {
        this.postToPutInModal = null;
      },

      submitHandler: async function() {
        await this.$store.dispatch("addPostToPosts", this.value);

        // await this.$store.dispatch("updatePostsViaEvent", e);
        this.value = null;
      },

      // transFormPostsDate: function() {
      //   return this.posts.map(function(post) {
      //     post.created_at = moment(+post.created_at).fromNow();

      //     return post;
      //   });
      // },
      postDeleteHandler: function(id) {
        console.log(id);
        axios
          .delete(`http://127.0.0.1:8000/api/delete/posts/${id}`, {
            content: this.value
          })
          .then(response => {
            console.log(response);
            if (response.data.deleted === true)
              return document.getElementById(id).remove();
          });
      }
    }
  };
</script>

  <style scoped>
body {
  padding: 0;
  margin: 0;
}
</style>
