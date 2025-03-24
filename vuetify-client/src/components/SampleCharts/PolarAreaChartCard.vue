<template>
  <v-card>
    <v-card-title>Sensor Data Distribution</v-card-title>
    <v-card-text>
      <div style="height: 300px">
        <PolarArea :data="chartData" :options="chartOptions" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { PolarArea } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, ArcElement);

export default defineComponent({
  components: { PolarArea },
  setup() {
    const chartData = ref({
      labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
      datasets: [
        {
          label: "Sensor Distribution",
          data: [15, 25, 20, 30, 10],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
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
