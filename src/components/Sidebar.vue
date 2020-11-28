<template>
  <div class="page-sidebar">
    <div class="logo-box">
      <a href="#" class="logo-text">Connect</a
      ><a href="#" id="sidebar-close"><i class="material-icons">close</i></a>
      <a href="#" id="sidebar-state"
        ><i class="material-icons">adjust</i
        ><i class="material-icons compact-sidebar-icon">panorama_fish_eye</i></a
      >
    </div>
    <div class="page-sidebar-inner slimscroll">
      <ul class="accordion-menu">
        <li class="sidebar-title">Apps</li>

        <li :class="{'active-page': getRouteName() == 'TodoApp'}">
          <router-link to="/" active-class="active"
            ><i class="material-icons-outlined">dashboard</i>Dashboard</router-link
          >
        </li>

        <li>
          <a href="#" @click.prevent="confirmLogout()"
            ><i class="material-icons-outlined">power_settings_new</i>Log out</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Sidebar',

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
