<template>
  <v-card class="grey lighten-5 mb-3">
    <v-card-title>
      <v-layout>
        <v-flex>
          <span class="pointer" @click="showTranslation = !showTranslation">Lorem ipsum</span>
          <br>
          <span v-if="showTranslation" class="grey--text text--lighten-1">тест</span>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-btn small color="warning" class="clearMargin mr-2">Edit</v-btn>
      <v-btn small color="error" class="clearMargin">Delete</v-btn>
    </v-card-title>
    <v-card-actions v-if="showEdit">
      <v-layout>
        <v-flex xs6>
          <v-text-field class="mr-1" label="Sentence"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field class="ml-1" label="Sentence translated"></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: [],
    data () {
      return {
        showEdit: false,
        showTranslation: false
      }
    }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>