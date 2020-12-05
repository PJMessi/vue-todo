<template>
  <div class="card">
    <div class="card-body">
      <div class="todo-list">
        <ul class="list-unstyled">

          <li v-for="todo in todos" :key="todo._id">
            <a href="javascript: void(0);" class="custom-checkbox" :class="{'done': todo.status == 'completed'}">

              <input type="checkbox" class="custom-control-input" :id="todo._id" :checked="todo.status == 'completed'" @click.prevent="updateTodoStatus(todo)" />

              <label class="custom-control-label" :for="todo._id"></label>

              {{todo.name}}
              
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
    ...mapGetters(['todos'])
  },

  methods: {
    ...mapActions(['fetchTodos', 'updateTodoFilters', 'updateTodo']),

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
    }
  }
};
</script>