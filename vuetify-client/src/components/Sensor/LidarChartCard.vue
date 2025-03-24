<template>
  <v-card>
    <v-card-title> Lidar </v-card-title>
    <v-card-subtitle>
      데이터 획득 시간: <strong>{{ timestamp }}</strong>
      <!-- 🔥 타임스탬프 표시 -->
    </v-card-subtitle>
    <v-card-text>
      <div v-if="lidarData.length > 0">
        <PolarArea :data="chartData" :options="chartOptions" />
      </div>
      <div v-else>
        <v-progress-circular indeterminate size="64" color="primary" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from "vue";
import { useLidarStore } from "@/stores/lidarStore";
import { PolarArea } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PolarAreaController,
  CategoryScale,
  RadialLinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PolarAreaController,
  CategoryScale,
  RadialLinearScale,
  ArcElement
);

const lidarStore = useLidarStore();
const lidarData = computed(() => lidarStore.lidarData);
const timestamp = computed(() => lidarStore.timestamp); // 🔥 타임스탬프 가져오기

const getColor = (distance) => {
  if (distance < 4) return "rgba(255, 0, 0, 0.5)"; // 가까운 거리 (빨강)
  if (distance < 7) return "rgba(255, 255, 0, 0.5)"; // 중간 거리 (노랑)
  return "rgba(0, 255, 0, 0.5)"; // 먼 거리 (녹색)
};

const chartData = computed(() => ({
  labels: lidarData.value.map((item) => `Sensor ${item.id}`),
  datasets: [
    {
      label: "Distance (m)",
      data: lidarData.value.map((item) => item.distance),
      backgroundColor: lidarData.value.map((item) => getColor(item.distance)),
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  scales: {
    r: {
      min: 0,
      max: 10,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  animation: {
    duration: 100, // 애니메이션 시간 100으로 설정
  },
};
</script>
