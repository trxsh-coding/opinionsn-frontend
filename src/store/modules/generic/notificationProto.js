import axios from 'axios';


export class VuexStore {

    static apiRequest(url, requestData, requestPayload, method='get'){
        let {commit, dispatch, successType='mutation', onSuccess='onSuccess', params} = requestPayload;
        let isGet = `${method}`.toLowerCase() === 'get';

        let axiosParams = {
            params: {
                ...params,
                ...isGet && requestData || {}
            }

        };

        const instance = axios.create({

            timeout:24000

        });


        commit('setLoading', true);
        return (isGet ? instance[method](url, axiosParams) : instance[method](url, requestData, axiosParams)).then(resp => {

            let {status, data} = resp;

            if (status === 200){

                commit('notificationStore/updateStores', data, {root:true});

                if (onSuccess){
                    switch(successType){
                        case 'mutation':
                            commit(onSuccess, data.payload);
                            break;

                        case 'action':
                            return dispatch(onSuccess, {requestData, requestPayload, url, method, responseData: data});
                        case 'method':
                            return onSuccess({url, requestData, requestPayload, method: 'get', data});
                        default:
                            break;
                    }
                }

            } else {
                commit('onError', data);
            }

            commit('setLoading', false);

        }).catch(ex=> {

            setTimeout(()=>
                dispatch('notificationPage/onListReceived', {},{root: true}),
                15000)

        });


    };


    /* Утилитарные штуки */


    onError(state, payload){
        state.error = payload;
    };


    setLoading(state, payload=true){
        state.loading = payload;
    };



    /* Vuex Part Builder */

    get state(){

        return {
            error: null,
            loading: false,

        }
    }


    get mutations(){
        return {
            setLoading: this.setLoading,
            onError: this.onError,
        }
    }

    get actions(){
        return {

        }
    }

    get getters(){

        return {


        }

    }
    /**
     * Returns that built JSON for Vuex to use
     */
    get vuexStore(){

        return {
            namespaced: true,
            state: this.state,
            mutations: this.mutations,
            actions: this.actions
        }

    }

}
