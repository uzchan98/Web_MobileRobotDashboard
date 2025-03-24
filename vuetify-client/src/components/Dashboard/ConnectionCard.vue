<script setup>
import { ref, watch, computed } from "vue";
import { useWebSocketStore } from "@/stores/webSocketStore"; // WebSocket 관리하는 Pinia 스토어

const webSocketStore = useWebSocketStore();
const serverAddress = ref(localStorage.getItem("serverAddress") || "ws://localhost:8000");
const connectionStatus = ref(""); // 연결 상태 메시지

// 저장 및 즉시 반영 함수
const saveAddress = () => {
  localStorage.setItem("serverAddress", serverAddress.value);
  connectionStatus.value = "연결 시도 중..."; // 연결 시도 메시지 표시
  webSocketStore.reconnect(serverAddress.value, (success) => {
    connectionStatus.value = success ? "✅ WebSocket 연결 성공" : "❌ 연결 실패: 서버 주소를 확인하세요";
  });
};

// 주소 변경 시 자동 저장 (입력 중에도 반영됨)
watch(serverAddress, (newAddress) => {
  localStorage.setItem("serverAddress", newAddress);
});

// WebSocket의 현재 상태를 표시하는 computed 속성
const statusMessage = computed(() => {
  if (webSocketStore.isConnected) return "✅ WebSocket 연결됨";
  return connectionStatus.value;
});
</script>

<template>
  <v-card :variant="variant">
    <v-card-title>Connection Setting</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="serverAddress"
        label="서버 주소 입력"
        hint="WebSocket 서버 주소를 입력하세요."
        persistent-hint
        clearable
        density="compact"
        variant="outlined"
      >
        <!-- 입력창 오른쪽에 연결 버튼 배치 -->
        <template v-slot:append-inner>
          <v-btn @click="saveAddress" color="primary" variant="flat">연결</v-btn>
        </template>
      </v-text-field>

      <!-- 연결 상태 메시지 표시 -->
      <p :style="{ color: webSocketStore.isConnected ? 'green' : 'red' }">
        {{ statusMessage }}
      </p>
    </v-card-text>
  </v-card>
</template>
