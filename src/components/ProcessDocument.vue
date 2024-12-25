<style>
@import "@/assets/styles/common.css";
</style>

<template>
  <div>
    <button :disabled="!uploadedFile || loading" @click="processDocument" class="action-button">
      Process document
    </button>
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-message">Extracting, hang tight...</p>
    </div>
    <p v-if="processErrorMessage && !loading" class="error-message">{{ processErrorMessage }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    uploadedFile: Object,
  },
  emits: ["processComplete", "clearSuccessMessage"],
  data() {
    return {
      loading: false,
      processErrorMessage: "",
    };
  },
  methods: {
    processDocument() {
      this.$emit("processComplete", { loading: false, responseData: [], error: "" });
      this.$emit("clearSuccessMessage");
      if (!this.uploadedFile) {
        this.processErrorMessage = "No file to process!";
        return;
      }

      this.loading = true;
      this.processErrorMessage = "";

      const reader = new FileReader();

      reader.onload = () => {
        const base64File = reader.result.split(",")[1];
        const fileName = this.uploadedFile.name;

        const url = "/api/extract-data";

        const payload = {
          file_name: fileName,
          file: base64File,
        };

        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        })
          .then((res) => {
            if (res.ok) return res.json();
            return res.json().then((err) => {
              throw new Error(err.message || `HTTP error! status: ${res.status}`);
            });
          })
          .then((json) => {
            const responseData = this.mapResponseData(json.extracted_fields);
            this.loading = false;
            this.$emit("processComplete", { loading: false, responseData, error: "" });
            this.$emit("clearSuccessMessage");
          })
          .catch((err) => {
            this.loading = false;
            this.processErrorMessage = err.message;
            this.$emit("processComplete", { loading: false, responseData: [], error: this.processErrorMessage });
          });
      };

      reader.readAsDataURL(this.uploadedFile);
    },
    mapResponseData(fields) {
      return fields.map(field => ({
        name: field.name,
        value: field.values[0]?.value || "No Value",
        confidence: field.values[0]?.confidence_score || "No Confidence",
      }));
    },
  },
};
</script>

<style>
  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #009688;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation: spin 2s linear infinite;
    margin: 5px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
