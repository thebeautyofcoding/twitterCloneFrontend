<template>
  <ul>
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
    computed: {
      posts() {
        return this.$store.getters.getterPosts;
      },
      channel() {
        return window.Echo.private("posts");
      }
    },

    mounted() {
      this.$store.dispatch("getPosts").then(response => {});
    }
  };
</script>
