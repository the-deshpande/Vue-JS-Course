import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";


export const useTasksStore = defineStore('tasks', () => {
    let tasks= reactive( JSON.parse(localStorage.getItem('tasks')) || []);

    let filterBy = ref("");

    function setFilter(value){
        filterBy.value = value;
    }

    const filteredTasks = computed(() => {
        switch (filterBy.value) {
          case 'todo':
            return tasks.filter(task => !task.completed);
          
          case 'done':
            return tasks.filter(task => task.completed);
            
          default:
            return tasks;
        }
    });

    function addTask(newTask){
        if (newTask.name && newTask.description){
            newTask.id = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
            tasks.push(newTask);
            newTask = {completed: false};
            closeModal();
        }
        else {
            alert("Enter all of the values");
        }
    }
      
    function doneToggle(taskId){
        tasks.forEach(task => {
            if (task.id === taskId){
                task.completed = !task.completed;
            }       
        });
    }

    let modalActive = ref(false);

    function openModal(){
        modalActive.value = true;
    }
    function closeModal(){
        modalActive.value = false;
    }

    return { tasks, filterBy, setFilter, filteredTasks, doneToggle, addTask, modalActive, openModal, closeModal };
});
