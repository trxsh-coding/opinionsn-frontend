import  {
    GET_LIST
} from "../types/action-types";
import {api} from "../../utils/api";
import {SET_LIST} from "../types/mutation-types";

export default  {
    namespaced:true,
    state: {
        listById:{},
    },
    mutations: {

        [SET_LIST](state, payload) {
            console.log(payload)
            let {list, id} = payload;
            let recommendations = {
                [id] : list
            };
            state.listById = {...state.listById, ...recommendations}
        },


    },


    actions: {
        async [GET_LIST]({state, commit, dispatch}, payload){
            const {id, full = false} = payload;
            const {data} = await
                api({
                    METHOD:'GET',
                    URL:full ? `/rest/v2/poll/${id}/mixin` : `/rest/v2/poll/${id}/mixin/single`

                });
            commit('SET_LIST',{list : data, id : id})
        }


    },
    getters: {

    }
}
