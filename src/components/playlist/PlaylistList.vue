<template>
  <div class="playlistList">
    <PlaylistItem
        v-for="(playlist, i) in playlists"
        v-bind:playlist="playlist"
        v-bind:index="i+1"
    />
    <AddPlaylist/>
  </div>
</template>

<script>
import PlaylistItem from "./PlaylistItem";
import AddPlaylist from "./AddPlaylist";

export default {
  name: "PlaylistList",
  props: ['playlists'],
  components: {AddPlaylist, PlaylistItem}
}
</script>

<style scoped>
.playlistList {
  height: calc(100vh - 196px);
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