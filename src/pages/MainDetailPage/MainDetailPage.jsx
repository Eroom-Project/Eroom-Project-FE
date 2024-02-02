// ChallengeModal.js
import React from 'react';
import styled from 'styled-components';
import Modal from '../MainPage/modal';

const Line = styled.hr`
    width: 100%;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 10px;
`;

function MainDetailPage({ selectedItem, isOpen, onClose, applyForChallenge }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <img 
                src={selectedItem?.image} 
                alt={selectedItem?.title}
                style={{ 
                    maxWidth: '400px', 
                    maxHeight: '300px',
                    width: 'auto', 
                    height: 'auto', 
                    objectFit: 'contain' 
                }} 
            />
            <h2>{selectedItem?.title}</h2>
            <h3>{selectedItem?.category}</h3>
            <br />
            <p>{selectedItem?.description}</p>
            <Line />
            <p>참여기간 &nbsp;&nbsp; {selectedItem?.startDate} ~ {selectedItem?.dueDate}</p>
            <p>운영횟수 &nbsp;&nbsp; {selectedItem?.frequency} </p>
            <p>참여인원 &nbsp;&nbsp; {selectedItem?.currentAttendance}명 / {selectedItem?.limitAttendance}명 </p>
            <p>인증방식 &nbsp;&nbsp; {selectedItem?.authExplanation}</p>
            <Line />
            <button onClick={() => applyForChallenge(selectedItem?.challengeId)}>참여 신청하기</button>
        </Modal>
    );
}

export default MainDetailPage;
