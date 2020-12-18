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

            <vue-progress-bar></vue-progress-bar>
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
      // fetching user profile.
      this.fetchProfile()

      // subscribing to pusher channels.
      this.subscribe()
    }

  },

  computed: {
    ...mapGetters([
      "authUser",
      "isLoggedIn",
      "authToken",
      'todosListBeingUpdated', 
      "packagesListBeingUpdated", 
      "paymentStatus",
      "todos",
      "packages",
      "todosFilter"
    ])
  },

  watch: {

    isLoggedIn: function(newValue) {
      if (newValue != true) {
        this.$router.push('/login')
      }
    },

    todosListBeingUpdated: function(value) {
      switch(value) {
        case true:
          if (this.todos.length == 0) this.$Progress.start()
          break;

        case false:
          this.$Progress.finish()
          break;
      }
    },

    paymentStatus: async function(newStatus) {
      switch(newStatus) {
        case 'confirming':
          this.$Progress.start()
          break;

        case 'success':
          this.$Progress.decrease(300)
          await this.fetchProfile()
          this.$Progress.finish()
          this.$Toast.fire({
            icon: 'success',
            title: 'Subscription successful'
          })
          break;

        case 'failed':
          this.$Progress.fail()
          this.$Toast.fire({
            icon: 'error',
            title: 'Subscription failed'
          })
          break;
      }
    },

    packagesListBeingUpdated: function(value) {
      switch(value) {
        case true:
          if (this.packages.length == 0) this.$Progress.start()
          break;

        case false:
          this.$Progress.finish()
          break;
      }
    },

    todosFilter: {
      handler: function() {
        this.$Progress.start()
      },
      deep: true
    }

  },

  methods: {
    ...mapActions([
      'addReceivedTodo', 
      'updateReceivedTodo', 
      'deleteReceivedTodo', 
      'fetchProfile'
    ]),

    /**
     * intercepting 401 request and redirecting to the login page.
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
            store.dispatch("logout");          
            // router.push("/login");            
            return Promise.reject(error);
            
          } else {
            return Promise.reject(error);
          }
        }
      );
    },

    /**
     * Subscribes to channels and handles the events.
     */
    subscribe: function () {

      const pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
        cluster: "ap2",
        authEndpoint: `${process.env.VUE_APP_API_BASE_URL}/customer/broadcasting/auth`,
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