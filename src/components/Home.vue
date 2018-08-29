<template>
  <v-layout>
      <template v-if="isUser">
        <template>
          <v-layout>
            <v-flex>
              <v-container grid-list-lg>
                <div class="mb-4 mt-2" v-if="words">
                  <v-layout>
                    <v-flex xs1>
                      <v-btn class="sort-btn" round color="primary" :disabled="loading" @click="sort">
                        Sort
                        <transition name="sort" mode="out-in" :disabled="loading">
                          <v-icon v-if="!sortState" key="arrow-up">arrow_downward</v-icon>
                          <v-icon v-else key="arrow-down">arrow_upward</v-icon>
                        </transition>
                      </v-btn>
                    </v-flex>
                    <v-flex xs1>
                      <v-switch v-model="onlyNew" label="Only new" color="primary" :disabled="loading" class="only-switch"></v-switch>
                    </v-flex>
                    <v-flex xs2>
                      <v-text-field class="search" label="Search" @input="onSearch" v-model="search"></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <export-modal></export-modal>
                    <add-modal></add-modal>
                  </v-layout>
                </div>
                <template v-if="!loading && words !== null">
                  <word-card v-for="(word) in pagination[activePage - 1]" :key="'wordid' + word.word_id" :word="word"></word-card>
                  <div class="text-xs-center" v-if="pagination.length > perPage">
                    <v-pagination :length="pagination.length" :total-visible="7" v-model="page" circle></v-pagination>
                  </div>
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
  import exportModal from './words/ExportModal'
  import _ from 'lodash'

  export default {
    data () {
      return {
        name: 'home',
        sortState: false,
        onlyNew: false,
        search: '',
        page: 1,
        wordsView: null
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
      },
      pagination () {
        return this.$store.getters.pagination
      },
      activePage () {
        return this.$store.getters.activePage
      },
      perPage () {
        return this.$store.getters.perPage
      }
    },
    methods: {
      sort () {
        this.sortState = !this.sortState
        this.wordsView = this.getSort(this.wordsView)
        this.$store.commit('setPagination', this.wordsView)
      },
      getSort (words) {
        return _.reverse(_.clone(words))
      },
      getOnlyNew (words, perPage) {
        if (this.onlyNew) {
          this.page = 1
          return _.dropRight(_.orderBy(words, ['created_date'], ['desc']), this.wordsView.length - perPage)
        }
        return this.words
      },
      onSearch () {
        this.page = 1
        let filteredWords = _.filter(this.words, w => w.word.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
        this.$store.commit('setPagination', filteredWords)
      }
    },
    watch: {
      page () {
        this.$store.commit('setActivePage', this.page)
      },
      words () {
        this.wordsView = _.clone(this.words)
        this.wordsView = this.getOnlyNew(this.wordsView, this.perPage)
        this.wordsView = this.getSort(this.wordsView)

        this.$store.commit('setPagination', this.wordsView)
      },
      onlyNew () {
        this.wordsView = this.getOnlyNew(this.wordsView, this.perPage)

        this.$store.commit('setPagination', this.wordsView)
      }
    },
    created () {
      this.wordsView = _.clone(this.words)
      this.$store.commit('setPagination', this.wordsView)
    },
    components: {
      appLogin,
      wordCard,
      addModal,
      exportModal
    }
  }
</script>

<style scoped>

  .search {
    position: relative;
    top: -10px;
    left: -40px;

  }
  .only-switch {
    position: relative;
    top: -8px;
    left: -30px;
  }

  .sort-btn {
    overflow: hidden;
  }

  .sort-enter {
    transform: translate(0, -20px);
  }

  .sort-enter-active {
    transition: transform .2s ease;
  }

  .sort-enter-to {
    transform: translate(0, 0);
  }
  .sort-leave {
    transform: translate(0, 0);
  }

  .sort-leave-active {
    transition: transform .2s ease;
  }

  .sort-leave-to {
    transform: translate(50px, 0);
  }
</style>
