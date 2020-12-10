<template>
  <div class="page-header">
    <nav class="navbar navbar-expand">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav">
        <li class="nav-item small-screens-sidebar-link">
          <a href="#" class="nav-link"
            ><i class="material-icons-outlined">menu</i></a
          >
        </li>
        <li class="nav-item nav-profile dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src="assets/images/avatars/profile-image-1.png"
              alt="profile image"
            />
            <span>{{authUser.name}}</span
            ><i class="material-icons dropdown-icon">keyboard_arrow_down</i>
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#"
              >Calendar<span class="badge badge-pill badge-info float-right"
                >2</span
              ></a
            >
            <a class="dropdown-item" href="#">Settings Privacy</a>
            <a class="dropdown-item" href="#">Switch Account</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" @click.prevent="confirmLogout()">Log out</a>
          </div>
        </li>

      </ul>
      <div class="collapse navbar-collapse" id="navbarNav">
        
      </div>
      <div class="navbar-search">
        
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "TopNavigation",

  computed: {
    ...mapGetters(['authUser'])
  },

  methods: {
    ...mapActions(['logout']),

    /**
     * Shows confirm dialog for logout, and calls logout function if user checks yes.
     */
    confirmLogout: async function() {
      let result = await this.$Swal.fire({
        title: 'Are you sure?',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes',
      });

      if (result.isConfirmed) {
        await this.logout();
      }
    },

    getRouteName: function() {
      return this.$route.name
    }
  },
};
</script>