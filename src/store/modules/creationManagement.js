import  {
    UPDATE_FIELD,
    UPLOAD_FILE,
    UPDATE_ARRAY_FIELD,
    CLEAR_STATE,
    ADD_OPTION,
    INSERT_PICTURES,
    SET_CATEGORY_NAME,
    SET_DATE_TIME
} from "../types/mutation-types";
import  {
    SUBMIT_FORM
} from "../types/action-types";

const initialState = () => {
    return {
        withPicture:false,
        imageUrl: '',
        picture:'',
        pictures:[
            {
                picture:'',
                imgUrl:''
            },
            {
                picture:'',
                imgUrl:''
            },
            {
                picture:'',
                imgUrl:''
            }
        ],
        form: {
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
        [SET_DATE_TIME](state, payload) {

            state.form.end_date = payload;

        },
        [UPDATE_ARRAY_FIELD](state, payload) {

            console.log(payload)
            let value = payload.value;
            let arrayName = payload.arrayName;
            let index = payload.index;
            let keyName = payload.keyName;
            let form = payload.form;
            //
            if(form){
                state[form][arrayName][index][keyName] = value

            } else {
                state[arrayName][index][keyName] = value

            }

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
        },

        [ADD_OPTION](state, payload){
            if(payload > 0){
                state.form.options.push({id:'', picture:'', description:''})

            }

        },
        [SET_CATEGORY_NAME](state, payload){
          console.log('imhere')
          state.form.subject_header = payload
        },
        [INSERT_PICTURES](state, payload){
            console.log(payload)
            console.log(state)
            state.withPicture = payload;

        }

    },


    actions: {

        [SUBMIT_FORM]({state, commit, dispatch}){


        }

    },
    getters: {

    }
}
