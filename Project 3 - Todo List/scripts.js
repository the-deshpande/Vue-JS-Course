const Handler = {
    data() {
        return {
            tasks:[],
            newTask:{},
        }
    },
    methods: {
        addTask: function(){
            if (!this.newTask.task){
                alert("Enter your task first!")
            }
            else{
                this.newTask.done = false;
                this.tasks.push(this.newTask);
                this.newTask = {};
            }
        },
        hasTasks: function(){
            if (this.tasks.length == 0){
                return false;
            }
            return true
        },
        storeTasks: function(){
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        }
    },

    created() {
        this.tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    },
}

Vue.createApp(Handler).mount('#app');