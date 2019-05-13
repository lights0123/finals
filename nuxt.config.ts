import NuxtConfiguration from '@nuxt/config';
import * as pkg from './package.json';
const config: NuxtConfiguration = {
	mode: 'universal',

	/*
  ** Headers of the page
  */
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		],
	},

	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#37cbfc' },

	/*
  ** Global CSS
  */
	css: [
		'element-ui/lib/theme-chalk/index.css',
		'@/assets/main.css',
	],

	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
		'@/plugins/element-ui',
	],

	/*
  ** Nuxt.js modules
  */
	modules: [
		['@nuxtjs/google-analytics', {
			id: process.env.GA_ID || 'UA-000000-1',
			debug: {
				sendHitTask: !!process.env.GA_ID,
			},
		}],
		'modules/commit',
	],

	/*
  ** Build configuration
  */
	build: {
		extend(config, { isClient }) {
			// Extend only webpack config for client-bundle
			if (isClient && process.env.NODE_ENV !== 'production') {
				config.devtool = '#source-map';
			}
		},
		transpile: [/^vue-awesome/],
		babel: {
			plugins: ['@babel/plugin-syntax-dynamic-import'],
		},
	},

	generate: {
		dir: 'public',
	},
};
export default config;
