<template>
  <div class="music-player">
    <div class="music-info">
    </div>
    <div class="music-controls">
      <div class="buttons">
        <img v-on:click="prev" v-bind:src=icon_next alt="previous" id="previous">
        <img v-on:click="play_pause" v-bind:src=icon_play_pause alt="start/play" id="play">
        <img v-on:click="next" v-bind:src=icon_next alt="next" id="next">
      </div>
      <div class="progress-bar">
        <span class="current">{{ seek | minutes }}</span>
        <input v-on:change="change_current_time" type="range" class="progress-line" min="0" v-bind:max=max_seek
               v-model="seek"/>
        <span class="duration">{{ max_seek| minutes }}</span>
      </div>
    </div>
    <div class="music-controls-audio">
      <input type="range" class="volume" min="0" max="100" v-model="volume"/>
      <div id="volume-counter">{{ volume }}</div>
      <img v-on:click="mute" v-bind:src=icon_mute alt="previous">
    </div>
  </div>
</template>

<script>
export const IMG = {
  PLAY: require("@/assets/image/play.png"),
  PAUSE: require("@/assets/image/pause.png"),
  NEXT: require("@/assets/image/next.png"),
  MUTE: require("@/assets/image/volume_off.png"),
  UNMUTE: require("@/assets/image/volume_on.png")
}

export default {
  name: "Player",
  data() {
    return {
      volume: audio_player.volume * 100,
      previous_volume: 50,
      icon_mute: IMG.UNMUTE,
      icon_play_pause: IMG.PLAY,
      icon_next: IMG.NEXT,
      seek: 0,
      max_seek: 0,
      is_play: false,
      interval: null
    }
  },
  methods: {
    play_pause() {
      if (audio_player.state === true)
        this.icon_play_pause = IMG.PLAY;
      else
        this.icon_play_pause = IMG.PAUSE;
      audio_player.start();
      this.update_info();
    },

    update_info() {
      this.max_seek = audio_player.audio.duration;
      this.seek = audio_player.audio.currentTime;
      this.is_play = audio_player.state;
    },

    next() {
      audio_player.next();
      this.update_info();
    },

    prev() {
      audio_player.prev();
      this.update_info();
    },

    change_current_time() {
      audio_player.audio.currentTime = this.seek;
    },

    volume_update() {
      audio_player.volume_update(this.volume / 100);
      if (this.volume > 0) {
        this.icon_mute = IMG.UNMUTE;
      } else {
        this.icon_mute = IMG.MUTE;
      }
    },
    mute() {
      if (this.volume > 0) {
        audio_player.volume_update(0);
        this.previous_volume = this.volume;
        this.volume = 0;
        this.icon_mute = IMG.MUTE;
      } else {
        audio_player.volume_update(50 / 100);
        this.volume = this.previous_volume;
        this.icon_mute = IMG.UNMUTE;
      }
    }
  },
  filters: {
    minutes(value) {
      var seconds = ''
      if ((parseInt(value) % 60) % 10 < 10 && parseInt(value) % 60 < 10) {
        seconds = '0' + parseInt(value) % 60
      } else {
        seconds = parseInt(value) % 60
      }

      return parseInt(value / 60) + ":" + seconds;
    }
  },
  watch: {
    volume() {
      this.volume_update()
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      if (audio_player.audio !== null) {
        this.seek = audio_player.audio.currentTime;
        this.max_seek = audio_player.audio.duration;

        if (audio_player.state === true) {
          this.icon_play_pause = IMG.PAUSE;
        } else {
          this.icon_play_pause = IMG.PLAY;
        }
      }
    }, 100)
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }


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
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px 0;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
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
  margin: 0 10px;
}

.music-controls-audio {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.volume {
  border: 0;
  width: 80%;
}

#volume-counter {
  text-align: center;
  width: 40px;
}

img {
  opacity: 0.85;
}

img:active {
  padding-top: 3px;
}

img:hover {
  opacity: 1;
}

.current {
  text-align: center;
  width: 40px;
}

.duration {
  text-align: center;
  width: 40px;
}
</style>