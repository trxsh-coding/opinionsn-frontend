
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

        appendToStores: function(state, payload){
            state.messages = [payload, ...state.messages ];
        },

        prependToStores: function(state, payload){
            state.messages = [...state.messages, payload ];
        },

        updateStores: function (state, payload) {

            state.messages = payload;


        },


        clearStores:function (state) {

            state.messages = [];

        }

    },
    actions: {

    },

};
