<template>
  <v-layout row justify-center>
  <v-dialog v-model="dialogLogin" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialogLogin = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialogLogin = false">Save</v-btn>
          </v-toolbar-items>
      </v-toolbar>
    <v-container fluid>
    <v-layout row>
      <v-flex xs6 style="border-right:solid">
            <v-subheader>Login</v-subheader>
              <v-list-tile avatar >
                <v-flex xs8 offset-xs2>
                    <v-text-field
                      v-model="inputEmailLogin"
                      :rules="emailRules"
                      label="E-mail"
                      required
                      outline
                    ></v-text-field>
                  </v-flex>
              </v-list-tile>
              <br><br>
          <v-list-tile avatar>
            <v-flex xs8 offset-xs2>
              <v-text-field
                v-model ="inputPasswordLogin"
                label="Password"
                outline
                :append-icon="show3 ? 'visibility_off' : 'visibility'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                name="input-10-2"
                hint="At least 6 characters"
                class="input-group--focused"
                @click:append="show3 = !show3"
              ></v-text-field>
              </v-flex>
          </v-list-tile>
          <v-list-tile avatar>
            <v-flex xs8 offset-xs2>
              <v-btn outline color="black" @click="login">Sign In</v-btn>
            </v-flex>
          </v-list-tile>
      </v-flex>
      <v-flex xs6>
          <v-subheader>Sign Up</v-subheader>
            <v-list-tile avatar>
              <v-flex xs8 offset-xs2>
                
                <v-text-field
                  v-model="inputName"
                  label="Username"
                  outline
                ></v-text-field>
              </v-flex>
            </v-list-tile>
            <br><br>
            <v-list-tile avatar>
              <v-flex xs8 offset-xs2>
                <v-form v-model="valid">
              <v-text-field
                v-model="inputEmail"
                :rules="emailRules"
                label="E-mail"
                required
                outline
              ></v-text-field>
                </v-form>
              </v-flex>
            </v-list-tile>
            <br><br>
            <v-list-tile avatar>
              <v-flex xs8 offset-xs2>
                <v-text-field
                  v-model ="inputPassword"
                  label="Password"
                  outline
                  :append-icon="show3 ? 'visibility_off' : 'visibility'"
                  :rules="[rules.required, rules.min]"
                  :type="show3 ? 'text' : 'password'"
                  name="input-10-2"
                  hint="At least 6 characters"
                  class="input-group--focused"
                  @click:append="show3 = !show3"
                ></v-text-field>
              </v-flex>
            </v-list-tile>
            <v-flex xs8 offset-xs2>
              <v-btn outline color="black" @click="register">Sign Up</v-btn>
            </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
  </v-card>
</v-dialog>
</v-layout>

</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data () {
    return {
      show3: false,
      valid: false,
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
      },
       emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    ...mapActions([
      'register', 'login'
    ])
  },
  computed: {
    ...mapState([
      'username', 'email', 'password'
    ]),
    dialogLogin: {
      get () {
        return this.$store.state.dialogLogin
      },
      set () {
        this.$store.commit('setDialogLogin', false)
      }
    },
    inputName: {
      get () {
        return this.$store.state.username
      },
      set (value) {
        this.$store.commit('setUsername', value)
      }
    },
    inputEmail: {
      get () {
        return this.$store.state.email
      },
      set (value) {
        this.$store.commit('setEmail', value)
      }
    },
    inputPassword: {
      get () {
        return this.$store.state.password
      },
      set (value) {
        this.$store.commit('setPassword', value)
      }
    },
    inputEmailLogin: {
      get () {
        return this.$store.state.email
      },
      set (value) {
        this.$store.commit('setEmailLogin', value)
      }
    },
    inputPasswordLogin: {
      get () {
        return this.$store.state.password
      },
      set (value) {
        this.$store.commit('setPasswordLogin', value)
      }
    }
  }
}
</script>

<style>

</style>
