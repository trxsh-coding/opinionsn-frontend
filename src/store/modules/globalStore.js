import axios from 'axios';
import {mapState} from 'vuex';

export const globalStorages = [
    {name: 'user'},
    {name: 'poll'},
    {name: 'vote'},
    {name: 'option'},
    {name: 'comment'},
    {name: 'following'},
    {name: 'mainUser', multiple:'mainUser'},
    {name: 'category', multiple: 'categories'},
];

globalStorages.forEach(meta=> {
   if (!meta.multiple) meta.multiple = `${meta.name}s`;
});

export const globalStorageNames = globalStorages.map(({multiple}) => multiple);

const defaultState = {};


globalStorageNames.forEach(x=>{
    defaultState[x] = {};
});

export const globalStoreMixin = (exclude = {}) =>({

    computed: {
        ...mapState('globalStore',{
            _globalStore: state=>state,
        }),

        ...(()=>{
            const cProps = {};
            for (let meta of globalStorages){
                let {name, multiple} = meta;
                if (exclude[name]) continue;

                // Rewrite those
                cProps[`${name}_id`] = function() { return 0};
                cProps[`${name}_ids`] = function() { return [0]};

                // Getters
                cProps[`${name}`] = function(){ return this._globalStore[multiple][this[`${name}_id`]]},
                cProps[`${multiple}`] = function(){ return this[`${name}_ids`].map(id => this._globalStore[multiple][id])},
                cProps[`${multiple}Map`] = function(){return this._globalStore[multiple]}
            }

            return cProps;
        })()
    }

});
//console.log(globalStoreMixin);
export const globalStore  =  {

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

        clearStores:function(state){

            Object.assign(state, defaultState)

        },

        updateStores: function(state, payload){

            for (let name of globalStorageNames){

                // If we don't have that map, just skip it
                if (!state[name]) continue;
                if (!payload[name]) continue;
                let map = payload[name];
                if (Object.keys(map).length){
                    state[name] = {...state[name], ...map};
                }

            }
        },

        setSessionUser(state, {user_id}) {

            let map = state.users[user_id];

            state.mainUser = map;


        },

        // setMyFollowings(state, {followings_ids}) {
        //     console.log('Это айди по которым я вытаскиваю объекты из мапы users')
        //     console.log(followings_ids)
        //
        //     let followings = {};
        //
        //     return followings_ids.map(following_id => {
        //
        //         let followings = state.users[following_id];
        //
        //         console.log('Это объект, который я хочу засунуть в мапу followings')
        //         console.log(followings)
        //
        //     });
        //
        //
        // },

        updateUserInfo(state, payload){
            let item = payload.item;
            let value = payload.value;
            state.mainUser[item] = value

        },



        changeStateItem(state, {mapName, parentId, item, payload}) {

            let map = state[mapName];

            if (!map) throw `No map '${map}' in globalStore`;

            let parentItem = map[parentId];

            if (!parentItem) throw `No item with id ${parentId} in ${mapName}`;

            parentItem[item] = payload;

        },


        addChildTo(state, {mapName, parentId, groupName, item}){

            let map = state[mapName];
            if (!map) throw `No map '${map}' in globalStore`;

            let parentItem = map[parentId];
            if (!parentItem) throw `No item with id ${parentId} in ${mapName}`;

            let group = parentItem[groupName];
            if (!group || group.length === undefined) throw `No such group '${groupName}' in ${mapName}.${parentId}.
             group: ${!!group},
             length: ${group && group.length}`;

            if (item.length) {


                for (let id of item) {

                    group.push(id);

                }

            }   else {

                group.push(item);

            }
            // Essentially this is this
            //state[mapName][parentId][group].append(item);
        },

        splitChildTo(state, {mapName, parentId, groupName, item}){

            let map = state[mapName];
            if (!map) throw `No map '${map}' in globalStore`;

            let parentItem = map[parentId];
            if (!parentItem) throw `No item with id ${parentId} in ${mapName}`;

            let group = parentItem[groupName];
            if (!group || group.length === undefined) throw `No such group '${groupName}' in ${mapName}.${parentId}.
             group: ${!!group},
             length: ${group && group.length}`;

            group = item;

        },


    },
    actions: {



        /**
         * If you need a dispatch for some reason
         * @param commit
         * @param state
         * @param payload
         */
        processStores: function({commit, state}, payload)  {
            commit('updateStore', payload);
        }
    },

};
