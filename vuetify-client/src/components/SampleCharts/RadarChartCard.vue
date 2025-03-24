<template>
  <v-card>
    <v-card-title>Sensor Data Radar Chart</v-card-title>
    <v-card-text>
      <div style="height: 300px">
        <Radar :data="chartData" :options="chartOptions" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement);

export default defineComponent({
  components: { Radar },
  setup() {
    const chartData = ref({
      labels: ["Temperature", "Humidity", "Pressure", "Wind Speed", "CO2 Levels"],
      datasets: [
        {
          label: "Sensor Data",
          data: [65, 59, 80, 81, 56],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
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
