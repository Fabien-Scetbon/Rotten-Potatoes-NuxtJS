<!-- vue de transition = seule methode trouvee pour rafraichir movieid apres add comment-->

<template>
  <div></div>
</template>

<script>
export default {
  name: 'AddCom',

  mounted() {
    this.$router.push({
      name: 'movies-movieid',
      params: { created: 'yes', id: this.$route.params.id },
    })
  },
}
</script>
