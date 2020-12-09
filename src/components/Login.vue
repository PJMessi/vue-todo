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
                    <a href="#" class="logo-text">Connect</a>
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
                      Sign In
                    </button>
                    <div class="auth-options">
                      <div class="custom-control custom-checkbox form-group">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="exampleCheck1"
                        />
                        <label class="custom-control-label" for="exampleCheck1"
                          >Remember me</label
                        >
                      </div>
                      <a href="#" class="forgot-link">Forgot Password?</a>
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
    ...mapGetters(["authUser", "authErrorMessage", "isLoggedIn"]),
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
        email: "anishamaharjan04@gmail.com",
        password: "password",
      },
    };
  },

  methods: {
    ...mapActions(["login"]),
  },


};
</script>
