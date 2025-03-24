<template>
  <v-container>
    <!-- 관리자 모드 토글 버튼 -->
    <v-switch v-model="isAdminMode" label="모터 관리자 모드" class="mb-4" />

    <v-row dense v-if="isAdminMode">
      <v-col cols="12" md="3">
        <MotorCard :motorId="1" />
      </v-col>
      <v-col cols="12" md="3">
        <MotorCard :motorId="2" />
      </v-col>
      <v-col cols="12" md="3">
        <MotorCard :motorId="3" />
      </v-col>
      <v-col cols="12" md="3">
        <MotorCard :motorId="4" />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="4">
        <MotorAngleLineChartCard />
      </v-col>
      <v-col cols="12" md="4">
        <MotorSpeedLineChartCard />
      </v-col>
      <v-col cols="12" md="4">
        <MotorTorqueLineChartCard />
      </v-col>
      <v-col cols="12" md="6">
        <MotorCurrentLineChartCard />
      </v-col>
      <v-col cols="12" md="6">
        <MotorTemperatureLineChartCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import MotorCard from "@/components/Actuator/MotorCard.vue"; // 추가된 컴포넌트
import MotorSpeedLineChartCard from "@/components/Actuator/MotorSpeedLineChartCard.vue";
import MotorAngleLineChartCard from "@/components/Actuator/MotorAngleLineChartCard.vue";
import MotorTorqueLineChartCard from "@/components/Actuator/MotorTorqueLineChartCard.vue";
import MotorCurrentLineChartCard from "@/components/Actuator/MotorCurrentLineChartCard.vue";
import MotorTemperatureLineChartCard from "@/components/Actuator/MotorTemperatureLineChartCard.vue";

const isAdminMode = ref(false); // 관리자 모드 활성화 상태
</script>
