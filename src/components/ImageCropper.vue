<template>
  <div v-show="imageSrc" class="h-64 w-64 mx auto object-fill m-auto">
    <img :src="imageSrc" ref="img" class="max-w-full block" />
  </div>
  <div class="flex justy-center mt-5 flex-col align-items-center">
    <div class="flex">
      <button
        v-if="!imageSrc"
        @click="imageInput.click()"
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded-full
        "
      >
        Bild
      </button>
      <button
        v-else
        v-if="imageSrc"
        @click="handleImageCropped"
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded-full
        "
      >
        Crop Bild
      </button>
      <button
        @click="fileCleared"
        class="
          ml-5
          bg-gray-500
          hover:bg-gray-700
          text-white
          font-bold
          py-2
          px-4
          rounded-full
        "
      >
        Lösche
      </button>
    </div>
    <div>
      <input
        type="file"
        ref="imageInput"
        accept=".jpg, .jpeg, .png"
        @change="fileChanged"
        style="display: none"
      />
    </div>
  </div>
  <div class="mt-4">
    <span class="text-black font-bold">Ausgewählte Datei: </span>
    <span class="text-gray-500" v-if="selectedFile">{{
      selectedFile.name
    }}</span>
  </div>
</template>

<script>
  import {
    defineComponent,
    ref,
    watchEffect,
    onMounted,
    onUnmounted,
    watch
  } from "vue";
  import Cropper from "cropperjs";
  export default defineComponent({
    name: "ImageCropper",
    events: ["imageCropped"],
    setup(_props, { emit }) {
      const imageInput = ref(null);
      const selectedFile = ref(null);
      const imageSrc = ref(null);
      const img = ref(null);
      const fileReader = new FileReader();
      let cropper = null;

      fileReader.onload = event => {
        imageSrc.value = event.target.result;
      };

      const handleImageCropped = () => {
        cropper
          .getCroppedCanvas({
            width: 256,
            height: 256,
            imageSmoothingQuality: "high"
          })
          .toBlob(blob => {
            emit("imageCropped", blob);
          }, "image/jpg");
      };
      const fileChanged = e => {
        const files = e.target.files || e.dataTransfer.files;
        if (files.length) {
          selectedFile.value = files[0];
        }
      };
      const fileCleared = _ => {
        selectedFile.value = null;
      };
      onMounted(() => {
        cropper = new Cropper(img.value, {
          aspectRatio: 1,
          minCropBoxHeight: 256,
          minCropBoxHeight: 256,
          viewMode: 0,
          dragMode: "move",
          background: false,
          cropBoxMovable: true,
          cropBoxResizable: false,
          zoomOnTouch: true,
          zoomOnWheel: true,
          modal: true,
          zoomable: true
        });
      });
      onUnmounted(() => {
        cropper.destroy();
      });
      watchEffect(() => {
        if (selectedFile.value) {
          fileReader.readAsDataURL(selectedFile.value);
        } else {
          imageSrc.value = null;
        }
      });
      watch(imageSrc, () => {
        if (imageSrc.value) {
          cropper.replace(imageSrc.value);
        }
      }),
        {
          flush: "post"
        };
      return {
        imageInput,
        selectedFile,
        fileChanged,
        fileCleared,
        imageSrc,
        img,
        handleImageCropped
      };
    }
  });
</script>

<style>
</style>
