import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa';

import path from "path"
import fs from "fs"
// https://vite.dev/config/
export default defineConfig({
  server: {
		port: 8080,
		proxy: getProxyOptions(),
	},
    base: '/assets/pwa/frontend/', // Ensure paths match where Frappe serves your files
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // Enable service worker in development mode
      },
      manifest: {
        name: 'My PWA App',
        short_name: 'PWA App',
        description: 'A Vite + Vue Progressive Web App',
        theme_color: '#42b983',
        start_url: "/pwa/",
        display: "standalone",
        icons: [
          {
            src: '/assets/pwa/frontend/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/pwa/frontend/icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/example\.com\/.*$/, // Replace with your API or external assets
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
		outDir: "../pwa/public/frontend",
		emptyOutDir: true,
		target: "es2015",
		sourcemap: true,
	},
})

function getProxyOptions() {
	const config = getCommonSiteConfig()
	const webserver_port = config ? config.webserver_port : 8005
	if (!config) {
		console.log("No common_site_config.json found, using default port 8000")
	}
	return {
		"^/(app|login|api|assets|files|private)": {
			target: `http://127.0.0.1:${webserver_port}`,
			ws: true,
			router: function (req) {
				const site_name = req.headers.host.split(":")[0]
				console.log(`Proxying ${req.url} to ${site_name}:${webserver_port}`)
				return `http://${site_name}:${webserver_port}`
			},
		},
	}
}

function getCommonSiteConfig() {
	let currentDir = path.resolve(".")
	// traverse up till we find frappe-bench with sites directory
	while (currentDir !== "/") {
		if (
			fs.existsSync(path.join(currentDir, "sites")) &&
			fs.existsSync(path.join(currentDir, "apps"))
		) {
			let configPath = path.join(currentDir, "sites", "common_site_config.json")
			if (fs.existsSync(configPath)) {
				return JSON.parse(fs.readFileSync(configPath))
			}
			return null
		}
		currentDir = path.resolve(currentDir, "..")
	}
	return null
}