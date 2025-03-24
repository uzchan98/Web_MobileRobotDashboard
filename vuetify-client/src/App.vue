<script setup>
import { onMounted } from "vue";
import AppBar from "@/components/AppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import MainContent from "@/components/MainContent.vue";
import { useDisplayStore } from "@/stores/displayStore";
import { useWebSocketStore } from "@/stores/webSocketStore"; // WebSocket 스토어 사용

const displayStore = useDisplayStore();
const webSocketStore = useWebSocketStore();

const toggleDrawer = () => {
  displayStore.toggleDrawer();
};

onMounted(() => {
  webSocketStore.connectWebSocket(); // WebSocket 연결
});
</script>

<template>
  <v-app>
    <!-- AppBar를 포함하여, toggleDrawer를 전달 -->
    <AppBar @toggle-drawer="toggleDrawer" />

    <!-- 네비게이션 드로어 -->
    <NavigationDrawer />

    <!-- 메인 화면 -->
    <MainContent />
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
#app {
  text-align: center;
}
</style>