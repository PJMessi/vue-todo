<template>
  <div class="page-sidebar">
    <div class="logo-box">
      <router-link to="/" class="logo-text">Todo</router-link
      ><a href="#" id="sidebar-close"><i class="material-icons">close</i></a>
      <a href="#" id="sidebar-state"
        ><i class="material-icons">adjust</i
        ><i class="material-icons compact-sidebar-icon">panorama_fish_eye</i></a
      >
    </div>
    <div class="page-sidebar-inner slimscroll">
      <ul class="accordion-menu">
        <li class="sidebar-title">Apps</li>

        <li :class="{'active-page': getRouteName() == 'Dashboard'}">
          <router-link to="/" exact-active-class="active"
            ><i class="material-icons-outlined">dashboard</i>Dasboard</router-link
          >
        </li>

        <li :class="{'active-page': getRouteName() == 'Todo'}">
          <router-link disabled to="/todos" active-class="active"
            ><i class="material-icons-outlined">toc</i>Todos <span v-if="activeSubscription == null" class="badge badge-secondary">Subscription required</span> </router-link
          >
        </li>

        <li :class="{'active-page': getRouteName() == 'Package'}">
          <router-link to="/packages" active-class="active"
            ><i class="material-icons-outlined">card_membership</i>Packages</router-link
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
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Sidebar',

  computed: {
    ...mapGetters(['activeSubscription'])
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
