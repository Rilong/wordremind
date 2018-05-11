<template>
  <v-dialog>
    <v-btn slot="activator" color="success btn-v-center" round>Open</v-btn>
    <v-card color="cyan darken-2" class="white--text">
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs7>
            <div>
              <div class="headline">Supermodel</div>
              <div>Foster the People</div>
            </div>
          </v-flex>
          <v-flex xs5>
            <v-card-media
                    src="/static/doc-images/cards/foster.jpg"
                    height="125px"
                    contain
            ></v-card-media>
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
        name: 'name'
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
</style>