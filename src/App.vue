<template>
  <div class="wrapper">
    <div class="row flex">
      <div class="flex">
        <div class="flex col-lg-2 col-md-2 col-sm-1 mr-2"><Sidebar /></div>
        <div
          class="col-md-10 col-sm-10 min-vw-70 col-lg-10"
          style="min-width: 80vw"
        >
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
  import { mapState } from "vuex";
  import Sidebar from "./components/Sidebar";

  export default {
    data() {
      return {
        loggedInUser: null,
      };
    },
    components: { Sidebar },
    ...mapState({
      loggedInUser: () => state.currentUser.currentUser,
    }),
  };
</script>
