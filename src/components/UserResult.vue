<template>
  {{ followButtonActiveComputed }}
  <li class="hover:bg-gray-200">
    <div class="flex" v-if="user">
      <div>
        <img
          class="rounded-full m-3"
          src="https://pbs.twimg.com/profile_images/809883338873839616/4PGFZ7OX_bigger.jpg"
        />
      </div>
      <div class="flex flex justify-end w-full">
        <div class="flex w-full">
          <div class="font-bold text-xl">
            {{ user.firstname }} {{ user.lastname }}
          </div>
          <div class="text-gray-500 flex justify-start">
            @{{ user.username }}
          </div>
        </div>
        <div class="flex">
          <div class="flex justify-end align-items-center w-full mr-2">
            <button
              @click="onFollow"
              v-if="!active"
              class="
                rounded-full
                bg-blue-400
                text-white
                p-2
                hover:bg-gray-400 hover:text-blue-400
              "
            >
              Follow
            </button>
          </div>
          <div class="flex justify-end align-items-center w-full mr-2">
            <button
              v-if="active"
              @click="onFollow"
              class="
                rounded-full
                bg-blue-400
                text-white
                p-2
                hover:bg-gray-400 hover:text-blue-400
              "
            >
              Unfollow
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "UserResult",
    props: ["user"],
    data() {
      return {
        active: false,
        followed: false,
        loggedInUser: null
      };
    },

    mounted() {
      this.loggedInUser = localStorage.getItem("user");

      this.loggedInUser = JSON.parse(this.loggedInUser);
      this.user &&
        this.user.followers &&
        this.user.followers.forEach(follower => {
          if (follower.id === this.loggedInUser.id) {
            this.active = true;
          } else {
            this.active = false;
          }
        });
    },
    methods: {
      async onFollow() {
        console.log(this.user.id);
        var response = await this.$store.dispatch(
          "followOrUnfollow",
          this.user.id
        );

        this.active = response.data.followed;
      }
    }
  };
</script>

<style>
</style>
