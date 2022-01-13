<template>
  <div class="flex flex-col vh-100 shadow">
    <div
      class="border-r-2 border-l-2 border-gray-200 border-solid flex border-b-2"
    >
      <div class="font-bold text-2xl mb-5 w-full">Inbox</div>
      <router-link to="/messages/new">
        <div
          class="
            flex flex-center
            rounded-full
            hover:bg-gray-200
            w-14
            h-14
            align-items-center
          "
        >
          <div class="m-auto">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="w-10 h-10 a">
              <g>
                <path
                  d="M23.25 3.25h-2.425V.825c0-.414-.336-.75-.75-.75s-.75.336-.75.75V3.25H16.9c-.414 0-.75.336-.75.75s.336.75.75.75h2.425v2.425c0 .414.336.75.75.75s.75-.336.75-.75V4.75h2.425c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-3.175 6.876c-.414 0-.75.336-.75.75v8.078c0 .414-.337.75-.75.75H4.095c-.412 0-.75-.336-.75-.75V8.298l6.778 4.518c.368.246.79.37 1.213.37.422 0 .844-.124 1.212-.37l4.53-3.013c.336-.223.428-.676.204-1.012-.223-.332-.675-.425-1.012-.2l-4.53 3.014c-.246.162-.563.163-.808 0l-7.586-5.06V5.5c0-.414.337-.75.75-.75h9.094c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H4.096c-1.24 0-2.25 1.01-2.25 2.25v13.455c0 1.24 1.01 2.25 2.25 2.25h14.48c1.24 0 2.25-1.01 2.25-2.25v-8.078c0-.415-.337-.75-.75-.75z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </router-link>
    </div>
    <ChatList />
  </div>
</template>

<script>
  import ChatList from "../components/ChatlList.vue";
  export default {
    name: "Message",
    components: { ChatList },
  };
</script>

<style  scoped>
/* .images2Pics:first-child {
  left: 20;

  z-index: 10;
}
.images2Pics:last-child {
  right: 0;
  z-index: 5;
  bottom: 5;
} */
</style>



