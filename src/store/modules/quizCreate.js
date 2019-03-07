
import axios from 'axios';
import {store} from './../../store/store'
import {vueApp} from './../../app'
import Vue from 'vue';

export const quizCreate = {
  namespaced:true,
  state: {
    phantom: {
      date:'',
      subject_header:'',
      subject:'',
      description:'',
      picture:'',
      end_time:null,
      end_date:null,
      tags:'',
      options:[
        {
          id:'',
          picture:'',
          description:''
        },
        {
          id:'',
          picture:'',
          description:''
        },
      ],
    },
    quiz:[
      {
        picture: [],
        pictures:[null, null],
        ruleForm: {
          date:'',
          subject_header:'',
          subject:'',
          description:'',
          picture:'',
          end_time:null,
          end_date:null,
          tags:'',
          type_of_poll:'0',
          options:[
            {
              id:'',
              picture:'',
              description:''
            },
            {
              id:'',
              picture:'',
              description:''
            },
          ],
      },

        rules: {
          end_time: [
            {
            type:'date',
            required: true,
            message: 'Впишите время закрытия',
            trigger: 'change'
          },
          ],
          subject_header: [
            {
             required: true,
             message: 'Впишите название темы',
             trigger: 'blur'
            },
          ],
          subject: [
          {
            required: true,
            message: 'Впишите название вопроса',
            trigger: 'blur'
          },
          {
            min: 2, max: 256,
            message: 'Введите от 2 до 256 символов',
            trigger: 'blur'
          }
          ],
        }
      },
    ]
  },


  getters: {

  },
  mutations: {
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
      },
      beforeRemove(file, fileList) {
      },
      ADD_option(state){
          state.quiz[0].ruleForm.options.push({id:'', picture:'', description:''})
      },
      REMOVE_option(state){
          state.quiz[0].ruleForm.options.pop({id:'', picture:'', description:''})
          state.quiz[0].pictures.pop()
      },
      ADD_picture(state){
         state.quiz[0].pictures.push(null)
      },
      updateSubject(state, subject) {
        state.quiz[0].ruleForm.subject = subject
      },
      updateDescription(state, description) {
        state.quiz[0].ruleForm.description = description
      },
      updateoptions(state, arr) {
        state.quiz[0].ruleForm.options[arr.key].description = arr.description
      },
      updateTags(state, tags) {
        state.quiz[0].ruleForm.tags = tags
      },
      handleFileImage(state, e) {
        state.quiz[0].picture = e
      },
      handleRemove(state) {
          Vue.set(state.quiz[0],'picture', [])
      },
      handleoption(state, {file, key}) {
        state.quiz[0].pictures[key] = file
      },
        someMutation(state) {
          Vue.set(state.quiz[0], 'ruleForm', state.phantom)
          Vue.set(state.quiz[0], 'picture', [])
          Vue.set(state.quiz[0], 'pictures', [null, null])
      },
   },
  actions: {
    simpleQuizCreate(e, key) {
      var bodyFormData = new FormData();
      const form = new Blob([JSON.stringify(key)], { type: "application/json"})
      bodyFormData.append('form', form)
      let {pictures} = e.state.quiz[0];
      for (let pic of pictures){
        bodyFormData.append('files[]', pic);
      }
      bodyFormData.append('file', e.state.quiz[0].picture)

      const config = {
      headers: {
          'content-type': 'multipart/mixed'
            }
          }
          axios.post('/api/rest/quiz/create', bodyFormData, config)
              .then(function(response){
                  if (response.status === 200) {
                    store.commit('quizCreate/someMutation')
                      vueApp.$router.push({ name: 'pollFeed'})
                  }
              }.bind(this))
      },
   }
}
