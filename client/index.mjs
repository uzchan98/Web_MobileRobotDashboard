import net from "net";

const client = new net.Socket();

const HOST = "localhost";
const PORT = 9000;

let messageId = 1;

client.connect(PORT, HOST, () => {
  console.log(`Connected to TCP server at ${HOST}:${PORT}`);

  let obstaclePositions = [
    { position: 20, direction: 1 },
    { position: 200, direction: 1 },
  ];

  let motorStatus = [
    {
      id: 1,
      angle: 0,
      speed: 0,
      torque: 0,
      current: 0,
      temperature: 0,
      acceleration: 0,
    },
    {
      id: 2,
      angle: 0,
      speed: 0,
      torque: 0,
      current: 0,
      temperature: 0,
      acceleration: 0,
    },
    {
      id: 3,
      angle: 0,
      speed: 0,
      torque: 0,
      current: 0,
      temperature: 0,
      acceleration: 0,
    },
    {
      id: 4,
      angle: 0,
      speed: 0,
      torque: 0,
      current: 0,
      temperature: 0,
      acceleration: 0,
    },
  ];

  function generateLidarData() {
    const lidarData = [];
    const maxDistance = 10;
    const obstacleWidth = 20;
    const obstacleDistance = 3;
    const timestamp = Date.now(); // 🔥 현재 시간 추가

    for (let i = 1; i <= 360; i++) {
      let distance = maxDistance * (0.8 + Math.random() * 0.2);

      for (const obstacle of obstaclePositions) {
        if (i >= obstacle.position && i <= obstacle.position + obstacleWidth) {
          distance = obstacleDistance + (Math.random() * 0.3 - 0.15);
        }
      }

      lidarData.push({ id: i, distance: parseFloat(distance?.toFixed(2)) });
    }

    for (let obstacle of obstaclePositions) {
      obstacle.position += obstacle.direction * (Math.random() * 4 - 0.5);
      if (obstacle.position < 0) {
        obstacle.position = 0;
        obstacle.direction = 1;
      }
      if (obstacle.position > 340) {
        obstacle.position = 340;
        obstacle.direction = -1;
      }
    }

    return { timestamp, data: lidarData }; // 🔥 타임스탬프 포함하여 반환
  }

  let time = 0;

  function updateMotorStatus(timeStep) {
    return motorStatus.map((motor, index) => {
      const maxAcceleration = 5; // 최대 각가속도 제한 (rad/s²)
      const maxSpeed = 100; // 최대 각속도 제한 (rad/s)
      const inertia = 0.05; // 모터 관성 계수 (임의 값)

      // 사인파를 이용한 토크 변화 (주파수와 진폭 조절)
      const torqueAmplitude = 30; // 최대 토크 진폭
      const torqueFrequency = 0.1; // 토크 변화 속도 조절
      motor.torque =
        torqueAmplitude * Math.sin(torqueFrequency * time + (3.14 / 4) * index);

      // 각가속도(α) = 토크 / 관성
      motor.acceleration = motor.torque / inertia;
      motor.acceleration = Math.max(
        -maxAcceleration,
        Math.min(maxAcceleration, motor.acceleration)
      );

      // 각속도(ω) = 현재 각속도 + 각가속도 * dt
      motor.speed = motor.speed + motor.acceleration * timeStep;
      motor.speed = Math.max(-maxSpeed, Math.min(maxSpeed, motor.speed));

      // 각도(θ) = 현재 각도 + 각속도 * dt
      motor.angle = (motor.angle + motor.speed * timeStep) % 360;
      if (motor.angle < 0) motor.angle += 360;

      // 전류는 토크와 비례 (전기 모터 특성)
      motor.current = Math.abs(motor.torque) * 0.1;

      // 온도는 속도에 따라 증가
      motor.temperature = 60 + motor.speed * 0.05;

      // 호출 예시 (시간 증가)
      time += 0.1;

      return { ...motor };
    });
  }

  setInterval(() => {
    const message = {
      id: messageId,
      type: "sample_data",
      lidar: generateLidarData(),
      motors: updateMotorStatus(0.1),
    };

    try {
      client.write(JSON.stringify(message) + "\n");
    } catch (error) {
      console.error("TCP 전송 오류:", error);
    }

    messageId++;
  }, 100);
});

client.on("error", (err) => {
  console.error("Error:", err);
});

client.on("close", () => {
  console.log("Connection closed");
});
