import { createApp } from "vue";



// import "./styles/app.sass";
// import "./styles/theme.scss";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import "./styles/index.scss";


const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount("#app");
