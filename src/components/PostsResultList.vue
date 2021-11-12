<template>
  <ul v-if="posts" v-for="post in posts">
    <PostResult :post="post" />
  </ul>
</template>

<script>
  import PostResult from "./PostResult.vue";
  import { mapState } from "vuex";
  export default {
    name: "PostResultsList",
    components: { PostResult },
    computed: {
      ...mapState({
        posts: state => state.search.postsResults
      })
      // posts() {
      //   return this.$store.search.getters.posts;
      // },
    },
    data() {
      return {};
    }
  };
</script>

<style>
</style>
