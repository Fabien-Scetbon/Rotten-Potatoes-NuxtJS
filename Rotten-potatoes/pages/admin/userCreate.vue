<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-info mt-2" v-on:click="navigate()">
          Back view
        </button>
      </small>
    </h4>
    <div class="text-center mt-20"><h3>Create User</h3></div>

    <div class="col-md-12 form-wrapper">
      <form id="create-post-form" @submit.prevent="submitForm()">
        <div class="form-group col-md-12">
          <label for="title"> Role </label>
          <input
            type="text"
            id="role"
            v-model="role"
            name="title"
            class="form-control"
            placeholder="Enter role"
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title"> Full Name </label>
          <input
            type="text"
            id="full_name"
            v-model="full_name"
            name="title"
            class="form-control"
            :class="{ 'is-invalid': errors && errors.full_name }"
            placeholder="Enter full name"
          />
          <div class="invalid-feedback" v-if="errors && errors.full_name">
            {{ errors.full_name.msg }}
          </div>
        </div>

        <div class="form-group col-md-12">
          <label for="title"> Email </label>
          <input
            type="text"
            id="email"
            v-model="email"
            name="title"
            class="form-control"
            :class="{ 'is-invalid': errors && errors.email }"
            placeholder="Enter email"
          />
          <div class="invalid-feedback" v-if="errors && errors.email">
            {{ errors.email.msg }}
          </div>
        </div>

        <div class="form-group col-md-12">
          <label for="title"> Password </label>
          <input
            type="password"
            id="password"
            v-model="password"
            name="title"
            class="form-control"
            :class="{ 'is-invalid': errors && errors.password }"
            placeholder="Enter password"
          />
          <div class="invalid-feedback" v-if="errors && errors.password">
            {{ errors.password.msg }}
          </div>
        </div>
        <h4 class="text-center mt-20">
          <small>
            <button class="btn btn-info" type="submit">Create</button>
          </small>
        </h4>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'isAdmin',
  //   auth: 'guest',
  data() {
    return {
      errors: null,
      role: null,
      full_name: null,
      email: null,
      password: null,
      status: false,
    }
  },

  methods: {
    submitForm() {
      this.$axios
        .post('/api/users/register', {
          role: this.role,
          full_name: this.full_name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response)

          if (response.data._id) {
            this.$router.push('/')
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    },
    navigate() {
      this.$router.go(-1)
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
