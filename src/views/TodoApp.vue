<template>
  <div>
    <div class="loader">
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="connect-container align-content-stretch d-flex flex-wrap">
      <Sidebar />

      <div class="page-container">

        <TopNavivation/>

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

                    <TodoSidebar/>

                  </div>
                </div>
              </div>

              <div class="col-lg-9">
                <TodoList/>
              </div>

            </div>
          </div>
        </div>
        <div class="page-footer">
          <div class="row">
            <div class="col-md-12">
              <span class="footer-text">2019 © stacks</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mailbox-compose-overlay"></div>
    <div class="mailbox-item-overlay"></div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import TodoSidebar from "../components/Todo/TodoSidebar";
import TodoList from "../components/Todo/TodoList"
import TopNavivation from "../components/TopNavigation"

export default {
  name: "TodoApp",

  components: { Sidebar, TodoSidebar, TodoList, TopNavivation },
  
};
</script>