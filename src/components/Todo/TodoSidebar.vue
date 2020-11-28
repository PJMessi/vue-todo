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
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-primary" @click.prevent="createTodo(todo)">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="todo-menu">
      <ul class="list-unstyled">
        <li class="active">
          <a href="#" @click.prevent="updateTodoFilters({status: ''})"><i class="fas fa-bars"></i>All</a>
        </li>
        <li>
          <a href="#" @click.prevent="updateTodoFilters({status: 'pending'})"><i class="fas fa-trash"></i>Pending</a>
        </li>
        <li>
          <a href="#" @click.prevent="updateTodoFilters({status: 'inprogress'})"><i class="fas fa-trash"></i>In Progress</a>
        </li>
        <li>
          <a href="#" @click.prevent="updateTodoFilters({status: 'finished'})"><i class="fas fa-check"></i>Completed</a>
        </li>
      </ul>
    </div>

    <div class="divider"></div>

    <div class="todo-search">
      <form>
        <div class="input-group">
          <input
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
export default {
  name: "TodoSidebar",

  data() {
    return {
      todo: {
        name: '',
        status: 'pending',
        description: ''
      }
    }
  },

  watch: {
    todosFilter: {
      handler: function() {
        this.fetchTodos()
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters(['todosFilter'])
  },

  methods: {
    ...mapActions(['createTodo', 'updateTodoFilters', 'fetchTodos'])
  }
};
</script>