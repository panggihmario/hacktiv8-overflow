import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router.js'
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
    idEdit: '',
    errLogin: '',
    answer: '',
    dialogEditAnswer: false,
    idAnswer: '',
    statusLogin: false,
    userLogin: ''
  },
  mutations: {
    setUserLogin (state, payload) {
      state.userLogin = payload
    },
    setStatusLogin (state,payload) {
      state.statusLogin = payload
    },
    setDialogLogin (state, payload) {
      state.dialogLogin = payload
    },
    setDialogEdit (state, payload) {
      state.dialogEdit = payload
    },
    setDialogEditAnswer (state, payload) {
      state.dialogEditAnswer = payload
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
    },
    setAnswer (state, payload) {
      state.answer = payload
    },
    setIdAnswer (state, payload) {
      state.idAnswer = payload
    }
  },
  actions: {
    openModalLogin (context) {
      context.commit('setDialogLogin', true)
    },
    openModalEdit (context, data) {
      context.commit('setDialogEdit', true)
      context.commit('setTitle', data.title)
      context.commit('setQuestion', data.question)
      context.commit('setIdQuestion', data._id)

    },
    openModalEditAnswer (context, data){
      context.commit('setDialogEditAnswer', true)
      context.commit('setAnswer', data.answer)
      context.commit('setIdAnswer', data._id)
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
        localStorage.setItem('name',dataUser.data.login.username)
        localStorage.setItem('token', token)
        context.commit('setStatusLogin',true)
        context.commit('setUserLogin',dataUser.data.login.username)
        context.commit('setDialogLogin', false)
      })
      .catch(err => {
        this.state.errLogin = err.response.data.msg
        console.log(err.response)
      })
    },
    logout (context) {
      localStorage.clear()
      context.commit('setStatusLogin',false)
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
        this.state.title =''
        this.state.question = ''
        context.dispatch('getAllQuestion')
        router.push('/list')
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
        context.commit('setDialogEdit',false)
        context.dispatch('getOneQuestion',id)
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
        router.push('/list')
        context.dispatch('getAllQuestion')
        console.log(response)
      })
      .catch(err =>{
        console.log(err.response)
      })
    },
    upVoteQuestion (context, id) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/question/upvote/${id}`,{},{
        headers: {
          authorization: token
        }
      })
      .then(vote => {
        context.dispatch(`getOneQuestion`,id)
        router.push(`/${id}`)
        console.log(vote.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    downVoteQuestion (context, id) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/question/downvote/${id}`,{},{
        headers: {
          authorization: token
        }
      })
      .then(vote => {
        context.dispatch(`getOneQuestion`,id)
        router.push(`/${id}`)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    addAnswer (context, id) {
      let token = localStorage.getItem('token')
      axios.post(`http://localhost:3000/answer/add/${id}`,{
        answer: this.state.answer
      },{
        headers: {
          authorization: token
        }
      })
      .then(dataAnswer => {
        this.state.answer = ''
        context.dispatch(`getOneQuestion`,id)
        router.push(`/${id}`)
        console.log(dataAnswer)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    editAnswer (context, id) {
      let token = localStorage.getItem('token')
      console.log("ini id answer",id)
      axios.put(`http://localhost:3000/answer/edit/${id}`,{
        answer: this.state.answer
      },{
        headers: {
          authorization: token
        }
      })
      .then(dataEdit => {
        this.state.answer = ''
        context.dispatch(`getOneQuestion`,id)
        context.commit('setDialogEditAnswer')
        router.push(`/${id}`)
        console.log('success',dataEdit)
      })
      .catch(err =>{
        console.log(err.response)
      })
    },
    upVoteAnswer (context, data) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/answer/upvote/${data._id}`,{},{
        headers: {
          authorization: token
        }
      })
      .then(vote => {
        context.dispatch(`getOneQuestion`,data.question)
        context.commit('setDialogEditAnswer')
        router.push(`/${data.question}`)
        console.log('success',vote)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    downVoteAnswer (context, data) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/answer/downvote/${data._id}`,{},{
        headers: {
          authorization: token
        }
      })
      .then(vote => {
        context.dispatch(`getOneQuestion`,data.question)
        context.commit('setDialogEditAnswer')
        router.push(`/${data.question}`)
        console.log('succes',vote)
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  }
})
