<template>
  <div class="addplaylist">
    <form action="">
      <input v-model="name" type="text">
      <button v-on:click="add" class="waves-effect waves-light btn-small" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

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
      console.log(result.data)
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