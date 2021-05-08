<template>
  <MusicList v-bind:musicList="musicList"/>
</template>

<script>
import MusicList from "../components/MusicList";

export default {
  name: "Home",
  components: {MusicList},
  data() {
    return {
      musicList: []
    }
  },
  async mounted() {
    const res = await fetch('http://localhost:8080/api/v1/compositions?pageSize=20');
    const musicList = await res.json();
    this.musicList = musicList;
    console.log(musicList);
    audio_player.musicList.fromArray(musicList);
  },
}
</script>

<style scoped>

</style>