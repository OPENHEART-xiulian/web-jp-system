import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [
    uni(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: ['vue', 'uni-app'],
      dts: 'typings/auto-imports.d.ts',
    }),

  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.json', '.vue'] // 导入时想要省略的扩展名列表
  },
  server: {
    host: true // 监听所有地址
  },
  // build: {
  //   minify: 'terser',
  //   terserOptions: {
  //     compress: {
  //       //生产环境时移除console,发版时记得改成true.
  //       drop_console: false,
  //       drop_debugger: true,
  //     },
  //   },
  //   //关闭文件计算
  //   reportCompressedSize: false,
  //   //关闭生成map文件 可以达到缩小打包体积
  //   sourcemap: false, // 这个生产环境一定要关闭，不然打包的产物会很大

  // }
});
