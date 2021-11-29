<template>
  <div class="w-5/6 card shadow rounded-xl py-4 px-3">
    <LoginComponent />
  </div>
</template>
<script>
  import LoginComponent from "../components/LoginComponent";
  export default {
    name: "Login",
    components: {
      LoginComponent,
    },
  };
</script>
