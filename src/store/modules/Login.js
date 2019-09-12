
import axios from 'axios';
import {vueApp} from './../../main'
import Vue from 'vue'

// import {appVue} from './../../app'




const formMeta = {
  input_username: {defValue: ''},
  input_userpassword: {defValue: ''},
  input_password:{defValue: ''},
  input_passwordconf:{defValue: ''},
  input_login: {defValue: ''},
  input_firstname: {defValue: ''},
  input_lastname: {defValue: ''},
  input_phone: {defValue: ''},
  input_mail: {defValue: ''}
}

function generateActions(){
  let actions = {};

  Object.keys(formMeta).forEach(key=>{
       let action = ({commit}, value) =>{
          commit(`onFormChange`, {key, value});
      }
      actions[`inputUpdate_${key}`] = action;
  });
  return actions;
};
let generateState = () => {
    let state = {};
    Object.entries(formMeta).map(([key, meta]) =>{
    state[key] = meta.defValue || '';
    });
    return state;
}

export const UserModel = formMeta;
let errorFields = [['field_login', ''],['field_password', ''],['passConfirm', ''],['email', '']];
export default  {
  namespaced:true,
  state: {
    errors: (()=>{
      let map = {};
      for (let [i,v] of errorFields){
        map[i] = v;
      }
      return map;
    })(),
    account: generateState(),
    name:'',
    password:'',
    rules: {

    }
  },
  getters: {
  },
  mutations: {
    errorMessages(state, e) {
      state.errors  = e
    },
    updateValidation(state, error) {
      Vue.set(state, 'errors', error)
    },
    refreshRegistration (state, e){
      Vue.set(state.account, 'input_passwordconf', '')
      Vue.set(state.account, 'input_username', '')
      Vue.set(state.account, 'input_userpassword', '')
      Vue.set(state.account, 'input_mail', '')
    },
    clearValidation(state, error) {
      Vue.set(state.errors, 'field_login', '')
      Vue.set(state.errors, 'field_password', '')
      Vue.set(state.errors, 'passConfirm', '')
      Vue.set(state.errors, 'email', '')
      Vue.set(state.errors, 'login', '')
      Vue.set(state.errors, 'pass', '')
    },
    updateLog(state, login){
      state.account.input_username = login
    },
    onFormChange(state, {key, value}){
        formMeta[key] = value;
        state.account[key] = value;
    }
  },

  actions: {
      formUpdate(e, updatedValue) {
    },

    ...generateActions(),

    userLogin({ dispatch, commit, getters, rootGetters }, c) {
        const authRequired = rootGetters['authentication/isAuthenticated']
        const params = new URLSearchParams();
        params.append('field_email', formMeta.input_mail);
        params.append('field_password', formMeta.input_password);
        axios.post(`${process.env.VUE_APP_MAIN_API}/auth/login`, params)
            .then(function(response){
                if (response.status === 200) {
                    this.commit("authentication/setAuthenticated", true)
                    vueApp.$router.push('/pollFeed');
                    this.commit('Login/clearValidation')
                }
          }.bind(this))
            .catch((error) => {
                let er = this.state.Login.errors;
                for (let {field: f, errorCode: v} of error.response.data){
                    er[f] = v
                }
                commit('updateValidation', er)
            });
    },
    userRegistration({commit,dispatch}, e) {
        const params = new URLSearchParams();
        params.append('login', formMeta.input_username);
        params.append('pass', formMeta.input_userpassword);
        params.append('passConfirm', formMeta.input_passwordconf);
        params.append('email', formMeta.input_mail);
        axios.post(`${process.env.VUE_APP_MAIN_API}/auth/register`, params)
            .then(function(response){
                if (response.status === 200) {
                  vueApp.$router.push('/login/sign');
                  this.commit('Login/refreshRegistration')
                }
            }.bind(this))
            .catch((error) => {
              let er = this.state.Login.errors;
              for (let {field: f, errorCode: v} of error.response.data){
                er[f] = v
              }
              commit('updateValidation', er)

      });
    }
  },
}
