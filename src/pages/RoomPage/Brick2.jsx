import React, { useRef, useEffect } from 'react';

const Brick2 = () => {
    const canvasRef = useRef(null);
    const bricks = []; // 벽돌들을 저장할 배열
    let animationFrameId;
    let nextFloorHeight = 600; // 다음 벽돌이 닿을 바닥 높이 시작 값
    let nextXPosition = 0; // 다음 벽돌이 시작할 x 위치
    let baseFloorHeight = 600; // 바닥 높이의 초기값
    let brickCount = 0;

    // 이미지 로드
    const brickImages = [
        'img/brickR (1).png',
        'img/brickR (2).png',
        'img/brickR (3).png',
        'img/brickR (4).png',
        'img/brickR (5).png',
        'img/brickR (6).png',
        // 추가 이미지 경로를 여기에 넣으세요.
    ].map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    // 초기 벽돌 생성
    const createBrick = () => {
        if (bricks.length % 5 === 0 && bricks.length > 0) {
            nextXPosition = 0; // 초기 x 위치로 리셋
            baseFloorHeight -= 100; // 바닥 높이 증가
            nextFloorHeight = baseFloorHeight; // 다음 바닥 높이 업데이트
        }

        const imageIndex = Math.floor(Math.random() * brickImages.length);
        const brickImage = brickImages[imageIndex];

        const x = nextXPosition;
        const y = 0;
        const dy = 10; // y 방향 속도 (하강 속도)
        const bounce = false; // 바닥에 닿아서 튀어오르는지 여부
        const floorHeight = nextFloorHeight; // 현재 벽돌이 닿을 바닥 높이

        nextFloorHeight += 58;
        nextXPosition += 106;
        brickCount++; 

        return { x, y, width: 200, height: 200, dy, bounce, floorHeight, brickImage };
    };

    // 애니메이션 업데이트
    const updateAnimation = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 화면 지우기

        bricks.forEach((brick, index) => {
            if (brick.brickImage.complete) { // 이미지가 로드되었는지 확인
                ctx.drawImage(brick.brickImage, brick.x, brick.y, brick.width, brick.height);
            }

            brick.y += brick.dy; // 속도 조정

            if (brick.y + brick.height > brick.floorHeight) {
                brick.bounce = true;
                brick.dy = -brick.dy * 0.8; // 반동 속도 조정
            } else if (brick.bounce) {
                brick.dy += 2; // 중력 가속도 효과

                if (brick.dy > 0 && brick.y + brick.height >= brick.floorHeight - 2) {
                    brick.bounce = false;
                    brick.dy = 0;
                    brick.y = brick.floorHeight - brick.height; // 바닥에 정확히 위치하도록 조정

                    // 새로운 벽돌 추가 조건을 여기에 배치
                    if (bricks.length < 25 && index === bricks.length - 1) { 
                        setTimeout(() => {
                            bricks.push(createBrick())
                        }, 500);
                        
                    }
                }
            }
        });

        animationFrameId = requestAnimationFrame(() => updateAnimation(ctx));
    };

    const addBricks = () => {
        if (brickCount < 25) {
            bricks.push(createBrick()); // 새 벽돌 추가
            setTimeout(addBricks, 100); // 0.5초 후 다음 벽돌 추가
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        addBricks(); // 초기 벽돌 생성 및 추가 시작
        updateAnimation(context);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} width='460' height='720' />;
};

export default Brick2;
