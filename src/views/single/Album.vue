<template>
  <div>
    <div class="about_album">
      <img v-bind:src=image alt="image">
      <div class="album_info">
        <small>ALBUM</small>
        <p class="album_name">{{ album.name }}</p>
      </div>
    </div>
    <MusicList v-bind:musicList="musicList"/>
  </div>
</template>

<script>
import MusicList from "../../components/music/MusicList";
import axios from "axios";

export default {
  name: "Album",
  components: {MusicList},
  data() {
    return {
      album: Object,
      image: "",
      musicList: []
    }
  },
  async mounted() {
    const result = await axios.get('http://localhost:8080/api/v1/albums/' + this.$route.query.id, {
      headers: {
        Authorization: 'Bearer_' + localStorage.getItem('token')
      }
    });
    this.album = result.data;
    this.image = "http://localhost:8080/image/" + this.album.image.name;

    const res = await axios.get('http://localhost:8080/api/v1/compositions/album/' + this.$route.query.id, {
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
.about_album {
  padding: 20px;
  display: flex;
  flex-direction: row;
}

.about_album img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: 0 0;
}

.album_info {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 20px;
}

.album_name {
  padding: 0;
  margin: 0;
  font-size: 32px;
  font-weight: bold;
}

.description {
  text-align: justify;
}
</style>