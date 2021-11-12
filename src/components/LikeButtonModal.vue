<template>
  <div class="flex">
    <div
      class="flex items-center justify-start py-2 mr-6"
      @click="likeHandler(post)"
    >
      <div
        :class="
          post.post_like && post.post_like.length > 0
            ? 'text-red-600 flex hover:text-red-400'
            : 'text-gray-600 flex hover:text-red-400'
        "
      >
        <div class="w-6 h-6 hover:bg-red-200 rounded-full hover:text-red-500">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="w-6 h-6 fill-current"
          >
            <g>
              <path
                d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
              ></path>
            </g>
          </svg>
        </div>
        <span
          :class="
            post.post_like && post.post_like.length > 0
              ? 'text-red-600 flex hover:text-red-400'
              : 'text-gray-600 flex hover:text-red-400'
          "
          >{{ post.post_like_count }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
  import SvgIcon from "@jamescoyle/vue-icon";

  import { mapState } from "vuex";
  export default {
    name: "LikeButtonModal",
    computed: {
      liked() {
        console.log("HDJSHJDHS");
        this.loggedInUser = localStorage.getItem("user");

        this.loggedInUser = JSON.parse(this.loggedInUser);
        if (this.post.post_likes_post && this.post.post_likes_post.length > 0) {
          return this.post.post_likes_post.forEach(like => {
            console.log(this.loggedInUser);
            if (like.user_id === this.loggedInUser.id) {
              return (this.color = "text-red-600 flex hover:text-red-400");
            } else {
              return (this.color = "text-gray-600 flex hover:text-red-400");
            }
          });
        }
      }
    },

    props: {
      id: Number,

      post: Object,
      likeHandler: Function
    },
    components: {
      SvgIcon
    },
    data() {
      return {
        clicked: false,
        color: null,

        postModalLocal: {},
        color: null
      };
    },
    updated() {
      this.postModalLocal = this.postModal;
      //  this.post.post_like.forEach((like)=>{

      //    like.user_id=== this.loggedInUser.id ? this.liked=true :this.liked=false;
      //  })
    },

    created() {},

    methods: {}
  };
</script>

<style scoped lang="scss">
</style>

