<style>
@import "@/assets/styles/common.css";
</style>

<template>
  <div class="upload-container">
    <label for="file-upload" class="custom-file-upload action-button">
      Upload Document
    </label>
    <input id="file-upload" type="file" @change="handleFileUpload" />
    <p v-if="uploadedFile" class="uploaded-file">
      File uploaded: <strong>{{ uploadedFile.name }}</strong>
    </p>
    <p v-if="uploadErrorMessage" class="error-message">
      {{ uploadErrorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
  export default {
    props: {
      uploadedFile: Object,
      uploadErrorMessage: String,
    },
    emits: ["fileUploaded"],
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) {
          this.$emit("fileUploaded", { file: null, error: "" });
          return;
        }

        if (file.type !== "application/pdf") {
          this.$emit("fileUploaded", {
            file: null,
            error: "Only PDF files are allowed.",
          });
          return;
        }

        const fileURL = URL.createObjectURL(file);
        this.$emit("fileUploaded", { file, error: "", fileURL });
      },
    },
  };
</script>

<style>
  .upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }


  #file-upload {
    display: none;
  }

  .uploaded-file {
    margin-top: 10px;
  }
</style>
