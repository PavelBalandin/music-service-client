<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Music Service</span>
      <div class="input-field">
        <input id="username" type="text" v-model="username" :class="{invalid: $v.username.$error}">
        <label for="username">Login</label>
        <small class="helper-text invalid" v-for="(error, index) of $v.username.$error">
          {{ printError(error.$validator, error.$params) }}
        </small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model="password" :class="{invalid: $v.username.$error}">
        <label for="password">Password</label>
        <small class="helper-text invalid" v-for="(error, index) of $v.username.$errors">
          {{ printError(error.$validator, error.$params) }}
        </small>
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
import {required, minLength} from 'vuelidate/lib/validators'
import axios from 'axios'


export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  validations: () => ({
    username: {required, minLength: minLength(6)},
    password: {required, minLength: minLength(6)}
  }),
  methods: {
    async submitHandler() {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        username: this.username,
        password: this.password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('username', response.data.username);
      if (response.status === 200) {
        this.$router.push('/');
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