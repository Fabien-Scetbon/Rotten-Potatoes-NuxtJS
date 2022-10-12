<!-- page non utilisée car integree dans movieid -->


<template>
  <div>
    <h1>Add new comment</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">Title</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.title }"
              v-model="title">
            <div class="invalid-feedback" v-if="errors && errors.title">
              {{ errors.title.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Author</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.author }"
              v-model="author">
            <div class="invalid-feedback" v-if="errors && errors.author">
              {{ errors.author.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Comment</label>
            <textarea cols="30" rows="4" class="form-control"
              :class="{ 'is-invalid': errors && errors.body }"
              v-model="body"></textarea>
            <div class="invalid-feedback" v-if="errors && errors.body">
              {{ errors.body.msg }}
            </div>
          </div>

           <div class="form-group">
            <label for="">Note</label>
            <input type="number" min="0" max="10" class="form-control"
              :class="{ 'is-invalid': errors && errors.note }"
              v-model="note">
            <div class="invalid-feedback" v-if="errors && errors.note">
              {{ errors.note.msg }}
            </div>
          </div>

          <input type="submit" value="Submit" class="btn btn-primary mr-3">
          <nuxt-link to="/articles" class="btn btn-secondary mr-3">Cancel</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data(){
    return{
      errors:null,
      title:null,
      author:null,
      body:null,
      note:null
    }
  },

  methods:{
    submitForm(){
      this.$axios.post( '/api/articles', {
          title: this.title,
          author: this.author,
          body: this.body,
          note:this.note,
        })
        .then((response) => {
          console.log(response)

          if(response.data._id){
            this.$router.push({ name:'articles', params:{ created:'yes' } })
          }
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.errors){
            this.errors = error.response.data.errors
          }
        });
    }
  }
}
</script>