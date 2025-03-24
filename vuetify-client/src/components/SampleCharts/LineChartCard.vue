<template>
  <v-card>
    <v-card-title>Sensor Data Chart</v-card-title>
    <v-card-text>
      <div style="height: 300px">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Line } from "vue-chartjs";
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

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default defineComponent({
  components: { Line },
  setup() {
    const chartData = ref({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Sensor Data",
          data: [10, 20, 15, 30, 25, 40],
          borderColor: "#42A5F5",
          backgroundColor: "rgba(66, 165, 245, 0.2)",
          borderWidth: 2,
          pointRadius: 4,
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    });

    return { chartData, chartOptions };
  },
});
</script>
