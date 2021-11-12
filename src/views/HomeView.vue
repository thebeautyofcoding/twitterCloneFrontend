<template>
  <div class="home w-full">
    <Home />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Home from "@/components/Home.vue";

  export default {
    name: "HomeView",
    components: {
      Home
    }
  };
</script>
