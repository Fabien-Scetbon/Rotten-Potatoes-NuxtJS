<!-- le nom de la vue avec _ devant signifie route a param (id de la movie)
     les routes se rajoutent automatiquement dans .nuxt/router.js et on voit le param pris en compte-->

<template >
  <!-- Loading -->
  <Loading v-if="$fetchState.pending" />

  <!-- Movie Info -->
  <div v-else class="single-movie container">
    <NuxtLink class="button" :to="{ name: 'index' }"> Back </NuxtLink>
    <div class="movie-info">
      <div class="movie-img">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
        />
      </div>
      <div class="movie-content">
        <h1>Title: {{ movie.title }}</h1>
        <p class="movie-fact tagline">
          <span>Tagline:</span> "{{ movie.tagline }}"
        </p>
        <p class="movie-fact">
          <span>Released:</span>
          {{
            new Date(movie.release_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Duration:</span> {{ movie.runtime }} minutes
        </p>
        <p class="movie-fact">
          <span>Revenue:</span>
          {{
            movie.revenue.toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </p>
        <p class="movie-fact"><span>Overview:</span> {{ movie.overview }}</p>
      </div>
    </div>
    <hr />

    <div class="d-flex justify-content-between align-items-center">
      <h1>Comments for {{ movie.title }}</h1>
    </div>
    <hr />

    <div class="alert alert-success" v-if="$route.params.created == 'yes'">
      Record added successfully
    </div>
    <div class="alert alert-success" v-if="$route.params.deleted == 'yes'">
      Record deleted successfully
    </div>

    <div class="list-group" v-if="articles.length != 0">
      <div v-for="article in articles" :key="article._id">
        <nuxt-link
          v-if="article.title == movie.title"
          class="list-group-item list-group-item-action"
          :to="'/articles/' + article._id"
        >
          By {{ article.author }} at {{ article.created_at.slice(0, 16) }} noted
          {{ article.note }}
        </nuxt-link>
      </div>
    </div>

    <div class="alert alert-info" v-else>No records found.</div>
    <hr />

    <div v-if="$auth.loggedIn">
      <h1>Add new comment and note for {{ movie.title }}</h1>
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
           
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SingleMovie',
  data() {
    return {
      movie: '',
      userId: '',
      userName: '',
      errors: null,
      title: null,
      author: null,
      body: null,
      note: null,
    }
  },
  head() {
    // pour le SEO : met le html tag en head
    return {
      title: this.movie.title,
    }
  },

  mounted() {
    this.userId = this.$auth.user._id ? this.$auth.user._id : ''
    this.userName = this.$auth.user.full_name ? this.$auth.user.full_name : ''
    console.log(this.userId)
    console.log(this.userName)
  },
  async fetch() {
    await this.getSingleMovie()
  },

  async asyncData(context) {
    const { data } = await context.$axios.get('/api/articles')
    return {
      articles: data,
    }
  },

  // delay for fetching
  fetchDelay: 1000,

  methods: {
    async getSingleMovie() {
      console.log(this.$route.params.id)

      const data = axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US`
      )
      const result = await data
      this.movie = result.data
      this.title = this.movie.title
    },

    submitForm() {
      console.log(this.title)
      this.$axios
        .post('/api/articles', {
          movie_id: this.$route.params.id,
          author_id: this.userId,
          author: this.userName,
          title: this.title,
          body: this.body,
          note: this.note,
        })
        .then((response) => {
          console.log(response)

          if (response.data._id) {

            // window.location.reload()
            this.$router.push({ name: 'movies-addCom', params: { created: 'yes' , id: this.$route.params.id} })
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

<style lang="scss">
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;

  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }

  .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .movie-img {
      img {
        max-height: 500px;
        width: 100%;

        @media (min-width: 800px) {
          max-height: 700px;
          width: initial;
        }
      }
    }

    .movie-content {
      h1 {
        font-size: 56px;
        font-weight: 400;
      }

      .movie-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;

        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }

      .tagline {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>
