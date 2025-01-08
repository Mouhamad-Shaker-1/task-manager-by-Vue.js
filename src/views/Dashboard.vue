<template>
    <div class="container">
        <div class="container-dashboard">
            <div class="dashboard-header">
                <v-btn>add new task</v-btn>
                <v-btn color="red">logout</v-btn>
            </div>
            <v-divider style="margin: 1em 0;"></v-divider>
            <div>
                <!-- if the req go well -->
                <div v-if="tasks.length !== 0" class="tasks-container">
                        <Task v-for="task in tasks" :key="task._id" :task="task" />
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
</template>

<script setup>
import { getAllTasksFromAPI } from '@/api';
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import Task from '@/components/Task.vue';
import { onMounted, ref } from 'vue';

    const tasks = ref([])
    const error = ref(null)

    const fetchData = async () => {
        error.value = null
        try {
            const res = await getAllTasksFromAPI()
            tasks.value = res
        } catch (err) {
            error.value = err
        }
    }

    onMounted(fetchData)
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