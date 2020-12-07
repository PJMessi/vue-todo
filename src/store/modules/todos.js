import axios from 'axios';
import Vue from 'vue';

const state = {
  todos: {docs:[]},
  filters: {
    limit: 15,
    sortBy: '_id',
    sortOrder: 'desc',
    q: '',
    status: ''
  }
};

const getters = {
  todos: state => state.todos.docs,
  todosFilter: state => state.filters
};

const actions = {
  fetchTodos: async function({commit}, url=null) {
    try {
      url = url ? url : `http://localhost:5000/customer/todos`
  
      const res = await axios.get(url, { params: state.filters })
  
      const todos = res.data.data
  
      commit('setTodos', todos)
  
      return res;

    } catch (err) {
      console.log(err)

    }
  },


  createTodo: async function({commit}, todoData) {
    try {    
      const res = await axios.post('http://localhost:5000/customer/todos', todoData )

      const newTodo = res.data.data

      commit('addTodo', newTodo)

    } catch (err) {
      console.log(err)

    }
  },

  updateTodo: async function({commit}, todoData) {
    try {    
      const todoId = todoData._id
      delete todoData['_id'] 

      const res = await axios.put(`http://localhost:5000/customer/todos/${todoId}`, todoData )

      const updatedTodo = res.data.data

      commit('updateTodo', updatedTodo)

    } catch (err) {
      console.log(err)

    }
  },

  updateTodoFilters: function({commit}, filterData) {
    try {
      commit('updateFilter', filterData)

    } catch (err) {
      console.log(err)

    }
  },

  addReceivedTodo: function({commit}, newTodo) {
    try {
      commit('addTodo', newTodo)

    } catch (err) {
      console.log(err)

    }
  },

  updateReceivedTodo: function({commit}, updatedTodo) {
    try {
      commit('updateTodo', updatedTodo)

    } catch (err) {
      console.log(err)

    }
  }

};

const mutations = {
  setTodos(state, data) {
    state.todos = data
  },

  addTodo(state, newTodo) {
    if (state.filters.status == 'pending' || state.filters.status == '') {
      let todoData = state.todos.docs
      todoData.unshift(newTodo)
      Vue.set(state.todos, 'data', todoData)
    }
  },

  updateFilter(state, filterData) {
    for (const [key, value] of Object.entries(filterData)) {
      state.filters[key] = value
    }
  },

  updateTodo(state, updatedTodo) {
    let todoData = state.todos.docs
    todoData = todoData.map(todo => {
      if (todo._id == updatedTodo._id) {
        return updatedTodo
      }
      return todo
    })
    Vue.set(state.todos, 'docs', todoData)
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};