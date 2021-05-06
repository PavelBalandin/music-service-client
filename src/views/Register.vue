<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Music Service</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
        >
        <label for="email">Email</label>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
        >
        <label for="password">Password</label>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            class="validate"
        >
        <label for="name">Login</label>
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
        <a href="/login">Log in</a>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: "Register"
}
</script>

<style scoped>
@import "../assets/index.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
</style>