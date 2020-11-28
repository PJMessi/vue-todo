<template>
  <div class="card">
    <div class="card-body">
      <div class="todo-list">
        <ul class="list-unstyled">

          <li v-for="todo in todos" :key="todo.id">
            <a href="javascript: void(0);" class="custom-checkbox" :class="{'done': todo.status == 'finished'}">

              <input type="checkbox" class="custom-control-input" :id="todo.id" :checked="todo.status == 'finished'" @click.prevent="updateTodoStatus(todo)" />

              <label class="custom-control-label" :for="todo.id"></label>

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
      console.log('updating')
      let todoData = {
        id: todo.id
      }

      if (todo.status == 'finished') {
        todoData.status = 'pending'
      } else {
        todoData.status = 'finished'
      }
      this.updateTodo(todoData)
    }
  }
};
</script>