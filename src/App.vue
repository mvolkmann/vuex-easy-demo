<template>
  <TodoList/>
</template>

<script>
/* eslint-disable no-console */
import TodoList from './components/TodoList.vue';
import {createTodo} from './util';
import {createStore, loadState, vxe} from 'vuex-easy';

const initialState = {
  colors: {
    blue: false,
    green: true,
    red: false
  },
  favorite: {
    color: 'red',
    flavor: 'van'
  },
  todoText: '',
  todos: [],
  user: {
    lifeStory: ''
  }
};
const store = createStore(initialState, {validate: true});

export default {
  name: 'App',
  components: {TodoList},
  data: () => {
    return {name: 'start'};
  },
  methods: {
    changeName() {
      this.name = 'T' + Date.now();
    }
  },
  beforeCreate() {
    loadState();
    const todos = vxe.get('todos');
    if (todos.length === 0) {
      vxe.push(
        'todos',
        createTodo('learn Vue', true),
        createTodo('build a Vue app')
      );
    }
  },
  store
};
</script>

<style lang="scss">
body {
  font-family: sans-serif;
  padding-left: 10px;
}

button {
  border-radius: 4px;
  padding: 4px;
}

select, textarea {
  border-color: lightgray;
}
</style>
