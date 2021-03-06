const KEYS_REGEX = {
	"access_token": /access_token=.[^&\s]*/m,
	"user_id": /user_id=.[^&\s]*/m,
	"email": /email=.[^&\s]*/m,
};

export function vkontakteRedirectParser(url) {
	let result = {};

	for (const key in KEYS_REGEX) {
		const value = url.match(KEYS_REGEX[key]);
		if (value !== null) {
			const normalizedValue = url.match(KEYS_REGEX[key])[0].slice(key.length + 1);
			result[key] = normalizedValue
		}

	}

	return !Object.keys(result).length ? null : result;
}
