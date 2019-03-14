import {mapState} from "vuex";
import {localString} from "../../utils/localString";

export default {
    computed: {

        ...mapState('lang',{
            lang : state => state.locale
        }),

        lstr(){
            return (str)=>localString(this.lang, str);
        },

    }

}
