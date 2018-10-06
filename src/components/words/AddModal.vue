<template>
  <v-dialog width="800" v-model="modal">
    <v-btn slot="activator" :disabled="loading" round color="success">Add word</v-btn>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <h2 class="display-2">Add word</h2>
            <v-divider></v-divider>
            <v-form v-model="valid">
              <v-layout>
                <v-flex xs12 wrap>
                  <v-text-field
                    v-model="wordname"
                    label="Word"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="wordtranslated"
                    label="Word translated"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="sentence"
                    label="Sentence"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="sentenceTranslated"
                    label="Sentence translation"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 class="text-xs-right">
                 <v-btn color="success" @click="onAddSentence" :loading="sentenceLoading" :disabled="sentenceLoading">Add sentence</v-btn>
                </v-flex>
              </v-layout>
              <v-layout v-if="sentences">
                <v-flex xs12>
                  <sentence-card v-for="(sentence, key) in sentences" :key="key" :index="key" :current="sentence"></sentence-card>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="onClose" flat :disabled="localLoading || sentenceLoading">Close</v-btn>
                <v-btn color="success" @click="onSave" flat :loading="loading" :disabled="loading || localLoading || sentenceLoading">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import sentenceCard from './SentenceCard'
  export default {
    data () {
      return {
        word: 'word',
        modal: false,
        wordname: '',
        wordtranslated: '',
        valid: false,
        localLoading: false,
        sentence: '',
        sentenceTranslated: '',
        editSentence: '',
        sentenceLoading: false
      }
    },
    computed: {
      sentences () {
        return this.$store.getters.tmpSentences
      },
      loading () {
        return this.$store.getters.loading
      },
      words () {
        return this.$store.getters.words
      }
    },
    methods: {
      onClose () {
        this.modal = false
        this.wordname = ''
        this.wordtranslated = ''
        this.sentence = ''
        this.sentenceTranslated = ''
        this.$store.dispatch('cleanTmpSentences')
      },
      onSave () {
        if (this.wordname) {
          let data = {
            userId: this.$store.getters.userId,
            word: {word: this.wordname, translated: this.wordtranslated},
            sentences: this.sentences
          }
          this.$store.dispatch('saveWords', data)
            .then(response => {
              this.wordname = ''
              this.wordtranslated = ''
              this.sentence = ''
              this.sentenceTranslated = ''
              this.modal = false
            })
            .catch(e => {
              console.log(e)
            })
        }
      },
      onAddSentence () {
        let sentenceObj = {
          sentence: this.sentence,
          translated: this.sentenceTranslated
        }
        this.$store.dispatch('tmpSentencesAction', sentenceObj)
        this.sentence = ''
        this.sentenceTranslated = ''
      }
    },
    components: {
      sentenceCard
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
  .clearMargin {
    margin: 0;
  }
</style>
