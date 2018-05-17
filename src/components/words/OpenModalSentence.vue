<template>
  <v-card class="grey lighten-5 mb-3">
    <v-card-title class="pointer" @click="showTranslation = !showTranslation">
      <p class="mt-3 sentence-font">{{sentence.sentence_text}} <span class="grey--text" v-if="showTranslation" @click.stop="">- {{sentence.sentence_translation}}</span></p>
    </v-card-title>
  </v-card>
</template>

<script>
  export default {
    props: ['sentence'],
    data () {
      return {
        showTranslation: false
      }
    }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }

  .sentence-font {
    font-size: 20px;
  }
</style>