<template>
  <div class="container-error">
    <p style="color: red;">{{ message }}</p>
    <v-btn color="red" @click="$emit('retry')">retry</v-btn>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
  },
});

defineEmits(["retry"]);

</script>

<style>
    .container-error {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1.5em;
        height: 250px;
    }
</style>