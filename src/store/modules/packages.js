import axios from 'axios';

const state = {
  // stores the list of the packages.
  packages: [],

  // flag that tells if the packages list is being updated.
  loading: false,
};

const getters = {
  // returns the list of packages.
  packages: state => state.packages,

  // retuns true if the package list is being updated, else false.
  packagesListBeingUpdated: state => state.loading
};

const actions = {
  /**
   * Calls the api to fetch the list of packages and replaces the current ones (if any).
   * @param {*} param0 
   * @param {*} url 
   */
  fetchPackages: async function({commit}, url=null) {
    commit('updatePackagesListStatus', true)
    
    try {
      url = url ? url : `${process.env.VUE_APP_API_BASE_URL}/customer/paymentPackages`
  
      const res = await axios.get(url, { params: state.filters })
  
      const todos = res.data.data
  
      commit('setPackages', todos)
  
      return res;

    } catch (err) {
      console.log(err)

    } finally {
      commit('updatePackagesListStatus', false)
    }
  }
};

const mutations = {
  /** Replaces the current packages (if any) with new ones. */
  setPackages(state, data) {
    state.packages = data
  },

  /** Updates the flag status that denotes if the package list is being updated. */
  updatePackagesListStatus(state, newStatus) {
    state.loading = newStatus
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};