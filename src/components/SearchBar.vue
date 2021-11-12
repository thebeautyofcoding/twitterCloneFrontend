<template>
  <div
    v-on:keyup.enter="onEnter"
    @click="onFocusInput"
    @focusout="loseFocusInput"
    :class="inputBorderColor + 'flex rounded-full  bg-gray-100  border-2'"
  >
    <div class="flex w-full">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        :class="searchIconColor + 'w-10 h-10 fill-current'"
      >
        <g>
          <path
            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
          ></path>
        </g>
      </svg>
      <input
        v-model="value"
        placeholder="Search SocialFeed"
        @keyup="onKeyUp"
        class="rounded-full bg-gray-100 outline-none text-xl pl-2"
      />
    </div>
  </div>

  <div
    v-if="showResults"
    @focusout="loseFocusInput"
    class="bg-white rounded-lg z-10 cursor-pointer shadow"
  ></div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "SearchBar",
    emits: ["no-value"],

    computed: {
      searchResults() {
        return this.$store.getters.results;
      },
      postsActiveTab() {
        return this.$store.state.search.activePostsTab;
      },
      async loadUsersInTabOnClick() {
        if (!this.postsActiveTab && this.value !== "") {
          await this.$store.dispatch("searchUsers", this.value);
        }
      }
    },
    data: () => {
      return {
        inputBorderColor: "border-gray-100 ",
        searchIconColor: "text-gray-500 ",
        value: "",
        showResults: false
      };
    },

    methods: {
      onFocusInput(e) {
        this.inputBorderColor = "border-blue-600 ";
        this.searchIconColor = "text-blue-600 ";
      },
      loseFocusInput(e) {
        this.inputBorderColor = "border-gray-100 ";
        this.searchIconColor = "text-gray-500 ";
        this.showResults = false;
      },
      async onKeyUp() {
        this.$store.dispatch("setSearchQueryAction", this.value);
        console.log(this.$route.path);
        if (this.value === "") {
          this.$emit("no-value", true);
        }
        if (
          this.postsActiveTab &&
          this.value !== "" &&
          this.$route.path !== "/messages/new"
        ) {
          await this.$store.dispatch("searchPosts", this.value);
          this.$emit("no-value", false);
        } else if (this.value !== "") {
          await this.$store.dispatch("searchUsers", this.value);
          this.$emit("no-value", false);
        }

        this.showResults = true;
      }
    }
  };
</script>

<style>
</style>
