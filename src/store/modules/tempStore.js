import  {
    SET_USERS_ARRAY
} from "../types/mutation-types";
import  {
    GET_USERS_ARRAY
} from "../types/action-types";

export default  {
    namespaced:true,
    state: {
        tournamentInfo: [
            {
                place:1,
                id:51,
                accuracy:55,
                result:15
            },
            {
                place:2,
                id:1864,
                accuracy:51,
                result:15

            },
            {
                place:3-5,
                id:2381,
                accuracy:48,
                result:14

            },
            {
                place:3-5,
                id:9,
                accuracy:48,
                result:13
            },
            {
                place:3-5,
                id:2378,
                accuracy:48,
                result:14
            },
            {
                place:6,
                id:4,
                accuracy:44,
                result:13
            },
            {
                place:7-10,
                id:1939,
                accuracy:41,
                result:12
            },
            {
                place:7-10,
                id:2377,
                accuracy:41,
                result:12
            },
            {
                place:7-10,
                id:2376,
                accuracy:51,
                result:15
            },
            {
                place:11,
                id:7,
                accuracy:37,
                result:11
            },
            {
                place:12,
                id:4605,
                accuracy:34,
                result:10
            },
            {
                place:13,
                id:6235,
                accuracy:31,
                result:9
            },
            {
                place:13,
                id:6235,
                accuracy:31,
                result:9
            },
            {
                place:14-17,
                id:6225,
                accuracy:27,
                result:8
            },
            {
                place:14-17,
                id:11,
                accuracy:27,
                result:8
            },
            {
                place:14-17,
                id:2913,
                accuracy:27,
                result:8
            },
            {
                place:14-17,
                id:2921,
                accuracy:27,
                result:8
            },
            {
                place:18-20,
                id:2380,
                accuracy:20,
                result:6
            },
            {
                place:18-20,
                id:12,
                accuracy:20,
                result:6
            },
            {
                place:18-20,
                id:6261,
                accuracy:20,
                result:6
            },
            {
                place:21-20,
                id:6263,
                accuracy:17,
                result:5
            },
            {
                place:22,
                id:2740,
                accuracy:13,
                result:4
            },

        ]
    },
    mutations: {


        [SET_USERS_ARRAY](state, payload) {

        },



    },


    actions: {

        [GET_USERS_ARRAY]({state, commit, dispatch}){

        },


    },
    getters: {

    }
}
