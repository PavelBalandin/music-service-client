<template>
  <nav class="navbar">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="/">RMX</a>
      </div>
      <div>
        {{ username }}
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger white-text"
             href="#"
             data-target="dropdown"
             ref="dropdown">Log in<i class="material-icons right">arrow_drop_down</i>
          </a>
          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/search" class="black-text">
                <i class="material-icons">account_circle</i>Profile
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Exit
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      username: localStorage.getItem('username')
    }
  },
  methods: {
    logout() {
      this.$router.push('login?message=logout')
    }
  },
  mounted() {
    M.Dropdown.init(this.$refs.dropdown, {
      constraint: true
    })
  }
}
</script>

<style scoped>

</style>