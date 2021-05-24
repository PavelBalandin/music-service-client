<template>
  <div>
    <div class="tag_list">
      <div v-on:click="findByTag(tag.id)" v-for="tag in tags" class="tag">{{ tag.name }}</div>
    </div>
    <MusicList v-bind:musicList="musicList"/>
  </div>
</template>

<script>
import axios from "axios";
import MusicList from "../components/music/MusicList";

export default {
  name: "Genres",
  components: {MusicList},
  data() {
    return {
      tags: [],
      musicList: []
    }
  },
  methods: {
    async findByTag(id) {
      const res = await axios.post('http://localhost:8080/api/v1/compositions/tags',
          [{"id": id}],
          {
            headers: {Authorization: 'Bearer_' + localStorage.getItem('token')},
          });
      const musicList = res.data;
      this.musicList = musicList;
      audio_player.musicList.fromArray(musicList);
      this.$forceUpdate()
    }

  },

  async mounted() {
    const result = await axios.get('http://localhost:8080/api/v1/tags', {
      headers: {Authorization: 'Bearer_' + localStorage.getItem('token')}
    });
    this.tags = result.data;
  }
}
</script>

<style scoped>
.tag_list {
  display: flex;
  padding: 0 20px;
  margin-top: 20px;
  width: 100%;
  flex-direction: row;
}

.tag {
  width: auto;
  padding: 2px 10px;
  border-radius: 6px;
  background-color: #666666;
  color: white;
  margin-left: 10px;
  font-size: 16px;
}

.tag:hover {
  cursor: pointer;
}
</style>