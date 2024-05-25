<script setup>
import { ref, reactive, computed } from 'vue';
import Task from './components/Tasks.vue';
import Filter from './components/Filter.vue';
import ModalWindow from './components/modal/ModalWindow.vue';
import AddTaskModal from './components/modal/AddTaskModal.vue';

const appName = "Tasks   Manager";

let tasks= reactive([
    {
      name: "Website design",
      description: "Define the style guide, branding and create the webdesign on Figma.",
      completed: true,
      id: 1,
    },
    {
      name: "Website development",
      description: "Develop the portfolio website using Vue JS.",
      id: 2,
      completed: false
    },
    {
      name: "Hosting and infrastructure",
      description: "Define hosting, domain and infrastructure for the portfolio website.",
      id: 3,
      completed: false
    },
    {
      name: "Composition API",
      description: "Learn how to use the composition API and how it compares to the options API.",
      id: 4,
      completed: true
    },
    {
      name: "Pinia",
      description: "Learn how to setup a store using Pinia.",
      id: 5,
      completed: true
    },
    {
      name: "Groceries",
      description: "Buy rice, apples and potatos.",
      id: 6,
      completed: false
    },
    {
      name: "Bank account",
      description: "Open a bank account for my freelance business.",
      id: 7,
      completed: false
    }
]);

let newTask = {completed: false,};

let filterBy = ref("");

let modalActive = ref(false);

const filteredTasks = computed(() => {
  switch (filterBy.value) {
    case 'todo':
      return tasks.filter(task => !task.completed);
      break;
    
    case 'done':
      return tasks.filter(task => task.completed);
      
    default:
      return tasks;
      break;
  }
});

function addTask(){
  if (newTask.name && newTask.description){
    newTask.id = Math.max(...tasks.map(task => task.id)) + 1;
    tasks.push(newTask);
    newTask = {completed: false};
  }
  else {
    alert("Enter all of the values");
  }
}

function doneToggle(taskId){
  tasks.forEach(task => {
    if (task.id === taskId){
      task.completed != task.completed;
    }    
  });
}

function setFilter(value){
  filterBy.value = value;
}

</script>

<template>

  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>
          {{ appName }}
        </h1>
      </div>
      <div class="header-side">
        <button @click="modalActive=true" class="btn secondary">+ Add Task</button>
      </div>
    </div>
    
    <Filter 
      :filterBy="filterBy" 
      @setFilter="setFilter"
    />

    <div class="tasks">
      
      <Task 
      @doneToggle="doneToggle"
      v-for="(task, index) in filteredTasks"  
      :task="task" 
      :key="index"
      />

    </div>

    
    <ModalWindow 
    @closePopup="modalActive = false"
    v-if="modalActive"
    >
    
    <AddTaskModal/>

    </ModalWindow>
  </main>
  
   

</template>


<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }

}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>