
export default {
	methods: {

		verifyValues(values_with_rules, ...methods) {
			if (values_with_rules && methods) {
				values_with_rules.forEach(({value, value_name, rules}) => {
					rules.some(({method_name, args}) => {
						if (!methods[method_name](value, ...args)) {
							this[value_name + '_error'] = true;
							return true;
						}
					})
				})
			} else {
				if (values_with_rules === undefined) values_with_rules = '';
				if (methods === undefined) methods = '';
				console.error(`Require arguments: [${values_with_rules} ${methods}] is missing`);
			}
		},

		checkLength(str, from_lenth = 0, to_length = null) {
			let { length } = str;

			if (to_length) {
				return length >= from_lenth && length <= to_length;
			} else {
				return length >= from_lenth;
			}
		}

	}

}