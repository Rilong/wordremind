<template>
  <v-card class="grey lighten-5 mb-3" v-if="!isDeleted">
    <v-card-title>
      <v-layout>
        <v-flex>
          <span class="pointer" @click="showTranslation = !showTranslation">{{sentenceT}}</span>
          <br>
          <span v-if="showTranslation" class="grey--text text--lighten-1">{{sentenceTTranslated}}</span>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-btn small color="warning" @click="showEdit = !showEdit" :disabled="localLoading" class="clearMargin mr-2">Edit</v-btn>
      <v-btn small color="error" class="clearMargin" :disabled="localLoading" :loading="localLoading" @click="deleteSentence">Delete</v-btn>
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
    props: ['sentence', 'id', 'changes'],
    data () {
      return {
        showEdit: false,
        showTranslation: false,
        sentenceT: '',
        sentenceTTranslated: '',
        restoredSentence: '',
        restoredTranslation: '',
        localLoading: false,
        isDeleted: false
      }
    },
    computed: {
      words () {
        return this.$store.getters.words
      },
      editing () {
        return this.$store.getters.getEditingSentences
      }
    },
    methods: {
      deleteSentence () {
        let obj = this.sentence
        obj['status'] = 'deleted'
        this.$store.dispatch('addEditingSentence', obj)
        this.isDeleted = true
      },
      saveSentence () {
        let obj = {
          sentence_id: this.sentence.sentence_id,
          sentence_text: this.sentenceT,
          sentence_translation: this.sentenceTTranslated,
          status: 'edited'
        }
        this.$store.dispatch('addEditingSentence', obj)
        this.showEdit = false
      }
    },
    watch: {
      changes () {
        if (this.changes === 'cancel') {
          if (this.isDeleted === true) {
            setTimeout(() => {
              this.isDeleted = false
            }, 500)
          }
          setTimeout(() => {
            this.sentenceT = this.sentence.sentence_text
            this.sentenceTTranslated = this.sentence.sentence_translation
          }, 500)
        }
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