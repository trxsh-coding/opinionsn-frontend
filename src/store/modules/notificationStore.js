
export const notificationStorages = [

    {name: 'message'},

];

notificationStorages.forEach(meta=> {
    if (!meta.multiple) meta.multiple = `${meta.name}s`;
});

export const notificationStorageNames = notificationStorages.map(({multiple}) => multiple);


const defaultState = {};


notificationStorageNames.forEach(x=>{
    defaultState[x] = {};
});

export const notificationStore  =  {

    namespaced: true,
    state: {
        ...defaultState,
    },
    mutations: {

        //TODO Do inplace update of elements of the store rather than stores themselves

        /**
         * Updates all the stores that came with the request
         * @param state
         * @param payload
         */

        updateStores: function(state, payload){
            console.log('state')
            console.log(state)

            console.log(state.messages)

            state.messages = payload

            // for (let name of notificationStorageNames){
            //
            //     // If we don't have that map, just skip it
            //     if (!state[name]) continue;
            //     if (!payload[name]) continue;
            //     let map = payload[name];
            //     if (Object.keys(map).length){
            //         state[name] = {...state[name], ...map};
            //     }
            //
            // }
        },



    },
    actions: {

    },

};
