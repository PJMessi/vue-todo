import axios from 'axios';

const state = {
  packages: []
};

const getters = {
  packages: state => state.packages,
};

const actions = {
  fetchPackages: async function({commit}, url=null) {
    try {
      url = url ? url : `http://localhost:5000/customer/paymentPackages`
  
      const res = await axios.get(url, { params: state.filters })
  
      const todos = res.data.data
  
      commit('setPackages', todos)
  
      return res;

    } catch (err) {
      console.log(err)

    }
  }
};

const mutations = {
  setPackages(state, data) {
    state.packages = data
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};