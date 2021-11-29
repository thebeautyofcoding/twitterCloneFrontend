<template>
  <div class="flex flex-col w-5/6 card shadow rounded-xl py-4 px-3">
    <RegisterComponent />
    <div class="flex mt-3">
      <router-link :to="{ name: 'Login' }"
        >Click if you have been registered already</router-link
      >
    </div>
  </div>
</template>
<script>
  import RegisterComponent from "../components/RegisterComponent";
  export default {
    name: "Register",
    components: {
      RegisterComponent,
    },
  };
</script>
