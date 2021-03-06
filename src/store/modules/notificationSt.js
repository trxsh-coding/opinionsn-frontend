
export const notificationStorages = [

    {name: 'message'},
    {name: 'user'},
    {name: 'poll'}

];

notificationStorages.forEach(meta=> {
    if (!meta.multiple) meta.multiple = `${meta.name}s`;
});

export const notificationStorageNames = notificationStorages.map(({multiple}) => multiple);


const defaultState = {};


notificationStorageNames.forEach(x=>{
    defaultState[x] = {};
});

export const notificationSt  =  {

    namespaced: true,
    state: {
        ...defaultState,
    },
    mutations: {

        //TODO Do inplace update of elements of the store rather than stores themselves

        /**
         * Updates all the stores that came with the request
         * @param state
         * @param mapName
         * @param payload
         */

        appendToStores: function(state, {mapName, payload}){
            if(mapName === "messages"){

            state.messages = [...payload,...state.messages];

        } else {

            let items = {}
            Object.values(payload).forEach(item => {items[item.id]= item})
            state[mapName] = {...state[mapName], ...items}

          }
        },

        prependToStores: function(state, payload){
            state.messages = [...state.messages, ...payload.messages ];
        },

        updateStores: function (state, payload) {
            state.messages = [...payload.messages];


        },


        updateArrayChild: function (state, {mapName, childName, payload}) {
            state[mapName].forEach((item =>{

                item[childName] = payload;

            } ))

        },

        clearStores:function (state) {

            state.messages = [];

        }

    },
    actions: {

        verifyStore: function({state, dispatch, commit}, payload){
            let {entries, storeName} = payload;
            let store = state[storeName];
                const missingOnes = [];
                for (let id of entries.payload){
                    if(!store[id]){
                        missingOnes.push(id);
                        // dispatch(entries.action, payload, {root: true});
                    }
                }
            if (missingOnes.length){
                dispatch(entries.action, missingOnes, {root: true});
                // Doesnt have these polls/users
                // missingOnes
            }


        }

    },

};
