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
    <div id="date">add to playlist</div>
    <div id="time">
      <a :href="audio" @click.prevent="download">Download</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MusicItem",
  props: {
    index: Number,
    music: {
      type: Object
    }
  },
  data() {
    return {
      artist: "",
      img: "http://localhost:8080/image/" + this.music.image.name,
      audio: "http://localhost:8080/audio/" + this.music.audio,
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
    }
  },


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


</style>