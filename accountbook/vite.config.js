import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 引入 Vite 的 React 插件，支持 JSX 转换和 React Fast Refresh
// 问题：vite-plugin-style-import中 styleImport 无法使用
// 解决：在2.0版本中使用的是createStyleImportPlugin
import { createStyleImportPlugin } from 'vite-plugin-style-import'
// 引入用于按需加载组件库样式的插件
import path from 'path'

export default defineConfig({
  plugins: [
    react(), // 使用 React 插件
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: (name) => `zarm/es/${name}/style/css`,
        }
      ]
    })
  ],
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        // target: 'http://api.chennick.wang/api/',
        target: 'http://localhost:7001/api/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 路径
      'utils': path.resolve(__dirname, 'src/utils') // src 路径
    }
  },

})
