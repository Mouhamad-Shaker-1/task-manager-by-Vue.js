<template>
    <div class="container">
        <div class="container-dashboard">
            <div class="dashboard-header">
                <v-btn>add new task</v-btn>
                <v-btn color="red">logout</v-btn>
            </div>
            <v-divider style="margin: 1em 0;"></v-divider>
            <div class="tasks-container">

            </div>
        </div>
    </div>
</template>

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
</style>



<!-- 
    1- make the container of the dashboard and style it
    2- add the header. in the header button for adding the new task
    and the button for logout not making the functionalty yet
    3- call the API to bring the all the tasks make it a function in api.js file
    4- add the task component and make it reactive with the data
        in the task component must have button for delete and button for
        update and button an arrow to below to show more infe (description)
    5- styling the task component
    6- add the functionalty for logout
    ###
    7- make the adding functionalty (this will be more steps)
-->