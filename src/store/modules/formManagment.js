import  {
    UPDATE_FIELD,
    UPDATE_ARRAY_FIELD,
    UPLOAD_FILE,
    CLEAR_STATE,
    ADD_OPTION,
    INSERT_PICTURES,
    SET_CATEGORY_NAME,
    SET_DATE_TIME,
    UPDATE_ERROR_FIELD,
    CLEAR_FORM,
    SET_INITIAL_FORM
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
        create_poll_form: {
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
        edit_form: {}
    };
};

export const formManagment = {
    namespaced:true,
    state: initialState,
    mutations: {


        [UPLOAD_FILE](state, payload) {

        },

        [SET_DATE_TIME](state, payload) {
            state.form.end_date = payload;
        },

        [UPDATE_ARRAY_FIELD](state, {value, arrayName, index, keyName, form}) {
            //
            if(form){
                state[form][arrayName][index][keyName] = value

            } else {
                state[arrayName][index][keyName] = value

            }
        },

        [UPDATE_FIELD](state, {form, key, value}){
            state[form][key] = value
        },

        [CLEAR_STATE](state) {
            const init_state = initialState();
            Object.keys(initialState).forEach(key => {
                state[key] = init_state[key]
            });
        },

        [ADD_OPTION](state, payload){
            if(payload > 0){
                state.form.options.push({id:'', picture:'', description:''})
            }
        },

        [SET_CATEGORY_NAME](state, payload){
          state.form.subject_header = payload
        },

        [INSERT_PICTURES](state, payload){
            state.withPicture = payload;
        },

        [UPDATE_ERROR_FIELD](state, {form, key, value}) {
            console.log(form, key, value);
            if (!state[form].errors) state[form].errors = {};
            state[form].errors[key] = value;
        },

        [CLEAR_FORM](state, form) {
            const init_state = initialState();
            state[form] = init_state[form];
        },

        [SET_INITIAL_FORM](state, {form, value}) {
            state[form] = value;
        }

    },


    actions: {

        [SUBMIT_FORM]({state, commit, dispatch}){


        }

    },
    getters: {

    }
}
