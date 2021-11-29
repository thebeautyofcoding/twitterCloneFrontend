<template>
  <router-link :to="'/messages/' + chat.id">
    <li
      class="
        hover:bg-gray-200
        border-b-2 border-l-2 border-r-2
        flex
        align-items-center
        relative
      "
    >
      <div class="flex align-items-center flex tripleContainer w-40 mr-5">
        <div class="flex align-items-center">
          <div class="flex align-items-center pY-4">
            <ul
              v-for="(user, index) in chat.users"
              class="relative images align-items-center"
            >
              <li class="flex align-items-center" v-if="index < 3">
                <div class="flex align-items-center">
                  <img
                    :src="'http://127.0.0.1:8000/api/profile/avatar/' + user.id"
                    class="w-10 h-10 rounded-full image border-4 border-white"
                  />
                </div>
              </li>
            </ul>
            <!-- <ul
                  v-if="chat.users.length > 3"
                  v-for="user in chat.users"
                  class="relative images2Pics align-items-center"
                >
                  <li class="flex w-full align-items-center">
                    <div class="flex align-items-center w-full">
                      <img
                        :src="
                          'http://127.0.0.1:8000/api/profile/avatar/' + user.id
                        "
                        class="
                          w-10
                          h-10
                          rounded-full
                          image
                          border-4 border-white
                        "
                      />
                    </div>
                  </li>
                </ul> -->
          </div>
        </div>
      </div>
      <div class="flex w-2/3">
        <div class="flex flex-col w-full align-items-center">
          <div class="font-bold flex">{{ chat && chat.chat_name }}</div>
          <div class="flex">
            {{
              chat && chat.messages.length > 0
                ? chat.messages.pop().content
                : "Noch leer"
            }}
          </div>
        </div>
      </div>
    </li>
  </router-link>
</template>

<script>
  export default {
    props: ["chat"],
  };
</script>

<style scoped>
li .images:first-child {
  left: 20;

  z-index: 10;
}

li .images:nth-child(3) {
  right: 20;
  z-index: 2;
  bottom: 10;
}
li .images:nth-child(2) {
  bottom: 5;
  z-index: 5;
}
</style>
