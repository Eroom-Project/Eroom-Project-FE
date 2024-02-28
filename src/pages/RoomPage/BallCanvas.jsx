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
        this.size = 50; // 공의 크기를 30px로 조정
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        if (!isDragging) {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += 0.1; // 중력 효과
          this.vx *= 0.99;
          this.vy *= 0.99;

          // 벽에 부딪히면 반사
          if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.vy *= -0.8;
            this.y += this.vy;
          }
          if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.vx *= -0.8;
            this.x += this.vx;
          }
        }
      }

      draw() {
        // 공 그리기
        ctx.drawImage(ballImage, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        // 닉네임 표시
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText(nickname, this.x - ctx.measureText(nickname).width / 2, this.y + this.size + 20);
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
