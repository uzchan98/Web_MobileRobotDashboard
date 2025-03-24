<script setup>
import { useCameraStore } from "@/stores/cameraStore"; // Pinia store 가져오기

// Pinia store 사용
const cameraStore = useCameraStore();
</script>

<template>
  <v-card>
    <v-card-title>
      <span class="headline">Camera Feed</span>
    </v-card-title>

    <v-card-subtitle v-if="cameraStore.timestamp">
      Last updated: {{ cameraStore.timestamp }}
    </v-card-subtitle>

    <v-card-text>
      <!-- 카메라 이미지 표시 -->
      <div v-if="cameraStore.cameraData">
        <img :src="'data:image/jpeg;base64,' + cameraStore.cameraData" alt="Camera Image" class="camera-image" />
      </div>
      <!-- 카메라 이미지 없을 때 -->
      <div v-else>
        <p>No camera feed available.</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CameraCard",
};
</script>

<style scoped>
.camera-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
