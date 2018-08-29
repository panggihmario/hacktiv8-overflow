<template>
  <v-container fluid>
    <v-list two-line subheader>
       <v-subheader>Add Question</v-subheader>
      <v-list-tile >
        <v-flex xs8>
          <v-text-field label="Title" v-model="inputTitle"></v-text-field>
        </v-flex>
      </v-list-tile>
      <v-list-tile >
        Your Question: 
      </v-list-tile>
    </v-list>
     <wysiwyg v-model="inputQuestion" style="border:solid" />
     <v-flex xs2>
       <br>
     <v-btn outline color="black" @click="addQuestion" >Submit</v-btn>
     </v-flex>
  </v-container> 
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  methods: {
    ...mapActions([
      'addQuestion'
    ])
  },
  computed: {
    ...mapState([
      'title','question'
    ]),
    inputTitle: {
      get () {
        return this.$store.state.title
      },
      set (value) {
        this.$store.commit('setTitle', value)
      }
    },
    inputQuestion: {
      get () {
        return this.$store.state.question
      },
      set (value) {
        this.$store.commit('setQuestion', value)
      }
    },

  }
}
</script>

<style>

</style>
