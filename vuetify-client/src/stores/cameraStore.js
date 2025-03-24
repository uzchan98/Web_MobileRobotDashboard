import { defineStore } from "pinia";

export const useCameraStore = defineStore("camera", {
  state: () => ({
    cameraData: "", // 카메라 이미지 데이터를 base64 형식으로 저장
    timestamp: null, // 카메라 데이터 획득 시간 저장
  }),
  actions: {
    setCameraData(payload) {
      this.cameraData = payload.image; // base64로 인코딩된 카메라 데이터 저장
      this.timestamp = new Date(payload.timestamp).toLocaleTimeString(); // 타임스탬프 변환 후 저장
    },
  },
});
