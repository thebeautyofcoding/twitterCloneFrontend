<template>
  <div v-for="reply in replies" class="flex flex-col">
    <div class="">
      <div class="font-bold text-gray-400 flex">
        @{{ reply.user && reply.user.username }} {{ date(reply.created_at) }}
      </div>
      <div class="flex text-gray-600">
        {{ reply.content }}
      </div>
    </div>
  </div>
</template>



<script>
  import moment from "moment";
  export default {
    name: "SingleReply",
    props: ["replies"],
    data() {
      return {
        repliesSingle: null
      };
    },
    methods: {
      date(date) {
        return moment(date).fromNow();
      }
    },

    beforeCreate() {
      this.repliesSingle = this.replies;
    },
    mounted() {
      console.log(this.replies);
    }
  };
</script>
