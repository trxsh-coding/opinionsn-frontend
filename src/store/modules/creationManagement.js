import  {
    UPDATE_FIELD,
    UPLOAD_FILE,
    UPDATE_ARRAY_FIELD,
    CLEAR_STATE
} from "../types/mutation-types";
import  {
    SUBMIT_FORM
} from "../types/action-types";

const initialState = () => {
    return {
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
        edit_form: {
            name: '',
            username: '',
            status: '',
            location: '',
            site: '',
            gender: '',
            email: '',
            phone_number: '',
            pictures: [
                {
                    url: '',
                    id: '',
                    picture: '',
                    description: ''
                },
                {
                    url: '',
                    id: '',
                    picture: '',
                    description: ''
                }
            ]
        }
    };
}

export const creationManagement = {
    namespaced:true,
    state: initialState,
    mutations: {


        [UPLOAD_FILE](state, payload) {

        },
        [UPDATE_ARRAY_FIELD](state, payload) {

            console.log(payload)
            let value = payload.value;
            let arrayName = payload.arrayName;
            let index = payload.index;
            let keyName = payload.keyName;
            let form = payload.form;
            //
            state[form][arrayName][index][keyName] = value

        },

        [UPDATE_FIELD](state, payload){
            let value = payload.value;
            let keyName = payload.keyName;
            let form = payload.form;
            state[form][keyName] = value
        },

        [CLEAR_STATE](state) {
            const initialState = initialState();
            Object.keys(initialState).forEach(key => {
                state[key] = initialState[key]
            });
        }



    },


    actions: {

        [SUBMIT_FORM]({state, commit, dispatch}){


        }

    },
    getters: {

    }
}
