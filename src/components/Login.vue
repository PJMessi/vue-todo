<template>
  <div class="auth-page sign-in">
    <div class="connect-container align-content-stretch d-flex flex-wrap">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-5">
            <div class="auth-form">
              <div class="row">
                <div class="col">
                  <div class="logo-box">
                    <a href="javascript:void(0)" class="logo-text">Todo</a>
                  </div>
                  <form>
                    <div class="form-group">
                      <input
                        v-model="form.email"
                        type="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        v-model="form.password"
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                    <button
                    @click.prevent="login(form)"
                      type="submit"
                      class="btn btn-primary btn-block btn-submit"
                    >
                      Sign In <i v-if="authStatus == 'loading'" class="fas fa-spinner fa-spin ml-2"></i>
                    </button>
                    <div class="auth-options">                      
                      <router-link to="register" class="forgot-link">Sign Up</router-link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block d-xl-block">
            <div class="auth-image"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",

  computed: {
    ...mapGetters(["authStatus", "authUser", "authErrorMessage", "isLoggedIn"]),
  },

  watch: {
    isLoggedIn: function(newValue) {
      if (newValue == true) {
        this.$router.push('/')
      }
    }
  },

  data() {
    return {
      form: {
        email: "anishamaharjan4@gmail.com",
        password: "password",
      },
    };
  },

  methods: {
    ...mapActions(["login"]),
  },


};
</script>
