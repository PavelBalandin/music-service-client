<template>
  <PlaylistList v-bind:playlists="playlists"/>
</template>

<script>
import PlaylistList from "../components/PlaylistList";
import axios from "axios";

export default {
  name: "Playlists",
  components: {PlaylistList},
  data() {
    return {
      playlists: []
    }
  },
  async mounted() {
    const res = await axios.get('http://localhost:8080/api/v1/playlists/user/' + localStorage.getItem("id"), {
      headers: {
        Authorization: 'Bearer_' + localStorage.getItem('token')
      }
    });
    this.playlists = res.data;
  },
}
</script>

<style scoped>

</style>