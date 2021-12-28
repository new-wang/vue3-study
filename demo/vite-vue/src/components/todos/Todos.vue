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
    <Filter :items = "filterItems" v-model="visibility"></Filter>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watchEffect } from "vue";

import TodoItem from './TodoItem.vue'
import Filter from './Filter.vue'

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
    Filter
  },
  setup() {
    const state = reactive({
      newTodo: "",
      todos: todoStorage.fetch(),
      editedTodo: null, //正在编辑的todo
      filterItems:[
        {
          label:"All",
          value:'all'
        },
        {
          label:"Active",
          value:'active'
        },
        {
          label:"Completed",
          value:'completed'
        }
      ],
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

</style>