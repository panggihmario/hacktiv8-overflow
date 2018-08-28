import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialogLogin: false,
    dialogEdit: false,
    username: '',
    email: '',
    emailLogin: '',
    passwordLogin: '',
    password: '',
    title:'',
    question: '',
    questions: [],
    oneQuestion: {},
    idEdit: ''
  },
  mutations: {
    setDialogLogin (state, payload) {
      state.dialogLogin = payload
    },
    setDialogEdit (state, payload) {
      state.dialogEdit = payload
    },
    setUsername (state, payload) {
      state.username = payload
    },
    setEmail (state, payload) {
      state.email = payload
    },
    setEmailLogin (state, payload) {
      state.emailLogin = payload
    },
    setPassword (state, payload) {
      state.password = payload
    },
    setPasswordLogin (state, payload) {
      state.passwordLogin = payload
    },
    setTitle (state, payload) {
      state.title = payload
    },
    setQuestion (state, payload) {
      state.question = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
    },
    setOneQuestion (state, payload) {
      state.oneQuestion = payload
    },
    setIdQuestion (state, payload){
      state.idEdit = payload
    }
  },
  actions: {
    openModalLogin (context) {
      context.commit('setDialogLogin', true)
    },
    openModalEdit (context,data) {
      context.commit('setDialogEdit', true)
      context.commit('setTitle', data.title)
      context.commit('setQuestion', data.question)
      context.commit('setIdQuestion', data._id)

    },
    register (context) {
      axios.post('http://localhost:3000/users/register', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(dataUser => {
        console.log(dataUser)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    login (context) {
      axios.post('http://localhost:3000/users/login', {
        email: this.state.emailLogin,
        password: this.state.passwordLogin
      })
      .then(dataUser => {
        let token = dataUser.data.authorization
        localStorage.setItem('token',token)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    addQuestion (context) {
      let token = localStorage.getItem('token')
      axios.post('http://localhost:3000/question/add',{
        title: this.state.title,
        question: this.state.question
      },{
        headers: {
          authorization: token
        }
      })
      .then(question => {
        console.log(question)
      })
      .catch(err =>{
        console.log(err.response)
      })
    },
    getAllQuestion (context) {
      axios.get('http://localhost:3000/question/allQuestion')
      .then(allQuestion => {
        context.commit('setQuestions', allQuestion.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    getOneQuestion (context, id) {
      axios.get(`http://localhost:3000/question/${id}`)
      .then(question => {
        console.log(question)
        context.commit('setOneQuestion',question.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    editQuestion (context, id) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/question/edit/${id}`,{
        title: this.state.title,
        question: this.state.question
      },{
        headers: {
          authorization: token
        }
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    deleteQuestion (context, id) {
      let token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/question/delete/${id}`,{
        headers: {
          authorization: token
        }
      })
      .then(response => {
        console.log(response)
      })
      .catch(err =>{
        console.log(err.response)
      })
    }
  }
})
