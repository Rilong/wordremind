<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-flex xs1>
        <v-btn color="success" large v-if="!isStart" @click="start">Start</v-btn>
        <v-btn color="warning" large v-else @click="restart">Restart</v-btn>
      </v-flex>
      <v-flex xs1 v-if="isStart">
        <v-switch v-model="onlyNew" label="Only new" color="primary" :disabled="loading" class="only-switch"></v-switch>
      </v-flex>
    </v-layout>
    <v-layout v-if="isStart">
      <v-flex xs6 offset-xs3 column>
        <v-card>
          <v-card-title>
            <h2 class="text-xs-center" style="width: 100%">{{mainWord.word}}</h2>
          </v-card-title>
          <template>
            <v-progress-linear v-model="percent"></v-progress-linear>
          </template>
          <v-card-text>
            <div v-for="activeWord in activeWords">
              <v-btn class="train-btn" round @click="onActive(activeWord.word_id)" :class="{primary: activeWord.active, success: activeWord.highlighted}">{{activeWord.word_translation}}</v-btn>
            </div>
          </v-card-text>
          <v-card-actions class="pb-4">
            <span>{{wordCount}} of {{words.length}}</span>
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
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        wordCount: 0,
        isStart: false,
        onlyNew: false
      }
    },
    computed: {
      words () {
        return this.$store.getters.words
      },
      mainWord () {
        return this.$store.getters.mainTrainWord
      },
      activeWords () {
        return this.$store.getters.trainWordsActive
      },
      percent () {
        return this.wordCount / this.words.length * 100
      },
      message () {
        return this.$store.getters.trainMessage
      },
      messageTimeout () {
        return this.$store.getters.trainMessageTimeout
      },
      controls () {
        return this.$store.getters.trainControls
      }
    },
    methods: {
      start () {
        this.isStart = true
        this.$store.dispatch('trainStart')
      },
      restart () {
        this.$store.dispatch('trainRestart')
        this.wordCount = 0
      },
      onActive (id) {
        this.$store.commit('setTrainSelectedWord', id)
      },
      onRemember () {
        this.$store.dispatch('trainHighlight')
        this.$store.commit('setTrainControls', false)
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
          .catch(() => {})
      }
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
</style>