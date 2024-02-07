import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
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
        width:'438px',
        height:'600px',
        
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', 
            top: '10px', 
            right: '10px', 
            cursor: 'pointer'
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
