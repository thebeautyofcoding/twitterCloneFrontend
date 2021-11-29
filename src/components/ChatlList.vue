<template>
  <ul v-for="chat in chats" :key="chat.id" class="cursor-pointer">
    <SingleChat :chat="chat" />
  </ul>
</template>

<script>
  import SingleChat from "../components/SingleChat.vue";
  export default {
    components: {
      SingleChat,
    },
    data() {
      return {};
    },
    computed: {
      chats() {
        return this.$store.state.chat.chats;
      },
      loggedInUser() {
        return this.$store.state.currentUser.currentUser;
      },
    },
    async created() {
      await this.$store.dispatch("getChats");
    },
  };
</script>

<style scoped>

</style>
