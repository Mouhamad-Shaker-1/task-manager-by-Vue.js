<template>
    <form @submit.prevent="handleSubmit" style="width: 100%">
      <div v-if="error" style="text-align: center; color: red">
        <p>{{ error }}</p>
      </div>
      <v-text-field
        type="text"
        label="name"
        required
        v-model="task.name"
      ></v-text-field>
      <v-textarea
        type="text"
        label="description"
        required
        v-model="task.description"
      ></v-textarea>
      <div
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <v-btn color="red" @click="emit('toggle-dialog')">close</v-btn>
        <v-btn type="submit" :disabled="isSubmitting">update task</v-btn>
      </div>
    </form>
  </template>
  
  <script setup>
  import { addNewTask } from "@/api";
  import { ref } from "vue";
  
  const isSubmitting = ref(false);
  const error = ref("");
  const task = ref({
    name: "",
    description: "",
  });
  
  const emit = defineEmits(["add-task", "toggle-dialog"]);
  
  const handleSubmit = async () => {
    isSubmitting.value = true;
    error.value = null;
    try {
      const res = await addNewTask(task.value);
      task.value = {
        name: "",
        description: "",
      };
      emit("add-task", res.task);
      emit("toggle-dialog");
    } catch (err) {
      error.value = err.message;
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  