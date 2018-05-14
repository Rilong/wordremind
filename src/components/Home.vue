<template>
  <v-layout>
      <template v-if="isUser">
        <template>
          <v-layout>
            <v-flex>
              <v-container grid-list-lg>
                <div class="text-xs-right mb-4" v-if="!loading">
                  <add-modal></add-modal>
                </div>
                <template v-if="!loading && words !== null">
                  <word-card v-for="(word, id) in words" :key="id" :id="id" :word="word"></word-card>
                </template>
                <template v-else-if="loading">
                  <div class="text-xs-center mt-5">
                    <v-progress-circular :size="70" :width="7" indeterminate color="primary"></v-progress-circular>
                  </div>
                </template>
                <template v-else>
                  <h2 class="text-xs-center">No words</h2>
                </template>
              </v-container>
            </v-flex>
          </v-layout>
        </template>
      </template>
      <template v-else>
        <app-login></app-login>
      </template>
  </v-layout>
</template>

<script>
  import appLogin from './user/Login'
  import wordCard from './words/Card'
  import addModal from './words/AddModal'

  export default {
    data () {
      return {
        name: 'home'
      }
    },
    computed: {
      isUser () {
        return this.$store.getters.isUser
      },
      loading () {
        return this.$store.getters.loading
      },
      words () {
        return this.$store.getters.words
      }
    },
    components: {
      appLogin,
      wordCard,
      addModal
    }
  }
</script>

<style scoped>

</style>