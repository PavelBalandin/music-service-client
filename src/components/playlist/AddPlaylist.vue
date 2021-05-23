<template>
  <div class="addplaylist">
    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="name"
            type="text"
            class="validate"
            v-model.trim="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.maxLength)}"
        >
        <label for="name">Playlist name</label>
        <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
        >You need to enter playlist name</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.name.$dirty && !$v.name.maxLength"
        >Your playlist name must be no longer than 30 characters. Now is {{ name.length }}</small>
      </div>
      <button class="waves-effect waves-light btn-small" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import messages from "../../utils/messages";
import {maxLength, required} from "vuelidate/lib/validators";

export default {
  name: "AddPlaylist",
  data() {
    return {
      name: '',
    }
  },
  validations: () => ({
    name: {required, maxLength: maxLength(30)},
  }),
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      } else {
        this.add()
      }
    },
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
        this.name = ''
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
  margin-top: 20px;
}

.addplaylist form button {
  margin: 0 30px;
}

.input-field {
  width: 100%;
}
</style>