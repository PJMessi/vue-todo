<template>
  <div class="page-content">
    <div class="page-info">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Apps</a></li>
          <li class="breadcrumb-item active" aria-current="page">Todo</li>
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

export default {
  name: "Todo",

  components: { TodoSidebar, TodoList },
};
</script>