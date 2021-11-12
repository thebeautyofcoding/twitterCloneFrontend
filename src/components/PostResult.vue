<template>
  <div v-if="post">
    <SinglePost :post="post" :id="post.id" />
  </div>
</template>

<script>
  import SinglePost from "./SinglePost.vue";
  export default {
    name: "PostResult",
    props: ["post"],
    components: { SinglePost }
  };
</script>

<style>
</style>
