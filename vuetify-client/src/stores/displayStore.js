// src/stores/displayStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDisplayStore = defineStore("display", () => {
  const drawer = ref(true); // 사이드바 상태 관리

  // 드로어 상태 토글 메서드
  const toggleDrawer = () => {
    drawer.value = !drawer.value;
  };

  return { drawer, toggleDrawer };
});
