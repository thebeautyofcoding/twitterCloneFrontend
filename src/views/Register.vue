<template>
  <div class="flex flex-col w-1/2">
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
    name: "Login",
    components: {
      RegisterComponent
    }
  };
</script>
