<template>
<div id="app">
  
    <Navbar></Navbar>
    <Login></Login>
    <Edit></Edit>
    <EditAnswer></EditAnswer>
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
 
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Login from '@/components/Login.vue'
import Edit from '@/components/editQuestion.vue'
import EditAnswer from '@/components/editAnswer.vue'
export default {
  components: {
    Navbar, Sidebar, Login, Edit, EditAnswer
  }
}
</script>
