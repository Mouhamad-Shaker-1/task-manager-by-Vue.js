// main.js أو main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; 
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');
