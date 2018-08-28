<template>
    <v-container fluid>
        <v-layout>
      <v-flex xs12 >
        <v-card>
          <v-toolbar color="white" dark>
            <v-toolbar-title class="black--text">{{oneQuestion.owner.username}}</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-toolbar-title class="black--text">{{oneQuestion.createdAt}}</v-toolbar-title>
          </v-toolbar>
                <br>
                <h3>{{oneQuestion.title}}</h3><br>
                <p v-html="oneQuestion.question"></p>
          <v-card-actions>
            <v-btn flat color="orange" @click="openModalEdit(oneQuestion)">Edit</v-btn>
            <v-btn flat color="orange" @click="deleteQuestion(oneQuestion._id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
        <br><br>
        <wysiwyg   style="border:solid" />

      </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  methods: {
      ...mapActions([
          'getOneQuestion' ,'getAllQuestion', 'openModalEdit', 'deleteQuestion'
      ])
  },
  computed :{
      ...mapState([
          'oneQuestion'
      ])
  },
  mounted () {
      this.getOneQuestion()
      this.getAllQuestion()
  },
  watch: {
      '$route' (to, from){
          if(this.$route.params.id == undefined){
              this.getAllQuestion()
          }
      }
  }
}
</script>

<style>

</style>
