<template>
  <li class="todo">
    <input type="checkbox" :checked="todo.done" @change="onToggleDone">
    <span :class="doneClass">{{todo.text}}</span>
    <button @click="onDeleteTodo">Delete</button>
  </li>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'Todo',
  props: {
    done: Boolean,
    onDeleteTodo: {
      type: Function,
      required: true
    },
    onToggleDone: {
      type: Function,
      required: true
    },
    todo: {
      type: Object,
      required: true,
      validator(obj) {
        return obj.text && obj.done !== undefined;
      }
    }
  },
  computed: {
    /*
    doneClass() {
      return 'done-' + this.todo.done;
    }
    */
    doneClass: function() {
      return 'done-' + this.todo.done;
    }
  },
  destroyed() {
    console.log('Todo.vue destroyed: entered');
  }
};
</script>

<style lang="scss">
.todo {
  $done-color: gray;

  margin-bottom: 5px;

  button {
    margin-left: 10px;
  }

  li {
    margin-top: 5px;

    .done-true {
      color: $done-color;
      text-decoration: line-through;
    }
  }
}
</style>
