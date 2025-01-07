<template>
    <div class="laoding-container">
        <v-progress-circular color="primary" indeterminate :size="54" :width="5"></v-progress-circular>
    </div>
</template>

<style>
    .laoding-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 250px;
    }
</style>