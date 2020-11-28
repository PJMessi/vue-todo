<template>
  <div class="card">
    <div class="card-body">
      <div class="todo-list">
        <ul class="list-unstyled">
          <li>
            <a href="javascript: void(0);" class="custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="task1" />
              <label class="custom-control-label" for="task1"></label>
              Go to shop
            </a>
          </li>
          <li>
            <a href="javascript: void(0);" class="custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="task2" />
              <label class="custom-control-label" for="task2"></label>
              Finish java assignment
            </a>
          </li>
          <li>
            <a href="javascript: void(0);" class="custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="task3" />
              <label class="custom-control-label" for="task3"></label>
              Send e-mail to Dr. Collins
            </a>
          </li>
          <li>
            <a href="javascript: void(0);" class="custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="task4" />
              <label class="custom-control-label" for="task4"></label>
              Delete all folders in ../assets/plugins
            </a>
          </li>
          <li>
            <a href="javascript: void(0);" class="custom-checkbox done">
              <input
                type="checkbox"
                class="custom-control-input"
                id="task5"
                checked
              />
              <label class="custom-control-label" for="task5"></label>
              Sell iPad Mini
            </a>
          </li>
          <li>
            <a href="javascript: void(0);" class="custom-checkbox done">
              <input
                type="checkbox"
                class="custom-control-input"
                id="task6"
                checked
              />
              <label class="custom-control-label" for="task6"></label>
              Create new Amazon account
            </a>
          </li>
          <li>
            <a href="javascript: void(0);" class="custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="task7" />
              <label class="custom-control-label" for="task7"></label>
              Check new codes from section #7 student assignments
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
};
</script>