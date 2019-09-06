export default {
	methods: {
		getCookie(name) {
			let matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		},
		
		setCookie(name, value, options = {}) {
			
			options = {
				path: '/',
				// при необходимости добавьте другие значения по умолчанию
				...options
			};
			
			if (options.expires && options.expires.toUTCString) {
				options.expires = options.expires.toUTCString();
			}
			
			let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
			
			for (let optionKey in options) {
				updatedCookie += "; " + optionKey;
				let optionValue = options[optionKey];
				if (optionValue !== true) {
					updatedCookie += "=" + optionValue;
				}
			}
			
			document.cookie = updatedCookie;
		},
		
		deleteCookie(name) {
			this.setCookie(name, "", {
				'max-age': -1
			})
		}
	},
}
