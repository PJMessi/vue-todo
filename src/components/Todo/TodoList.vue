<template>
  <div class="card">
    <div class="card-body">
      <div class="todo-list">
        <ul class="list-unstyled">

          <li v-for="todo in todos" :key="todo._id">
            <a href="javascript: void(0);" class="custom-checkbox" :class="{'done': todo.status == 'completed'}">
              <span>
                <input :disabled="busyTodos.includes(todo._id)" type="checkbox" class="custom-control-input" :id="todo._id" :checked="todo.status == 'completed'" @click.prevent="updateTodoStatus(todo)" />
                <label class="custom-control-label" :for="todo._id"></label>
                <strong>{{todo.name}}</strong>

              </span>
              <span class="ml-4">
                <small>{{todo.description}}</small>
              </span>
              <span class="float-right">
                <button class="btn btn-outline-light btn-xs" @click="confirmDeleteTodo(todo)">Delete</button>
              </span>

            </a>
            
          </li>
         
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "TodoList",

  created: function() {
    this.fetchTodos()
  },

  computed: {
    ...mapGetters(['todos', 'busyTodos'])
  },

  methods: {
    ...mapActions(['fetchTodos', 'updateTodoFilters', 'updateTodo', 'deleteTodo']),

    /**
     * Prepares the update data and calls the state function to update the todo.
     */
    updateTodoStatus: function (todo) {
      let todoData = {
        _id: todo._id
      }

      if (todo.status == 'completed') {
        todoData.status = 'pending'
      } else {
        todoData.status = 'completed'
      }

      this.updateTodo(todoData)
    },

    /**
     * Shows confirm dialog for delete todo, and calls state function to delete todo if user checks yes.
     */
    confirmDeleteTodo: async function(todo) {
      let result = await this.$Swal.fire({
        title: 'Are you sure?',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes',
      });

      if (result.isConfirmed) {
        await this.deleteTodo(todo);
      }
    },
  }
};
</script>

<style scoped>
  .float-right {
    float: right;
  }
</style>