<template>
  <div class="container">
    <div class="container-dashboard">
      <div class="dashboard-header">
        <v-btn @click="toggleDialog">add new task</v-btn>
        <v-btn color="red" @click="logout">logout</v-btn>
      </div>
      <v-divider style="margin: 1em 0"></v-divider>
      <div>
        <p style="text-align: center; color: red" v-if="errorDelete">
          {{ errorDelete }}
        </p>
        <!-- if the req go well -->
        <div v-if="tasks.length !== 0" class="tasks-container">
          <Task
            v-for="task in tasks"
            :key="task._id"
            :task="task"
            @delete-task="deleteTask"
          />
        </div>
        <!-- when the req not finish yet and there are no error elso -->
        <div v-if="tasks.length === 0 && error === null">
          <Loading />
        </div>
        <!-- if there are an error -->
        <div v-if="error">
          <Error :message="error.message" @retry="fetchData" />
        </div>
      </div>
    </div>
  </div>

  <v-dialog v-model="dialog" max-width="600">
    <form @submit.prevent="handleSubmit" style="width: 100%">
      <div v-if="errorDialog" style="text-align: center; color: red">
        <p>{{ errorDialog }}</p>
      </div>
      <v-text-field
        type="text"
        label="name"
        required
        v-model="newTaskToAdd.name"
      ></v-text-field>
      <v-textarea
        type="text"
        label="description"
        required
        v-model="newTaskToAdd.description"
      ></v-textarea>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <v-btn color="red" @click="toggleDialog">close</v-btn>
        <v-btn type="submit" :disabled="isSubmitting">add task</v-btn>
      </div>
    </form>
  </v-dialog>
</template>

<script setup>
import { addNewTask, deleteTaskFromAPI, getAllTasksFromAPI } from "@/api";
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import Task from "@/components/Task.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const isSubmitting = ref(null);
const dialog = ref(false);
const errorDialog = ref(null);

const tasks = ref([]);
const error = ref(null);
const errorDelete = ref(null);
const router = useRouter();

const newTaskToAdd = ref({
  name: "",
  description: "",
});

const deleteTask = async (taskID) => {
  try {
    const res = await deleteTaskFromAPI(taskID);
    tasks.value = tasks.value.filter((task) => task._id !== res.task._id);
  } catch (err) {
    errorDelete.value = err.message;
  }
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    errorDialog.value = null;
    const res = await addNewTask(newTaskToAdd.value);
    tasks.value.push(res.task);
    isSubmitting.value = false;

    newTaskToAdd.value = {
      name: "",
      description: "",
    };
    toggleDialog();
  } catch (err) {
    isSubmitting.value = false;
    errorDialog.value = err.message;
  }
};

const toggleDialog = () => {
  dialog.value = !dialog.value;
};

const fetchData = async () => {
  error.value = null;
  try {
    const res = await getAllTasksFromAPI();
    tasks.value = res;
  } catch (err) {
    error.value = err;
  }
};

const logout = () => {
  localStorage.removeItem("user");

  router.push("/login");
};

onMounted(fetchData);
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
