
export default {

	methods: {

		verifyValues(form, values_with_rules, methods) {
			if (form && values_with_rules && methods) {
				values_with_rules.forEach(({value = '', value_name, rules}) => {
					rules.forEach(({method_name, args}) => {
						let error = methods[method_name](value, ...args);
						if (error) {
							this.$store.commit('formManagment/UPDATE_ERROR_FIELD', {form, key: value_name, value: error})
						} else {
							this.$store.commit('formManagment/UPDATE_ERROR_FIELD', {form, key: value_name, value: null})
						}
					})
				})
			} else {
				if (form === undefined) form = 'values_with_rules';
				if (values_with_rules === undefined) values_with_rules = 'values_with_rules';
				if (methods === undefined) methods = 'methods';
				console.error(`Require arguments: [${form} ${values_with_rules} ${methods}] is missing`);
			}
		},

		checkLength(str, from_length = 0, to_length) {
			let { length } = str.split(' ').join('');
			
			switch (true) {
				case (length < from_length || length > to_length && from_length !== 0):
					return `Длинна строки от ${from_length} до ${to_length} символов`;
				case (from_length === false && length > to_length):
					return `Длинна строки до ${to_length} символов`;
				case (length < from_length && to_length === false && from_length !== 0):
					return `Длинна строки от ${from_length} символов`;
				default:
					return null;
			}

		}

	}

}
