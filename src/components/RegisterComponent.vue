<template>
  <div class="w-full container">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        class="form-control"
        v-model="user.email"
        id="email"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input
        type="email"
        class="form-control"
        v-model="user.username"
        id="username"
        aria-describedby="emailHelp"
        placeholder="Enter username"
      />
    </div>
    <div class="form-group">
      <label for="firstname">Firstname</label>
      <input
        type="email"
        class="form-control"
        v-model="user.firstname"
        id="firstname"
        aria-describedby="emailHelp"
        placeholder="Enter firstname"
      />
    </div>
    <div class="form-group">
      <label for="lastname">Lastname</label>
      <input
        type="email"
        class="form-control"
        v-model="user.lastname"
        id="lastname"
        aria-describedby="emailHelp"
        placeholder="Enter lastname"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        class="form-control"
        v-model="user.password"
        id="exampleInputPassword1"
        placeholder="Password"
      />
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        type="password"
        class="form-control"
        v-model="user.confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
      />
    </div>

    <button @click="submitHandler" class="btn btn-primary mt-3">
      Register
    </button>
  </div>
</template>
<script>
  /* eslint-disable */

  export default {
    name: "RegisterComponent",
    data: () => ({
      user: {
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        confirmPassword: ""
      }
    }),
    methods: {
      submitHandler: function() {
        console.log(this.user);
        this.$store
          .dispatch("registerUser", this.user)
          .then(success => console.log(success))
          .catch(err => console.log(err));
      }
    }
  };

  /* eslint-enable */
</script>
