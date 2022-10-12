<template>
  <div>
    <h1>Comment details</h1>

    <hr />

    <div class="alert alert-success" v-if="$route.params.updated == 'yes'">
      Record updated successfully
    </div>
    <div class="comment">
      <h2>{{ article.title }}</h2>

      <h6>By {{ article.author }}</h6>

      <p>{{ article.body }}</p>

      <h6>Note {{ article.note }} / 10</h6>
    </div>

    <hr />
    <div class="d-flex justify-content-between">
      <div v-if="authorId == userId">
        <nuxt-link
          :to="'/articles/' + article._id + '/update'"
          class="btn btn-primary mr-3"
          >Update</nuxt-link
        >
        <button class="btn btn-danger" @click="deleteRecord()">Delete</button>
      </div>
      <NuxtLink
        class="button button-light"
        :to="{ name: 'movies-movieid', params: { id: movieId } }"
      >
        Return to movie
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      userId: '',
      authorId: '',
      movieId: '',
    }
  },

  mounted() {
    this.userId = this.$auth.user._id ? this.$auth.user._id : ''
  },

  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/articles/' + context.route.params.id
    )
    console.log(data)
    return {
      article: data,
      authorId: data.author_id,
      movieId: data.movie_id,
    }
  },

  methods: {
    deleteRecord() {
      if (confirm('Are you sure?') === true) {
        this.$axios
          .delete('/api/articles/' + this.$route.params.id)
          .then((response) => {
            if (response.data._id) {
              this.$router.push({
              name: 'movies-movieid',
                params: { deleted: 'yes', id: this.movieId },
              })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.comment {
  background-color: antiquewhite;
}
</style>

  
