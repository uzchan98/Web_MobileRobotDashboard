<template>
  <v-card>
    <v-card-title>Motor {{ motorId }}</v-card-title>
    <v-card-text>
      <!-- 모터 상태 -->
      <v-chip :color="statusColor">{{ statusText }}</v-chip>

      <!-- 속도, 전류, 토크, 온도 표시 -->
      <div>속도: {{ formattedSpeed }} RPM</div>
      <div>토크: {{ formattedTorque }} Nm</div>
      <div>전류: {{ formattedCurrent }} A</div>
      <div>온도: {{ formattedTemperature }} °C</div>

      <!-- 모터 제어 -->
      <v-switch v-model="isRunning" label="모터 모드 변경" />
      <v-slider v-model="speed" label="속도" min="-50" max="50" step="0.1" />

      <v-btn color="red" @click="emergencyStop">긴급 정지</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useMotorStore } from "@/stores/motorStore.js";

const props = defineProps({ motorId: Number });
const motorStore = useMotorStore();

const motorData = computed(() => {
  return motorStore.motorDataHistory.length > 0
    ? motorStore.motorDataHistory.at(-1).motors.find((m) => m.id === props.motorId) || {}
    : {};
});

const isRunning = ref(false);
const speed = ref(50);

// motorData가 변경될 때 반영
watch(motorData, (newData) => {
  if (newData) {
    speed.value = newData.speed;
  }
});

const formattedSpeed = computed(() => speed.value.toFixed(1));
const formattedCurrent = computed(() => (motorData.value.current || 0).toFixed(1));
const formattedTorque = computed(() => (motorData.value.torque || 0).toFixed(1));
const formattedTemperature = computed(() => (motorData.value.temperature || 0).toFixed(1));

const statusColor = computed(() => {
  if (motorData.value.temperature > 70) return "red";
  return isRunning.value ? "green" : "gray";
});

const statusText = computed(() => {
  if (motorData.value.temperature > 70) return "과열";
  return isRunning.value ? "Manual" : "Auto";
});

const emergencyStop = () => {
  isRunning.value = false;
  speed.value = 0;
};
</script>
