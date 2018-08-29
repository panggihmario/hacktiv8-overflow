<template>
  <v-flex xs2>
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        avatar
      >
        <v-list-tile-action>
          <i class="fas fa-home"></i>
        </v-list-tile-action>
        <v-list-tile-content>
       
        <router-link :to="{name: 'list'}"  class="black--text" style="text-decoration:none">  Home</router-link>
        </v-list-tile-content>
      </v-list-tile>
        <v-list-tile
        v-for="item in items"
        :key="item.title"
        avatar
      >
        <v-list-tile-action>
          <i class="fas fa-plus-circle"></i>
        </v-list-tile-action>
        <v-list-tile-content>
        <router-link :to="{name: 'add'}"  class="black--text" style="text-decoration:none">  Add</router-link>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-flex>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {icon: true}]
    }
  }
}
</script>

<style>

</style>
