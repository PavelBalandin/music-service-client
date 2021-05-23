<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Music Service</span>
      <div class="input-field">
        <input
            id="name"
            type="text"
            class="validate"
            v-model.trim="username"
            :class="{invalid: ($v.username.$dirty && !$v.username.required) || ($v.username.$dirty && !$v.username.minLength) || ($v.username.$dirty && !$v.username.maxLength)}"
        >
        <label for="name">Login</label>
        <small
            class="helper-text invalid"
            v-if="$v.username.$dirty && !$v.username.required"
        >You need to enter your username</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.username.$dirty && !$v.username.minLength"
        >Your username must be 6 characters or more. Now is {{ username.length }}</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.username.$dirty && !$v.username.maxLength"
        >Your username must be no longer than 20 characters. Now is {{ username.length }}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)|| ($v.password.$dirty && !$v.password.maxLength)}"
        >
        <label for="password">Password</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
        >You need to enter your password</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Your password must be 6 characters or more. Now is {{ password.length }}</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.maxLength"
        >Your password must be no longer than 20 characters. Now is {{ password.length }}</small>
        <small
            class="helper-text invalid"
            v-else-if="incorrect"
        >Incorrect username or password</small>
      </div>

    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Log in
        </button>
      </div>

      <p class="center">Don't have an account?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import router from "@/router";
import {required, minLength, maxLength, email} from 'vuelidate/lib/validators'
import axios from 'axios'


export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      incorrect: false
    }
  },
  validations: () => ({
    username: {required, minLength: minLength(6), maxLength: maxLength(20)},
    password: {required, minLength: minLength(6), maxLength: maxLength(20)}
  }),
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      } else {
        this.userLogin()
      }
    },

    async userLogin() {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
          username: this.username,
          password: this.password
        });
        console.log(response)
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('username', response.data.username);
          this.incorrect = false
          await this.$router.push('/');
        } else {
          this.incorrect = true
        }
      } catch (e) {
        this.incorrect = true
      }

    },

    printError($name, $param) {
      if ($name === 'required') {
        return 'Поле не должно быть пустым'
      } else if ($name === 'minLength') {
        return 'Минимальная длина должна быть ' + $param + ' символов'
      }
    }
  }
}
</script>


<style scoped>
@import "../assets/index.css";
</style>