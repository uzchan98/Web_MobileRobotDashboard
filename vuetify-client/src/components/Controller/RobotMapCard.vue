<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const gridSize = 10; // 10x10 그리드
const grid = ref(
  Array.from({ length: gridSize }, () => Array(gridSize).fill(0))
);
const robot = ref({ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) });

const obstacles = ref([
  { x: 3, y: 4 },
  { x: 6, y: 2 },
  { x: 7, y: 8 },
]);

const moveRobot = (dx, dy) => {
  const newX = robot.value.x + dx;
  const newY = robot.value.y + dy;

  if (
    newX >= 0 &&
    newX < gridSize &&
    newY >= 0 &&
    newY < gridSize &&
    !obstacles.value.some((obs) => obs.x === newX && obs.y === newY)
  ) {
    robot.value.x = newX;
    robot.value.y = newY;
  }
};

const handleKeydown = (event) => {
  switch (event.key) {
    case "ArrowUp":
      moveRobot(0, -1);
      break;
    case "ArrowDown":
      moveRobot(0, 1);
      break;
    case "ArrowLeft":
      moveRobot(-1, 0);
      break;
    case "ArrowRight":
      moveRobot(1, 0);
      break;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <v-card>
    <v-container>
      <div class="grid">
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
          <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="cell"
            :class="{
              robot: robot.x === colIndex && robot.y === rowIndex,
              obstacle: obstacles.some(
                (obs) => obs.x === colIndex && obs.y === rowIndex
              ),
            }"
          >
            <span v-if="robot.x === colIndex && robot.y === rowIndex">🤖</span>
            <span
              v-else-if="
                obstacles.some(
                  (obs) => obs.x === colIndex && obs.y === rowIndex
                )
              "
              >⬛</span
            >
          </div>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-rows: repeat(10, 2rem);
  justify-content: center;
}
.row {
  display: grid;
  grid-template-columns: repeat(10, 2rem);
}
.cell {
  width: 2rem;
  height: 2rem;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.robot {
  background-color: lightblue;
}
.obstacle {
  background-color: black;
}
</style>
