import  {
    UPDATE_FIELD,
    UPDATE_ARRAY_FIELD,
    UPLOAD_FILE,
    CLEAR_STATE,
    ADD_OPTION,
    INSERT_PICTURES,
    SET_CATEGORY_NAME,
    SET_DATE_TIME,
    SET_TIME_LIMIT,
    CHANGE_MUTABLE_STATE,
    UPDATE_ERROR_FIELD,
    CLEAR_FORM,
    SET_INITIAL_FORM,
    UPDATE_ARRAY_PICTURES,
    ADD_SUBJECT_PICTURE,
    DELETE_OPTION

} from "../types/mutation-types";

import  {
    SUBMIT_POLL_FORM,
    SUBMIT_USERPAGE_FORM,
    UPDATE_AVATAR
} from "../types/action-types";
import Vue from 'vue'
import moment from 'moment'
import axios from 'axios'
import {vueApp} from '../../main'
const initialState = () => {
    return {
        withPicture:false,
        imageUrl: '',
        picture: '',
        pictures: [
            {
                picture: null,
                imgUrl: ''
            },
        ],
        create_poll_form: {
            subject_header: 'sports',
            subject: '',
            tags: '',
            description: '',
            type_of_poll: '0',
            end_date: '',
            end_time: '',
            fund: '',
            judges: [],
            errors: {
                options: {}
            },
            options: [
                {
                    optionImageUrl: '',
                    id: '',
                    picture:null,
                    description: ''
                },
                {
                    optionImageUrl: '',
                    id: '',
                    picture:null,
                    description: ''
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
        [CHANGE_MUTABLE_STATE](state, payload){
          state[key] = payload;
        },
        [SET_TIME_LIMIT](state, payload) {
            state.isTimeLimit = payload;


        },

        [UPDATE_ARRAY_FIELD](state, {value, arrayName, index, keyName, form}) {
            state[form][arrayName][index][keyName] = value

        },
        [UPDATE_ARRAY_PICTURES](state, payload){
            let {index, file} = payload
            state.pictures[index].picture = file
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

        [ADD_OPTION](state){
                state.create_poll_form.options.push({id:'', picture:null, description:''})
        },
        [ADD_SUBJECT_PICTURE](state){
           if(state.pictures.length < 12) {
               state.pictures.push({
                   picture: null,
                   imgUrl: ''
               })
           } else {
               alert('12 фотографий максимум')
           }
        },
        [DELETE_OPTION](state, index){
            state.create_poll_form.options.splice(index, 1)
        },
        [SET_CATEGORY_NAME](state, payload){
          state.create_poll_form.subject_header = payload
        },

        [INSERT_PICTURES](state, payload){
            state.withPicture = payload;
        },

        [UPDATE_ERROR_FIELD](state, {form, key, value, error_key, array_key}) {
            if (!state[form].errors) state[form].errors = {};

            if (!array_key) {
                if (!state[form].errors[key]) state[form].errors[key] = {};
                state[form].errors[key][error_key] = value;
            } else {
                // console.log({form, key, value, error_key, array_key});
                if (!state[form].errors[array_key]) state[form].errors[array_key] = {};
                if (!state[form].errors[array_key][key]) state[form].errors[array_key][key] = {};
                // Vue.set(state[form].errors[array_key][key], `${[error_key]}`, value)
                state[form].errors[array_key][key][error_key] = value;
                // console.log(state[form].errors[array_key]);
            }
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

        [UPDATE_AVATAR]({state, commit, dispatch}, {file, type}) {
            var bodyFormData = new FormData();
            const config = {
                headers: {
                    'content-type': 'multipart/mixed'
                }
            }
            bodyFormData.append('file', file);
            axios.post(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/${type}`, bodyFormData, config)
                .then(function(response){
                    if (response.status === 200) {

                        commit('globalStore/updateStores', response.data, {root: true});


                    }
                }.bind(this))

        },
        
        [SUBMIT_USERPAGE_FORM]({state, commit, dispatch}, payload) {
    
            axios.post(`${process.env.VUE_APP_MAIN_API}/rest/v1/user`, {...payload})
                .catch(err => { console.error(err) });
            
        },

        [SUBMIT_POLL_FORM]({state, commit, dispatch}, payload){

            let valid = Object.keys(state.create_poll_form.errors)

            state.create_poll_form.judges = [payload];



            var bodyFormData = new FormData();


            const config = {
                headers: {
                    'content-type': 'multipart/mixed'
                }
            };

            for (let item of state.create_poll_form.options){

                let {picture} = item;

                bodyFormData.append('files[]', picture);

                delete item.picture;

            }

            for (let item of state.pictures){
                let {picture} = item;

                bodyFormData.append('mainPictures[]', picture);

                delete item.picture;

            }
            const form = new Blob([JSON.stringify(state.create_poll_form)], { type: "application/json"});

            bodyFormData.append('form', form);



            axios.put(`${process.env.VUE_APP_MAIN_API}/rest/v1/poll`, bodyFormData, config)
                .then(response => {
                    if (response.status === 200) {
                        let poll_id = response.data.payload[0].id;
                        vueApp.$router.push({name : 'singlePoll', params: {id : poll_id}})
                    }
                })


        }

    },
    getters: {

    }
}
