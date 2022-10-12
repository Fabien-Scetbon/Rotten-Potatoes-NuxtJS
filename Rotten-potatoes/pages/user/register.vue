<template>
  <div>
    <div class="text-center mt-20"><h3>Register</h3></div>
    <hr />

    <form
      class="col-md-12 form-wrapper"
      action=""
      method="post"
      @submit.prevent="submitForm()"
    >
      <div class="form-group col-md-12">
        <label for="">Full Name</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors && errors.full_name }"
          v-model="full_name"
        />
        <div class="invalid-feedback" v-if="errors && errors.full_name">
          {{ errors.full_name.msg }}
        </div>
      </div>

      <div class="form-group col-md-12">
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

      <div class="form-group col-md-12">
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

        <p v-if="message" style="color:red" ><br/>{{message}}</p>
        <div class="form-group">
          <label for="">Password confirm</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors && errors.password }"
            v-model="passwordConfirm"
          />
          <div class="invalid-feedback" v-if="errors && errors.password">
            {{ errors.password.msg }}
          </div>
        </div>
      </div>
      <h4 class="text-center mt-20">
        <input type="submit" value="Register" class="btn btn-info mr-3" />
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
      full_name: null,
      email: null,
      password: null,
      passwordConfirm:null,
      status: false,
      role:"user",
      message:'',
    }
  },

  methods: {
    submitForm() {
       if (this.password !== this.passwordConfirm) {
        // console.log("danger paswords")
        this.message = "Passwords don't match !"
        return
      }
      this.$axios
        .post('/api/users/register', {
          full_name: this.full_name,
          email: this.email,
          password: this.password,
          role:this.role,
        })
        .then((response) => {
          console.log(response)

          if (response.data._id) {
            this.$router.push({
              name: 'user-login',
              params: { registered: 'yes' },
            })
            // log in if successfully registered
            this.$auth
              .loginWith('local', {
                data: {
                  email: this.email,
                  password: this.password,
                },
              })
              .catch((error) => {
                console.log(error)
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

<style scoped>
.form-wrapper {
  width: 30rem !important;
  margin: 0 auto !important;
}
h3 {
  color: #ffffff !important;
}
</style>
