import axios from 'axios';

const state = {
  // stores the authentication status about wether its in progress, whether it succeeded or failed.
  status: '',

  // stores the auth token.
  token: localStorage.getItem('token') || '',

  // stores the auth user.
  user : JSON.parse(localStorage.getItem('user')) || {},

  // stores the error message if the authentication failed.
  errorMessage: ''
};

const getters = {
  // returns if the user is logged in or not.
  isLoggedIn: state => !!state.token,

  // returns the authentication status about wether its in progress, whether it succeeded or failed.
  authStatus: state => state.status,

  // returns the authenticated user.
  authUser: state => state.user,

  // returns the authentication token.
  authToken: state => state.token,

  // returns the error message if the authentication failed.
  authErrorMessage: state => state.errorMessage
};

const actions = {
  /**
   * Calls the API to fetch the profile of logged in user and updates the auth user in state and local storage.
   * @param {*} param0 
   */
  fetchProfile: async function ({commit}) {
    try {
      const resp = await axios.get('http://localhost:5000/customer/auth/profile' )
      
      const user = resp.data.data

      localStorage.setItem('user', JSON.stringify(user))

      commit('setUser', user)

    } catch (err) {
      console.log(err)
    }
  },

  /**
   * Calls the API to login user. If successful, updates the auth status, user and token in state and local storage.
   * @param {*} param0 
   * @param {*} credential 
   */
  login: async function ({commit}, credential) {
   
    try {

      commit('auth_request')

      const resp = await axios.post('http://localhost:5000/customer/auth/login', credential )
          
      const token = resp.data.data.token
      localStorage.setItem('token', token)
      
      const user = resp.data.data.customer
      localStorage.setItem('user', JSON.stringify(user))
  
      axios.defaults.headers.common['Authorization'] = "Bearer " + token
  
      commit('auth_success', {token, user})
      

    } catch (err) {
      if (err.response) {
        commit('error_message', err.response.data.message)
      }
      
      commit('auth_error')       
      localStorage.removeItem('token')
    }

 
  },

  /**
   * Calls the API to register new user from the given data. If successful, updates the auth status, user and token in state and local storage.
   * @param {*} param0 
   * @param {*} data 
   */
  register: async function({commit}, data) {
    try {

      commit('auth_request')

      const resp = await axios.post('http://localhost:5000/customer/auth/register', data )
          
      const token = resp.data.data.token
      localStorage.setItem('token', token)
      
      const user = resp.data.data.customer
      localStorage.setItem('user', JSON.stringify(user))
  
      axios.defaults.headers.common['Authorization'] = "Bearer " + token
  
      commit('auth_success', {token, user})
    

    } catch (err) {
      if (err.response) {
        commit('error_message', err.response.data.message)
      }
      
      commit('auth_error')       
      localStorage.removeItem('token')
    }
  },

  /**
   * Logs out user by resetting the state and deleting the data from local storage.
   * @param {*} param0 
   */
  logout({commit}){
    return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        resolve()
    })
  }
};

const mutations = {
  // Updates the authenticaton status to loading.
  auth_request(state){
    state.status = 'loading'
  },

  // Updates the authntication status to success and updates the authenticated user and token in the state.
  auth_success(state, data){
    state.status = 'success'
    state.token = data.token
    state.user = data.user
    state.errorMessage = ''
  },

  // Updates the authentication status to failed.
  auth_error(state){
    state.status = 'failed'
  },

  // Resets the authentication status, token and user in the state.
  logout(state){
    state.status = ''
    state.token = ''
    state.user = {}
  },

  // Updates the error message for failed authentication.
  error_message(state, message) {
    state.errorMessage = message
  },

  // Updates the auth user in the state.
  setUser(state, user) {
    state.user = user
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};