<template>
  <v-app>
   <v-toolbar dark color="primary">
     <v-toolbar-title>
         <router-link to="/" tag="span" class="pointer">Word Remind</router-link>
     </v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items class="hidden-sm-and-down">
       <v-btn flat tag="button" v-for="link in links" :to="link.to" :key="link.title">
         <v-icon left>{{link.icon}}</v-icon>
         {{link.title}}
       </v-btn>
       <v-btn v-if="isUser" flat tag="button" @click="onLogout">
         <v-icon left>exit_to_app</v-icon>
         Exit
       </v-btn>
     </v-toolbar-items>
   </v-toolbar>
   <router-view></router-view>
   <template v-if="error">
     <v-snackbar
       :timeout="5000"
       :bottom="true"
       :multi-line="true"
       :value="true"
       @input="onClose"
       color="error"
     >
       <v-icon class="mr-3" left large>error</v-icon>{{error}}
       <v-btn flat color="white" @click.native="onClose">Close</v-btn>
     </v-snackbar>
   </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      menu: null
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUser () {
      return this.$store.getters.isUser
    },
    links () {
      if (this.isUser) {
        return [
          {to: '/train', title: 'Train', icon: 'school'}
        ]
      } else {
        return [
          {to: '/registration', title: 'Registration', icon: 'how_to_reg'}
        ]
      }
    }
  },
  methods: {
    onClose () {
      this.$store.dispatch('cleanError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  created () {
    this.$store.dispatch('autoLogin')
    this.$store.dispatch('getWords')
  }
}
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>