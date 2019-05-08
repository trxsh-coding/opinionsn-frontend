module.exports = {
	baseUrl: '',
	indexPath: "index.html",
	outputDir: "www",
	assetsDir: '',
	devServer: {
		proxy: {
			'/api': {
				target: 'http://api.opinionsn.com:7070',
				pathRewrite: { '^/api': '/' },
				changeOrigin: true,
				secure: false
			},
			'/assets': {
				target: 'http://api.opinionsn.com:7070/',
				pathRewrite: { '^/assets': '/assets' },
				changeOrigin: true,
				secure: false
			},
			'/messages': {
				target: 'http://api.opinionsn.com:7071/',
				pathRewrite: { '^/messages': '/' },
				changeOrigin: true,
				secure: false
			}

		}
	}
}