<template>
  <TabPosts>
    <li class="w-1/2 hover:bg-gray-300" @click="toggle">
      <div class="inline-block p-3 p-3 border-b-8 border-blue-400">
        <a class="font-bold text-black" aria-current="page" href="#">Posts</a>
      </div>
    </li></TabPosts
  >
</template>

<script>
  export default {
    name: "TabPosts",
    props: {
      name: {
        name: { required: true },
        selected: { default: true }
      }
    },
    data: () => {
      return {
        isActive: false
      };
    },
    mounted() {
      this.isActive = this.selected;
    }
  };
</script>
