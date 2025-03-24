import { defineStore } from "pinia";

export const useLidarStore = defineStore("lidar", {
  state: () => ({
    lidarData: [],
    timestamp: null, // 🔥 데이터 획득 시간 저장
  }),
  actions: {
    setLidarData(payload) {
      this.lidarData = payload.data; // 라이다 데이터 저장
      this.timestamp = new Date(payload.timestamp).toLocaleTimeString(); // 🔥 타임스탬프 변환 후 저장
    },
  },
});
