<script setup>
import { computed } from "vue";
import { Line } from "vue-chartjs";
import { useMotorStore } from "@/stores/motorStore";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Chart.js 플러그인 등록
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const motorStore = useMotorStore();

// ✅ motorDataHistory에서 최근 50개 데이터만 유지
const maxHistory = 50;

// ✅ motorDataHistory를 기반으로 차트 데이터 계산
const chartData = computed(() => {
  const history = motorStore.motorDataHistory.slice(-maxHistory); // 최근 maxHistory개만 유지

  return {
    labels: history.map((entry) => {
      const timestamp = entry.timestamp ? new Date(entry.timestamp) : new Date();
      return isNaN(timestamp) ? "N/A" : timestamp.toLocaleTimeString();
    }),
    datasets: [
      {
        label: "M1",
        data: history.map((entry) => entry.motors.find((m) => m.id === 1)?.current ?? null),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "M2",
        data: history.map((entry) => entry.motors.find((m) => m.id === 2)?.current ?? null),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "M3",
        data: history.map((entry) => entry.motors.find((m) => m.id === 3)?.current ?? null),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "M4",
        data: history.map((entry) => entry.motors.find((m) => m.id === 4)?.current ?? null),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };
});

// ✅ 차트 옵션 설정
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 500 }, // 애니메이션 부드럽게
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
};
</script>

<template>
  <v-card>
    <v-card-title>Motor Current</v-card-title>
    <v-card-text>
      <div style="height: 300px">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </v-card-text>
  </v-card>
</template>
