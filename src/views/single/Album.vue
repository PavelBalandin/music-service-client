<template>
  <div>
    <div class="about_album">
      <img v-bind:src=image alt="image">
      <div class="album_info">
        <p><b>{{ album.name }}</b></p>
        <p class="description">Nirvana was an American rock band formed in Aberdeen, Washington in 1987. Founded by lead
          singer and
          guitarist Kurt Cobain and bassist Krist Novoselic, the band went through a succession of drummers before
          recruiting Dave Grohl in 1990. Nirvana's success popularized alternative rock, and they were often referenced
          as
          the figurehead band of Generation X. Their music maintains a popular following and continues to influence
          modern
          rock and roll culture.
        </p>
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
    this.musicList = res.data;
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
  padding-left: 20px;
}

.description {
  text-align: justify;
}
</style>