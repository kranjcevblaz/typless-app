<style>
@import "@/assets/styles/common.css";
</style>

<template>
  <div>
    <button v-if="!successMessage" @click="saveData" class="action-button">
      Save to database
    </button>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <p v-if="saveErrorMessage" class="error-message">{{ saveErrorMessage }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    responseData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      saveErrorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    saveData() {
      const payload = this.responseData.map(field => ({
        name: field.name,
        value: field.value,
        confidence_score: field.confidence,
      }));

      const url = "/api/save-extracted-data";

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ extracted_fields: payload }),
      })
        .then((res) => {
          if (res.ok) {
            this.successMessage = "Data saved successfully!";
            return res.json();
          }
          throw new Error(`Error saving data. Status: ${res.status}`);
        })
        .catch((err) => {
          this.saveErrorMessage = err.message;
        });
    },
  },
};
</script>
