<template>
  <div class="playlistList">
    <AlbumItem
        v-for="(album, i) in albums"
        v-bind:album="album"
        v-bind:index="i+1"
    />
  </div>
</template>

<script>
import AlbumItem from "./AlbumItem";

export default {
  name: "AlbumList",
  props: ['albums'],
  components: {AlbumItem}
}
</script>

<style scoped>
.playlistList {
  height: calc(100vh - 436px);
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