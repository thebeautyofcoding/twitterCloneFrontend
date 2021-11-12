<template>
  <ul class="list-none w-full">
    <div class="flex mt-5 flex-col">
      <div class="flex">
        <li
          v-for="title in tabTitles"
          :key="title"
          class="w-1/2 hover:bg-gray-300 C flex flex-col"
          @click="onClick(title)"
        >
          <div
            :class="
              title === selectedTitle
                ? blueUnderline + 'inline-block p-3 p-3'
                : 'inline-block p-3 p-3'
            "
          >
            <a
              :class="
                title === selectedTitle
                  ? activeTextTag + ' font-bold'
                  : nonActiveTextTag + ' font-bold'
              "
              aria-current="page"
              href="#"
              >{{ title }}</a
            >
          </div>
        </li>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </ul>
</template>


<script>
  import { ref, provide } from "vue";
  export default {
    emit: ["following-tab-active", "follower-tab-active"],
    setup(props, { slots }) {
      const tabTitles = ref(slots.default().map(tab => tab.props.title));
      const selectedTitle = ref(tabTitles.value[0]);
      console.log(ref(tabTitles.value[0]));
      provide("selectedTitle", selectedTitle);
      return {
        tabTitles,
        selectedTitle
      };
    },
    watch: {},
    name: "Tabs",
    components: {},
    data() {
      return {
        tabs: [],
        active: true,
        blueUnderline: " border-b-8 border-blue-400 ",
        activeTextTag: " font-bold text-black ",
        nonActiveTextTag: " font-bold text-gray-400 ",
        activePostsTab: false,
        following: null

        // posts: [],
        // postsOfProfile: []
      };
    },
    computed: {
      // postsOfProfile: async function() {
      //   if (this.selectedTitle === "Posts") {
      //     this.posts = await this.$store.dispatch("getPostsByUsername");
      //   }
      // }
      searchQuery() {
        return this.$store.state.search.searchQuery;
      }
    },
    methods: {
      async onClick(title) {
        this.selectedTitle = title;
        console.log(this.selectedTitle);
        if (this.selectedTitle === "Posts") {
          this.$store.dispatch("setActivePostsTabAction", true);
        } else {
          if (this.searchQuery !== "") {
            this.$store.dispatch("searchUsers", this.searchQuery);
          }
          this.$store.dispatch("setActivePostsTabAction", false);
        }

        if (this.selectedTitle === "Following") {
          this.$emit("following-tab-active", true);
          var username = this.$route.params.username;

          await this.$store.dispatch("getFollowing", username);
          console.log(this.following);
        } else if (this.selectedTitle === "Followers") {
          this.$emit("follower-tab-active", true);
          var username = this.$route.params.username;
          await this.$store.dispatch("getFollowers", username);
        } else {
          this.$emit("following-tab-active", false);
        }
      }
    },
    created() {}
  };
</script>
<style>
</style>
