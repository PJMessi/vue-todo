<template>
  <div id="app">
    <Login v-if="$route.name == 'Login'" />
    <Register v-else-if="$route.name == 'Register'" />

    <div v-else>
      <div>
        <div class="loader">
          <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div class="connect-container align-content-stretch d-flex flex-wrap">
          <Sidebar />

          <div class="page-container">
            <TopNavivation />

            <router-view/>
            
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
    </div>

  </div>
</template>

<script>
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Register from './components/Register'
import TopNavivation from "./components/TopNavigation"
import { mapGetters, mapActions } from "vuex";
import Pusher from "pusher-js";
import axios from 'axios';

export default {
  name: "App",

  components: { Login, Register, Sidebar, TopNavivation },

  created: function() {
    this.interceptAxios401()
    
    if (this.$route.name != 'Login' && this.$route.name != 'Register') {
      this.fetchProfile()
      this.subscribe()
    }

  },

  computed: {
    ...mapGetters(["authUser", "isLoggedIn", "authToken"])
  },

  watch: {

    isLoggedIn: function(newValue) {
      if (newValue != true) {
        this.$router.push('/login')
      }
    }

  },

  methods: {
    ...mapActions(['addReceivedTodo', 'updateReceivedTodo', 'deleteReceivedTodo', 'fetchProfile']),

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

    subscribe: function () {

      const pusher = new Pusher("c004ff36b2f98f38257f", {
        cluster: "ap2",
        authEndpoint: "http://localhost:5000/customer/broadcasting/auth",
        auth: {
          headers: {
            Authorization: "Bearer " + this.authToken,
            Accept: "application/json",
          },
        },
      });

      pusher.connection.bind("connected", function () {
        let socketId = pusher.connection.socket_id;
        axios.defaults.headers.common["X-Socket-ID"] = socketId;
      });

      // subscribing to the pusher channel
      const todoChannel = pusher.subscribe(
        `private-todoChannel-${this.authUser._id}`
      );

      // pusher.subscribe(
      //   `other-channel-${this.authUser.id}`
      // );

      todoChannel.bind('TodoCreated', (e) => {
        const newTodo = e.data

        this.addReceivedTodo(newTodo)

      })

      todoChannel.bind('TodoUpdated', (e) => {
        const updatedTodo = e.data

        this.updateReceivedTodo(updatedTodo)

      })

      todoChannel.bind('TodoDeleted', (e) => {
        const todoToBeDeleted = e.data

        this.deleteReceivedTodo(todoToBeDeleted)

      })

      todoChannel.bind('Subscribed', (e) => {
        console.log(e.data)

        this.fetchProfile()

      })

    },

  }
};
</script>