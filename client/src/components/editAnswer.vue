<template>
        <v-layout row justify-center>
  <v-dialog v-model="dialogEditAnswer" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card class="white">
      <v-toolbar class="grey darken-3">
          <v-btn icon dark @click.native="dialogEditAnswer = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialogEdit= false">Save</v-btn>
          </v-toolbar-items>
      </v-toolbar>
    <v-container fluid>
    <v-list two-line subheader>
       <v-subheader>Edit Answer</v-subheader>
     
      <v-list-tile >
        Your Question: 
      </v-list-tile>
    </v-list>
     <wysiwyg v-model="inputAnswer" style="border:solid" />
     <v-flex xs2>
       <br>
     <v-btn outline color="black" @click="editAnswer(idAnswer)" >Submit</v-btn>
     </v-flex>
  </v-container> 
  </v-card>
</v-dialog>
</v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    methods: {
      ...mapActions([
          'editAnswer'
      ])
    },
    computed: {
      dialogEditAnswer: {
        get () {
            return this.$store.state.dialogEditAnswer
        },
        set () {
            this.$store.commit('setDialogEditAnswer', false)
        }
      },
      ...mapState([
        'title','answer', 'idAnswer'
      ]),
      inputAnswer: {
        get () {
          return this.$store.state.answer
        },
        set (value) {
          this.$store.commit('setAnswer', value)
        }
      },
    }
}
</script>

<style>

</style>
