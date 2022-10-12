<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>All my comments</h1>
    </div>
    <hr />

    <div class="alert alert-success" v-if="$route.params.created == 'yes'">
      Record added successfully
    </div>
    <div class="alert alert-success" v-if="$route.params.deleted == 'yes'">
      Record deleted successfully
    </div>

    <div class="list-group" v-if="articles.length">
      <div v-for="article in articles" :key="article._id">
        <nuxt-link
          v-if="article.author_id == userId"
          class="list-group-item list-group-item-action"
          :to="'/articles/' + article._id"
        >
          For {{ article.title }} at {{ article.created_at.slice(0, 16) }} noted
          {{ article.note }}
        </nuxt-link>
      </div>
    </div>

    <div class="alert alert-info" v-else>No records found.</div>
  </div>
</template>

<script>
export default {
   data() {
    return {
      userId: '',
    }
  },
  mounted() {
    this.userId = this.$auth.user._id ? this.$auth.user._id : ''
  },
  async asyncData(context) {
    const { data } = await context.$axios.get('/api/articles')
    return {
      articles: data,
    }
  },
}
</script>
