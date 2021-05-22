<template>
  <ArtistList v-bind:artists="artists"/>
</template>

<script>
import ArtistList from "../components/artist/ArtistList";
import axios from "axios";

export default {
  name: "Artists",
  components: {ArtistList},
  data() {
    return {artists: []}
  },
  async mounted() {
    const res = await axios.get('http://localhost:8080/api/v1/artists', {
      headers: {
        Authorization: 'Bearer_' + localStorage.getItem('token')
      }
    });
    console.log(res.data);
    this.artists = res.data;
  },
}
</script>

<style scoped>

</style>