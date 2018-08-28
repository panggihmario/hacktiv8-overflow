<template>
  <v-toolbar class="grey darken-3">
    <v-toolbar-side-icon class="white--text"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat class="white--text">Link One</v-btn>
      <v-btn flat class="white--text">Link Two</v-btn>
      <v-btn flat class="white--text" @click="openModalLogin">Sign in/Sign Up</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
	methods: {
		...mapActions([
			"openModalLogin"
		])
	}
}
</script>

<style>

</style>
