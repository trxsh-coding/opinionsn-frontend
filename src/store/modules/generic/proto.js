import axios from 'axios';


export class VuexStore {

    static apiRequest(url, requestData, requestPayload, method='get'){
        // console.time('concatenation');
        let {commit, dispatch, successType='mutation', onSuccess='onSuccess', root=false, params} = requestPayload;
        let isGet = `${method}`.toLowerCase() === 'get';

        let axiosParams = {
            params: {
                ...params,
                ...isGet && requestData || {}
            }

        };

        commit('setLoading', true);
        return (isGet ? axios[method](url, axiosParams) : axios[method](url, requestData, axiosParams)).then(resp => {

            let {status, data} = resp;

            if (status === 200){
                    // console.timeEnd("concatenation");
                    commit('globalStore/updateStores', data, {root: true});

                if (onSuccess){
                   switch(successType){
                       case 'mutation':
                           commit(onSuccess, data.payload, {root});
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
			commit('serviceWorker/CONNECTION_UNSTABLE', false, { root: true });

			return resp;

        })
        .catch(error=> {
        	let { message } = error;

        	if (message === "Network Error") {
				commit('setLoading', false);
				commit('decrementPage');
				commit('serviceWorker/CONNECTION_UNSTABLE', true, { root: true });
			} else {
				console.error(`Caught an exception`);
				console.error(error);
				commit('onError', error);
			}

        	return error.response;
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
