<template>
  <div  class="container-fluid">
    <div class="text-center">
      <h1>Users</h1>
      <p>Built By Les 4F</p>

      <h4 class="text-center mt-20">
        <small>
          <button class="btn btn-info mt-2" v-on:click="navigate()">
            Create User
          </button>
        </small>
      </h4>

      <div v-if="users.length === 0">
        <h2>No user found at the moment</h2>
      </div>
    </div>

    <!-- <div class="row"> -->
    <div class="">
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Role</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <thead class="thead">
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.role }}</td>
            <td>{{ user.full_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.password }}</td>

            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px">
                  <router-link
                    :to="{ name: 'admin-update', params: { id: user._id } }"
                    class="btn btn-info"
                    >Edit</router-link
                  >
                </div>

                <div class="btn-group" style="margin-bottom: 20px">
                  <button
                    class="btn btn-info "
                    v-on:click="deleteUser(user._id)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </thead>
      </table>
    </div>
    <!-- </div> -->
  </div>
</template>



<script>
// import axios from 'axios'

export default {
  middleware: 'isAdmin',
  data() {
    return {
      users: [],
      full_name: '',
    }
  },

  async asyncData(context) {
    const { data } = await context.$axios.get(`/api/users/users`)
    // console.log('data', data)
    return {
      users: data,
    }
  },

  methods: {
    deleteUser(id, redirect) {
      this.$axios.get(`/api/users/id/${id}`).then((resp) => {
        this.full_name = resp.data.full_name
        confirm('Are you sure to delete ' + this.full_name + '?')
          ? this.$axios.delete(`/api/users/${id}`)
          : alert('delete cancel!')
        this.$router.push('/')
        // this.$router.go(0)
      })
    },
    navigate() {
      this.$router.push({ name: 'admin-userCreate' })
    },
  },
}
</script>

<style scoped>
h1 {

  color: #FFFFFF!important;

}
</style>