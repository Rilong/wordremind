<template>
  <div>
      <v-flex>
        <v-card color="white mb-2 pt-2 pb-2">
          <v-layout>
          <v-flex xs8>
            <v-card-text class="word pointer" @click="showTranslate = !showTranslate">
              {{word.word}} <span v-if="showTranslate" class="gray-text" >- {{word.word_translation}}</span>
            </v-card-text>
          </v-flex>
          <v-flex xs class="text-xs-right align-center pt-2 btns">
            <open-modal></open-modal>
            <edit-modal :sentences="word.sentences" :word="word" :id="id"></edit-modal>
            <v-btn color="error btn-v-center" round :loading="deleteLoading" :disabled="deleteLoading" @click="deleteWord">Delete</v-btn>
          </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
  </div>
</template>

<script>
  import openModal from './OpenModal'
  import editModal from './EditModal'
  export default {
    props: ['word', 'id'],
    data () {
      return {
        name: 'test',
        showTranslate: false,
        deleteLoading: false
      }
    },
    methods: {
      deleteWord () {
        this.deleteLoading = true
        this.$store.dispatch('deleteWord', {data: this.word, id: this.id})
          .then(() => {
            this.deleteLoading = false
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    components: {
      openModal,
      editModal
    }
  }
</script>

<style scoped>
  .word {
    font-size: 18px;
  }
  .btn-v-center {
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0;
    margin-bottom: 0;
  }

  .btns {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .gray-text {
    color: #BDBDBD;
    font-size: 16px;
  }

  .pointer {
    cursor: pointer;
  }
</style>