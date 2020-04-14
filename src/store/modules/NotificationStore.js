import {ListMixin} from "./prototype/listGeneric";
import apiGeneric from "./prototype/apiGeneric";
import {apiData} from "../../utils/api";

export class NotificationStore extends ListMixin(apiGeneric, `/rest/v2/notification`) {
    //MUTATIONS
    NotificationsIsChecked(state){
        const {list} = state;
        return Object.values(list).some( (el) => el.read)
    }
    SetNotificationsIsChecked(state){
        const {list} = state;
        list.forEach(el => el.read = true);
        state.unread = false
    }
    setCounter(state, payload){
        state.unread = payload
    }
    //ACTIONS
    async ReadNotifications({commit}){

       try {
           await apiData({URL:`/rest/v2/notification`, METHOD:'put'});
           commit('SetNotificationsIsChecked')
       } catch (e) {
           console.trace(e)
       }


    }

    async getUnreadNotificationsValue({commit}){

        try {
            const {data} = await apiData({URL:`/rest/v2/notification/gotnew`, METHOD:'get'});
            console.log(data);
            commit('setCounter', data)
        } catch (e) {
            console.trace(e)
        }


    }
    get state(){
        return {
            ...super.state,
            unread:false
        }
    }
    get getters(){
        return {
            ...super.getters,
            NotificationsIsChecked: this.NotificationsIsChecked
        }
    }
    get actions(){
        return {
            ...super.actions,
            getUnreadNotificationsValue: this.getUnreadNotificationsValue,
            ReadNotifications: this.ReadNotifications
        }
    }
    get mutations(){
        return {
            ...super.mutations,
            SetNotificationsIsChecked:this.SetNotificationsIsChecked,
            setCounter: this.setCounter
        }
    }
}

let store = new NotificationStore();

export const Notifications = store.vuexStore;
