<template>
  <v-toolbar class="grey darken-3">
    <v-toolbar-side-icon class="white--text"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text" v-if="statusLogin">{{userLogin}}</v-toolbar-title>
    <v-spacer></v-spacer>{{statusLogin}}
    <v-toolbar-items class="hidden-sm-and-down" v-if="!statusLogin">
      <v-btn flat class="white--text" @click="openModalLogin">Sign in/Sign Up</v-btn>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-sm-and-down" v-else>
      <v-btn flat class="white--text" @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
	methods: {
		...mapActions([
			"openModalLogin","logout"
		])
  },
  computed: {
    ...mapState([
      'statusLogin', 'userLogin'
    ]),
  },
  created(){
    let token = localStorage.getItem('token')
    let name = localStorage.getItem('name')
    if(token){
      this.$store.commit('setStatusLogin',true)
      this.$store.commit('setUserLogin',name)
    }
  }
}
</script>

<style>

</style>
