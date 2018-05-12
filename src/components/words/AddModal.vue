<template>
  <v-dialog width="800" v-model="modal">
    <v-btn slot="activator" round color="success">Add word</v-btn>
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
                <v-flex xs9>
                  <v-text-field
                    v-model="wordtranslated"
                    label="Word translated"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs3 class="text-xs-right">
                  <v-btn color="primary" @click="onTranslate" :loading="localLoading">Translate</v-btn>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs9>
                  <v-text-field
                    v-model="sentence"
                    label="Sentence"
                  ></v-text-field>
                </v-flex>
                <v-flex xs3 class="text-xs-right">
                  <v-btn color="success" @click="onAddSentence">Add sentence</v-btn>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="onClose" flat :disabled="localLoading">Close</v-btn>
                <v-btn color="success" @click="onSave" flat :disabled="localLoading">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
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
        editSentence: ''
      }
    },
    methods: {
      onClose () {
        this.modal = false
      },
      onSave () {

      },
      onTranslate () {
        this.localLoading = true
        this.$store.dispatch('translate', {to: 'uk', 'text': this.wordname})
          .then(response => {
            this.localLoading = false
            this.wordtranslated = response
          })
      },
      onAddSentence () {

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