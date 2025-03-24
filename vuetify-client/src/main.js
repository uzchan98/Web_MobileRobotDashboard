import { createApp } from "vue";
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi", // 기본 아이콘을 MDI로 설정
  },
  components,
  directives,
});

const pinia = createPinia();

// Components
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(vuetify);
app.use(pinia);
app.use(router);

app.mount("#app");
