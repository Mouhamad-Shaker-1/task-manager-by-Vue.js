<template>
  <div class="container-form">
    <form @submit.prevent="handleSubmit">
      <div style="text-align: center">
        <p v-if="error" style="color: red">{{ error }}</p>
      </div>
      <v-text-field
        v-model="formData.name"
        required
        type="text"
        label="First name"
      ></v-text-field>
      <v-text-field
        v-model="formData.lastName"
        required
        type="text"
        label="Last name"
      ></v-text-field>
      <v-text-field
        v-model="formData.email"
        required
        type="email"
        label="email"
      ></v-text-field>
      <v-text-field
        v-model="formData.password"
        required
        type="password"
        label="password"
      ></v-text-field>
      <div style="text-align: center">
        <v-btn type="submit" :disabled="isSubmitting">Signup</v-btn>
        <p style="margin-top: 1em;">
          you already how an account?
          <RouterLink :to="{ name: 'login'}"> login</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { signupUser } from "@/api";
import { ref } from "vue";
import { useRouter } from "vue-router";

const formData = ref({
  name: "",
  lastName: "",
  email: "",
  password: "",
});
const error = ref(null);
const isSubmitting = ref(null);
const router = useRouter();

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const req = await signupUser(formData.value);
    localStorage.setItem('user', JSON.stringify(req))
    router.push("/dashboard")
  } catch (err) {
    error.value = err;
  } finally {
    isSubmitting.value = false;
  }
};
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
