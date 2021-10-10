<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="status" :timeout="3000">
      {{ message }}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: ["message", "status"],
};
</script>