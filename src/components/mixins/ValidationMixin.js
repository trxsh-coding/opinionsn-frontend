export default {

    methods: {

        verifyValues(form, values_with_rules, methods) {
            if (form && values_with_rules && methods) {
                values_with_rules.forEach(({value, key, rules, array_key}) => {
                    rules.forEach(({method_name, args}) => {
                        let error = methods[method_name](value, ...args);
                        if (error) {
                            this.$store.commit('formManagment/UPDATE_ERROR_FIELD', {form, key, value: error, error_key: method_name, array_key})
                        } else {
                            this.$store.commit('formManagment/UPDATE_ERROR_FIELD', {form, key, value: null, error_key: method_name, array_key})
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

        checkUpload({index}, index_array){
            
            if (!!index_array.length) {
                return (index_array.indexOf(index) === -1) ? true : null;
            } else return null;
            
        },

        checkLength(value, from_length, to_length) {

            if (typeof value === 'object') value = value.str;

            let { length } = value;


            switch (true) {
                case ((length < from_length || length > to_length) && (!!from_length && !!to_length)):
                    return `Длинна строки от ${from_length} до ${to_length} символов`;
                case ((length > to_length) && !from_length):
                    return `Длинна строки до ${to_length} символов`;
                case ((length < from_length) && !to_length):
                    return `Длинна строки от ${from_length} символов`;
                default:
                    return null;
            }

        }

    }

}
