import path from 'path'
import svgr from 'vite-plugin-svgr'
import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import autoprefixer from 'autoprefixer'
import viteEslint from 'vite-plugin-eslint'
import viteImagemin from 'vite-plugin-imagemin'

const variablePath = normalizePath(path.resolve('./src/variable.scss'))

// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === 'production'
// 填入项目的 CDN 域名地址
const CDN_URL = 'xxxxxx'
// https://vitejs.dev/config/
export default defineConfig({
  // 具体配置
  base: isProduction ? CDN_URL : '/',
  plugins: [
    react(),
    Unocss({
      presets: [
        presetAttributify({ /* preset options */ }),
        presetUno(),
      ],
    }),
    viteEslint(),
    svgr(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7,
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
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
  build: {
    // 8 KB
    assetsInlineLimit: 8 * 1024,
  },
})
