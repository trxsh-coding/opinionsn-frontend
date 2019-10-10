export default {

	filters: {
		assetsPath(value) {
			let isBlob = value.indexOf('blob:') !== -1;
			let isExternalUrl = value.indexOf('https') !== -1;
			return isBlob || isExternalUrl ? value : process.env.VUE_APP_ASSETS + value;
		}
	}

}