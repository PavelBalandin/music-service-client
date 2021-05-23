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
        <small
            class="helper-text invalid"
            v-else-if="alreadyInUse"
        >This username is already connected to an account</small>
      </div>
      <div class="input-field">
        <input
            id="email"
            type="text"
            class="validate"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
        >You need to enter your email</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >This email is invalid</small>
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
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Sign up
        </button>
      </div>
      <p class="center">
        Have an account?
        <router-link to="/login">Log in</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import {minLength, maxLength, required, email} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      alreadyInUse: false,
    }
  },
  validations: () => ({
    username: {required, minLength: minLength(6), maxLength: maxLength(20)},
    email: {email, required, maxLength: maxLength(50)},
    password: {required, minLength: minLength(6), maxLength: maxLength(20)}
  }),
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      } else {
        this.userRegistration()
      }
    },
    async userRegistration() {
      const response = await axios.post('http://localhost:8080/api/v1/registration', {
        username: this.username,
        email: this.email,
        password: this.password
      });
      if (response.status === 201) {
        this.alreadyInUse = false
        await this.$router.push('/login');
      } else {
        this.alreadyInUse = true
      }
    }
  }
}
</script>

<style scoped>
@import "../assets/index.css";
</style>