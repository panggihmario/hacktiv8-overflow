import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialogLogin: false,
    username: '',
    email: '',
    emailLogin: '',
    passwordLogin: '',
    password: '',
    title:'',
    question: ''
  },
  mutations: {
    setDialogLogin (state, payload) {
      state.dialogLogin = payload
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
    }
  },
  actions: {
    openModalLogin (context) {
      context.commit('setDialogLogin', true)
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
    }
  }
})
