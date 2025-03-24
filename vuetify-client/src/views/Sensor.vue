<script setup>
// import LineChartCard from "@/components/SampleCharts/LineChartCard.vue";
// import PolarAreaChartCard from "@/components/SampleCharts/PolarAreaChartCard.vue";
// import BarChartCard from "@/components/SampleCharts/BarChartCard.vue";
// import RadarChartCard from "@/components/SampleCharts/RadarChartCard.vue";
import LidarChartCard from "@/components/Sensor/LidarChartCard.vue";
import CameraCard from "@/components/Sensor/CameraCard.vue";
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
    <v-col cols="12" sm="12" md="8" lg="6" class="d-flex">
      <LidarChartCard class="flex-grow-1" />
    </v-col>
    <v-col cols="12" sm="12" md="8" lg="6" class="d-flex">
      <CameraCard class="flex-grow-1" />
    </v-col>
  </v-row>
  </v-container>
  
</template>
