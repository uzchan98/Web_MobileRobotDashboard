<script setup>
import ConnectionCard from "@/components/Dashboard/ConnectionCard.vue";

const variants = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <ConnectionCard :variant="variants[0]" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.h-100 {
  height: 100vh; /* 화면 높이 100% */
}
</style>
