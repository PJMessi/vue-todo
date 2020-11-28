import axios from 'axios';
import Vue from 'vue';

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


  createTodo: async function({commit}, todoData) {
    try {
    
      const res = await axios.post('http://localhost:8000/api/todos', todoData )

      const newTodo = res.data.data

      commit('addTodo', newTodo)

    } catch (err) {
      console.log(err)
    }
  }
};

const mutations = {
  setTodos(state, data) {
    state.todos = data
  },

  addTodo(state, todo) {
    let todoData = state.todos.data
    todoData.unshift(todo)
    Vue.set(state.todos, 'data', todoData)
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};