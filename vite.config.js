import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import postCssPxToRem from 'postcss-pxtorem';
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },

  plugins: [vue(),
  Components({
    resolvers: [VantResolver()],
  }),],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 75;
          }, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    }
  },
  server: {
    proxy: {
      "/api": {
        // 此处的写法，目的是为了 将/api 替换成 http://localhost:3000
        target: "http://localhost:3000",
        //是否跨域
        changeOrigin: true,
        //路径重写 下面示例为 将 /api 替换成空
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  }
})
// module.exports = {
//   devServer: {
//     proxy: {
//       "/api": {
//         // 此处的写法，目的是为了 将/api 替换成 http://localhost:3000
//         target: "http://localhost:3000",
//         //是否跨域
//         changeOrigin: true,
//         //路径重写 下面示例为 将 /api 替换成空
//         pathRewrite: {
//           "^/api": "",
//         },
//       },
//     },
//   },
// };
