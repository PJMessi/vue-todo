<template>
  <div>
    <div class="loader">
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="connect-container align-content-stretch d-flex flex-wrap">
      <Sidebar />

      <div class="page-container">

        <TopNavivation/>

        <div class="page-content">
          <div class="page-info">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Apps</a></li>
                <li class="breadcrumb-item active" aria-current="page">Todo</li>
              </ol>
            </nav>
          </div>
          <div class="main-wrapper">
            <div class="row">
              <div class="col-lg-3">
                <div class="card">
                  <div class="card-body">

                    <TodoSidebar/>

                  </div>
                </div>
              </div>

              <div class="col-lg-9">
                <TodoList/>
              </div>

            </div>
          </div>
        </div>
        <div class="page-footer">
          <div class="row">
            <div class="col-md-12">
              <span class="footer-text">2019 © stacks</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mailbox-compose-overlay"></div>
    <div class="mailbox-item-overlay"></div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import TodoSidebar from "../components/Todo/TodoSidebar";
import TodoList from "../components/Todo/TodoList"
import TopNavivation from "../components/TopNavigation"
import { mapGetters } from "vuex";

export default {
  name: "TodoApp",

  components: { Sidebar, TodoSidebar, TodoList, TopNavivation },

  computed: {
    ...mapGetters(["authUser", "isLoggedIn", "authToken"])
  },

  watch: {
    /**
     * If user is logged out, redirect users to the login page.
     */
    isLoggedIn: function(newValue) {
      if (newValue != true) {
        this.$router.push('/login')
      }
    }
  },

  methods: {
    /**
     * Intercepts the 401 request of the axios and then clears tokens.
     * We should put this in App.vue. For for this app, Chat.vue acts like App.vue, so we are putting here.
     */
    interceptAxios401: function () {
      let store = this.$store;
      // let router = this.$router;
      

      this.$axios.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          if (401 === error.response.status) {
            store.dispatch("reset");          
            // router.push("/login");            
            return Promise.reject(error);
            
          } else {
            return Promise.reject(error);
          }
        }
      );
    },
  }
  
};
</script>