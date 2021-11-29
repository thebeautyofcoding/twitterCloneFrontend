<template>
  <div class=""></div>
  <div
    class="
      p-0 p
      md
      flex-column
      border-solid border-2 border-light-grey-500
      w-full
    "
  >
    <div class="">
      <div class="mb-3">
        <SearchBar @no-value="onNoValue" />
      </div>
      <div v-if="partners.length > 0" class="mb-5">
        <div class="flex">
          <ul class="flex flex-wrap">
            <li
              v-for="partner in partners"
              :key="partner.id"
              class="flex my-2 inline-block cursor-pointer mx-2"
            >
              <div
                @click="onClickPartner(partner)"
                class="
                  flex
                  border-gray-400 border-2
                  rounded-full
                  align-items-center
                  px-1
                  hover:bg-blue-200
                "
              >
                <div>
                  <img
                    class="rounded-full w-8 h-8 mr-2"
                    :src="
                      'http://127.0.0.1:8000/api/profile/avatar/' + partner.id
                    "
                  />
                </div>
                <div class="font-bold text-xl">
                  {{ partner.firstname }} {{ partner.lastname }}
                </div>
                <div class="flex align-items-center mr-2 ml-2">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="w-6 h-6 text-blue-400 fill-current"
                  >
                    <g>
                      <path
                        d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <button
          @click="onCreateChat(this.partners)"
          v-if="partners.length > 0"
          class="
            bg-blue-400
            text-white
            rounded-full
            px-2
            hover:bg-black
            text-bold text-xl
          "
        >
          Create
        </button>
      </div>
    </div>
    <div v-if="!noValue" class="mb-10">
      <UserResultsList />
    </div>
  </div>
</template>

<script>
  import { defineComponent, h } from "vue";
  import SearchBar from "../components/SearchBar.vue";
  import UserResultsList from "../components/UserResultsList.vue";
  import { ElNotification } from "element-plus";

  export default {
    name: "NewChat",
    components: {
      SearchBar,
      UserResultsList,
    },
    data() {
      return {
        noValue: false,
      };
    },
    computed: {
      partners() {
        return this.$store.state.chat.conversationPartners;
      },
      error() {
        return this.$store.state.chat.error;
      },
    },
    methods: {
      onNoValue(e) {
        this.noValue = e;
      },
      onClickPartner(partner) {
        this.$store.dispatch("deleteOneConversationPartner", partner);
      },
      async onCreateChat(partners) {
        await this.$store.dispatch("createChat", partners);
        if (this.error !== "") {
          console.log(this.error);
          ElNotification({
            title: "Error",
            message: h("i", { style: "color: teal" }, this.error),
          });
        }
      },
    },
    mounted() {},
  };
</script>

<style>
</style>
