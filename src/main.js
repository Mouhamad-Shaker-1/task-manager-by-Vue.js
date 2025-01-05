// main.js أو main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // استيراد الأنماط الأساسية
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // أيقونات
import router from './router';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);
app.use(router);;
app.use(vuetify);
app.mount('#app');
