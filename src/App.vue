<template>
  <div id="app">
    <div class="container">
      <div class="welcome">
        <h1>Welcome to Typless App</h1>
      </div>
      <UploadFile
        :uploadedFile="uploadedFile"
        :uploadErrorMessage="uploadErrorMessage"
        @fileUploaded="handleFileUpload"
      />

      <ProcessDocument
        :uploadedFile="uploadedFile"
        :processErrorMessage="processErrorMessage"
        @processComplete="handleProcessComplete"
        @clearSuccessMessage="clearSuccessMessage"
      />

    </div>
    <div class="container">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-message">Extracting, hang tight...</p>
      </div>
      <p v-if="responseData.length == 0">Upload your first document to see data here</p>
      <DisplayDataTable :responseData="responseData" v-if="responseData.length > 0 && !loading" />
      <SaveData :responseData="responseData" v-if="responseData.length > 0" />
    </div>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      uploadedFile: null,
      uploadErrorMessage: "",
      processErrorMessage: "",
      saveErrorMessage: "",
      successMessage: "",
      responseData: [],
      loading: false,
    };
  },

  methods: {
    handleFileUpload({ file }) {
      this.uploadedFile = file;
    },
    handleProcessComplete({ loading, responseData, error }) {
      this.loading = loading;
      if (error) {
        console.error(error);
      } else {
        this.responseData = responseData;
      }
    },
    clearSuccessMessage() {
      this.successMessage = "";
    },
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  text-align: center;
  margin: auto;
  padding: 1rem;
}



.container {
  flex: 1;
  max-width: 45%;
  margin: 0 20px;
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 450px;
}

@media (max-width: 800px) {
  #app {
    flex-direction: column;
  }
  .container {
    min-width: 80%;
    max-width: 90%;
  }
}
</style>
