import Vue from "vue";
import Vuex from "vuex";

import authentication from './modules/authenticate';
import todos from './modules/todos';
import packages from './modules/packages'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    todos,
    packages
  }
});
