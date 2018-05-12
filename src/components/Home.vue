<template>
  <v-layout>
      <template v-if="isUser">
        <template>
          <v-layout>
            <v-flex>
              <v-container grid-list-lg>
                <div class="text-xs-right mb-4">
                  <add-modal></add-modal>
                </div>
                <word-card></word-card>
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