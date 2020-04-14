import {mapState} from "vuex";

export default {

    computed: {
        ...mapState('lang', {
            locale: s => s.locale,
        }),

    },
    methods: {
        translateKeyword(keyWord, letters) {

            const LOCALE = this.locale;

            if (!keyWord) return "";

            let key = LOCALE[keyWord];

            key = letters && LOCALE['_lang'] === 'ru' ? key.substring(0, key.length - letters.length).concat(letters) : key ;
            return key ? key : (keyWord[0].toUpperCase() + keyWord.slice(1)).replace(/_/g, " ");
        }
    }
}
