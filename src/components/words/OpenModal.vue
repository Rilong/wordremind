<template>
  <v-dialog width="800" v-model="modal">
    <v-btn slot="activator" color="success btn-v-center" round>Open</v-btn>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <h2 class="display-2">{{word}} - <span class="gray-text">text translated</span></h2>
            <v-divider></v-divider>
            <p class="subheading mt-3">Lorem ipsum dolor sit - <span class="gray-text">text translated</span></p>
            <p class="subheading mt-3">Lorem ipsum dolor sit - <span class="gray-text">text translated</span></p>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="onClose" flat>Close</v-btn>
            </v-card-actions>
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
        word: 'word',
        modal: false
      }
    },
    methods: {
      onClose () {
        this.modal = false
      }
    }
  }
</script>

<style scoped>
  .btn-v-center {
    position: relative;
    top: 100%;
    margin-top: 0;
    margin-bottom: 0;
    transform: translateY(33%);
  }

  .gray-text {
    color: #BDBDBD;
  }
</style>