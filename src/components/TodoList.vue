<template>
  <div class="todo-list">
    <h2>To Do List</h2>
    <div>
      {{uncompletedCount}} of {{todos.length}} remaining
      <button
        @click="archiveCompleted"
      >Archive Completed</button>
    </div>
    <br>
    <form @submit.prevent>
      <Input size="30" autofocus placeholder="enter new todo here" path="todoText"/>
      <button :disabled="!todoText" @click="addTodo">Add</button>
    </form>
    <ul class="unstyled">
      <li :key="todo.id" v-for="(todo, index) in todos">
        <Todo
          :todo="todo"
          :onDeleteTodo="() => deleteTodo(todo.id)"
          :onToggleDone="() => toggleDone(index)"
        />
      </li>
    </ul>
    <Checkboxes class="colors" :list="colorList"/>
    <TextArea path="user.lifeStory"/>
    <div>
      <Select path="favorite.color">
        <option>red</option>
        <option>green</option>
        <option>blue</option>
      </Select>
    </div>
    <div>
      <RadioButtons class="flavor" :list="flavorList" path="favorite.flavor"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import {mapState} from 'vuex';
import {
  Checkboxes,
  Input,
  RadioButtons,
  Select,
  TextArea,
  vxe
} from 'vuex-easy';
import Todo from './Todo.vue';
import {createTodo} from '../util';

export default {
  name: 'TodoList',
  components: {Checkboxes, Input, RadioButtons, Select, TextArea, Todo},
  computed: {
    ...mapState({
      todos: state => state.todos,
      todoText: state => state.todoText
    }),
    uncompletedCount() {
      return this.todos.filter(t => !t.done).length;
    }
  },
  data() {
    return {
      colorList: [
        {text: 'Red', path: 'colors.red'},
        {text: 'Green', path: 'colors.green'},
        {text: 'Blue', path: 'colors.blue'}
      ],
      flavorList: [
        {text: 'Chocolate', value: 'choc'},
        {text: 'Strawberry', value: 'straw'},
        {text: 'Vanilla', value: 'van'}
      ]
    };
  },
  methods: {
    addTodo() {
      const todo = createTodo(this.todoText);
      vxe.push('todos', todo);
      vxe.set('todoText', '');
    },
    archiveCompleted() {
      vxe.filter('todos', todo => !todo.done);
    },
    deleteTodo(todoId) {
      vxe.filter('todos', todo => todo.id !== todoId);
    },
    setTodoText(text) {
      vxe.set('todoText', text);
    },
    toggleDone(index) {
      vxe.toggle(`todos.${index}.done`);
    }
  }
};
</script>
)
<style lang="scss">
.todo-list {
  button {
    margin-left: 10px;
  }

  button:disabled {
    background-color: gray;
    color: white;
  }

  .colors {
    margin: 15px 0;
  }

  ul.unstyled {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
  }
}
</style>
