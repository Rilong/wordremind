<template>
  <v-card class="grey lighten-5 mb-3">
    <v-card-title>
      <v-layout>
        <v-flex>
          <span class="pointer" @click="showTranslation = !showTranslation">{{sentence}}</span>
          <br>
          <span v-if="showTranslation" class="grey--text text--lighten-1">{{sentenceTranslated}}</span>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-btn small color="warning" @click="showEdit = !showEdit" class="clearMargin mr-2">Edit</v-btn>
      <v-btn small color="error" class="clearMargin" @click="deleteSentence">Delete</v-btn>
    </v-card-title>
    <v-card-actions v-if="showEdit">
      <v-layout>
        <v-flex xs6>
          <v-text-field class="mr-1" v-model="sentence" label="Sentence"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field class="ml-1" v-model="sentenceTranslated" label="Sentence translated"></v-text-field>
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
    props: {
      index: {
        type: Number
      },
      current: {
        type: Object
      },
      mode: {
        type: String,
        default: ''
      }

    },
    data () {
      return {
        showEdit: false,
        showTranslation: false,
        sentence: '',
        sentenceTranslated: ''
      }
    },
    methods: {
      saveSentence () {
        if (this.mode !== 'editing') {
          this.$store.dispatch('updateTmpSentences', {
            sentence: this.sentence,
            translated: this.sentenceTranslated.text,
            index: this.index
          })
          this.showEdit = false
        } else {
          this.$store.dispatch('editAdded', {
            sentence: this.sentence,
            translated: this.sentenceTranslated.text,
            index: this.index
          })
          this.showEdit = false
        }
      },
      deleteSentence () {
        if (this.mode === 'editing') {
          this.$store.dispatch('deleteAdded', this.index)
        } else {
          this.$store.dispatch('deleteTmpSentences', {index: this.index})
        }
      }
    },
    created () {
      this.sentence = this.current.sentence
      this.sentenceTranslated = this.current.translated.text
    }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>