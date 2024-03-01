import React, { useEffect, useRef } from 'react';

const CanvasBall = ({ imageUrl, nickname }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 1000; // 고정된 크기로 조정
    canvas.height = 800;

    let ball;
    let isDragging = false;
    let lastMousePos = { x: 0, y: 0 };
    const ballImage = new Image();
    ballImage.src = imageUrl; // 이미지 URL 로드

    class Ball {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 45; // 공의 크기를 30px로 조정
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        if (!isDragging) {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += 0.5; // 중력 효과
          this.vx *= 0.99;
          this.vy *= 0.99;
      
          // 벽에 부딪히면 반사
          if (this.y + this.size > canvas.height) {
            this.vy *= -0.9;
            this.y = canvas.height - this.size;
            // 속도가 매우 낮으면 멈춤
            if (Math.abs(this.vy) < 4.3) {
              this.vy = 0;
              this.vx *= 0.9; // 바닥에 닿았을 때 수평 속도 감소
            }
          } else if (this.y - this.size < 0) {
            this.vy *= -0.9;
            this.y = this.size; 
          }
          
          if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.vx *= -0.9;
            this.x += this.vx;
          }
        }
      }
      

      draw() {
        ctx.save(); // 현재 상태 저장
        ctx.beginPath(); //그리기 시작
        // 배경색이 될 원 그리기
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#FBF4B6'; // 배경색을 흰색으로 설정
        ctx.fill(); // 원의 내부를 흰색으로 채움
      
        // 원형 클리핑 경로 생성: Ball의 중심에서 시작, Ball의 size를 반지름으로 사용
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.clip(); // 클리핑 영역 설정
      
        // 클리핑 영역 내에 이미지 그리기
        ctx.drawImage(ballImage, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      
        ctx.restore(); // 이전 상태로 복원하여 클리핑 영역 해제
      
        // 닉네임 표시
        ctx.fillStyle = 'black';
        ctx.font = '700 20px Noto Sans KR';
        ctx.fillText(nickname, this.x - ctx.measureText(nickname).width / 2, this.y + this.size + 20);
      
        // 공의 테두리 추가
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); // 동일한 원 그리기
        ctx.strokeStyle = 'white'; // 테두리 색상을 흰색으로 설정
        ctx.lineWidth = 1; // 테두리 두께를 2px로 설정
        ctx.stroke(); // 테두리 그리기
      }
      
      
      
    }

    function init() {
      ball = new Ball(canvas.width / 2, canvas.height / 2);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 프레임 지우기
      ball.update();
      ball.draw();
      requestAnimationFrame(animate);
    }

    ballImage.onload = () => {
      init();
      animate();
    };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2) < ball.size) {
        isDragging = true;
        lastMousePos.x = x;
        lastMousePos.y = y;
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ball.vx = x - lastMousePos.x;
      ball.vy = y - lastMousePos.y;
      ball.x = x;
      ball.y = y;
      lastMousePos.x = x;
      lastMousePos.y = y;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [imageUrl, nickname]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CanvasBall;
