<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-flex xs1>
        <v-btn color="success" large v-if="!isStart" @click="start">Start</v-btn>
        <template v-else>
          <v-btn color="warning" large @click="restart">Restart</v-btn>
        </template>
      </v-flex>
      <template v-if="isStart">
        <v-flex xs1>
          <v-switch v-model="onlyNew" label="Only new" color="primary" class="only-switch"></v-switch>
        </v-flex>
        <v-flex xs1>
          <v-switch v-model="reverseMode" label="Reverse mode" color="primary" class="only-switch"></v-switch>
        </v-flex>
        <v-flex xs1>
          <v-text-field
              label="Range from"
              box
              mask="############"
              @input="changeRange"
              v-model="rangeFrom"
          ></v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-text-field
              label="Range to"
              box
              mask="############"
              @input="changeRange"
              v-model="rangeTo"
          ></v-text-field>
        </v-flex>
      </template>
    </v-layout>
    <v-layout v-if="isStart">
      <v-flex xs6 offset-xs3 column>
        <v-card>
          <v-card-title>
            <h2 class="text-xs-center" style="width: 100%">
              <span v-if="!reverse">{{mainWord.word}}</span>
              <span v-else>{{mainWord.word_translation}}</span>
            </h2>
          </v-card-title>
          <template>
            <v-progress-linear v-model="percent"></v-progress-linear>
          </template>
          <v-card-text>
            <div v-for="activeWord in activeWords">
              <v-btn
                  v-if="!reverse"
                  class="train-btn"
                  round @click="onActive(activeWord.word_id)"
                  :class="{primary: activeWord.active, success: activeWord.highlighted}"
              >{{activeWord.word_translation}}</v-btn>
              <v-btn
                  v-else
                  class="train-btn"
                  round @click="onActive(activeWord.word_id)"
                  :class="{primary: activeWord.active, success: activeWord.highlighted}"
              >{{activeWord.word}}</v-btn>
            </div>
          </v-card-text>
          <v-card-actions class="pb-4">
            <span>{{wordCount}} of {{wordsLen}}</span>
            <v-spacer></v-spacer>
            <v-btn color="error" :disabled="!controls" @click="onRemember">I don't remember</v-btn>
            <v-btn color="success" :disabled="!controls" @click="onOk">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <template v-if="message">
        <v-snackbar
          :timeout="messageTimeout"
          :bottom="true"
          :value="true"
          :multi-line="true"
          :color="message.status"
          class="text-xs-center"
        ><h3 class="text-xs-center" style="width: 100%; font-weight: normal">{{message.text}}</h3></v-snackbar>
      </template>
    </v-layout>
    <v-layout v-if="win">
      <v-flex xs4 offset-xs4 column>
          <v-card class="win">
            <v-card-title>
              <h2 class="text-xs-center" style="width: 100%">Train is finish</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div class="win-blocks">
                <div class="win-block">{{trainWordsGood - trainWordsMistakes}}</div>
                <div class="lose-block">{{trainWordsMistakes}}</div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="warning" @click="restart" style="width: 100%">Restart</v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        wordCount: 0,
        isStart: false,
        onlyNew: false,
        reverseMode: false,
        wordsLength: 0,
        win: false,
        rangeFrom: 1,
        rangeTo: 0
      }
    },
    computed: {
      words () {
        return this.$store.getters.words
      },
      wordsLen () {
        return this.$store.getters.trainWordsLength
      },
      mainWord () {
        return this.$store.getters.mainTrainWord
      },
      reverse () {
        return this.$store.getters.trainReverseMode
      },
      activeWords () {
        return this.$store.getters.trainWordsActive
      },
      percent () {
        return this.wordCount / this.wordsLen * 100
      },
      message () {
        return this.$store.getters.trainMessage
      },
      messageTimeout () {
        return this.$store.getters.trainMessageTimeout
      },
      controls () {
        return this.$store.getters.trainControls
      },
      trainWordsGood () {
        return this.$store.getters.trainWordsGood
      },
      trainWordsMistakes () {
        return this.$store.getters.trainWordsMistakes
      }
    },
    methods: {
      start () {
        this.isStart = true
        this.win = false
        this.wordsLength = this.words.length
        this.rangeTo = this.wordsLength
        this.$store.commit('setRange', [this.rangeFrom, this.rangeTo])
        this.$store.dispatch('trainReset')
        this.$store.dispatch('trainStart')
      },
      restart () {
        this.$store.dispatch('trainReset', true)
        this.$store.dispatch('trainRestart')
        this.wordCount = 0
        this.isStart = true
        this.win = false
      },
      onActive (id) {
        this.$store.commit('setTrainSelectedWord', id)
      },
      onRemember () {
        this.$store.dispatch('trainHighlight')
        this.$store.commit('setTrainControls', false)
        this.$store.commit('setTrainWordsMistakes')
        setTimeout(() => {
          this.$store.commit('setTrainControls', true)
          this.$store.dispatch('trainStart')
        }, this.messageTimeout + 300)
      },
      onOk () {
        this.$store.dispatch('trainWordCheck')
          .then(() => {
            this.wordCount++
          })
            .catch(e => {
              switch (e.message) {
                case 'notSelected' :
                  break
                default:
                  this.win = true
                  this.isStart = false
                  break
              }
            })
      },
      changeRange () {
        let numRangeFrom = Number(this.rangeFrom)
        let numRangeTo = Number(this.rangeTo)

        if (numRangeFrom !== 0 && Number(this.rangeTo) !== 0) {
          if ((numRangeFrom > 0 && numRangeFrom < this.wordsLength) && (numRangeTo > 1 && numRangeTo > numRangeFrom && numRangeTo <= this.wordsLength)) {
            this.$store.commit('setRange', [this.rangeFrom, this.rangeTo])
            this.$store.dispatch('trainStart')
            this.$store.dispatch('trainRange')
            this.wordCount = 0
          }
        }
      }
    },
    watch: {
      reverseMode () {
        this.$store.commit('setTrainReverseMode', this.reverseMode)
        this.$store.dispatch('trainStart')
      },
      onlyNew () {
        this.$store.commit('setTrainOnlyNew', this.onlyNew)
        this.$store.dispatch('trainOnlyNew')
        this.wordCount = 0
      },
      wordsLength () {
        this.$store.commit('setTrainWordsLength', this.wordsLength)
      }
    },
    beforeDestroy () {
      this.isStart = false
      this.win = false
      this.$store.commit('setTrainOnlyNew', false)
      this.$store.commit('setTrainReverseMode', false)
      this.$store.dispatch('trainReset', true)
    }
  }
</script>

<style scoped>
  .train-btn {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  .only-switch {
    position: relative;
    top: 12px;
  }
  .win-block {
    width: 75px;
    height: 75px;
    border: #4caf50 solid 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    font-weight: bold;
  }
  .lose-block {
    width: 75px;
    height: 75px;
    border: #D50000 solid 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    font-weight: bold;
  }
  .win-blocks {
    display: flex;
    justify-content: space-between;
    margin: 50px 0;
  }
</style>
