<template>
  <ul v-for="user in users">
    <div @click="onClickHandler(user)">
      <UserResult :user="user" />
    </div>
  </ul>
</template>

<script>
  import UserResult from "./UserResult.vue";
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState({
        users: state => state.search.usersResults
      })
    },
    data() {
      return {
        conversationPartners: [],
        usersLeftToAddToConversation: []
      };
    },

    name: "UserResultsList",
    components: {
      UserResult
    },
    mounted() {},
    methods: {
      onClickHandler(user) {
        var index = this.conversationPartners.findIndex(
          partner => partner.id === user.id
        );

        if (index !== -1) {
          this.conversationPartners.splice(index, 1);
          this.usersLeftToAddToConversation = this.users.filter(
            user => !this.conversationPartners.includes(user)
          );
          this.$store.dispatch(
            "setUsersResults",
            this.usersLeftToAddToConversation
          );
          this.$store.dispatch(
            "setConversationPartners",
            this.conversationPartners
          );
        } else {
          this.conversationPartners.push(user);
          this.usersLeftToAddToConversation = this.users.filter(
            user => !this.conversationPartners.includes(user)
          );
          this.$store.dispatch(
            "setUsersResults",
            this.usersLeftToAddToConversation
          );
          this.$store.dispatch(
            "setConversationPartners",
            this.conversationPartners
          );
        }

        // this.conversationPartners.forEach(partner => {
        //   if (partner.id === user.id) {
        //     console.log("zweitens");
        //     this.$store.dispatch("deleteOneConversationPartner", user);
        //   } else {
        //     this.conversationPartners.push(user);
        //     this.$store.dispatch(
        //       "setConversationPartners",
        //       this.conversationPartners
        //     );
        //   }
        // });

        //
      }
    }
  };
</script>

<style>
</style>
