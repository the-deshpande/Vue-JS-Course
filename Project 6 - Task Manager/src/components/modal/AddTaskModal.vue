<script setup>
import { useTasksStore } from '../../stores/tasksStore';

const store = useTasksStore();
let newTask = {completed: false,};
</script>

<template>
    <div class="form">
      <h3>Add a new task</h3>
      <label for="title">Title *</label>
      <input v-model="newTask.name" type="text" name="title" placeholder="Enter a title..."><br />
      <textarea v-model="newTask.description" name="description" rows="4" placeholder="Enter a description..." /><br />
      <button class="btn gray" @click="store.addTask(newTask)">Add Task</button>
    </div>
</template>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  max-width: 100%;

  label {
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
  }

  input,
  select,
  textarea {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    border: 1px solid #C2C2C2;
    border-radius: 4px;
    padding: 8px 12px;
    margin-top: 5px;

    &::placeholder {
      color: #A6A6A6;
    }
  }

  

  .btn {
    width: fit-content;
    padding-inline: 23px;
  }
}
</style>