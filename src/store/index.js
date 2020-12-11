import Vue from "vue";
import Vuex from "vuex";

import auth from './modules/auth';
import todos from './modules/todos';
import packages from './modules/packages'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    todos,
    packages
  }
});
