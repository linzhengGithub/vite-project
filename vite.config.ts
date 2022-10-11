import path from 'path'
import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import autoprefixer from 'autoprefixer'
import viteEslint from 'vite-plugin-eslint'

const variablePath = normalizePath(path.resolve('./src/variable.scss'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unocss({
      presets: [
        presetAttributify({ /* preset options */ }),
        presetUno(),
      ],
    }),
    viteEslint(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        }),
      ],
    },
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
  resolve: {
    // 别名配置
    alias: {
      '@assets': path.join(__dirname, 'src/assets'),
    },
  },
})
