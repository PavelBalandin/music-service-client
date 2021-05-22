<template>
  <div>
    <div class="search">
      <input v-on:change="find" v-model="input" type="text">
      <div class="img_c">
        <img v-on:click="find" src="@/assets/image/search.png" alt="">
      </div>
    </div>

    <MusicList v-bind:musicList="musicList"/>
  </div>
</template>

<script>
import MusicList from "../components/music/MusicList";
import axios from "axios";

export default {
  name: "Search",
  components: {MusicList},
  data() {
    return {
      musicList: [],
      input: ""
    }
  },
  methods: {
    async find() {
      if (this.input === "") return;
      const result = await axios.get('http://localhost:8080/api/v1/compositions/search/' + this.input, {
        headers: {
          Authorization: 'Bearer_' + localStorage.getItem('token')
        }
      });
      const musicList = result.data;
      this.musicList = musicList;
      audio_player.musicList.fromArray(musicList);
    }
  },

  watch: {
    input() {
      this.find();
    }
  }
}
</script>

<style scoped>
.search {
  padding: 10px;
  display: flex;
  flex-direction: row;
  width: 40%;
}

.img_c {
  display: flex;
  align-items: center;
}
</style>