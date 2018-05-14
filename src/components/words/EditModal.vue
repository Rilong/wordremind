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
              <sentence-card v-for="(sentence, index) in sentences" :sentence="sentence" :id="id" :key="index"></sentence-card>
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
        sentence: ''
      }
    },
    methods: {
      onClose () {
        this.modal = false
      },
      onSave () {

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
</style>