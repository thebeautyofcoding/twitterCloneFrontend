<template>
  <div v-show="title === selectedTitle">
    <slot />
  </div>
</template>

<script>
  import { inject } from "vue";
  export default {
    props: ["title"],
    setup() {
      const selectedTitle = inject("selectedTitle");
      return {
        selectedTitle
      };
    },
    name: "Tab",
    components: {},
    data() {
      return {};
    },
    computed: {},
    methods: {},
    created() {}
  };
</script>
