<template>
  <v-dialog width="800" v-model="modal">
    <v-btn slot="activator" color="warning btn-v-center" round>Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <h2 class="display-2">Edit</h2>
            <v-divider></v-divider>
            <v-form v-model="valid">
              <v-text-field
                      v-model="wordname"
                      label="Word"
                      required
              ></v-text-field>
              <v-text-field
                      v-model="wordtranslated"
                      label="Word translated"
                      required
              ></v-text-field>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="onClose" flat>Close</v-btn>
                <v-btn color="success" @click="onSave" flat>Save</v-btn>
              </v-card-actions>
            </v-form>
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
        modal: false,
        wordname: '',
        wordtranslated: '',
        valid: false
      }
    },
    methods: {
      onClose () {
        this.modal = false
      },
      onSave () {}
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