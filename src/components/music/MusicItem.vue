<template>
  <div class="music">
    <div v-on:click="play_pause" id="index">{{ index }}</div>
    <div id="info">
      <img v-bind:src=img alt="">
      <div id="title_artist">
        <div id="title">{{ music.name }}</div>
        <router-link v-for="artist in music.artists" id="artist" v-bind:to=artist_path(artist.id)>
          {{ artist.name }}
        </router-link>
      </div>
    </div>
    <router-link id="album" v-bind:to=album_path(music.album.id)>{{ music.album.name }}</router-link>
    <div id="date" class="dropdown">
      <div class="drop-btn">...</div>
      <div class="drop-content">
        <a v-on:click="add_composition(playlist.id, music.id)" v-for="(playlist, i) in playlists">{{
            playlist.name
          }}</a>
      </div>
    </div>
    <div v-bind:class="{delete_hidden: !currentPlaylist}" class="delete">
      <img v-on:click="delete_composition(currentPlaylist, music.id)" src="@/assets/image/cross3.png" alt="">
    </div>
    <div class="time">
      <a :href="audio" @click.prevent="download">Download</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import messages from "../../utils/messages";
import router from "@/router";

export default {
  name: "MusicItem",
  props: {
    index: Number,
    music: {
      type: Object
    },
    currentPlaylist: String
  },
  data() {
    return {
      artist: "",
      img: "http://localhost:8080/image/" + this.music.image.name,
      audio: "http://localhost:8080/audio/" + this.music.audio,
      playlists: []
    }
  },
  methods: {
    play_pause() {
      audio_player.start(this.music);
      this.$state = audio_player.state
    },
    artist_path(id) {
      return "/artist?id=" + id
    },
    album_path(id) {
      return "/album?id=" + id
    },
    download() {
      axios.get(this.audio, {responseType: 'blob'})
          .then(response => {
            const blob = new Blob([response.data], {type: 'application/media'})
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = this.music.audio
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error)
    },

    async add_composition(playlistId, compositionId) {
      const result = await axios.get("http://localhost:8080/api/v1/playlists/add-composition/" + playlistId + "/" + compositionId,
          {headers: {Authorization: 'Bearer_' + localStorage.getItem('token')}});
      if (result.status === 200) {
        this.$message('Added to playlist');
      } else {
        this.$error(messages['compositionAddError']);
      }
    },
    async delete_composition(playlistId, compositionId) {
      const result = await axios.get("http://localhost:8080/api/v1/playlists/delete-composition/" + playlistId + "/" + compositionId,
          {headers: {Authorization: 'Bearer_' + localStorage.getItem('token')}});
      if (result.status === 200) {
        this.$message('Composition is removed');
        this.$emit('delete-composition', 'delete')
      } else {
        this.$error('Composition isn\' present');
      }

    }
  },

  async mounted() {
    const res = await axios.get('http://localhost:8080/api/v1/playlists/user/' + localStorage.getItem("id"), {
      headers: {
        Authorization: 'Bearer_' + localStorage.getItem('token')
      }
    });
    this.playlists = res.data;
  }
  ,

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
}

#artist {
  font-size: 14px;
  color: #a0a0a0;
  margin-right: 12px;
}

#artist:hover {
  transition: 0.3s;
  text-decoration: underline;
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

#date {
  display: flex;
  width: 15%;
}

.delete {
  display: flex;
  width: 5%;
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
  cursor: pointer;
  opacity: 1;
}

.delete_hidden {
  display: none;
}


.time {
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


/*Drop down content*/

.dropdown {
  position: relative;
  display: inline-block;
}

.drop-content {
  display: none;
  position: absolute;
  border-radius: 2px;
  background-color: #f1f1f1;
  padding: 5px;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.drop-content a {
  color: #1d1d1d;
  font-size: 14px;
  padding: 10px 10px;
  border-radius: 2px;
  text-decoration: none;
  display: block;
}

.drop-content a:hover {
  cursor: pointer;
  background-color: #ddd;
}

.dropdown:hover .drop-content {
  display: block;
}

.drop-btn {
  font-size: 20px;
}

</style>