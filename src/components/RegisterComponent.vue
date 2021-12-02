<template>
  <div class="w-full container">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        class="form-control"
        type="email"
        :class="{
          ' is-invalid ': errors.email && submitted,
          ' is-valid ': !errors.email && submitted,
        }"
        v-model="user.email"
        id="email"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
      <div class="valid-feedback" v-if="!errors.email && submitted">
        Looks good!
      </div>

      <div class="invalid-feedback" v-if="errors.email && submitted">
        {{ errors.email }}
      </div>
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input
        class="form-control"
        type="email"
        :class="{
          'form-control is-invalid ': errors.username && submitted,
          'form-control is-valid ': !errors.username && submitted,
        }"
        v-model="user.username"
        id="username"
        aria-describedby="emailHelp"
        placeholder="Enter username"
      />
      <div class="valid-feedback" v-if="!errors.username && submitted">
        Looks good!
      </div>

      <div class="invalid-feedback" v-if="errors.username && submitted">
        {{ errors.username }}
      </div>
    </div>
    <div class="form-group">
      <label for="firstname">Firstname</label>
      <input
        class="form-control"
        type="text"
        :class="{
          'form-control is-invalid ': errors.firstname && submitted,
          'form-control is-valid ': !errors.firstname && submitted,
        }"
        v-model="user.firstname"
        id="firstname"
        aria-describedby="emailHelp"
        placeholder="Enter firstname"
      />
      <div class="valid-feedback" v-if="!errors.firstname && submitted">
        Looks good!
      </div>

      <div class="invalid-feedback" v-if="errors.firstname && submitted">
        {{ errors.firstname }}
      </div>
    </div>
    <div class="form-group">
      <label for="lastname">Lastname</label>
      <input
        class="form-control"
        type="text"
        :class="{
          'form-control is-invalid ': errors.lastname && submitted,
          'form-control is-valid ': !errors.lastname && submitted,
        }"
        v-model="user.lastname"
        id="lastname"
        aria-describedby="emailHelp"
        placeholder="Enter lastname"
      />
      <div class="valid-feedback" v-if="!errors.lastname && submitted">
        Looks good!
      </div>

      <div class="invalid-feedback" v-if="errors.lastname && submitted">
        {{ errors.lastname }}
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
        v-model="user.password"
        id="exampleInputPassword1"
        placeholder="Password"
      />
      <div class="valid-feedback" v-if="!errors.password && submitted">
        Looks good!
      </div>

      <div class="invalid-feedback" v-if="errors.password && submitted">
        {{ errors.password }}
      </div>
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        class="form-control"
        type="password"
        :class="{
          'form-control is-invalid ': errors.confirmPassword && submitted,
          'form-control is-valid ': !errors.confirmPassword && submitted,
        }"
        v-model="user.confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
      />
      <div class="valid-feedback" v-if="!errors.confirmPassword && submitted">
        Looks good!
      </div>

      <div class="invalid-feedback" v-if="errors.confirmPassword && submitted">
        {{ errors.confirmPassword }}
      </div>
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
        confirmPassword: "",
      },
      errors: {},
      submitted: false,
    }),
    methods: {
      submitHandler: function () {
        this.errors.email = null;
        this.errors.password = null;
        this.errors.username = null;
        this.errors.firstname = null;
        this.errors.lastname = null;
        this.errors.confirmPassword = null;
        this.submitted = false;
        if (this.user.password !== this.user.confirmPassword) {
          this.errors.confirmPassword = "Passwords do not match";
        }
        this.$store
          .dispatch("registerUser", this.user)
          .then((success) => {
            this.submitted = true;
            this.$router.push("/");
          })
          .catch((err) => {
            this.submitted = true;
            if (err.response.data.errors && err.response.data.errors.email) {
              console.log("WASUPP");
              this.errors.email = err.response.data.errors.email[0];
            }
            if (err.response.data.errors && err.response.data.errors.password)
              this.errors.password = err.response.data.errors.password[0];
            if (err.response.data.errors && err.response.data.errors.firstname)
              this.errors.firstname = err.response.data.errors.firstname[0];
            if (err.response.data.errors && err.response.data.errors.lastname)
              this.errors.lastname = err.response.data.errors.lastname[0];
            if (err.response.data.errors && err.response.data.errors.username)
              this.errors.username = err.response.data.errors.username[0];

            if (err.response.data.username)
              this.errors.username = err.response.data.username;

            if (err.response.data.email) {
              this.errors.email = err.response.data.email;
            }
            if (err.response.data.password) {
              this.errors.password = err.response.data.password;
            }
          });
      },
    },
  };

  /* eslint-enable */
</script>
