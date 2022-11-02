import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import './styles/global.css';

import AxiosAdapter from './infra/AxiosAdapter';

const app = createApp(App);

const httpClient = new AxiosAdapter();

import SimpleServiceHttp from './services/SimpleServiceHttp';

const simpleService = new SimpleServiceHttp(httpClient);

app.provide('simpleService', simpleService);

app.use(router);
app.mount('#app');
