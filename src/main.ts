import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import UploadFile from "@/components/UploadFile.vue";
import ProcessDocument from "@/components/ProcessDocument.vue";
import DisplayDataTable from "./components/DisplayDataTable.vue";
import SaveData from "./components/SaveData.vue";

const app = createApp(App)
app.component('UploadFile', UploadFile);
app.component('ProcessDocument', ProcessDocument);
app.component('DisplayDataTable', DisplayDataTable);
app.component('SaveData', SaveData);

app.use(router)

app.mount('#app')
