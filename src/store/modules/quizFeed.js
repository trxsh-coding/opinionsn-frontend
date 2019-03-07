import axios from 'axios';
import {vueApp} from './../../app'
import Vue from 'vue'
export default  {
  namespaced:true,
  state: {
    limit: false,
    page: 0,
    quiz: [],
    showoptions:[],
    loading: false,
    ihs: null,
    explainPage:1,
    quizPage: 1
  },
  mutations: {
    updateQuizComments(state, e) {
      Vue.set(state.quiz[e.e.quizIndex].explain, e.e.explainIndex, e.response.data);
      Vue.set(state.quiz[e.e.quizIndex].explain[e.e.explainIndex], 'comment', "");
      Vue.set(state.quiz[e.e.quizIndex], 'totalAmountOfComments', state.quiz[e.e.quizIndex].totalAmountOfComments+ 1);
    },
    updateQuizExplains(state, e) {
      let currQuiz = state.quiz[e.response.config.index]
      Vue.set(currQuiz, 'explain', e.response.data)
      let explainsCount = (currQuiz.explain || []).length;
      Vue.set(currQuiz, 'totalAmountOfExplains', explainsCount);

    },
    incrementQuizState($state){
      $state.page += 1
    },
    updateoptionVoted(state) {
      state.quiz[arrayID].optionVoted = true
    },
    updateQuizState(state, key){
      Vue.set(state.quiz, key.e.index, key.response.data)
    },
    refreshComments(state, key){
      Vue.set(state.quiz[key.index].explain[key.indexExplain], 'comment', '')
    },
    setItems(state, list){
      for (let item of list){
        state.quiz.push(item)
      }

    },
    pushOtherComments(state, payload){
      let quizID = payload.index.quizID;
      let explainID = payload.index.explainID;
      let comments = payload.response.data
      for (let item of comments){
        state.quiz[quizID].explain[explainID].comments.push(item)
      }
      state.explainPage +=1

      // console.log(payload)
    },
    pushOtherExplains(state, payload){

      console.log(payload)
      let quizID = payload.index.quizID;
      let cell = payload.index.cell;
      let explains = payload.response.data
      console.log(cell)
      for (let item of explains){
        state.quiz[cell].explain.push(item)
      }
      state.quizPage +=1
      console.log('hello')
    },
    updateExplains(state, key){
      state.quiz[key.index].explanation = key.updatedValue
    },
    updateComments(state, key){
      state.quiz[key.index].explain[key.indexExplain].comment = key.updatedValue
    },
    switchCommentForm(state, pl){
      console.log(pl)
      let {index, indexExplain} = pl;
      Vue.set(state.quiz[index], 'explainedIndex', indexExplain);

    },
    markQuizAsFixed(state, payload){
      state.quiz[payload.index].haveExplain = true;
    },
    pushComment(state, {comment, quizIndex, explainIndex}){
        state.quiz[quizIndex].explain[explainIndex].comments.push(comment);
    },

    setLoading(state, pl){
      let {ihs=state.ihs, loading=state.loading} = pl;
      // console.log(`setLoading`);
      // console.log({ihs, loading, limit: state.limit});
      state.ihs=ihs;
      state.loading = loading;
    },
    setPage(state, page){
      state.page = page;
    },
    reset(state){
     state.quiz = [];
     state.limit = false;
    }
  },
  getters: {

  },
  actions: {
    userVote({ dispatch, commit}, key) {
      const params = new URLSearchParams();
      params.append('optionID', key.optionID);
      params.append('quizID', key.quizID);
        axios.post('/api/rest/vote/create/', params, key)
            .then(function(response){
                if (response.status === 200) {
                  return dispatch('updateQuiz', key)
                }
              }.bind(this))
    },
    pushExplains({dispatch, commit}, store) {
      let a = {
        description : store.item.explanation,
        quizID : store.item.id,

      };
      axios.post('/api/rest/explain/save/', a, store)
          .then(function(response, respStore){
              if (response.status === 200) {
                commit("markQuizAsFixed", store);
                commit("updateQuizExplains", {response, respStore})
          }
      }.bind(this))
    },
    pushComments({dispatch, commit}, e ) {
      let a = {
        description : e.description,
        explainID: e.explainID
      };
      axios.post('/api/rest/comment/save/', a, e)
          .then(function(response, store){
              if (response.status === 200) {
                commit("updateQuizComments", {response, e});
          }
      }.bind(this))
    },
    showComments({dispatch, commit}, a){
      let explainPage = this.state.quizFeed.explainPage;
      axios.get('/api/rest/comment/'+ explainPage + '?event_id=' + a.explainID)
          .then(function(response){
            if (response.status === 200) {
              let index = {
                explainID: a.indexExplain,
                quizID: a.quizID
              };
              commit('pushOtherComments', {response, index})
            }
          }.bind(this))
    },
    showExplains({dispatch, commit}, a){
      let quizPage = this.state.quizFeed.quizPage;
      axios.get('/api/rest/explain/'+ quizPage + '?poll_id=' + a.quizID)
          .then(function(response){
            if (response.status === 200) {
              let index = {
                cell: a.index,
                quizID: a.quizID
              };
              commit('pushOtherExplains', {response, index})
            }
          }.bind(this))
    },
    getAllQuiz({dispatch, commit}, e){
      let page = this.state.quizFeed.page;
      commit('setLoading', {loading: true, ihs: e});
      axios.get('api/rest/feed/' + page,{
        params: {
          page:this.page
        }
      })
      .then(function(response){

        // console.log(`Длинна данных ${response.data.length}`);
        if (response.data.length > 0) {

          // console.log('data bolshe nulya');

          if (response.data.length < 5){
            Vue.set(this.state.quizFeed, 'limit', true);
          }

          commit('setItems', response.data);
        }  else {

        }

        let {quiz: quizzes} = this.state.quizFeed;

        commit('setLoading', {loading: false});
        // let {explain: explains} = this.state.quizFeed.quiz;
        for (let quiz of quizzes){
          Vue.set(quiz, 'explanation', '');
          Vue.set(quiz, 'explainedIndex', -1);
          for (let exp of quiz.explain){
            Vue.set(exp, 'comment', '');
          }
        }

        commit('updateQuizState', {response, e});

      }.bind(this))
    },
    getQuizByID({dispatch, commit}, e){
      axios.get('/api/rest/quiz/getQuiz/' + e)
      .then(function(response){
        commit('setItems', [response.data]);
        let {quiz: quizzes} = this.state.quizFeed;
        // let {explain: explains} = this.state.quizFeed.quiz;
        for (let quiz of quizzes){
          Vue.set(quiz, 'explanation', '');
          Vue.set(quiz, 'explainedIndex', -1);
          for (let exp of quiz.explain){
            Vue.set(exp, 'comment', '');
          }
        }
        commit('updateQuizState', {response, e})
      }.bind(this))
    },
    updateQuiz({dispatch, commit}, e){
      axios.get('/api/rest/quiz/getQuiz/' + e.quizID, e)
        .then(function(response){
            if (response.status === 200) {
              commit('updateQuizState', {response, e})
            }
      }.bind(this))
    },

    selectExplain({dispatch, commit}, payload){
      commit('switchCommentForm', payload);
    },
  }
}
