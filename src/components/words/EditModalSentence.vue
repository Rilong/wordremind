<template>
  <v-card class="grey lighten-5 mb-3">
    <v-card-title>
      <v-layout>
        <v-flex>
          <span class="pointer" @click="showTranslation = !showTranslation">{{sentenceT}}</span>
          <br>
          <span v-if="showTranslation" class="grey--text text--lighten-1">{{sentenceTTranslated}}</span>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-btn small color="warning" @click="showEdit = !showEdit" class="clearMargin mr-2">Edit</v-btn>
      <v-btn small color="error" class="clearMargin" @click="deleteSentence">Delete</v-btn>
    </v-card-title>
    <v-card-actions v-if="showEdit">
      <v-layout>
        <v-flex xs6>
          <v-text-field class="mr-1" v-model="sentenceT" label="Sentence"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field class="ml-1" v-model="sentenceTTranslated" label="Sentence translated"></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn color="success" @click="saveSentence">Save</v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ['sentence', 'id', 'index'],
    data () {
      return {
        showEdit: false,
        showTranslation: false,
        sentenceT: '',
        sentenceTTranslated: ''
      }
    },
    computed: {
      words () {
        return this.$store.getters.words
      }
    },
    methods: {
      deleteSentence () {
        this.$store.dispatch('sentenceDelete', this.sentence)
      },
      saveSentence () {

      }
    },
    created () {
      this.sentenceT = this.sentence.sentence_text
      this.sentenceTTranslated = this.sentence.sentence_translation
    }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>