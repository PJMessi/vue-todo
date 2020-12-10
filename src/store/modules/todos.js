import axios from 'axios';
import Vue from 'vue';

const state = {
  // stores the list of todos along with pagination information.
  todos: {docs:[]},

  // stores the filters used to fetch the current todos list.
  filters: {
    limit: 15,
    sortBy: '_id',
    sortOrder: 'desc',
    q: '',
    status: ''
  },

  // tells if a todo is being created.
  creating: false,

  // stores the list of ids of the todos that is currently being updated.
  busyTodos: []
};

const getters = {
  // returns the todos.
  todos: state => state.todos.docs,

  // returns the todo filter.
  todosFilter: state => state.filters,

  // returns the flag that denotes if a new todo is being created.
  todoBeingCreated: state => state.creating,

  // returns the array of todos that are busy.
  busyTodos: state => state.busyTodos
};

const actions = {
  /**
   * Calls API to fetch the todos and replaces the current ones.
   * @param {*} param0 
   * @param {*} url 
   */
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

  /**
   * Calls API to create new todo and appends to the current todos list.
   * @param {*} param0 
   * @param {*} todoData 
   */
  createTodo: async function({commit}, todoData) {
    commit('updateCreatingStatusFlag', true)

    try {    
      const res = await axios.post('http://localhost:5000/customer/todos', todoData )

      const newTodo = res.data.data

      commit('addTodo', newTodo)

    } catch (err) {
      console.log(err)

    } finally {
      commit('updateCreatingStatusFlag', false)
    }
  },

  /**
   * Calls API to update the given todo and updates it in the current todos list as well.
   * @param {*} param0 
   * @param {*} todoData 
   */
  updateTodo: async function({commit}, todoData) {

    commit('addTodoToBusyList', todoData)

    try {    
      const todoId = todoData._id
      delete todoData['_id'] 

      const res = await axios.put(`http://localhost:5000/customer/todos/${todoId}`, todoData )

      const updatedTodo = res.data.data

      commit('updateTodo', updatedTodo)

    } catch (err) {
      console.log(err)

    } finally {
      commit('removeTodoFromBusyList', todoData)
    }
  },

  /**
   * Calls API to delete the given todo and removes the todo from the current todos list as well.
   * @param {*} param0 
   * @param {*} todoData 
   */
  deleteTodo: async function({commit}, todo) {
    commit('addTodoToBusyList', todo)

    try {
      await axios.delete(`http://localhost:5000/customer/todos/${todo._id}` )

      commit('deleteTodo', todo)

    } catch (err) {
      console.log(err)

    } finally {
      commit('removeTodoFromBusyList', todo)
    }
  },

  /**
   * Updates the filters used to fetch the todos.
   * @param {*} param0 
   * @param {*} filterData 
   */
  updateTodoFilters: function({commit}, filterData) {
    try {
      commit('updateFilter', filterData)

    } catch (err) {
      console.log(err)

    }
  },

  /**
   * Adds the given todo to the current todos list.
   * @param {*} param0 
   * @param {*} newTodo 
   */
  addReceivedTodo: function({commit}, newTodo) {
    try {
      commit('addTodo', newTodo)

    } catch (err) {
      console.log(err)

    }
  },

  /**
   * Updates the given todo in the current todos list.
   * @param {*} param0 
   * @param {*} updatedTodo 
   */
  updateReceivedTodo: function({commit}, updatedTodo) {
    try {
      commit('updateTodo', updatedTodo)

    } catch (err) {
      console.log(err)

    }
  },

  /**
   * Deletes the given todo from the current todos list.
   * @param {*} param0 
   * @param {*} todoToBeDeleted 
   */
  deleteReceivedTodo: function({commit}, todoToBeDeleted) {
    try {
      commit('deleteTodo', todoToBeDeleted)

    } catch (err) {
      console.log(err)

    }
  }

};

const mutations = {
  /** Sets new todos list by replacing the current ones. */
  setTodos(state, data) {
    state.todos = data
  },

  /** Adds todo to the todos list. */
  addTodo(state, newTodo) {
    if (state.filters.status == 'pending' || state.filters.status == '') {
      let todoData = state.todos.docs
      todoData.unshift(newTodo)
      Vue.set(state.todos, 'docs', todoData)
    }
  },

  /** Updates the todo from the list. */
  updateTodo(state, updatedTodo) {
    let todoData = state.todos.docs
    todoData = todoData.map(todo => {
      if (todo._id == updatedTodo._id) {
        return updatedTodo
      }
      return todo
    })
    Vue.set(state.todos, 'docs', todoData)
  },

  /** Deletes the todo from the list. */
  deleteTodo(state, todoToBeDeleted) {
    let todoData = state.todos.docs

    const index = todoData.findIndex(todo => {
      return todo._id == todoToBeDeleted._id
    })

    todoData.splice(index, 1)

    Vue.set(state.todos, 'docs', todoData)
  },

  /** Updates the filter for todos. */
  updateFilter(state, filterData) {
    for (const [key, value] of Object.entries(filterData)) {
      state.filters[key] = value
    }
  },

  /** Updates the flag that denotes if a new todo is being created. */
  updateCreatingStatusFlag(state, newStatus) {
    state.creating = newStatus
  },

  /** Adds the todo to the busy list.  */
  addTodoToBusyList(state, todo) {
    state.busyTodos.push(todo._id)
  },

  /** Removes the todo from the busy list. */
  removeTodoFromBusyList(state, todo) {
    const index = state.busyTodos.findIndex(busyTodo => {
      return busyTodo == todo._id
    })

    state.busyTodos.splice(index, 1)
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};