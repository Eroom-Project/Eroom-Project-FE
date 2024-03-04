import React, { useRef, useEffect } from 'react';

const MyBrickLeft = ({brickCounts}) => {
    
    const digits = brickCounts > 0 ? String(brickCounts).split('').reverse().map(Number) : [0];
    const canvasRef = useRef(null);
    const bricks = []; // 벽돌들을 저장할 배열
    let animationFrameId;
    let nextFloorHeight = 320; // 다음 벽돌이 닿을 바닥 높이 시작 값
    let nextXPosition = 0; // 다음 벽돌이 시작할 x 위치
    let baseFloorHeight = 320; // 바닥 높이의 초기값

    // 이미지 로드
    const brickImages = [
        'img/brickR (1).png',
        'img/brickR (2).png',
        'img/brickR (3).png',
        'img/brickR (4).png',
        'img/brickR (5).png',
        'img/brickR (6).png',
    ].map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    // 초기 벽돌 생성
    const createBrick = (type) => {
        if (bricks.length % 5 === 0 && bricks.length > 0) {
            nextXPosition = 0; // 초기 x 위치로 리셋
            baseFloorHeight -= 50; // 바닥 높이 증가
            nextFloorHeight = baseFloorHeight; // 다음 바닥 높이 업데이트
        }

        const brickImage = brickImages[type];

        const x = nextXPosition;
        const y = 0;
        const dy = 10; // y 방향 속도 (하강 속도)
        const bounce = false; // 바닥에 닿아서 튀어오르는지 여부
        const floorHeight = nextFloorHeight; // 현재 벽돌이 닿을 바닥 높이

        nextFloorHeight += 30;
        nextXPosition += 55;

        return { x, y, width: 100, height: 100, dy, bounce, floorHeight, brickImage };
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
                }
            }
        });

        animationFrameId = requestAnimationFrame(() => updateAnimation(ctx));
    };

    // 모든 브릭 추가
    const addBricks = () => {
        if (digits.every(digit => digit === 0)) { // 모든 자릿수가 0인 경우, 적어도 한 개의 브릭을 생성
            bricks.push(createBrick(0)); // 기본 브릭 추가
        } else {
            digits.forEach((count, index) => {
                for (let i = 0; i < count; i++) {
                    bricks.push(createBrick(index)); // 해당 타입의 벽돌 추가
                }
            });
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
    }, [brickCounts]);

    return <canvas ref={canvasRef} width='285' height='355' />;
};

export default MyBrickLeft;
