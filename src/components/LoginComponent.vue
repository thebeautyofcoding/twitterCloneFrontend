<template>
  <div class="w-1/2 container">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        class="form-control"
        v-model="user.email"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="user.password"
        placeholder="Password"
      />
    </div>

    <button @click="login" class="btn btn-primary mt-3">Login</button>
    <div class="flex mt-3">
      <router-link :to="{ name: 'Register' }"
        >Click if you have not been registered yet</router-link
      >
    </div>
  </div>
</template>
<script>
  export default {
    name: "LoginComponent",
    data: () => ({
      user: {
        email: "",
        password: ""
      }
    }),
    methods: {
      login() {
        this.$store.dispatch("loginUser", this.user).then(() => {
          this.$store.dispatch("setLoggedInUserAction", this.user);
          this.$router.push("/");
        });
      }
    }
  };
</script>
