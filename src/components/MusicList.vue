<template>
  <div class="musicList">
    <MusicItem
        v-for="(music, i) in musicList"
        v-bind:music="music"
        v-bind:index="i+1"
    />
  </div>
</template>

<script>
import MusicItem from "./MusicItem";

export default {
  name: "MusicList",
  props: ['musicList'],
  components: {MusicItem},
}
</script>

<style scoped>
.musicList {
  height: calc(100vh - 160px);
  margin: 16px 0;
  padding: 0 32px;
  overflow-y: scroll;

}

::-webkit-scrollbar {
  width: 6px;
  height: 30px;
}

::-webkit-scrollbar-button {
  background-color: #fff;
}

::-webkit-scrollbar-track {
  background-color: #fff;
}

::-webkit-scrollbar-track-piece {
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  height: 10px;
  background-color: #666;
  border-radius: 3px;
}

::-webkit-scrollbar-corner {
  background-color: #fff;
}

::-webkit-resizer {
  background-color: #fff;
}
</style>