<template>
  <div v-on:click="play_pause" class="music">
    <div id="index">{{ index }}</div>
    <div id="info">
      <img v-bind:src=img alt="">
      <div id="title_artist">
        <div id="title">{{ music.name }}</div>
        <a id="artist" href="/">{{ music.artist }}</a>
      </div>
    </div>
    <div id="album">{{ music.album }}</div>
    <div id="date">{{ music.created_at }}</div>
    <div id="time">3:08</div>
  </div>
</template>

<script>
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
      img: "http://localhost:8080/image/s26im1.jpg"
    }
  },
  methods: {
    play_pause() {
      audio_player.start(this.music);
      this.$state = audio_player.state
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
}

img {
  width: 40px;
  height: 40px;
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
  width: 30%;
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