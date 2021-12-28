<template>
  <div>
    <!-- 新增todo -->

    <!-- <EditTodo 
      v-model="newTodo"
      @keyup.enter="addTodo"
      autofocus
      placeholder="新增今日待办"
      autocomplete="off"></EditTodo> -->
    <EditTodo
      v-model:todo-title="newTodo"
      @keyup.enter="addTodo"
      autofocus
      placeholder="新增今日待办"
      autocomplete="off"
    ></EditTodo>

    <!-- todo 列表 -->
    <ul>
      <TodoItem v-for="todo in filterdTodos" 
      :key="todo.id"
      :todo = "todo" 
      v-model:edited-todo="editedTodo"
      @remove-todo="removeTodo"
      ></TodoItem>
    </ul>

    <!-- 过滤 -->
    <p class="filters">
      <span
        @click="visibility = 'all'"
        :class="{ selected: visibility === 'all' }"
        >All</span
      >
      <span
        @click="visibility = 'active'"
        :class="{ selected: visibility === 'active' }"
        >Active</span
      >
      <span
        @click="visibility = 'completed'"
        :class="{ selected: visibility === 'completed' }"
        >Completed</span
      >
    </p>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watchEffect } from "vue";

import TodoItem from './TodoItem.vue'

const filters = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter((todo) => !todo.completed);
  },
  completed(todos) {
    return todos.filter((todo) => todo.completed);
  },
};

// 缓存操作
const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem("vue3-todos") || "[]");
    todos.forEach((todo, index) => {
      todo.id = index + 1;
    });
    return todos;
  },
  save(todos) {
    localStorage.setItem("vue3-todos", JSON.stringify(todos));
  },
};

export default {
  components: {
    TodoItem,
  },
  setup() {
    const state = reactive({
      newTodo: "",
      todos: todoStorage.fetch(),
      editedTodo: null, //正在编辑的todo
      visibility: "all",
      filterdTodos: computed(() => {
        return filters[state.visibility](state.todos);
      }),
    });

    function addTodo() {
      state.todos.push({
        id: state.todos.length + 1,
        title: state.newTodo,
        completed: false,
      });
      state.newTodo = "";
    }
    
    function removeTodo(todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    }
    
    watchEffect(() => {
      todoStorage.save(state.todos);
    });

    return {
      ...toRefs(state),
      addTodo,
      removeTodo
    };
  }
};
</script>

<style>
.filters > span {
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}
.filters > span.selected {
  border-color: rgba(173, 47, 47, 0.2);
}
</style>