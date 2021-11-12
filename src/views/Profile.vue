<template>
  {{ visibility }}
  <div v-if="profileUser" class="w-full">
    <div
      ref="modal"
      class="modal fade"
      :class="{ show, 'd-block': active }"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ImageCropper @imageCropped="croppedImageAvailiable" />
          </div>

          <div></div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="closeModalHandler"
            >
              Abbrechen
            </button>

            <button
              @click="uploadProfileAvatar"
              type="button"
              class="btn btn-primary"
            >
              Speichern
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="active" class="modal-backdrop fade show"></div>

    <div
      class="flex flex-col border-r-2 border-gray-200 w-full"
      style="margin: 0; padding: 0"
    >
      <div class="h-20 border-b-2 border-gray-600 w-full">
        <h1 class="font-bold text-3xl">{{ profileUser.username }}</h1>
      </div>
      <div class="align-items-center bg-blue-600 h-60 relative">
        <div class="flex align-items-center">
          <div
            class="flex justify-center align-items-center absolute"
            style="bottom: -30%"
          >
            <img
              v-if="profileUser"
              :src="
                avatar !== null
                  ? avatar
                  : 'http://127.0.0.1:8000/api/profile/avatar/' + profileUser.id
              "
              class="rounded-full w-40 h-40 ml-4 border-8 border-white"
            />

            <div
              @click="openCropModal"
              class="flex justify-center align-items-center absolute"
            >
              <div
                class="
                  justify-content-center
                  rounded-full
                  hover:bg-gray-100
                  w-14
                  h-14
                  flex
                  justify-center
                  align-items-center
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="text-gray-500 fill-current w-10 h-10 absolute"
                >
                  <g>
                    <path
                      d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"
                    ></path>
                    <path
                      d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-20 ml-5">
        <div class="flex">
          <span class="text-xl font-bold">
            {{ profileUser.firstname }} {{ profileUser.lastname }}</span
          ><span class="text-gray-500 flex align-items-center"
            >@{{ profileUser.username }}</span
          >
        </div>
        <div class="flex flex-row">
          <div class="flex">
            <span class="font-bold mr-1"
              >{{ profileUser.followers.length }} </span
            ><span class="mr-2 text-gray-500"> Followers</span>
          </div>
          <div class="flex" v-if="profileUser">
            <router-link :to="'following/' + profileUser.username">
              <span class="font-bold">{{ profileUser.following.length }} </span
              ><span class="ml-1 text-gray-500">Following</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex justify-end" v-if="!isLoggedInUsersProfile">
        <div :v-if="profileUser" class="flex mr-4">
          <router-link
            :to="'/messages/' + profileUser.id"
            class="
              bg-black
              h-10
              p-2
              mt-4
              hover:bg-gray-500
              rounded-full
              flex
              justify-content-center
              align-items-center
              text-white
            "
            >Follow</router-link
          >
        </div>
        <div class="flex justify-end">
          <router-link
            :to="'/private-messages/' + profileUser.id"
            class="
              bg-black
              h-10
              mt-4
              p-2
              hover:bg-gray-500
              rounded-full
              flex
              justify-content-center
              align-items-center
              text-white
            "
            >Message</router-link
          >
        </div>
      </div>
      <PostReplyModal />
      <div v-if="isLoggedInUsersProfile">
        <div class="flex justify-end">
          <router-link
            to="/messages/"
            class="
              bg-black
              h-10
              mt-4
              px-4
              hover:bg-gray-500
              rounded-full
              flex
              justify-content-center
              align-items-center
              text-white
            "
            >Edit</router-link
          >
        </div>
      </div>

      <Tabs>
        <Tab title="Posts"> <SinglePostList /></Tab>
        <Tab title="Replies"></Tab>
      </Tabs>
    </div>
  </div>
</template>


<script>
  import Tab from "../components/Tab.vue";
  import Tabs from "../components/Tabs.vue";
  import SinglePostList from "../components/SinglePostList.vue";
  import PostReplyModal from "../components/PostReplyModal.vue";
  import ImageCropper from "../components/ImageCropper.vue";
  export default {
    name: "Profile",
    components: { Tab, Tabs, SinglePostList, PostReplyModal, ImageCropper },
    data() {
      return {
        loggedInUser: {},
        show: false,
        active: false,
        croppedImage: null,
        avatar: null,
        rand: 1,
        profileUser: null,
        myProfile: false
      };
    },
    computed: {},

    async mounted() {
      this.loggedInUser = localStorage.getItem("user");
      this.loggedInUser = JSON.parse(this.loggedInUser);

      this.profileUser = await this.$store.dispatch(
        "getProfileUser",
        this.$route.params.username
      );
      if (this.$route.params.username == this.loggedInUser.username) {
        this.isLoggedInUsersProfile = true;
      } else {
        this.isLoggedInUsersProfile = false;
      }
    },

    methods: {
      croppedImageAvailiable(e) {
        this.croppedImage = e;
      },
      openCropModal() {
        const body = document.querySelector("body");

        body.classList.add("modal-open");
        this.active = true;
        this.show = true;
      },
      closeModalHandler() {
        this.$store.dispatch("setButtonClicked", { replyModal: false });
        const body = document.querySelector("body");
        body.classList.remove("modal-open");
        this.active = false;
        this.show = false;
      },
      async uploadProfileAvatar() {
        var response = await this.$store.dispatch(
          "uploadProfileAvatar",
          this.croppedImage
        );
        console.log(response);
        this.avatar = response;
      }
    },

    computed: function() {}
  };
</script>
