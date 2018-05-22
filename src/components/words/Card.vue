<template>
  <div>
      <v-flex>
        <v-card color="white mb-2 pt-2 pb-2">
          <v-layout>
          <v-flex xs8>
            <v-card-text class="word pointer my-d-flex" @click="showTranslate = !showTranslate">
              <span class="mr-6px">{{word.word}}</span>
              <transition name="translated">
                <span v-if="showTranslate && word.word_translation" class="gray-text">- {{word.word_translation}}</span>
              </transition>
            </v-card-text>
          </v-flex>
          <v-flex xs class="text-xs-right align-center pt-2 btns">
            <open-modal :word="word"></open-modal>
            <edit-modal :sentences="word.sentences" :word="word" :id="word.word_id"></edit-modal>
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
    props: ['word'],
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
        this.$store.dispatch('deleteWord', {data: this.word, id: this.word.word_id})
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
  .my-d-flex {
    display: flex;
  }
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
    display: inline-block;
    overflow-x: hidden;
    white-space: nowrap;
  }

  .mr-6px {
    margin-right: 6px;
  }

  .pointer {
    cursor: pointer;
  }

  /* ====== Animations ====== */
  /* Animate translation text */
  .translated-enter {
    opacity: 0;
  }

  .translated-enter-active {
    transition: opacity .4s linear;
  }

  .translated-enter-to {
    opacity: 1;
  }

  .translated-leave {
    opacity: 1;
  }

  .translated-leave-active {
    transition: opacity .4s ease;
  }

  .translated-leave-to {
    opacity: 0;
  }

  @keyframes showTranslate {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 100px;
    }

  }
</style>