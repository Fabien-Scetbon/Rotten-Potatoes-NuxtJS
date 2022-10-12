<template>
  <div>
    <div class="text-center mt-20"><h3>Login</h3></div>
    <hr />

    <div class="alert alert-success" v-if="$route.params.registered == 'yes'">
      You have registered successfully
    </div>

    <form
      class="col-md-12 form-wrapper"
      action=""
      method="post"
      @submit.prevent="submitForm()"
    >
      <div class="form-group">
        <label for="">Email</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors && errors.email }"
          v-model="email"
        />
        <div class="invalid-feedback" v-if="errors && errors.email">
          {{ errors.email.msg }}
        </div>
      </div>

      <div class="form-group">
        <label for="">Password</label>
        <input
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors && errors.password }"
          v-model="password"
        />
        <div class="invalid-feedback" v-if="errors && errors.password">
          {{ errors.password.msg }}
        </div>
      </div>

      <div class="alert alert-danger" v-if="login_error">
        {{ login_error }}
      </div>
      <h4 class="text-center mt-20">
        <input type="submit" value="Login" class="btn btn-info mr-3" />
        <nuxt-link to="/" class="btn btn-secondary mr-3">Cancel</nuxt-link>
      </h4>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      errors: null,
      login_error: null,
      email: null,
      password: null,
      status: false,
    }
  },

  methods: {
    submitForm() {
      this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          this.$auth.setUser(response.data.user)
          console.log(response.data.user) // this data is ok
        })
        // this.$auth.loginWith('local', {
        // data: {
        // email: this.email,
        // password: this.password}
        // })
        // .then(() => this.$toast.success('Logged In!'))

        .catch((error) => {
          console.log(error)
          if (error.response.data.message) {
            this.login_error = error.response.data.message
          }
        })
    },
  },
}
</script>

<style scoped>
.form-wrapper {
  width: 30rem !important;
  margin: 0 auto !important;

}


h3 {

  color: #FFFFFF!important;

}
</style>