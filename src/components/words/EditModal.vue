<template>
  <v-dialog width="800" v-model="modal">
    <v-btn slot="activator" color="warning btn-v-center" round>Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <h2 class="display-2">Edit</h2>
            <v-divider></v-divider>
            <v-form v-model="valid">
              <v-text-field
                      v-model="wordname"
                      label="Word"
                      required
              ></v-text-field>
              <v-text-field
                      v-model="wordtranslated"
                      label="Word translated"
                      required
              ></v-text-field>
              <v-layout>
                <v-flex xs9>
                  <v-text-field
                          v-model="sentence"
                          label="Sentence"
                  ></v-text-field>
                </v-flex>
                <v-flex xs3 class="text-xs-right">
                  <v-btn color="success" @click="onAddSentence" :loading="sentenceLoading" :disabled="sentenceLoading">Add sentence</v-btn>
                </v-flex>
              </v-layout>
              <sentence-card v-for="(sentence, index) in sentences" :changes="changes" :sentence="sentence" :id="id" :key="index"></sentence-card>
              <template v-if="tmpSentences">
                <sentence-tmp-card v-for="(sentence, key) in tmpSentences" :key="key + 'tmp'" :index="key" mode="editing" :current="sentence"></sentence-tmp-card>
              </template>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="onClose" :disabled="sentenceLoading" flat>Close</v-btn>
                <v-btn color="success" @click="onSave" :disabled="sentenceLoading" flat>Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import sentenceCard from './EditModalSentence'
  import sentenceTmpCard from './SentenceCard'
  export default {
    props: ['sentences', 'id'],
    data () {
      return {
        word: 'word',
        modal: false,
        wordname: '',
        wordtranslated: '',
        valid: false,
        sentenceLoading: false,
        sentence: '',
        changes: ''
      }
    },
    computed: {
      tmpSentences () {
        try {
          return this.$store.getters.getEditingSentences['added'] ? this.$store.getters.getEditingSentences['added'] : null
        } catch (e) {}
        return null
      }
    },
    methods: {
      onClose () {
        this.modal = false
        this.changes = 'cancel'
        this.$store.dispatch('clearEditingSentence')
      },
      onSave () {
        this.changes = 'save'
      },
      onAddSentence () {
        this.sentenceLoading = true
        this.$store.dispatch('addSentence', {wordId: this.id, sentence: this.sentence})
          .then(response => {
            this.sentenceLoading = false
          })
          .catch(e => {
            this.sentenceLoading = false
          })
      }
    },
    components: {
      sentenceCard,
      sentenceTmpCard
    },
    watch: {
      modal () {
        if (this.modal === false) {
          setTimeout(() => {
            this.changes = ''
          }, 500)
        }
      }
    }
  }
</script>

<style scoped>
  .btn-v-center {
    position: relative;
    top: 100%;
    margin-top: 0;
    margin-bottom: 0;
    transform: translateY(33%);
  }

  .gray-text {
    color: #BDBDBD;
  }
</style>