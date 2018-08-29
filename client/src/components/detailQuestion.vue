<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 >
        <v-card>
          <v-toolbar color="white" dark>
              <v-toolbar-title class="black--text">{{oneQuestion.owner.username}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title class="black--text">{{formatedDate(oneQuestion.createdAt)}}</v-toolbar-title>
          </v-toolbar>
                <br>
                <h3>{{oneQuestion.title}}</h3><br>
                <p v-html="oneQuestion.question"></p>
          <v-card-actions>
            <v-btn flat color="orange" @click="openModalEdit(oneQuestion)">Edit</v-btn>
            <v-btn flat color="orange" @click="deleteQuestion(oneQuestion._id)">Delete</v-btn>
            <v-spacer></v-spacer>
              <v-btn flat icon color="black" @click="upVoteQuestion(oneQuestion._id)">
                  <i class="fas fa-thumbs-up fa-2x"></i>
              </v-btn>
                {{oneQuestion.vote}}
                <v-btn flat icon color="black" @click="downVoteQuestion(oneQuestion._id)">
                    <i class="fas fa-thumbs-down fa-2x"></i>
                </v-btn>
          </v-card-actions>
        </v-card>
        <br><br>
        <h3  class="text-sm-left">Answer</h3>
        <v-divider></v-divider>
        <br>

        <v-card v-for="(answer,index) in oneQuestion.answer" :key=index>
            <v-toolbar color="white" dark>
                <v-toolbar-title class="black--text">{{answer.owner.username}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-text class="black--text">{{formatedDate(answer.createdAt)}}</v-toolbar-text>
            </v-toolbar>
                <br>
                <br>
                <p v-html="answer.answer"></p>
            <v-card-actions>
                <v-btn flat color="orange" @click="openModalEditAnswer(answer)">Edit</v-btn>
                <!-- <v-btn flat color="orange">Delete</v-btn> -->
                <v-spacer></v-spacer>
                    <v-btn flat icon color="black" @click="upVoteAnswer(answer)">
                        <i class="fas fa-thumbs-up fa-2x"></i>
                    </v-btn>
                    {{answer.vote}}
                <v-btn flat icon color="black" @click="downVoteAnswer(answer)">
                    <i class="fas fa-thumbs-down fa-2x"></i>
                </v-btn>
          </v-card-actions>
        </v-card>
          <br><br>
          <wysiwyg v-model="inputAnswer"  style="border:solid" />
            <v-btn outline @click="addAnswer(oneQuestion._id)" color="black">Post Your Answer</v-btn>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data(){
      return {
          
      }
  },
  methods: {
    ...mapActions([
        'getOneQuestion',
        'getAllQuestion',
        'openModalEdit',
        'deleteQuestion', 
        'upVoteQuestion', 
        'downVoteQuestion', 
        'addAnswer',
        'openModalEditAnswer',
        'upVoteAnswer',
        'downVoteAnswer'
    ]),
    totalVote(val){
      let up = val.votersUpId.length
      let down = val.votersDownId.length
      let total = up - down
      if(total < 0){
          return 0
      }else{
          return total
      }
        },
      formatedDate(strDate) {
        const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
        };
        const date = new Date(strDate);
        return (
        date.toLocaleDateString("en-US", options) + ',' + date.toLocaleTimeString()
        );
      },
    },
    computed :{
      ...mapState([
          'oneQuestion'
      ]),
      inputAnswer: {
        get(){
          return this.$store.state.answer
        },
        set (value) {
          this.$store.commit('setAnswer', value)
        }
      }
    },
    mounted () {
      this.getAllQuestion()
      if(this.$route.params.id !== undefined){
          this.getOneQuestion(this.$route.params.id)
      }
    },
    watch: {
      '$route' (to, from){
          if(this.$route.params.id == undefined){
              this.getAllQuestion()
          }
      },
       
    }
}
</script>

<style>

</style>
