<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-8">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Registration</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid">
                            <v-text-field
                                    prepend-icon="person"
                                    name="login"
                                    label="Login"
                                    type="text"
                                    v-model="login"
                                    :rules="loginRules"
                                    validate-on-blur
                                    required
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    v-model="password"
                                    :rules="passwordRules"
                                    validate-on-blur
                                    required
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    name="passwordConfirm"
                                    label="confirm password"
                                    type="password"
                                    v-model="confirmPassword"
                                    :rules="confirmPasswordRules"
                                    validate-on-blur
                                    required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="onSubmit" :loading="loading" :disabled="!valid || loading">Register</v-btn>
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
        login: '',
        password: '',
        confirmPassword: '',
        valid: false,
        registerResource: null,
        loginRules: [
          v => !!v || 'Login is required'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Password must be more than 6 characters'
        ],
        confirmPasswordRules: [
          v => v === this.password || 'Password aren\'t match'
        ]
      }
    },
    methods: {
      onSubmit () {
        const user = {
          login: this.login,
          password: this.password
        }
        if (this.valid) {
          this.$store.dispatch('registerUser', user)
            .then(response => {
              this.$router.push('/')
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>

</style>