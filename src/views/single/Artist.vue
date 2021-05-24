<template>
  <div>
    <div class="about_artist">
      <img v-bind:src=image alt="image">
      <div class="artist_info">
        <p><b>{{ artist.name }}</b></p>
        <p class="description">{{artist.description}}</p>
      </div>
    </div>
    <AlbumList v-bind:albums="albums"/>
  </div>
</template>

<script>
import MusicList from "../../components/music/MusicList";
import axios from "axios";
import AlbumList from "../../components/album/AlbumList";

export default {
  name: "Artist",
  components: {AlbumList, MusicList},
  data() {
    return {
      artist: Object,
      image: "",
      albums: []
    }
  },
  async mounted() {
    const result = await axios.get('http://localhost:8080/api/v1/artists/' + this.$route.query.id, {
      headers: {
        Authorization: 'Bearer_' + localStorage.getItem('token')
      }
    });
    this.artist = result.data;
    this.image = "http://localhost:8080/image/" + this.artist.image.name;

    const res = await axios.get('http://localhost:8080/api/v1/albums/artist/' + this.$route.query.id, {
      headers: {
        Authorization: 'Bearer_' + localStorage.getItem('token')
      }
    });
    this.albums = res.data;
  },
}
</script>

<style scoped>
.about_artist {
  padding: 20px;
  display: flex;
  flex-direction: row;
}

.about_artist img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: 0 0;
}

.artist_info {
  padding-left: 20px;
}

.description {
  text-align: justify;
}

</style>