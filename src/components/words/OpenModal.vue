<template>
  <v-dialog width="800" v-model="modal">
    <v-btn slot="activator" color="success btn-v-center" round>Open</v-btn>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <h2 class="display-2">{{word.word}} - <span class="gray-text">{{word.word_translation}}</span></h2>
            <v-divider></v-divider>
            <div class="pt-3">
              <open-modal-sentence v-for="sentence in word.sentences" :sentence="sentence" :key="sentence.sentence_id"></open-modal-sentence>
            </div>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="onClose" flat>Close</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import openModalSentence from './OpenModalSentence'
  export default {
    props: ['word'],
    data () {
      return {
        modal: false
      }
    },
    methods: {
      onClose () {
        this.modal = false
      }
    },
    components: {
      openModalSentence
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