<template>
  <Tabs
    @following-tab-active="onFollowActiveTab"
    @follower-tab-active="onFollowerTabActive"
  >
    <Tab title="Followers">
      <ul
        v-if="followers && followerTagActive"
        v-for="follower in followers"
        :key="follower.id"
      >
        <UserResult :user="follower" />
      </ul>
    </Tab>
    <Tab title="Following">
      <ul
        v-if="following && active"
        v-for="singlefollowing in following"
        :key="following.id"
      >
        <UserResult :user="singlefollowing" />
      </ul>
    </Tab>
  </Tabs>
</template>

<script>
  import Tabs from "../components/Tabs.vue";
  import Tab from "../components/Tab.vue";
  import UserResult from "../components/UserResult.vue";
  export default {
    name: "Follower",

    components: {
      Tabs,
      Tab,
      UserResult
    },
    data() {
      return {
        active: false,
        followerTagActive: false
      };
    },
    computed: {
      following() {
        if (this.active) {
          this.followerTagActive = false;
          return this.$store.state.followers.following;
        }
      },
      followers() {
        if (this.followerTagActive) {
          this.active = false;
          return this.$store.state.followers.followers;
        }
      }
    },
    methods: {
      onFollowActiveTab(e) {
        this.active = e;
      },
      onFollowerTabActive(e) {
        this.followerTagActive = e;
      }
    }
  };
</script>

<style>
</style>
