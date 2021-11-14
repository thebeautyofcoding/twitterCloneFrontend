<template>
  <ul>
    <li v-for="post in posts" :id="post && post.id" :key="post && post.id">
      <SinglePostReply :post="post" />
    </li>
  </ul>
</template>

<script>
  import SinglePostReply from "./SinglePostReply.vue";
  export default {
    name: "SinglePostRepliesList",
    components: { SinglePostReply },

    data() {
      return {};
    },
    computed: {
      posts() {
        return this.$store.state.posts.posts;
      },
      channel() {
        return window.Echo.private("posts");
      }
    },

    mounted() {
      //   this.$store
      //     .dispatch("getReplies", this.$route.params.username)
      //     .then(response => {});
    }
  };
</script>
