<template>
  <div v-if="post">
    <SingleReply :replies="post.replies" :replied="replied" />
  </div>
</template>



<script>
  import SingleReply from "./SingleReply";
  import { mapState } from "vuex";
  export default {
    name: "RepliesList",
    components: {
      SingleReply
    },
    computed: {
      ...mapState({
        post: state => state.posts.post,
        replyModal: state => state.replyModal.replyModal
      })
    },
    data() {
      return {};
    },
    beforeCreate() {},
    mounted() {
      if (this.replyModal.replyModal === true)
        this.$store.dispatch("getRepliesOfPost", this.id);
    },

    created() {},
    props: ["replies", "replied", "id"]
  };
</script>
