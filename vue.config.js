module.exports = {
	baseUrl: '/',
	indexPath: "index.html",
	outputDir: "www",
	devServer: {
		https:true,
		proxy: {
			'/api': {
				target: 'https://opinionsn.com/api',
				pathRewrite: {'^/api': '/'},
				changeOrigin: true,
				secure: false
			},
			'/messages': {
				target: 'https://opinionsn.com/messages',
				pathRewrite: {'^/messages': '/'},
				changeOrigin: true,
				secure: false
			},
			'/assets': {
				target: 'https://opinionsn.com/assets',
				// pathRewrite: {'^/messages': '/'},
				changeOrigin: true,
				secure: false
			}

		}
	}
}