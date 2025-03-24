import { defineStore } from "pinia";

export const useMotorStore = defineStore("motorStore", {
  state: () => ({
    motorDataHistory: [], // 👈 과거 데이터를 저장하는 배열
  }),
  actions: {
    updateMotorData(newData) {
      if (!Array.isArray(newData) || newData.length === 0) return; // ✅ newData가 비어 있으면 리턴
    
      const timestamp = newData[0]?.timestamp ?? Date.now(); // ✅ timestamp가 없으면 현재 시간 사용
    
      this.motorDataHistory.push({
        timestamp,
        motors: newData.map((m) => ({
          id: m.id,
          angle: m.angle,
          speed: m.speed,
          torque: m.torque,
          current: m.current,
          temperature: m.temperature,
        })),
      });
    
      // ✅ 최대 50개만 유지
      if (this.motorDataHistory.length > 50) {
        this.motorDataHistory.shift();
      }
    },
  },
});
