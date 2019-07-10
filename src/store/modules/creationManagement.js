import  {
UPDATE_FIELD,
UPLOAD_FILE,
UPDATE_ARRAY_FIELD
} from "../types/mutation-types";
import  {
    SUBMIT_FORM
} from "../types/action-types";

export const creationManagement = {
    namespaced:true,
    state: {
        imageUrl: '',
        picture:'',
        pictures:[],
        form: {
            picture:'',
            subject_header:'',
            subject:'',
            tags:'',
            description:'',
            type_of_poll:'1',
            end_date:'',
            end_time:'',
            fund:'',
            judges:[],
            options:[
                {
                    optionImageUrl:'',
                    id:'',
                    picture:'',
                    description:''
                },
                {
                    optionImageUrl:'',
                    id:'',
                    picture:'',
                    description:''
                },
            ]
        },


    },
    mutations: {


        [UPLOAD_FILE](state, payload) {

        },
        [UPDATE_ARRAY_FIELD](state, payload) {

            console.log(payload)
            let value = payload.value;
            let arrayName = payload.arrayName;
            let index = payload.index;
            let keyName = payload.keyName;
            //
            state.form[arrayName][index][keyName] = value

        },

        [UPDATE_FIELD](state, payload){
            let value = payload.value
            let keyName = payload.keyName
            state.form[keyName] = value
        },



    },


    actions: {

        [SUBMIT_FORM]({state, commit, dispatch}){


        }

    },
    getters: {

    }
}
