import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import { challengeAuth } from '../../services/mainaxios';
import api from '../../services/api';

const AuthPage = ({ isOpen, onClose, challengeId  }) => {
  const [authContents, setAuthContents] = useState('');
  const [authImageUrl, setAuthImageUrl] = useState(null);
  const [authVideoUrl, setAuthVideoUrl] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [authStatus,setAuthStatus] = useState('WAITING');
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
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


  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 0) {
      return;
    }
  
    const file = acceptedFiles[0];
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxFileSize) {
      alert('파일 크기가 10MB를 초과할 수 없습니다.');
      return;
    }
  
    
    const isImageFile = file.type.match('image/(jpeg|png)');
    if (isImageFile) {
        setAuthImageUrl(file);
        setUploadedFileName(file.name);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url); 
    } else {
        alert('JPEG 또는 PNG 형식의 이미지 파일만 업로드 가능합니다.');
    }
  }, []);
   
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const mutation = useMutation(form => challengeAuth(form, challengeId), {
    onSuccess: (data) => {
      const successMessage = data?.message || '챌린지 인증 등록 성공';
      alert(successMessage);
      setAuthContents('');
      setAuthImageUrl('');
      setAuthVideoUrl('');
      setUploadedFileName('');
      setAuthStatus('WAITING');
      onClose();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || '인증에 등록 실패';
        alert(errorMessage);
    }
  });
 
  const handleClose = () => {
    
    if (authContents || authVideoUrl || uploadedFileName) {
    
      if (window.confirm("작성한 내용이 모두 삭제됩니다. 창을 닫으시겠습니까?")) {
       
        setAuthContents('');
        setAuthImageUrl(null);
        setAuthVideoUrl('');
        setUploadedFileName('');
        onClose(); 
      }
    } else {
      onClose(); 
    } return;
  };

  const handleRemoveFile = (event) => {
    event.stopPropagation();
    setAuthImageUrl(null);
    setUploadedFileName('');
    setPreviewUrl(null);
  };
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };


  
  const handleSubmit = (e) => {
    e.preventDefault();
    token()
    if (!authContents) {
      alert('인증 내용을 작성해주세요.');
      return; 
    }
    
    const authCreateData = {
      authContents,
      authVideoUrl,
      authStatus
    }
    const form = new FormData();
    form.append('authCreateData', new Blob([JSON.stringify(authCreateData)], { type: "application/json" }));
    
    if (authImageUrl) form.append('authImageUrl', authImageUrl);

    mutation.mutate(form, challengeId );
  };
  
  if (!isOpen) return null;

  const token = async() => {
    const resToken = await api.post(`/api/token`,{})
    }
  return ReactDOM.createPortal(
    <div onClick={handleBackgroundClick}
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
      zIndex: 1000,
    }}>
      <form style={{
        width: '438px',
        height: '458px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap:'20px',
        alignItems: 'flex-start',
        position: 'relative',
      }} onSubmit={handleSubmit}>
        <button onClick={handleClose} style={{
          fontFamily:'Noto Sans KR, sans-serif',
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          backgroundColor: 'white',
          border: 'none',
          fontSize: '20px',
          color:'#C3C3C3'
        }}>
          X
        </button>
        <div style={{
  display: 'flex',
  fontSize: '20px',
  fontWeight: '700',
  marginBottom: '10px'
    }}>챌린지 인증하기</div>
        
        <div style={{
          width:'428px',
          height:'59px',
          border:'1px solid #C3C3C3',
          borderRadius:'6px'
        }}>
          <div style={{
            fontSize:'12px',
            fontWeight:'700',
            margin:'10px'
          }}>인증내용</div>
        <input
          type="text"
          maxLength ={200}
          placeholder="내용을 입력하세요.(200자 이내)"
          value={authContents}
          onChange={(e) => setAuthContents(e.target.value)}
          style={{ 
            width: '90%', 
            margin: '0 10px',
            border:'none'
          }}
        />
        </div>

        <div style={{
          width:'428px',
          height:'59px',
          border:'1px solid #C3C3C3',
          borderRadius:'6px'
        }}>
          <div style={{
            fontSize:'12px',
            fontWeight:'700',
            margin:'10px'
          }}>동영상 링크</div>
        <input
          type="text"
          placeholder="인증에 참고할 링크가 있다면 입력해주세요."
          value={authVideoUrl}
          onChange={(e) => setAuthVideoUrl(e.target.value)}
          style={{ 
            width: '90%', 
            margin: '0 10px',
            border:'none'
          }}
        />
        </div>
        
        <div {...getRootProps()} style={{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  width:'426px',
  height:'152px', 
  border: '2px dashed #C3C3C3',
  borderRadius: '10px', 
  backgroundColor: '#F9F9F9', 
  textAlign: 'center',
  cursor: 'pointer',
  marginBottom: '10px', 
}}>
  <input {...getInputProps()} />
  {
              previewUrl ?
                (<div>
                  <img src={previewUrl} style={{ maxWidth: '30%', maxHeight: '30%', padding:'10px 0' }} alt="Preview" /> <button type="button" onClick={handleRemoveFile} style={{
                    marginLeft: '10px', cursor: 'pointer', radius: '10px',
                  }}>X
                  </button>
                </div>) :
                (isDragActive ?
                  <p style={{ lineHeight: '1.5' }}>파일을 여기에 드롭하세요.</p>
                  :
                  <>
                    <div>
                      <p style={{ lineHeight: '1.5' }}>
                        여기에 파일을 끌어다주세요.<br />
                        <span style={{ fontSize: '12px', color: 'grey' }}>최대 10MB</span><br />
                        <span style={{ textDecoration: 'underline' }}>또는 클릭하여 파일을 선택하세요.</span>
                      </p>
                    </div>

                  </>
                )
            }
</div>

        <button type="submit" style={{
          fontFamily:'Noto Sans KR, sans-serif',
          width: '430px',
          height:'48px',
          border:'none',
          borderRadius:'6px',
          backgroundColor:'black',
          color:'white',
          fontWeight:'5 00'
          }}
          
          >
            인증하기</button>
      </form>
    </div>,
    document.getElementById('modal-root')
  );
};

export default AuthPage;
