<template>
    <v-layout row justify-center>
  <v-dialog v-model="dialogEdit" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card class="white">
      <v-toolbar class="grey darken-3">
          <v-btn icon dark @click.native="dialogEdit = false" class="white--text">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Edit</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialogEdit= false" class="white--text">Save</v-btn>
          </v-toolbar-items>
      </v-toolbar>
    <v-container fluid>
    <v-list two-line subheader>
       <v-subheader>Edit Question</v-subheader>
      <v-list-tile >
        <v-flex xs8>
          <v-text-field label="Title"  v-model="inputTitle"></v-text-field>
        </v-flex>
      </v-list-tile>
      <v-list-tile >
        Your Question: 
      </v-list-tile>
    </v-list>
     <wysiwyg v-model="inputQuestion" style="border:solid" />
     <v-flex xs2>
       <br>
     <v-btn outline color="black" @click="editQuestion(idEdit)" >Submit</v-btn>
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
        'editQuestion'
      ])
    },
    computed: {
      dialogEdit: {
        get () {
            return this.$store.state.dialogEdit
        },
        set () {
            this.$store.commit('setDialogEdit', false)
        }
      },
      ...mapState([
        'title','question', 'idEdit'
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
