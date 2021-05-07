<template>
  <div class="music-player">
    <div class="music-info"></div>
    <div class="music-controls">
      <div class="buttons"></div>
      <div class="progress-bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player"
}
</script>

<style scoped>
.music-player{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 64px !important;
  width: 100%;
  background-color: #212121;
  z-index: 2000;
}
</style>