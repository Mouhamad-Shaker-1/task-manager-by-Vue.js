<template>
  <div class="container">
    <div class="container-dashboard">
      <div class="dashboard-header">
        <v-btn @click="toggleDialog('add-task')">add new task</v-btn>
        <v-btn color="red" @click="logout">logout</v-btn>
      </div>
      <v-divider style="margin: 1em 0"></v-divider>
      <div>
        <p style="text-align: center; color: red" v-if="errorDelete">
          {{ errorDelete }}
        </p>
        <!-- when the req not finish yet and there are no error elso -->
        <div v-else-if="loading">
          <Loading />
        </div>
        <!-- if there are an error -->
        <div v-else-if="error">
          <Error :message="error.message" @retry="getAllTasks" />
        </div>
        <!-- if the req go well -->
        <div v-else-if="tasks.length !== 0" class="tasks-container">
          <Task
            v-for="task in tasks"
            :key="task._id"
            :task="task"
            @delete-task="deleteTask"
            @toggle-dialog="toggleDialog"
          />
        </div>
        <div v-else-if="tasks.length === 0">
          <h1 style="text-align: center;">you don't have tasks</h1>
        </div>
      </div>
    </div>
  </div>

  <v-dialog v-model="dialog" max-width="600">
    <AddTaskForm v-if="form.name === 'add-task'" @add-task="addNewTask" @toggle-dialog="toggleDialog" />
    <UpdateTaskForm v-if="form.name === 'update-task'" :taskID="form.taskID" @update-task="updateTask" @toggle-dialog="toggleDialog" />
  </v-dialog>
</template>

<script setup>
import { deleteTaskFromAPI, getAllTasksFromAPI } from "@/api";
import Error from "@/components/Error.vue";
import AddTaskForm from "@/components/formsComponents/AddTaskForm.vue";
import UpdateTaskForm from "@/components/formsComponents/UpdateTaskForm.vue";
import Loading from "@/components/Loading.vue";
import Task from "@/components/Task.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const dialog = ref(false);
const tasks = ref([]);
const error = ref(null);
const errorDelete = ref(null);
const loading = ref(null)
const router = useRouter();

// the taskID to know which task will be update
// name to know which form will be render
const form = ref({
  name: '',
  taskID: ''
})

const toggleDialog = (formName, id) => {
  dialog.value = !dialog.value;
  // if the we need to update form open must pass id for handle the update
  if(formName === 'add-task') {
    form.value.name = formName
  } else if (formName === 'update-task') {
    form.value = {
      name: formName,
      taskID: id
    }
  }
};

const deleteTask = async (taskID) => {
  errorDelete.value = null
  try {
    const res = await deleteTaskFromAPI(taskID);
    tasks.value = tasks.value.filter((task) => task._id !== res.task._id);
  } catch (err) {
    errorDelete.value = err.message;
  }
};

const addNewTask = (newTask) => {
  // this will add the task in the state without recall the API to bring all tasks anther time
  tasks.value.push(newTask)
}

const updateTask = (task) => {
  // this will update the task in the stae without recall the API to bring all tasks anther time
  tasks.value = tasks.value.map(t => t._id === task._id ? task : t)
}

const getAllTasks = async () => {
  error.value = null;
  loading.value = true
  try {
    const res = await getAllTasksFromAPI();
    tasks.value = res;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false
  }
};

const logout = () => {
  localStorage.removeItem("user");

  router.push("/login");
};

onMounted(getAllTasks);
</script>

<style>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-dashboard {
  width: 50%;
  padding: 1.5em;
  background-color: #eee;
  border-radius: 10px;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tasks-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
}
</style>

<!-- 
    1- make the container of the dashboard and style it
    2- add the header. in the header button for adding the new task
    and the button for logout not making the functionalty yet
    3- call the API to bring the all the tasks make it a function in api.js file

        ***
            loop in tasks and show them in the page
            handle the error and the loading 
            component for laoding and component for error
        ***

    4- add the task component and make it reactive with the data
        in the task component must have button for delete and button for
        update and button an arrow to below to show more infe (description)
    5- styling the task component
    6- add the functionalty for logout
    ###
    7- make the adding functionalty (this will be more steps)
-->

<!-- 
    1- add the dialog that have form to add new task
    2- handle the toggle dialog
    3- add the state to take the data from the form
    4- add the function to send the new task data to API 
    5- handle the req with the error
-->

<!-- 
    1- add the delete function and passed to the Task component
    2- add new function to make delete req from API
-->

<!-- 
    next wrok: 
        1- there are problem i noticed when there are no tasks the loading still there
        2- update the task
        3- make the ability to make the task completed
-->


<!-- 
  update the task
    1- make the form add task in separate componet with keeping dailog in dashboard
      For two reasons, one to make the page less complicated and clear
       and the other to make a condition rendering between form addTask and form updateTask
    2- adding form updateTask
    3- add event listener for the button to open the form update in dailog
    4- add state to know if add or update 

    add new funtion in dashboard for handle the update task in app

-->