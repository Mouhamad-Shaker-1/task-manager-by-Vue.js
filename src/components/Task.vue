<template>
  <div class="task">
    <div class="task-header">
      <p>{{ task.name }}</p>
      <div class="container-buttons">
        <v-col cols="auto" @click="emit('delete-task', task._id)" style="padding: .2em;">
          <v-btn color="red" icon="mdi-delete" size="x-small"></v-btn>
        </v-col>
        <v-col cols="auto" @click="emit('toggle-dialog', 'update-task', task._id)" style="padding: .2em;">
          <v-btn color="blue" icon="mdi-update" size="x-small"></v-btn>
        </v-col>
        <v-col cols="auto" @click="toggleVisibility" style="padding: .2em;">
          <v-btn icon="mdi-arrow-down-drop-circle-outline" size="x-small"></v-btn>
        </v-col>
      </div>
    </div>
    <div class="container-text" v-show="isVisible">
        <p>{{task.description}}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


defineProps(["task"]);
const emit = defineEmits(["delete-task", 'toggle-dialog'])

const isVisible = ref(false)

const toggleVisibility = () => {
    isVisible.value = !isVisible.value
}

</script>

<style>
.task {
  width: 100%;
  background-color: #fff;
  border-radius: 5px;

  overflow: hidden;
  transition: all 0.3s ease;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .1em .4em;
  width: 100%;
}
.container-text { 
  padding: 1em; 
  background-color: #fff; 
  font-size: 1em; 
  color: #666;
  border-top: 1px solid #ccc; 
  
}

.container-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
