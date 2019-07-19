
export default {

	data() {
		return {
			errors: {}
		}
	},

	methods: {

		verifyValues(values_with_rules, methods) {
			if (values_with_rules && methods) {
				values_with_rules.forEach(({value, value_name, rules}) => {
					rules.forEach(({method_name, args}) => {
						let error = methods[method_name](value, ...args);
						if (error) {
							this.errors[value_name + '_error'] = error;
						} else {
							this.errors[value_name + '_error'] = null;
						}
					})
				})
			} else {
				if (values_with_rules === undefined) values_with_rules = 'values_with_rules';
				if (methods === undefined) methods = 'methods';
				console.error(`Require arguments: [${values_with_rules} ${methods}] is missing`);
			}
		},

		checkLength(str, from_length = 0, to_length = null) {
			let { length } = str;

			if (to_length) {
				if (!(length >= from_length && length <= to_length)) return `Длинна строки от ${from_length} до ${to_length} символов`;
			} else {
				if (!(length >= from_length)) return `Длинна строки от ${from_length} символов`;
			}
		}

	}

}
