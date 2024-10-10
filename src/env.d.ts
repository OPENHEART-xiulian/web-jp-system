/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_ITEM_IMG_HOST: string;
  readonly VITE_IMG_HOST: string;
  readonly VITE_ENCRYPT: string;
  // 更多环境变量...
}
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
