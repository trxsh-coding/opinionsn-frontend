
export default {

	methods: {

		verifyValues(form, values_with_rules, methods) {
			if (values_with_rules && methods) {
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
				if (values_with_rules === undefined) values_with_rules = '';
				if (methods === undefined) methods = '';
				console.error(`Require arguments: [${values_with_rules} ${methods}] is missing`);
			}
		},

		checkLength(str, from_lenth = 0, to_length = null) {
			let { length } = str;

			if (to_length) {
				if (!(length >= from_lenth && length <= to_length)) return `Длинна строки от ${from_lenth} до ${to_length} символов`;
			} else {
				if (!(length >= from_lenth)) return `Длинна строки от ${from_lenth} символов`;
			}
		}

	}

}