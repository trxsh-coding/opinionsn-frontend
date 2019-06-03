export const notificationPageList = (sc, listUrl) => class extends sc {


    onListReceived({state, commit, dispatch}, payload={}){
            console.log(payload)
            commit('setLoading', true);

            if(state.page != 0) {


                commit('notificationStore/prependToStores', payload.responseData,{root: true})


            } else {

                commit('notificationStore/updateStores', payload.responseData,{root: true})


            }

        commit('setNextPage');

        if(!payload.responseData.length) {

            commit('setLoadedTrigger')

        }


        dispatch('verifyStores', payload.responseData)

        let {customUrl = '/messages/notification', data={}, method='get'} = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'setNotification', successType: 'action'}, method);

        commit('setLoaded')

    };

    setNextPage(state){

        state.page += 1;

    }

    setDefaultPage(state){

        state.page = 0;

    }

    setLoadedTrigger(state){

        state.loaded = true;

    }

    setLoading(state, payload) {

        state.loading = true;

    }

    appendToItems(state, payload){
        console.log('im here')
        console.log(payload)
        state.items = [...state.items, ...payload];
    }

    setLoaded(state, payload){

        state.loading = false;

    }

    listItemsAction({state, commit, dispatch}, payload={}){


        let {customUrl, data={}, method='get', onSuccess = 'onListReceived', params} = payload;

        sc.apiRequest(customUrl || listUrl, data, {commit, dispatch, onSuccess, successType: 'action', method, params});
    }


    longPollingAction({state, commit, dispatch}, payload={}){


        let {customUrl = '/messages/notification', data={}, method='get'} = payload;

        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'setNotification', successType: 'action'}, method);


    };

    getNotificationPoll({commit, dispatch}, payload={}){
        console.log('getpayload')
        console.log(payload)
        let body = payload;
        let {customUrl = `/api/rest/info/poll/notification`, data=body, method='post'} = payload;
        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess:'appendToStore', successType: 'action'}, method);
    }

    getNotificationInitiator({commit, dispatch}, payload={}){
        let body = payload;
        let {customUrl = `/api/rest/info/user/notification`, data=body, method='post', } = payload;
        sc.apiRequest(customUrl, data,{commit, dispatch, onSuccess: 'appendToStore', successType: 'action'}, method);

    };



 /** MUTATIONS **/

 verifyStores({dispatch, commit, state}, payload){
     console.log('VERIFY PLEASE')
     console.log(payload)
     payload.forEach(({userId, initiatorId, targetId})=>{
         state.usersToVerify = [...state.usersToVerify, userId];
         state.usersToVerify = Array.from(new Set([...state.usersToVerify, initiatorId]));
         if(targetId){
             state.pollsToVerify = Array.from(new Set([...state.pollsToVerify, targetId]));
         }

     });
     let usersToVerify = {action: 'notificationPage/getNotificationInitiator',payload: state.usersToVerify};
     let pollsToVerify =  {action: 'notificationPage/getNotificationPoll',payload: state.pollsToVerify};
     dispatch('notificationStore/verifyStore', {entries: usersToVerify, storeName: 'users'}, {root: true});
     dispatch('notificationStore/verifyStore', {entries: pollsToVerify, storeName: 'polls'}, {root: true});

 }



 setNotification({dispatch, commit,state}, payload){

     let {responseData} = payload;
     let {userId, initiatorId, targetId} = responseData.messages[0];

    if(responseData.messages[0].read !== undefined){

        dispatch('verifyStores', responseData.messages)
        commit('appendToItems', responseData.messages)
        state.counter+= 1 ;
        commit('appendToStores', responseData)
        dispatch('longPollingAction')

    } else {

        dispatch('longPollingAction')


    }




 }

    appendToStore({state, commit}, args){
        let {responseData: data, requestData: payload} = args;

        let mapKey = Object.keys(data)[0]
        // state.items.forEach(i=>{map[i.id]=i});
        // state.itemsById = map;
        commit(`notificationStore/appendToStores`, {

                mapName: mapKey,
                payload: Object.values(data)[0]

            },
            {root: true}



        );


    }
    get state(){
        return {
            ...super.state,
            page: 0,
            read:true,
            loaded:false,
            counter:0,
            items:[],
            loading:false,
            usersToVerify:[],
            pollsToVerify:[],
            itemsById:[]


        }
    }


    get mutations(){
        return {
            ...super.mutations,
            setNextPage: this.setNextPage,
            setLoadedTrigger: this.setLoadedTrigger,
            setLoading: this.setLoading,
            setDefaultPage: this.setDefaultPage,
            setLoaded: this.setLoaded,
            appendToItems: this.appendToItems
        }
    }

    get actions(){
        return {
            ...super.actions,
            verifyStores: this.verifyStores,
            list: this.listItemsAction,
            onListReceived: this.onListReceived,
            setNotification:this.setNotification,
            longPollingAction: this.longPollingAction,
            getNotificationInitiator: this.getNotificationInitiator,
            getNotificationPoll: this.getNotificationPoll,
            appendToStore: this.appendToStore
        }
    }

};
