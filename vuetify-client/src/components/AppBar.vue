<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["toggle-drawer"]);
</script>

<template>
  <v-app-bar app>
    <!-- 햄버거 아이콘 클릭 시 toggle-drawer 이벤트 발생 -->
    <v-app-bar-nav-icon @click="emit('toggle-drawer')">
      <v-icon>mdi-menu</v-icon>
    </v-app-bar-nav-icon>

    <v-app-bar-title>Mobile Robot Dashboard</v-app-bar-title>
    <!-- <v-spacer></v-spacer> -->

    <v-btn icon>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>
