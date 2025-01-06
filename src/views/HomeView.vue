
<template>
  <HeaderHome />
  <div class="container">
    <div class="content">
      <!-- Description Block -->
      <div class="description">
        <h2 class="heading">Welcome to Tasko app</h2>
        <p class="text">
          Tasko makes managing your tasks effortless. With intuitive features
          like drag-and-drop prioritization, deadline tracking, and smart
          reminders, Tasko helps you stay organized and productive. Whether
          you're working solo or with a team, Tasko keeps everything on track
          with ease.
        </p>
        <div class="buttons">
          <RouterLink :to="{ name: 'login' }">
            <v-btn color="primary" variant="outlined"> login </v-btn>
          </RouterLink>
          <RouterLink :to="{ name: 'signup' }">
            <v-btn color="primary" variant="tonal"> Signup </v-btn>
          </RouterLink>
        </div>
      </div>

      <!-- Image Block -->
      <div class="image">
        <img src="../assets/task-manager.png" alt="Task Manager Image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderHome from "@/components/HeaderHome.vue";
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

  const router = useRouter()

  onMounted(() => {
    // if the user exist send him to dashboard page
    const user = JSON.parse(localStorage.getItem("user"))

    if(user) {
      router.push('/dashboard')
    } 
  })
</script>

<style>
/* Global styles */
body {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
}

/* Container styles */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

/* Description Block */
.description {
  flex: 1;
  text-align: left;
}

.heading {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.text {
  font-size: 1.125rem;
  margin-bottom: 24px;
}

/* Image Block */
.image {
  flex: 1;
  margin-top: 24px;
}

.image img {
  width: 100%;
  border-radius: 8px;
}

.buttons {
  display: flex;
  gap: 1em;
}

@media (min-width: 768px) {
  .image {
    margin-top: 0;

  }
  .image img {
  width: 80%;

  }
}
</style>
