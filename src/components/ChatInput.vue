<template>
  <div
    class="w-3/4"
    @keydown="onEnter"
    @click="onFocusInput"
    @focusout="loseFocusInput"
  >
    <div
      :class="inputBorderColor + 'flex rounded-full  bg-gray-100  border-2 '"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        :class="searchIconColor + 'w-10 h-10 fill-current '"
      >
        <g>
          <path
            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
          ></path>
        </g>
      </svg>
      <input
        v-model="value"
        placeholder="Start a new message"
        @keyup="onKeyUp"
        class="rounded-full bg-gray-100 outline-none text-xl pl-2 h-10"
      />
    </div>
  </div>

  <div
    v-if="showResults"
    @focusout="loseFocusInput"
    class="bg-white rounded-lg z-10 cursor-pointer shadow"
  ></div>
</template>

<script>
  import { mapState } from "vuex";
  import Echo from "laravel-echo";
  import Pusher from "pusher-js";
  var token = localStorage.getItem("token");

  export default {
    name: "ChatInput",
    emits: ["no-value", "typing"],

    data: () => {
      return {
        inputBorderColor: "border-gray-100 ",
        searchIconColor: "text-gray-500 ",
        value: "",
        showResults: false,
        loggedInUser: {},
        typing: "",
        time: [],
        setValueEmpty: false,
      };
    },
    props: [],
    // watch: {
    //   value: function(val1, val2) {
    //     console.log(val2, val1);
    //     if (val1 != val2)
    //       window.Echo.private(`chat${this.$store.state.chat.chat.id}`).whisper(
    //         "typing",
    //         {
    //           name: this.value
    //         }
    //       );
    //   }
    // },

    watch: {
      message() {
        this.channel.whisper("typing", {
          name: this.value,
        });
      },
    },
    methods: {
      // isTyping() {
      //   console.log("HMMMM");
      //   window.Echo.private("chat").whisper("typing", e => {
      //     console.log("HMMMM");
      //     console.log(e);
      //   });

      onFocusInput(e) {
        this.inputBorderColor = "border-blue-600 ";
        this.searchIconColor = "text-blue-600 ";
      },
      loseFocusInput(e) {
        this.inputBorderColor = "border-gray-100 ";
        this.searchIconColor = "text-gray-500 ";
        this.showResults = false;
      },
      onKeyUp() {
        this.channel.whisper("typing", { name: this.value });

        if (this.value !== "") {
          this.$emit("no-value", { noValue: false, value: this.value });
        } else {
          this.$emit("no-value", { noValue: true });
        }
      },
      getTime() {
        let time = new Date();
        return time.getHours() + ":" + time.getMinutes();
      },
    },

    created() {},
    computed: {
      channel() {
        return window.Echo.join(`joinedUsers${this.$store.state.chat.chat.id}`);
      },
    },
    created() {
      var loggedInUser = localStorage.getItem("user");
      this.loggedInUser = JSON.parse(loggedInUser);
      this.channel
        // .listen("TypeEvent", e => {
        //   console.log(e);
        // })
        .listenForWhisper("typing", (e) => {
          console.log("TYPING!!!!!");
          console.log(e);
          this.typing = "typing...";
          console.log(this.typing);

          this.$emit("typing", this.typing);
          if (e.name != "") {
            console.log("bist du hier");
            const timerLength = 2000;
            const lastTypingTime = new Date().getTime();

            setTimeout(() => {
              const timeNow = new Date().getTime();
              const timeDiff = timeNow - lastTypingTime;
              console.log("HMMM1");
              if (timeDiff >= timerLength) {
                this.typing = null;
                this.$emit("typing", this.typing);
              }
            }, timerLength);
          }
        });

      this.channel.listen(
        "MessageSentEvent",

        (e) => (this.value = "")
      );
    },
    beforeUnmount() {
      window.removeEventListener("unload", this.someMethod);
    },
  };
</script>

<style>
</style>
