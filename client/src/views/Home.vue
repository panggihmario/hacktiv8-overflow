<template>
<div id="app">
  <v-app id="inspire">
  <Navbar></Navbar>
  <Login></Login>
    
  <v-container fluid>
    
    <v-layout row>
      <Sidebar></Sidebar>
      <v-flex xs8 style="border-left:1px solid;border-right:1px solid">
  
            <router-view/>
      </v-flex>
      <v-flex xs2>
         <v-card dark tile flat color="yellow">
      <v-card-text>#3</v-card-text>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </v-app>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Login from '@/components/Login.vue'
export default {
  components: {
    Navbar, Sidebar, Login
  }
}
</script>
