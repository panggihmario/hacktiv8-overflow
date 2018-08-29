<template>
    <v-container>
        <v-list two-line v-for="(question,index) in questions" :key="index">
            <template>
            <v-list-tile >
                <v-list-tile-content>
                    <v-list-tile-title v-html="question.owner.username"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="question.title"> 
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-list-tile-action-text>{{formatedDate(question.createdAt)}}</v-list-tile-action-text>
                        <router-link :to="{name: 'question',params: {id: question._id}}" @click.native="getOneQuestion(question._id)"  class="black--text" style="text-decoration:none">
                            <i class="fas fa-info-circle"></i>
                    </router-link>
                </v-list-tile-action>
            </v-list-tile>
            </template>
            <v-divider></v-divider>
        </v-list>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    methods: {
        ...mapActions([
            'getAllQuestion', 'getOneQuestion'
        ]),
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
    mounted () {
        this.getAllQuestion()
        this.getOneQuestion()
    },
    computed: {
        ...mapState([
            'questions'
        ])
    }
}
</script>

<style>

</style>
