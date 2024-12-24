<template>
    <div v-if="responseData && responseData.length > 0">
      <table>
        <thead>
        <tr>
          <th>Field Name</th>
          <th>Value</th>
          <th>Confidence Score</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="field in responseData" :key="field.name">
          <td>{{ field.name }}</td>
          <td>{{ field.value }}</td>
          <td>{{ field.confidence }}</td>
        </tr>
        </tbody>
      </table>
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
};
</script>

<style>
table {
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #676666;
  color: white;
  text-align: center;
}

td {
  text-align: center;
}
</style>
