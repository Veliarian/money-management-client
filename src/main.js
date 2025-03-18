import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {faHouse, faHryvniaSign, faGear, faShareNodes, faTrash, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

library.add(...[faHouse, faHryvniaSign, faGear, faShareNodes, faTrash, faRightFromBracket]);

const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);

app.mount('#app');
