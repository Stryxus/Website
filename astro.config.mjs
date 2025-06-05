// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import compressor from 'astro-compressor';
import purgecss from 'astro-purgecss';
import tailwind from '@astrojs/tailwind';
import bun from "@nurodev/astro-bun";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), compressor({ brotli: true, gzip: false }), purgecss(), tailwind(), wasm(), topLevelAwait()],
	adapter: bun(),
	output: 'server',
	vite: {
		server: {
			hmr: {
				port: 4321,
				protocol: 'ws',
				host: 'localhost'
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern',
				},
			},
		},
	},
});