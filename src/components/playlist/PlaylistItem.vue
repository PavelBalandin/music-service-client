<template>
  <div v-bind:to=to class="music">
    <div id="index">{{ index }}</div>
    <router-link v-bind:to=to id="info">
      <img v-bind:src=img alt="">
      <div id="title_artist">
        <div id="title">{{ playlist.name }}</div>
      </div>
    </router-link>
    <a id="album" href="">{{ playlist.created }}</a>
    <div class="delete">
      <img v-on:click="delete_playlist" src="@/assets/image/cross3.png" alt="">
    </div>
    <div id="time">{{ playlist.quantity }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlaylistItem",
  props: {
    index: Number,
    playlist: Object
  },
  data() {
    return {
      img: "http://localhost:8080/image/" + this.playlist.image.name,
      to: "/playlist" + "?id=" + this.playlist.id
    }
  },
  methods: {
    async delete_playlist() {
      const result = await axios.delete("http://localhost:8080/api/v1/playlists/" + this.playlist.id,
          {headers: {Authorization: 'Bearer_' + localStorage.getItem('token')}});
      if (result.status === 204) {
        this.$message('Playlist is removed');
        this.$emit('delete-playlist', 'delete')
      } else {
        this.$error('Playlist isn\' present');
      }
    }
  }
}
</script>

<style scoped>

.music {
  display: flex;
  flex-direction: row;
  font-size: 16px;
  height: 56px;
  color: #a0a0a0;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  border-radius: 4px;
  line-height: normal;
}

#info img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: 0 0;
}

#index {
  width: 3%;
  display: flex;
  justify-content: center;
}

#info {
  display: flex;
  width: 40%;
}

#title_artist {
  padding: 0 0 0 16px;
  display: flex;
  align-items: center;
}

#title {
  color: #1d1d1d;
}

#album {
  display: flex;
  color: #a0a0a0;
  width: 30%;
}

#album:hover {
  transition: 0.3s;
  text-decoration: underline;
}

.delete {
  display: flex;
  width: 20%;
}

#time {
  width: 7%;
  display: flex;
  justify-content: center;
}

.music:hover {
  transition: 0.3s;
  background-color: #dbdbdb;
}

.music:not(:hover) {
  transition: 0.3s;
}

.delete img {
  width: 20px;
  height: 20px;
  opacity: 0.8;
}

.delete img:active {
  padding-top: 3px;
}

.delete img:hover {
  opacity: 1;
}


</style>