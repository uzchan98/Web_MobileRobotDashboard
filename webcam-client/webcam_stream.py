import cv2
import base64
import json
import socket
import time

# TCP 서버 주소 (서버의 IP와 포트)
server_address = ("192.168.0.1", 9000)

# 웹캠 초기화
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 320)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 240)

# TCP 클라이언트 소켓 설정
tcp_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
tcp_socket.connect(server_address)

while True:
    # 웹캠에서 프레임 캡처
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture image")
        break
    
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # 흑백 변환
    
    # 현재 timestamp 추가
    timestamp = time.time()
    
    # 이미지 JPEG로 인코딩
    _, encoded_image = cv2.imencode(".jpg", frame)
    
    # base64로 인코딩하여 문자열로 변환
    encoded_string = base64.b64encode(encoded_image).decode('utf-8')
    
    # 서버에 전송할 데이터 구조화
    message = {
        "type": "camera_data",
        "timestamp": timestamp,
        "image": encoded_string
    }
    
    # TCP 소켓을 통해 서버로 데이터 전송
    tcp_socket.send((json.dumps(message) + "\n").encode('utf-8'))
    
    # 0.1초 대기 (주기적으로 전송)
    time.sleep(0.1)

# 종료
cap.release()
tcp_socket.close()