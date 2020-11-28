import axios from 'axios';

const state = {
  todos: { data:[] }
};

const getters = {
  todos: state => state.todos.data,
};

const actions = {
  fetchTodos: async function({commit}, url=null) {
    try {
      url = url ? url : `http://localhost:8000/api/todos`
  
      const res = await axios.get(url, { params: {limit: state.limit} })
  
      const todos = res.data.data
  
      commit('setTodos', todos)
  
      return res;

    } catch (err) {
      console.log(err)
    }
  },
};

const mutations = {
  setTodos(state, data) {
    state.todos = data
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};