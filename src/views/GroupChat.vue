<template>
  <div class="flex flex-col w-full vh-full">
    <div class="w-full flex flex-col border-r-2 border-l-2 border-gray-200">
      <div class="text-2xl font-bold border-b-2 border-gray-200 p-10">
        {{ chat.isGroupChat ? "Group Chat" : "Private Chat" }}
      </div>
    </div>
    <div class="flex justify-center align-items-center">
      <div class="flex w-full align-items-center">
        <div class="flex w-full align-items-center">
          <ul class="w-2/4">
            <li
              v-if="chat"
              v-for="user in chat.users"
              :key="user.id"
              class="images relative"
            >
              <div class="absolute w-full">
                <img
                  :src="'http://127.0.0.1:8000/api/profile/avatar/' + user.id"
                  class="h-10 w-10 rounded-full border-4 border-white"
                />
              </div>
            </li>
          </ul>
        </div>
        <div class="flex align-items-center">
          <div class="font-bold flex align-items-center">
            {{ chat.chat_name }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <ul class="flex flex-col message ml-5" v-if="chat.messages">
        <div v-for="message in chat.messages" :key="message.id">
          <li
            class="flex message justify-end"
            v-if="message.sender.id === loggedInUser.id"
          >
            <div
              class=""
              v-if="
                lastMessage.id === message.id &&
                message.sender.id === loggedInUser.id
              "
            >
              {{ transformDate }}
            </div>
            <div
              class="flex text-white bg-blue-400 mb-1 rounded-l-full px-3 py-1"
            >
              {{ message.content }}
            </div>
          </li>
          <li
            class="flex messagePartner justify-start"
            v-if="message.sender.id !== loggedInUser.id"
          >
            <div class="flex flex-col">
              <div
                class="text-gray-400"
                v-if="firstPartnerMessage.id == message.id"
              >
                {{ message.sender && message.sender.username }}
              </div>
              <div class="" v-if="lastMessage.id === message.id">
                {{ transformDate }}
              </div>
              <div class="flex">
                <div v-if="lastMessage.id === message.id">
                  <img
                    class="rounded-full h-8 w-8 mr-2"
                    :src="
                      'http://127.0.0.1:8000/api/profile/avatar/' +
                      lastMessage.sender.id
                    "
                  />
                </div>

                <div
                  class="
                    flex
                    text-white
                    bg-gray-400
                    mb-1
                    rounded-r-full
                    px-3
                    py-1
                  "
                >
                  {{ message.content }}
                </div>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>

    <div class="flex justify-end flex-col h-full border-r-2 border-l-2">
      <div class="flex flex-col justify-end align-items-center w-full mt-10">
        {{ typing }}
        <transition
          name="fadeHeight"
          class="h-10"
          enter-active-class="animate__animated animate__fadeInDown"
          leave-active-class="animate__animated animate__fadeOutUp "
        >
        </transition>
        <div class="flex w-full justify-center align-items-center">
          <ChatInput @no-value="onNoValue" @typing="onTyping" />
          <button
            class="flex"
            ref="messageButtonContainer"
            @click="sendMessage"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              ref="messageButton"
              :class="'w-8 h-8 fill-current  ml-5' + color"
            >
              <g>
                <path
                  d="M21.13 11.358L3.614 2.108c-.29-.152-.64-.102-.873.126-.23.226-.293.577-.15.868l4.362 8.92-4.362 8.92c-.143.292-.08.643.15.868.145.14.333.212.523.212.12 0 .24-.028.35-.087l17.517-9.25c.245-.13.4-.386.4-.664s-.155-.532-.4-.662zM4.948 4.51l12.804 6.762H8.255l-3.307-6.76zm3.307 8.26h9.498L4.948 19.535l3.307-6.763z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import { mapState } from "vuex";
  import ChatInput from "../components/ChatInput.vue";
  export default {
    name: "GroupChat",
    components: {
      ChatInput
    },
    data() {
      return {
        chat: {},
        disabledbuttonColor: " text-gray-400",
        enabledColor: " text-blue-400",
        color: " text-gray-400",
        message: "",
        loggedInUser: {},
        latestPartnerMessage: {},
        firstPartnerMessage: {},
        typing: null,
        newMessage: {},
        messageSender: {},
        receivedData: {},
        setValueEmpty: false,
        lastMessage: {},
        lastMessageEvent: {},
        joinedUser: {},
        timeJoined: null,
        joinedDate: {},
        joinedTime: null,
        usersInChatroom: null,
        lastMessageDate: null,
        from: null
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.from = from;
      });
    },
    computed: {
      transformDate() {
        var date = new Date(this.lastMessage.created_at);
        return moment().to(date);
      },

      channel() {
        return window.Echo.channel("chat" + this.$route.params.id);
      }

      // leavingChannel() {
      //   if (this.$route.params.id !== this.chat.id) console.log("leavingchannel");
      //   return window.Echo.leave("joinedUsers" + this.$route.params.id);
      // },
      // IncomingUser() {
      //   window.Echo.private("chat" + this.$route.params.id).listen(
      //     "JoinedRoomEvent",
      //     e => {
      //       const current = new Date();
      //       let time = current.getHours() + ":" + current.getMinutes();

      //       const date =
      //         current.getDay() +
      //         "-" +
      //         (current.getMonth() + 1) +
      //         "-" +
      //         current.getFullYear();
      //       this.joinedTime = time;
      //       this.joinedDate = date;
      //       this.joinedUser = e.user;

      //       return e.user;
      //     }
      //   );
      // }
    },

    // computed: {
    //   ...mapState({
    //     chat() {
    //       return this.$store.state.chat.chat;
    //     }
    //   })
    // },
    messages() {},

    async created() {
      var loggedInUser = localStorage.getItem("user");
      loggedInUser = JSON.parse(loggedInUser);
      this.loggedInUser = loggedInUser;

      this.chat = await this.$store.dispatch(
        "getChatById",
        this.$route.params.id
      );
      // all Users online in Room
      // this.channel
      //   .here(e => {
      //     this.usersInChatroom = e;
      //     console.log(this.usersInChatroom);
      //   })
      //   .joining(e => {
      //     console.log("joining");
      //     this.joinedUser = e.user;
      //     this.usersInChatroom.push(e.user);
      //     console.log(this.usersInChatroom);
      //   })
      //   .leaving(e => {
      //     console.log("leaving");
      //     console.log(e);
      //   });
      // this.channel.listen("JoinedRoomEvent", e => {
      //   const current = new Date();
      //   let time = current.getHours() + ":" + current.getMinutes();

      //   const date =
      //     current.getDay() +
      //     "-" +
      //     (current.getMonth() + 1) +
      //     "-" +
      //     current.getFullYear();
      //   this.joinedTime = time;
      //   this.joinedDate = date;
      //   this.joinedUser = e.user;
      // });
      var partnerMessages = [];
      this.chat.messages.filter((m, i) => {
        m.sender_id !== this.loggedInUser.id ? partnerMessages.push(m) : null;
        if (i === 0) {
          this.firstPartnerMessage = this.chat.messages[i];
        }
      });
      this.latestPartnerMessage = partnerMessages.pop();
      var messages = [...this.chat.messages];
      this.lastMessage = messages.pop();
      // window.Echo.private("chat" + this.chat.id).listen(
      //   "App\\Events\\MessageSentEvent",
      //   e => {
      //     console.log(e);
      //   }
      // );

      window.Echo.private("chat" + this.chat.id).listen(
        "MessageSentEvent",

        e => {
          var date = new Date().getTime();
          this.lastMessageDate = moment().to(date);
          this.lastMessage = e.message;

          // if (e.message.sender.id !== this.loggedInUser.id)
          // this.$store.dispatch("updateMessages", e.message);
          this.chat.messages.push(e.message);
        }
      );
      // this.$store.dispatch("updateMessages", e.message);
      // window.Echo.private("chat" + this.chat.id).listenForWhisper("typing", e => {
      //   if (e.name != "") {
      //     console.log("bist du hier");
      //     const timerLength = 2000;
      //     const lastTypingTime = new Date().getTime();
      //     setTimeout(() => {
      //       const timeNow = new Date().getTime();
      //       const timeDiff = timeNow - lastTypingTime;
      //       console.log("HMMM");
      //       if (timeDiff >= timerLength) {
      //         console.log("HMMM");
      //         this.typing = null;
      //         this.$emit("typing", this.typing);
      //       } else {
      //         console.log("HMMM");
      //         this.typing = "typing...";
      //         this.$emit("typing", this.typing);
      //       }
      //     }, timerLength);
      //   }
      // });
    },

    methods: {
      onNoValue(e) {
        console.log(e);
        if (!e.noValue) {
          this.$refs.messageButtonContainer.disabled = false;
          this.color = this.enabledColor;
          this.message = e.value;
        } else {
          this.$refs.messageButtonContainer.disabled = true;
          this.color = this.disabledbuttonColor;
        }
      },
      onTyping(e) {
        console.log(e);
        this.typing = e;
        this.setValueEmpty = false;
      },

      async sendMessage() {
        await this.$store.dispatch("sendMessage", {
          message: this.message,
          chatId: this.chat.id
        });
      }
    }
  };
</script>

<style scoped>
.images:nth-child(2) {
  left: 20px;
}
.images:nth-child(3) {
  left: 40px;
}

.message:nth-child(1) {
  border-radius: 0 100% 0 0;
}
.message:last-child {
  border-radius: 0 0 100% 0;
}
</style>
