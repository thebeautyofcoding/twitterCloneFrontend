<template>
  <div class="search flex flex-col w-full card rounded-xl p-3 shadow">
    <div><SearchBar /></div>
    <div class="flex flex-col">
      <PostReplyModal />
      <Tabs>
        <Tab title="Posts"><PostsResultList /></Tab>
        <Tab title="Users"><UserResultsList /></Tab>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import Tabs from "../components/Tabs";
  import Tab from "../components/Tab";
  import SearchBar from "../components/SearchBar";
  import UserResult from "../components/UserResult.vue";
  import UserResultsList from "../components/UserResultsList.vue";
  import PostsResultList from "../components/PostsResultList.vue";
  import PostReplyModal from "../components/PostReplyModal.vue";
  export default {
    name: "Search",
    components: {
      Tab,
      Tabs,
      SearchBar,
      UserResult,
      UserResultsList,
      PostsResultList,
      PostReplyModal,
    },
    data() {
      return {};
    },
    computed: {
      // userResults() {
      //   return this.$store.getters.usersResults;
      // },
      // postsResults() {
      //   return this.$store.getters.postsResults;
      // }
    },
    methods: {
      // onFocusInput() {
      //   console.log("jgfkgjkf");
      //   this.inputBorderColor = "border-blue-600 ";
      // },
      // loseFocusInput() {
      //   console.log("helgflg");
      //   this.inputBorderColor = "border-gray-100 ";
      // }
    },
  };
</script>
