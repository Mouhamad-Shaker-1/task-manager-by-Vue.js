<template>
  <form @submit.prevent="handleSubmit" style="width: 100%">
    <div v-if="errorSubmit" style="text-align: center; color: red">
      <p>{{ errorSubmit.message }}</p>
    </div>
    <Error v-if="error" :message="error.message" @retry="getOneTask" />
    <div v-else>
      <v-text-field
        type="text"
        label="name"
        required
        v-model="task.name"
        :loading="loading"
        :disabled="loading"
      ></v-text-field>
      <v-textarea
        type="text"
        label="description"
        required
        v-model="task.description"
        :loading="loading"
        :disabled="loading"
      ></v-textarea>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <v-btn color="red" @click="emit('toggle-dialog')">close</v-btn>
        <v-btn type="submit" :disabled="isSubmitting">update task</v-btn>
      </div>
    </div>
  </form>
</template>

<script setup>
import { getOneTaskFromAPI, UpdateTaskFromAPI } from "@/api";
import { onMounted, ref } from "vue";
import Error from "../Error.vue";
const props = defineProps(["taskID"]);

const loading = ref(false);
const isSubmitting = ref(false);
const error = ref("");
const errorSubmit = ref("")
const task = ref({
  name: "",
  description: "",
});

const emit = defineEmits(["update-task", "toggle-dialog"]);

const handleSubmit = async () => {
  isSubmitting.value = true;
  errorSubmit.value = null;
  try {
    const taskFromAPI = await UpdateTaskFromAPI(task.value, props.taskID);
    task.value = {
      name: "",
      description: "",
    };
    emit("update-task", taskFromAPI);
    emit("toggle-dialog");
  } catch (err) {
    errorSubmit.value = err;
  } finally {
    isSubmitting.value = false;
  }
};

const getOneTask = async (taskID) => {
  error.value = null;
  loading.value = true;
  try {
    const res = await getOneTaskFromAPI(taskID);
    task.value = {
      name: res.task.name,
      description: res.task.description,
    };
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(() => getOneTask(props.taskID));
</script>

<!-- 
    1- bring the task info first
    2- make a function to bring a task from API in api.js file
    3- handle the function here and invoked when the component is mouned
    4- put the info in the task state (name and decription)
    5- make a function to update the task from API in api.js file *** here
    6- added in handleSubmit
    7- make a function in dashboard page to handle the update in the app state
    9- binded using emit to handle that
  -->
