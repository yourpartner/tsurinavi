import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // カスタムドメイン取得後は https://tsurinavi.jp に変更し base を削除
  site: 'https://yourpartner.github.io',
  base: '/tsurinavi',
  integrations: [
    tailwind(),
    sitemap(),
    mdx(),
  ],
  output: 'static',
});
