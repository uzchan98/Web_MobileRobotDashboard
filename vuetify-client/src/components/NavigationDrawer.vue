<script setup>
import { useDisplayStore } from "@/stores/displayStore";

const displayStore = useDisplayStore();
</script>

<template>
  <!-- v-model로 Pinia 상태에 따라 드로어를 열고 닫음 -->
  <v-navigation-drawer v-model="displayStore.drawer" app>
    <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="Dashboard" to="/"></v-list-item>
    <v-list-item link title="Controller" to="/controller"></v-list-item>
    <v-list-item link title="Actuator" to="/actuator"></v-list-item>
    <v-list-item link title="Sensor" to="/sensor"></v-list-item>
  </v-navigation-drawer>
</template>
