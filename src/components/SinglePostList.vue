<template>
  <ul class="min-h-full max-vw-90">
    <li v-for="post in posts" :id="post && post.id" :key="post && post.id">
      <SinglePost :post="post" />
    </li>
  </ul>
</template>

<script>
  import SinglePost from "./SinglePost.vue";
  export default {
    name: "SinglePostList",
    components: { SinglePost },

    data() {
      return {};
    },
    methods: {},
    computed: {
      posts() {
        return this.$store.getters.getterPosts;
      },
      channel() {
        return window.Echo.private("posts");
      },
    },
    beforeMount() {},
    mounted() {
      this.$store.dispatch("getPosts");
    },
    created() {},
  };
</script>
