<template>
  <ul class="sidenav app-sidenav open">
    <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact">
      <a href="#" class="waves-effect waves-light pointer">{{link.title}}</a>
    </router-link>

  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  data: () => ({
    links: [
      {title: 'Home', url: '/', exact: true},
      {title: 'Search', url: '/search'},
      {title: 'Playlists', url: 'playlists'},
      {title: 'Artists', url: 'artists'},
      {title: 'Genres', url: 'genres'}
    ]
  })
}
</script>


<style scoped>
</style>