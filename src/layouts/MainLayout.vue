<template>
  <div class="app-main-layout">

    <Navbar/>

    <Sidebar/>

    <main class="app-content">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <Player/>
  </div>
</template>

<script>
import Navbar from "../components/app/Navbar";
import Sidebar from "../components/app/Sidebar";
import Player from "../components/app/Player";

export default {
  name: "MainLayout",
  components: {
    Navbar, Sidebar, Player
  }
}
</script>
<style scoped>
@import "../assets/index.css";
</style>