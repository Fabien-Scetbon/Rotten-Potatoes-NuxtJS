<template>
  <div>
    <h1>Update comment</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">Comment</label>
            <textarea
              cols="30"
              rows="4"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.body }"
              v-model="body"
            ></textarea>
            <div class="invalid-feedback" v-if="errors && errors.body">
              {{ errors.body.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Note</label>
            <input
              type="number"
              min="0"
              max="10"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.note }"
              v-model="note"
            />
            <div class="invalid-feedback" v-if="errors && errors.note">
              {{ errors.note.msg }}
            </div>
          </div>

          <input type="submit" value="Submit" class="btn btn-primary mr-3" />
          <nuxt-link
            :to="'/articles/' + $route.params.id"
            class="btn btn-secondary mr-3"
            >Cancel</nuxt-link
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {
      errors: null,
      movie_id: null,
      author_id: null,
      author: null,
      title: null,
      body: null,
      note: null,
    }
  },

  mounted() {
    this.fillFormData()
  },

  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/articles/' + context.route.params.id
    )
    return {
      article: data,
    }
  },

  methods: {
    fillFormData() {
      this.movie_id = this.article.movie_id
      this.author_id = this.article.author_id
      this.author = this.article.author
      this.title = this.article.title
      this.body = this.article.body
      this.note = this.article.note
    },

    submitForm() {
      this.$axios
        .put('/api/articles/' + this.$route.params.id, {
          movie_id: this.movie_id,
          author_id: this.author_id,
          author: this.author,
          title: this.title,
          body: this.body,
          note: this.note,
        })
        .then((response) => {
          console.log(response)

          if (response.data._id) {
            this.$router.push({
              name: 'articles-id',
              params: { updated: 'yes', id: this.$route.params.id },
            })
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    },
  },
}
</script>
