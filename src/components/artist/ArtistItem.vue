<template>
  <router-link v-bind:to=to class="artist">
    <div id="index">{{ index }}</div>
    <div id="info">
      <img v-bind:src=image alt="image">
      <div id="title">
        <div id="title_name">{{ artist.name }}</div>
      </div>
    </div>
    <a id="album" href=""></a>
    <div id="date">{{ artist.created }}</div>
    <div id="time">{{ artist.quantity }}</div>
  </router-link>
</template>

<script>
export default {
  name: "ArtistItem",
  props: {
    index: Number,
    artist: Object
  },
  data() {
    return {
      image: "http://localhost:8080/image/" + this.artist.image.name,
      to: "/artist" + "?id=" + this.artist.id
    }
  }
}
</script>

<style scoped>
.artist {
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

#info {
  display: flex;
  width: 40%;
}

#index {
  width: 3%;
  display: flex;
  justify-content: center;
}

#title {
  padding: 0 0 0 16px;
  display: flex;
  align-items: center;
}

#title_name {
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

.artist:hover {
  transition: 0.3s;
  background-color: #dbdbdb;
}

.artist:not(:hover) {
  transition: 0.3s;
}

</style>