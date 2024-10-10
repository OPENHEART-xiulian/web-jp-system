import { createSSRApp } from "vue";
import uviewPlus from 'uview-plus';
import { initRequest } from '@/utils/request';
import pinia from '@/utils/store'
//数据持久化存储
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  initRequest(app)

  app
    .use(pinia)
    .use(uviewPlus)
  return {
    app
  };
}
