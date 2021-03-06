export const ListMixin = (superclass, url) => class extends superclass{

    async initializeList({state, commit}, payload = {}){
       const {force} = payload;
       if(!state.loading || state.loaded){
           try {
               commit('setLoading', true);
               const response = await superclass.apiRequest({URL: `${url}/${state.page}`})
               if(typeof response.data === 'string'){
                    commit('setListLoaded', true)
               } else {
                   if(force){
                       commit('setInitializedData', response.data);
                   } else {
                       commit('appendInitializedData', response.data);
                   }
                   commit('incrementPage');
                   commit('setListLoaded', false);
               }

           }catch (e) {
               console.trace(e)
           } finally {
               commit('setLoading', false);

           }
       }
    }

    async initializeData({state, commit}, payload = {}){

        if(!state.loading ){
            try {
                commit('setLoading', true);
                const response = await superclass.apiRequest({URL: `${url}`})
                commit('setInitializedData', response.data);
                }catch (e) {
                console.trace(e)
            } finally {
                commit('setLoading', false);

            }
        }
    }

    appendInitializedData(state, payload){
        state.list = [...state.list, ...Object.values(payload)];
    }
    setInitializedData(state, payload){
        state.list = Object.values(payload);
    }
    setInitializedItemsById(state, payload){
        let map = {};
        payload.forEach(item => map[item.id] = item);
        state.itemsById = map;
    }
    setListLoaded(state, payload){
        state.loaded = payload
    }
    setLoading(state, payload){
        state.loading = payload;
    }
    incrementPage(state){
        state.page = state.page + 1
    }
    get state(){
        return {
            list:[],
            itemsById:{},
            page:0,
            loading:false,
            error:null,
            loaded:false

        }
    }


    get mutations(){
        return {
            setInitializedData:this.setInitializedData,
            appendInitializedData:this.appendInitializedData,
            setLoading:this.setLoading,
            incrementPage:this.incrementPage,
            setListLoaded: this.setListLoaded,
            setInitializedItemsById: this.setInitializedItemsById

        }
    }

    get actions(){
        return {
            init: this.initializeList,
            initData: this.initializeData

        }
    }

    get getters(){

        return {


        }

    }
    get vuexStore(){

        return {
            namespaced: true,
            state: this.state,
            mutations: this.mutations,
            actions: this.actions,
            getters: this.getters

        }

    }

}
