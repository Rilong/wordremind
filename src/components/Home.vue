<template>
  <v-layout>
      <template v-if="isUser">
        <h1> {{name}} Logged in</h1>
      </template>
      <template v-else>
        <appLogin></appLogin>
      </template>
  </v-layout>
</template>

<script>
  import appLogin from './user/Login'
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
      appLogin
    }
  }
</script>

<style scoped>

</style>