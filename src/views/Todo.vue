<template>
  <div class="page-content">
    <div class="page-info">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">Todos</li>
        </ol>
      </nav>
    </div>
    <div class="main-wrapper">
      <div class="row">
        <div class="col-lg-3">
          <div class="card">
            <div class="card-body">
              <TodoSidebar />
            </div>
          </div>
        </div>

        <div class="col-lg-9">
          <TodoList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoSidebar from "../components/Todo/TodoSidebar";
import TodoList from "../components/Todo/TodoList";
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Todo",

  components: { TodoSidebar, TodoList },

  created() {
    /** If customer does not have active subscription, redirect to packages. */
    if (this.activeSubscription == null) {
      this.$router.push('/packages')
    } else {
      this.fetchTodos()
    }
  },

  computed: {
    ...mapGetters(['todos', 'activeSubscription', 'todosListBeingUpdated', 'todos'])
  },

  methods: {
    ...mapActions(['fetchTodos'])
  }
};
</script>