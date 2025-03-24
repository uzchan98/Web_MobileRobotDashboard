<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const activeKey = ref("");

const handleKeyDown = (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    activeKey.value = event.key;
    emit("keyPressed", event.key); // 부모 컴포넌트(RobotMapCard)로 이벤트 전달
  }
};

const handleKeyUp = () => {
  activeKey.value = "";
};

const emit = defineEmits(["keyPressed"]);

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
});
</script>

<template>
  <v-card class="card">
    <div class="keyboard">
      <div class="row">
        <div class="key" :class="{ active: activeKey === 'ArrowUp' }">↑</div>
      </div>
      <div class="row">
        <div class="key" :class="{ active: activeKey === 'ArrowLeft' }">←</div>
        <div class="key" :class="{ active: activeKey === 'ArrowDown' }">↓</div>
        <div class="key" :class="{ active: activeKey === 'ArrowRight' }">→</div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.card {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 5px 0;
}

.key {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #ddd;
  border-radius: 10px;
  border: 2px solid #888;
  transition: 0.1s;
}

.key.active {
  background-color: #4caf50;
  color: white;
  border: 2px solid #2e7d32;
}
</style>
