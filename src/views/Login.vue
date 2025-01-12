<template>
    <div class="container-form">
      <form @submit.prevent="handleSubmit">
        <div style="text-align: center">
          <p v-if="error" style="color: red">{{ error }}</p>
        </div>
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
          <v-btn type="submit" :disabled="isSubmitting">Login</v-btn>
          <p style="margin-top: 1em;">
            you don't have an account?
            <RouterLink :to="{ name: 'signup'}"> signup</RouterLink>
          </p>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { loginUser } from "@/api";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const formData = ref({
    email: "",
    password: "",
  });
  const error = ref(null);
  const isSubmitting = ref(null);
  const router = useRouter();
  
  const handleSubmit = async () => {
    try {
      isSubmitting.value = true;
      const req = await loginUser(formData.value);
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
  @media (max-width: 720px) {
  form {
    width: 90%;
  }
}
  </style>
  
  <!-- 
  
  1- take a copy from the signup page
  2- make the page fit with login 
  2- add new function to send the data to API for login
  
  
  -->
  