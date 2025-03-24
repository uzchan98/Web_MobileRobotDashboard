import cv2
from picamera2 import Picamera2
import numpy as np

# 카메라 초기화
picam2 = Picamera2()

# 해상도 설정 (640x480)
config = picam2.create_video_configuration(main={"size": (320, 240)})

# 카메라 설정
picam2.configure(config)

# 카메라 시작
picam2.start()

# 실시간 스트리밍
while True:
    frame = picam2.capture_array()  # 프레임 캡처
    frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)  # 색상 변환

    # OpenCV로 비디오 출력
    cv2.imshow("Live Stream", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):  # 'q' 키를 눌러 종료
        break

# 종료
cv2.destroyAllWindows()
picam2.stop()
