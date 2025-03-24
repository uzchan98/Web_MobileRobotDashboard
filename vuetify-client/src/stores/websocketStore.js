import { defineStore } from "pinia";
import { ref } from "vue";
import { useLidarStore } from "@/stores/lidarStore";
import { useMotorStore } from "@/stores/motorStore";
import { useCameraStore } from "@/stores/cameraStore";

export const useWebSocketStore = defineStore("webSocket", () => {
  const serverAddress = ref(localStorage.getItem("serverAddress") || "ws://localhost:8000");
  let socket = null;
  const isConnected = ref(false);

  const lidarStore = useLidarStore();
  const motorStore = useMotorStore();
  const cameraStore = useCameraStore();

  // WebSocket 연결 함수
  const connectWebSocket = (callback = () => {}) => {
    if (socket) {
      socket.close();
    }

    socket = new WebSocket(serverAddress.value);

    socket.onopen = () => {
      console.log("WebSocket connected to", serverAddress.value);
      isConnected.value = true;
      callback(true);
    };

    socket.onmessage = (event) => {
      //console.log(event.data);
      const message = JSON.parse(event.data); // 수신된 데이터 JSON 파싱
      //console.log(message);
      handleParsedMessage(message);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      isConnected.value = false;
      callback(false);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      isConnected.value = false;
    };
  };

  // 메시지 처리 함수
  const handleParsedMessage = (message) => {
    if (message.type === "sample_data") {
      lidarStore.setLidarData(message.lidar);
      motorStore.updateMotorData(message.motors);
    } else if (message.type === "camera_data") {
      cameraStore.setCameraData({ image: message.image, timestamp: message.timestamp });
    }
  };

  // 새로운 주소로 WebSocket 재연결
  const reconnect = (newAddress, callback) => {
    serverAddress.value = newAddress;
    localStorage.setItem("serverAddress", newAddress);
    connectWebSocket(callback);
  };

  return { serverAddress, isConnected, connectWebSocket, reconnect };
});
