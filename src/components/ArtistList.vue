<template>
  <div class="artistList">
    <ArtistItem
        v-for="(artist, i) in artists"
        v-bind:artist="artist"
        v-bind:index="i+1"
    />
  </div>
</template>

<script>
import ArtistItem from "./ArtistItem";

export default {
  name: "ArtistList",
  props: ['artists'],
  components: {ArtistItem},
}
</script>

<style scoped>
.artistList {
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