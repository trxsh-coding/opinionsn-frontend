module.exports = {
	baseUrl: '/',
	indexPath: "index.html",
	outputDir: "www",
	devServer: {
		// http-proxy --port 3012 /messages=https://opinionsn.com:7071 /api=https://opinionsn.com:7070 /assets=https://opinionsn.com:7070/assets 8080 -v
		// http-proxy --port 3012 /messages=http://eng.opinionsn.com:7071 /api=http://eng.opinionsn.com:7070 /assets=http://eng.opinionsn.com:7070/assets 8080 -v
		// http-proxy --port 3012 /messages=https://api.opinionsn.com:7071 /api=https://api.opinionsn.com:7070 /assets=https://api.opinionsn.com:7070/assets 8080 -v
		// http-proxy --port 3012 /messages=http://192.168.1.60:7071 /api=http://192.168.1.60:7070 /assets=http://192.168.1.60:7070/assets 8080 -v
		// http-proxy --port 3012 /messages=http://192.168.1.51:7071 /api=http://192.168.1.51:7070 /assets=http://192.168.1.51:7070/assets 8080 -v
		https:false,
		proxy: {
			'/api': {
				target: 'http://192.168.1.51:7070/',
				pathRewrite: {'^/api': ''},
				changeOrigin: true,
				secure: false
			},

			'/messages': {
				target: 'http://192.168.1.51:7071/',
				pathRewrite: {'^/messages': ''},
				changeOrigin: true,
				secure: false
			},

			'/assets': {
				target: 'http://192.168.1.51:7070/assets/',
				changeOrigin: true,
				secure: false
			}
		}
	},
	pwa: {
		name: "OpinionSN",
		themeColor: "#4b97b4",
		iconPaths: {
			favicon16: 'img/icons/favicon-16x16.png',
			favicon32: 'img/icons/favicon-32x32.png',
			appleTouchIcon: 'img/icons/apple-touch-icon.png',
			maskIcon: 'img/icons/safari-pinned-tab.svg',
			msTileImage: 'img/icons/mstile-150x150.png'
		},
		msTileColor: '#000000',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: '#4b97b4',
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: 'src/service-worker.js',
		}
	}
}
