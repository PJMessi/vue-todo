<template>
  <div class="todo-sidebar">
    <div class="todo-new-task">
      <button
        class="btn btn-primary btn-block"
        data-toggle="modal"
        data-target="#newTask"
      >
        Create New Task
      </button>
      <div
        class="modal fade"
        id="newTask"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="material-icons">close</i>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <input
                    v-model="todo.name"
                    type="text"
                    class="form-control"
                    id="new-task-name"
                    placeholder="Task Name"
                  />
                </div>

                <div class="form-group">
                  <input
                    v-model="todo.description"
                    type="text"
                    class="form-control"
                    id="new-task-description"
                    placeholder="Task Description"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                id="todoModalClostBtn"
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="createTodo(todo)"
              >
                Add <i v-if="todoBeingCreated" class="fas fa-spinner fa-spin ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="todo-menu">
      <ul class="list-unstyled">
        <li :class="{ active: todosFilter.status == '' }">
          <a href="#" @click.prevent="updateTodoFilters({ status: '' })">
            <i class="material-icons md-18">menu</i>All
          </a>
        </li>
        <li :class="{ active: todosFilter.status == 'pending' }">
          <a href="#" @click.prevent="updateTodoFilters({ status: 'pending' })">
            <i class="material-icons md-18">hourglass_bottom</i>Pending
          </a>
        </li>
        <li :class="{ active: todosFilter.status == 'completed' }">
          <a href="#" @click.prevent="updateTodoFilters({ status: 'completed' })" >
            <i class="material-icons md-18">done</i>Completed
          </a>
        </li>
      </ul>
    </div>

    <div class="divider"></div>

    <div class="todo-search">
      <form>
        <div class="input-group">
          <input
            v-on:input="debounceInput"
            type="text"
            id="todo-search"
            class="form-control"
            placeholder="Search task"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
export default {
  name: 'TodoSidebar',

  data() {
    return {
      todo: {
        name: '',
        status: 'pending',
        description: '',
      },

      searchTerm: '',
    };
  },

  watch: {
    todosFilter: {
      handler: function() {
        this.fetchTodos();
      },
      deep: true,
    },

    todoBeingCreated: function(newValue) {
      if (newValue == false) {
        this.todo.name = '';
        this.todo.status = 'pending';
        this.todo.description = '';

        document.getElementById('todoModalClostBtn').click()
      }
    },

    searchTerm: function(newValue) {
      this.updateTodoFilters({ q: newValue });
    },
  },

  computed: {
    ...mapGetters(['todosFilter', 'todos', 'todoBeingCreated', 'todosListBeingUpdated']),
  },

  methods: {
    ...mapActions(['createTodo', 'updateTodoFilters', 'fetchTodos']),

    debounceInput: _.debounce(function(e) {
      this.searchTerm = e.target.value;
    }, 500),


  },
};
</script>

<style scoped>
.material-icons.md-18 {
  font-size: 18px;
}
.material-icons.md-24 {
  font-size: 24px;
}
.material-icons.md-36 {
  font-size: 36px;
}
.material-icons.md-48 {
  font-size: 48px;
}
</style>
