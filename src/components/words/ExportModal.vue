<template>
  <v-dialog width="800" v-model="modal">
    <v-btn slot="activator" :disabled="loading" round color="blue" class="white--text darken-1">Export</v-btn>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card-actions>
              <v-btn flat color="primary" @click="copy">Copy</v-btn>
              <transition name="copiedAnim">
                <span class="copied" v-if="tooltipShow">Copied!</span>
              </transition>
              <v-spacer></v-spacer>
              <v-btn flat color="error" @click="close">close</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-divider></v-divider>
            <div id="exportData">
              <div v-for="word in words">
                <h3 class="word"><span>{{word.word}}</span> - {{word.word_translation}}</h3>
                <h4 class="sentence" v-for="sentence in word.sentences">{{sentence.sentence_text}} -
                  {{sentence.sentence_translation}}</h4>
              </div>
            </div>
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
        modal: false,
        tooltipShow: false
      }
    },
    computed: {
      words () {
        return this.$store.getters.words
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      copy () {
        let el = document.getElementById('exportData')
        let range = document.createRange()
        range.selectNode(el)
        window.getSelection().addRange(range)
        try {
          document.execCommand('copy')
          this.tooltipShow = true
          setTimeout(() => {
            this.tooltipShow = false
          }, 1500)
        } catch (e) {}
        window.getSelection().removeAllRanges()
      },
      close () {
        this.modal = false
      }
    }
  }
</script>

<style scoped>
  .word {
    font-family: Arial, Tahoma, sans-serif;
    font-size: 18pt;
    font-weight: normal;
  }
  .word span {
    text-decoration: underline;
  }

  .sentence {
    font-family: Arial, Tahoma, sans-serif;
    font-size: 14pt;
    font-weight: normal;
  }
  .copied {
    position: relative;
    top: -1px;
  }

  /*======== Animations =========*/
  /* Copied message */
  .copiedAnim-enter {
    transform: translateX(-5px);
    opacity: 0;
  }
  .copiedAnim-enter-active {
    transition: opacity .4s linear, transform ease .8s;
  }
  .copiedAnim-enter-to {
    transform: translateX(0);
    opacity: 1;
  }
  .copiedAnim-leave {
    transform: translateX(0);
    opacity: 1;
  }
  .copiedAnim-leave-active {
    transition: opacity .4s linear, transform ease .8s;
  }
  .copiedAnim-leave-to {
    transform: translateX(-5px);
    opacity: 0;
  }
</style>