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
    <!--   <v-btn v-if="isUser" flat tag="button" @click.native="dialogSettings = true">
           <v-icon left>settings</v-icon>
           Settings
       </v-btn>-->
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
  <template>
      <v-dialog v-model="dialogSettings" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
              <v-toolbar dark color="primary">
                  <v-btn icon dark @click.native="dialogSettings = false">
                      <v-icon>close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Settings</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                      <v-btn dark flat @click.native="dialogSettings = false">Save</v-btn>
                  </v-toolbar-items>
              </v-toolbar>
              <v-list three-line subheader>
                  <v-subheader>User Controls</v-subheader>
                  <v-list-tile avatar>
                      <v-list-tile-content>
                          <v-list-tile-title>Content filtering</v-list-tile-title>
                          <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
                      </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile avatar>
                      <v-list-tile-content>
                          <v-list-tile-title>Password</v-list-tile-title>
                          <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </v-list>
          </v-card>
      </v-dialog>
  </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      menu: null,
      dialogSettings: false
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
    if (this.isUser) {
      this.$store.dispatch('getWords').then(null, e => {
        if (e.status === 401) {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>
