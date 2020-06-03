import  {
GET_LIST
} from "../types/action-types";
import {api} from "../../utils/api";
import {SET_LIST} from "../types/mutation-types";

export default  {
    namespaced:true,
    state: {
        data: [],
        listById:{},
        localCategory: {
            "998": {
                id: -2,
                name: 'new',
                path_to_image: require('../../assets/new.svg'),
                local: true
            },
            "999": {
                name: 'recommended',
                id: -1,
                path_to_image: require('../../assets/all.svg'),
                local: true
            },
        },
    },
    mutations: {

        [SET_LIST](state, payload) {
            console.log(Object.values(payload))
            let categoriesArray = Object.values(payload).filter( item => item.id !== 23);
            let popularCategory=Object.values(payload)[19];
            const localCategory = Object.values(state.localCategory);
            const ordered = [...Object.values(localCategory).reverse(), popularCategory, ...categoriesArray];
            state.data = ordered;
            state.listById = payload;
        },


    },


    actions: {
       async [GET_LIST]({state, commit, dispatch}){
           const {data} = await api({METHOD:'GET', URL:'/rest/v1/categories'});
           commit('SET_LIST',data.categories)
        }


    },
    getters: {

    }
}
