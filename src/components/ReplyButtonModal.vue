<template>
 <div class="flex  items-center justify-start py-2 mr-6" @click="emitEventToggleModal">
              <div class="text-gray-400 flex hover:text-blue-500">
                <div class="w-6 h-6 hover:bg-blue-200 rounded-full hover:text-blue-500">
                  <svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 fill-current"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                </div>
                <span class="ml-1">{{post.replies&&post.replies.length}}</span>
              </div>
  </div>

</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'


export default{
  name: 'ReplyButton',
  emits:['toggle-reply-modal'],
  props:{

    id:Number,
    nowGreen:Boolean,
  post:Object,
    likeHandler:Function,
    onPopulatePostReplyModal:Function,
    postToPutInModal:Object,

  },
  components:{
    SvgIcon
  },
  data(){
    return {

      clicked:false,


    }
  },
  created(){

  },

  methods:{
    openModalButtonClickedState(){
    this.cliked=!this.clicked
    this.$store.dispatch('setButtonCliked', this.clicked);
    },
  changeColor(){
    if(this.nowGreen){
      this.color="text-gray-600"
      this.clicked= false;
    }else{
      this.clicked=true;
      this.color='text-red-600'

    }

    this.likeHandler({ clicked:this.clicked, postId:this.id})


}

  }



}
</script>

<style scoped lang="scss">

</style>

