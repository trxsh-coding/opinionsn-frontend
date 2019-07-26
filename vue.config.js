module.exports = {
	baseUrl: '/',
	indexPath: "index.html",
	outputDir: "www",
	devServer: {
		https:false,
		proxy: {
			'/api': {
				target: 'http://192.168.1.38:7070',
				pathRewrite: {'^/api': '/'},
				changeOrigin: true,
				secure: false
			},
			
			'/messages': {
				target: 'http://192.168.1.38:7071',
				pathRewrite: {'^/messages': ''},
				changeOrigin: true,
				secure: false
			},
			
			'/assets': {
				target: 'http://192.168.1.38/assets',
				// pathRewrite: {'^/messages': '/'},
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
