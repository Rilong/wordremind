<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-btn color="success" large v-if="!isStart" @click="start">Start</v-btn>
      <v-btn color="warning" large v-else @click="restart">Restart</v-btn>
    </v-layout>
    <v-layout>
      <v-flex xs6 offset-xs3 column>
        <v-card>
          <v-card-title>
            <h2 class="text-xs-center" style="width: 100%">Acquaintance</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <v-btn class="train-btn" round>Знайомий</v-btn>
            </div>
            <div>
              <v-btn class="train-btn" round>Стати</v-btn>
            </div>
            <div>
              <v-btn class="train-btn" round>Коштує</v-btn>
            </div>
          </v-card-text>
          <v-card-actions class="pb-4">
            <span>1 of 70</span>
            <v-spacer></v-spacer>
            <v-btn color="error">I do not remember</v-btn>
            <v-btn color="success">OK</v-btn>
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
        isStart: false
      }
    },
    computed: {},
    methods: {
      start () {
        this.isStart = true
      },
      restart () {}
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