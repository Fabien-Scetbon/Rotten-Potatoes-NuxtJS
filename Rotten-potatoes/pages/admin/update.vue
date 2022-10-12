<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-info mt-2" v-on:click="navigate()">
          Back view
        </button>
      </small>
    </h4>
    <div class="text-center mt-20"><h3>Update User</h3></div>

    <div class="col-md-12 form-wrapper">
      <form id="create-post-form" @submit.prevent="editUser">
        <div class="form-group col-md-12">
          <label for="title"> Role </label>
          <input
            type="text"
            id="role"
            v-model="user.role"
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
            v-model="user.full_name"
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
            v-model="user.email"
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
            type="text"
            id="password"
            v-model="user.password"
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
            <button class="btn btn-info" type="submit">Update</button>
          </small>
        </h4>
      </form>
    </div>
  </div>
</template>

<script>
const bcrypt = require('bcryptjs')
export default {
  middleware: 'isAdmin',
  data() {
    return {
      errors: null,
      user: [],
      samePassword: false,
    }
  },

  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/users/id/' + context.route.params.id
    )
    // console.log('data', data)
    return {
      user: data,
    }
  },

  methods: {
    editUser() {
      const userData = {
        role: this.user.role,
        full_name: this.user.full_name,
        email: this.user.email,
        password: this.user.password,
        databasePassword: null,
      }

      this.$axios.get('/api/users/id/' + this.$route.params.id).then((data) => {
        this.databasePassword = data.data.password
        if (userData.password !== this.databasePassword) {
          const salt = bcrypt.genSaltSync(10)
          userData.password = bcrypt.hashSync(userData.password, salt)
        } else {
          userData.password = this.databasePassword
        }
        this.$axios
          .put(`api/users/` + this.$route.params.id, userData)
          .then((data) => {
            console.log(data)
            this.$auth.setUser(userData)
            this.$router.go(-1)
          })
          .catch((error) => {
            if (error.response.data.errors) {
              this.errors = error.response.data.errors
              console.log(this.errors.email.msg)
            }
          })
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
