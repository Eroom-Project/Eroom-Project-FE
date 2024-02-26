import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // isOpen이 true일 때만 이벤트 리스너를 추가
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup 함수에서 이벤트 리스너를 제거
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]); // 의존성 배열에 isOpen과 onClose를 추가

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      onClick={handleBackgroundClick}
      style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:1000
    }}>
      <div style={{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        position: 'relative', 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        width:'478px',
        height:'640px',
      }}>
        <button 
          onClick={onClose}
          style={{
            fontFamily:'Noto Sans KR, sans-serif',
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            backgroundColor: 'white',
            border: 'none',
            fontSize: '20px',
            color:'#C3C3C3'
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
