<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Music Service</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            class="validate"
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
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Log in
        </button>
      </div>

      <p class="center">
        Don't have an account?
        <a href="/register">Sign up</a>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: "Login"
}
</script>


<style scoped>
@import "../assets/index.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
</style>