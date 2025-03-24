<script setup>
import RobotMapCard from "@/components/Controller/RobotMapCard.vue";
import KeyboardCard from "@/components/Controller/KeyboardCard.vue";
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="4" class="d-flex justify-center">
        <RobotMapCard />
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4" class="d-flex justify-center">
        <KeyboardCard />
      </v-col>
    </v-row>
  </v-container>
</template>
