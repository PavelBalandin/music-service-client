<template>
  <div class="addplaylist">
    <form @submit.prevent="add">
      <input v-model="name" type="text">
      <button class="waves-effect waves-light btn-small" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import messages from "../../utils/messages";

export default {
  name: "AddPlaylist",
  data() {
    return {
      name: '',
    }
  },
  methods: {
    async add() {
      const result = await axios.post("http://localhost:8080/api/v1/playlists",
          {
            "name": this.name,
            "userId": localStorage.getItem('id'),
            "image": {"id": 5},
          },
          {headers: {Authorization: 'Bearer_' + localStorage.getItem('token')}});
      if (result.status === 201) {
        this.$emit('update-playlist', 'delete')
        this.$message('Playlist is created');
      } else {
        this.$error(messages['Playlist isn\'t created']);
      }
    }

  }
}
</script>

<style scoped>
.addplaylist form {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
}

.addplaylist form button {
  margin: 30px;
}
</style>