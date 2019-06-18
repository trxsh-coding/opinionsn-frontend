module.exports = {
	baseUrl: '/',
	indexPath: "index.html",
	outputDir: "www",
	assetsDir: '',
	pwa: {
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: 'src/service-worker.js'
		},
		themeColor: '#1da025'
	},
}
