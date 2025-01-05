<template>
  <div class="container-form">
    <form @submit.prevent="handleSubmit">
      <v-text-field v-model="formData.name" required type="text" label="First name"></v-text-field>
      <v-text-field v-model="formData.lastName" required type="text" label="Last name"></v-text-field>
      <v-text-field v-model="formData.email" required type="email" label="email"></v-text-field>
      <v-text-field v-model="formData.password" required type="password" label="passwored"></v-text-field>
      <div style="text-align: center">
        <v-btn type="submit">Login</v-btn>
      </div>
    </form>
  </div>
</template>

<script setup>
    import { ref } from 'vue';

    const formData = ref({
        name: '',
        lastName: '',
        email: '',
        password: ''

    })

    const handleSubmit = () => {
        console.log(formData)
    }
    

</script>
    
<style>
form {
  width: 50%;
  padding: 1.5em;
  background-color: #eee;
  border-radius: 10px;
}
.container-form {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<!-- 

1- make the form
2- adding the style for the form
3- put the form info in the ojbect to use it in fetch
4- make function that sent the data to API
4- send the info to the server by that function and waiting for the req
5- disabled the button while the data sending
6- make new page called dashboard
7- if the req go will 
    1- save the JWT in localstorge
    2- send the use to dashboard 
else 
    make massege on the screen show the err that habbened


-->
