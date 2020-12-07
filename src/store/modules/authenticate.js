import axios from 'axios';

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user : JSON.parse(localStorage.getItem('user')) || {},
  errorMessage: ''
};

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  authUser: state => state.user,
  authToken: state => state.token,
  authErrorMessage: state => state.errorMessage
};

const actions = {
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

  logout({commit}){
    return new Promise((resolve) => {


        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']

        resolve()
  

    })
  },

  reset({commit}) {
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
  auth_request(state){
    state.status = 'loading'
  },

  auth_success(state, data){
    state.status = 'success'
    state.token = data.token
    state.user = data.user
    state.errorMessage = ''
  },

  auth_error(state){
    state.status = 'failed'
  },

  logout(state){
    state.status = ''
    state.token = ''
  },

  error_message(state, message) {
    state.errorMessage = message
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};