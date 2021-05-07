<template>
  <div class="music-player">
    <div class="music-info">
    </div>
    <div class="music-controls">
      <div class="buttons">
        <img src="@/assets/image/next.png" alt="previous" id="previous">
        <img src="@/assets/image/play.png" alt="start/play" id="play">
        <img src="@/assets/image/next.png" alt="next" id="next">
      </div>
      <div class="progress-bar">
        <span class="current">1:45</span>
        <input type="range" class="progress-line" min="0" max="100"/>
        <span class="duration">3:15</span>
      </div>
    </div>
    <div class="music-controls-audio">
      <input type="range" class="volume" min="0" max="100"/>
      <div id="volume-counter">50</div>
      <img src="@/assets/image/volumeon.png" alt="previous">
    </div>
  </div>
</template>

<script>
export default {
  name: "Player"
}
</script>

<style scoped>
.music-player {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100px !important;
  width: 100%;
  background-color: #212121;
  z-index: 2000;
  color: #fff;
}

.music-player {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
}

.music-controls {
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: center;
  flex-direction: column;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

#previous {
  transform: rotate(180deg);
}

#play {
  margin: 0 30px;
}


.progress-bar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.progress-line {
  border: 0;
  width: 80%;
  margin: 0 30px;
}
.music-controls-audio{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.volume{
  border: 0;
  width: 80%;
}

#volume-counter{
  margin: 0 20px;
}
</style>