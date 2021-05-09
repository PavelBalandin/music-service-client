<template>
  <MusicList v-bind:musicList="musicList"/>
</template>

<script>
import MusicList from "../components/MusicList";
import axios from "axios";

export default {
  name: "Home",
  components: {MusicList},
  data() {
    return {
      musicList: []
    }
  },
  async mounted() {
    const res = await axios.get('http://localhost:8080/api/v1/compositions?pageSize=20', {
      headers: {
        Authorization: 'Bearer_' + localStorage.getItem('token')
      }
    });
    const musicList = res.data;
    this.musicList = musicList;
    audio_player.musicList.fromArray(musicList);
  },
}
</script>

<style scoped>

</style>