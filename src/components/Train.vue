<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-btn color="success" large v-if="!isStart" @click="start">Start</v-btn>
      <v-btn color="warning" large v-else @click="restart">Restart</v-btn>
    </v-layout>
    <v-layout v-if="isStart">
      <v-flex xs6 offset-xs3 column>
        <v-card>
          <v-card-title>
            <h2 class="text-xs-center" style="width: 100%">{{mainWord.word}}</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-for="activeWord in activeWords">
              <v-btn class="train-btn" round @click="onActive(activeWord.word_id)" :class="{primary: activeWord.active}">{{activeWord.word_translation}}</v-btn>
            </div>
          </v-card-text>
          <v-card-actions class="pb-4">
            <span>{{wordCount}} of {{words.length}}</span>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="onRemember">I don't remember</v-btn>
            <v-btn color="success" @click="onOk">OK</v-btn>
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
        wordCount: 1,
        isStart: false
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
      }
    },
    methods: {
      start () {
        this.isStart = true
        this.$store.dispatch('trainStart')
      },
      restart () {
        this.$store.dispatch('trainRestart')
        this.wordCount = 1
      },
      onActive (id) {
        this.$store.commit('setTrainSelectedWord', id)
      },
      onRemember () {

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
</style>