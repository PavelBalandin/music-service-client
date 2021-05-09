<template>
  <router-link to="/" class="music">
    <div id="index">{{ index }}</div>
    <div id="info">
      <img v-bind:src=img alt="">
      <div id="title_artist">
        <div id="title">{{ playlist.name }}</div>
      </div>
    </div>
    <a id="album" href=""></a>
    <div id="date">{{ playlist.created}}</div>
    <div id="time">{{ playlist.quantity }}</div>
  </router-link>
</template>

<script>
export default {
  name: "PlaylistItem",
  props: {
    index: Number,
    playlist: {
      type: Object
    }
  },
  data() {
    return {
      artist: "",
      img: "http://localhost:8080/image/" + this.playlist.image.name,
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