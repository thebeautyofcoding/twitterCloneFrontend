<template>
  <div class="w-full container needs-validation">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        class="form-control"
        type="email"
        :class="{
          'form-control is-invalid ': errors.email && submitted,
          'form-control is-valid ': !errors.email && submitted,
        }"
        v-model="user.email"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
      <div class="valid-feedback" v-if="errors.email === null && submitted">
        Looks good!
      </div>
      <div v-if="errors.email != null && submitted" class="invalid-feedback">
        {{ errors.email }}
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        class="form-control"
        type="password"
        :class="{
          'form-control is-invalid ': errors.password && submitted,
          'form-control is-valid ': !errors.password && submitted,
        }"
        id="exampleInputPassword1"
        v-model="user.password"
        placeholder="Password"
      />
      <div class="valid-feedback" v-if="!errors.password && submitted">
        Looks good!
      </div>

      <div class="invalid-feedback" v-if="errors.password && submitted">
        {{ errors.password }}
      </div>
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
        password: "",
      },
      errors: {},
      submitted: false,
    }),
    methods: {
      async login() {
        this.errors.email = null;
        this.errors.password = null;
        await this.$store.dispatch("loginUser", this.user).catch((err) => {
          this.submitted = true;

          if (err.response.data.errors && err.response.data.errors.email) {
            this.errors.email = err.response.data.errors.email[0];
          }
          if (err.response.data.errors && err.response.data.errors.password)
            this.errors.password = err.response.data.errors.password[0];
          if (err.response.data.email) {
            this.errors.email = err.response.data.email;
          }
          if (err.response.data.password) {
            this.errors.password = err.response.data.password;
          }
        });
        this.$store.dispatch("setLoggedInUserAction", this.user);

        if (err.response.data && err.response.data.errors) {
          this.$router.push("/");
        }
      },
    },
  };
</script>
