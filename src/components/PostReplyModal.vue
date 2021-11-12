    <template>
  {{ visibility }}

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
          <div>
            <div v-if="post">
              <SinglePostInModal
                :post="post"
                :replied="replied"
                :retweetHandler="retweetHandler"
                :loggedInUser="loggedInUser"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div>
            <div class="ml-5 mb-5 flex" v-if="post"><RepliesList /></div>
          </div>
          <div class="ml-5 mb-5 flex">
            <textarea
              placeholder="Deine Antwort"
              v-model="replyToBePosted.content"
            >
            </textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="closeModalHandler"
          >
            Close
          </button>
          {{ postToPutInModal && postToPutInModal.content }}
          <button
            type="button"
            @click="postReplyHandler(post)"
            class="btn btn-primary"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="active" class="modal-backdrop fade show"></div>
</template>
    <script>
  import { mapState } from "vuex";
  import moment from "moment";
  import RepliesList from "./RepliesList.vue";
  import SinglePostInModal from "./SinglePostInModal.vue";

  export default {
    name: "PostReplyModal",

    emits: ["update-posts"],
    components: {
      SinglePostInModal,
      RepliesList
    },
    props: {
      retweetHandler: Function,
      onPopulatePostReplyModal: Function,
      updateButtons: Function,

      showReplyModal: Boolean,
      loggedInUser: Object,
      replied: Boolean
    },
    computed: {
      ...mapState({
        replyModal: state => state.replyModal.replyModal,
        post: state => state.posts.post
      }),

      visibility: function() {
        const body = document.querySelector("body");
        console.log(this.replyModal);
        if (this.replyModal.replyModal === true) {
          body.classList.add("modal-open");
          this.active = true;
          this.show = true;
        }
      }
    },
    // async updated() {
    //   console.log(this.postToPutInModal);
    //   this.postModal = this.postToPutInModal;
    // },

    data() {
      return {
        postId: null,
        replyToBePosted: {
          content: null,
          belongsToPost: null
        },
        active: false,
        show: false,
        postToPutInModal: {},
        repliesModal: [],
        postModal: {},
        repliesToPost: []
      };
    },

    methods: {
      closeModalHandler() {
        this.$store.dispatch("setButtonClicked", { replyModal: false });
        const body = document.querySelector("body");
        body.classList.remove("modal-open");
        this.active = false;
        this.show = false;
      },
      async postReplyHandler(post) {
        this.replyToBePosted.belongsToPost = post.id;
        await this.$store.dispatch("replyToPost", this.replyToBePosted);
        console.log("postreplyhandler");
        await this.$store.dispatch("getRepliesOfPost", post.id);
        // this.postModal = this.post;
        // this.repliesToPost = response.repliesOfPost;
        // this.posts = this.$store.getters.getterPosts;
        this.replyToBePosted.content = null;

        // await this.$store.dispatch("getPostsWithAllReplies");

        // this.$store.dispatch("setRepliedOnPostAction", post);

        this.transFormPostsDate();
      },

      transFormPostsDate: function() {
        return (this.post.created_at = moment(this.post.created_at).fromNow());
      }
    }
  };
</script>
