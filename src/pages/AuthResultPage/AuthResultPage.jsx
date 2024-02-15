import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { authResult, postAuthStatus, updateAuthStatus, deleteAuthStatus } from '../../services/mainaxios';
import { useDropzone } from 'react-dropzone';

const AuthResult = ({ isOpen, onClose, challengerId }) => {
   
    // 상태 초기화
   const [uploadedFileName, setUploadedFileName] = useState('');
    const [expandedIndex, setExpandedIndex] = useState(null); 
    const [editMode, setEditMode] = useState(null); 
    const [editedContent, setEditedContent] = useState('');
    const [editImage, setEditImage] = useState(null); 
    

    // React Query 및 파일 업로드 훅 사용
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery('authResult', () => authResult(challengeId), {
        enabled: isOpen,
    });
    

    // Mutation 훅 사용
    const updateMutation = useMutation(({ challengeId, authId, formData }) => updateAuthStatus({ challengeId, authId, formData }), {
        onSuccess: () => {
            queryClient.invalidateQueries('authResult'); // 쿼리 갱신
            setEditMode(null); // 수정 모드 종료
        }
    });

    const deleteMutation = useMutation((challengeId, authId) => deleteAuthStatus(challengeId, authId), {
        onSuccess: () => {
            queryClient.invalidateQueries('authResult'); // 쿼리 갱신
        }
    });
    
    const mutation = useMutation(({ challengeId, authId, authStatus }) => 
        postAuthStatus(authId, authStatus, challengeId), {
        onSuccess: () => {
            queryClient.invalidateQueries('authResult'); // 쿼리 갱신
        },
    });

    // 인증 상태 변경 핸들러
    const handleAuthStatusChange = (e, authId, authStatus, challengeId) => {
        e.preventDefault();
        e.stopPropagation();
        mutation.mutate({ authId, authStatus, challengeId });
    };

    // 항목 확장/축소 토글 핸들러
    const toggleExpand = (index) => {
        setExpandedIndex(prevIndex => prevIndex === index ? null : index);
    };

    // 수정 모드 토글 핸들러
    const handleEdit = (item) => {
        setEditMode(prevMode => (prevMode === item.authId ? null : item.authId)); 
        setEditedContent(item.authContents); 
    };

    // 파일 드롭 핸들러
    const onDrop = useCallback(acceptedFiles => {
        setEditImage(acceptedFiles[0]);
        setUploadedFileName(acceptedFiles[0].name);
    });
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
    // 파일 삭제 핸들러
    const handleRemoveFile = (event) => {
        event.stopPropagation();
        setEditImage(null);
        setUploadedFileName('');
    };

    // 수정 내용 저장 핸들러
    const handleUpdate = (authId, challengeId) => {
        const formData = new FormData();
        formData.append('authContents', editedContent);
        if (editImage) {
            formData.append('authImage', editImage, editImage.name);
        }
        updateMutation.mutate({ authId, challengeId, formData });
    };

    // 삭제 핸들러
    const handleDelete = (authId) => {
        deleteMutation.mutate(authId);
    };

    // 리더 여부 확인
    const isLeader = data?.memberInfoResponseDto?.loginChallengeEnum === 'LEADER';

    // 모달이 열려있지 않으면 null 반환
    if (!isOpen) return null;

    // 모달을 포털로 렌더링
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
            zIndex: 1000,
        }}>
            <form style={{
                width: '540px',
                height: '622px',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    border: 'none',
                    fontSize: '20px',
                    color: '#C3C3C3'
                }}>X</button>
    
                <div style={{
                    display: 'flex',
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '10px'
                }}>인증 확인하기</div>
    
                {isLoading && <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '500',
                    marginTop: '100px',
                    gap: '10px'
                }}>
                    <img src='img/icon (5).png' alt='로딩이미지' />
                    로딩중입니다.</div>}
                {error && <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '500',
                    marginTop: '100px',
                    gap: '10px'
                }}>
                    <img src='img/icon (6).png' alt='에러이미지' />
                    오류가 발생했습니다.</div>}
    
                {data?.authResponseDtoList?.map((item, index) => {
                    const isWriter = item.memberId === data.memberInfoResponseDto.loginMemberId;
                    const showApprovalButtons = isLeader && item.authStatus === 'WAITING';
                    const isEditing = editMode === item.authId;
                    
                    return (
                        <div key={item.authId} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            transition: 'max-height 0.5s ease',
                            width: '532px',
                            maxHeight: expandedIndex === index ? '100%' : '100px',
                        }}>
                           <div onClick={() => toggleExpand(index)} style={{
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    width: '95%',
}}>
    <div style={{
        display: 'flex',
        alignItems: 'center'
    }}>
        <img src={item.authImageUrl} alt="Auth Image" style={{
            width: '60px',
            height: '60px',
            borderRadius: '8px',
            marginRight: '10px'
        }} />
        <div>
            <div style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '10px',
            }}>{item.nickname}</div>
            <div style={{
                fontSize: '12px',
                color: '#A5A5A5'
            }}>{item.createdAt}</div>
        </div>
    </div>

    {showApprovalButtons && !isEditing && (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        }}>
            <button onClick={(e) => handleAuthStatusChange(e, item.authStatus, 'APPROVED')}
                type='button'
                style={{
                    fontFamily: 'Noto Sans KR, sans-serif',
                    fontSize: '15px',
                    backgroundColor: '#636363',
                    border: '1px solid #636363',
                    borderRadius: '6px',
                    color: 'white',
                    width: '66px',
                    height: '40px'
                }}>승인</button>
            <button onClick={(e) => handleAuthStatusChange(e, item.authStatus, 'DENIED')}
                type='button'
                style={{
                    fontFamily: 'Noto Sans KR, sans-serif',
                    fontSize: '15px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #626262',
                    borderRadius: '6px',
                    color: 'black',
                    width: '66px',
                    height: '40px'
                }}>거절</button>
        </div>
    )}
</div>

{isEditing ? (
    <div style={{
        display: expandedIndex === index ? 'block' : 'none',
        padding: '10px',
        backgroundColor: '#F2F2F2',
        width: '474px',
        height: 'auto',
        borderRadius: '4px',
        margin: '0 auto 10px auto',
        alignItems: 'center',
        wordWrap: 'break-word',
        fontSize: '12px',
        lineHeight: '1.4'
    }}>
        <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{
                width: '450px',
                height: '100px',
                borderRadius: '4px',
                fontSize: '12px',
                resize: 'none',
                lineHeight:'1.4'
            }}
        />
        <div {...getRootProps()} style={{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  width:'455px',
  height:'152px', 
  border: '2px dashed #C3C3C3',
  borderRadius: '10px', 
  backgroundColor: '#F9F9F9', 
  textAlign: 'center',
  cursor: 'pointer',
  margin:'0 auto'
}}>
  <input {...getInputProps()} />
  {
              uploadedFileName ?
                (<div>
                  <p>{uploadedFileName} <button type="button" onClick={handleRemoveFile} style={{
                    marginLeft: '10px', cursor: 'pointer', radius: '10px',
                  }}>X
                  </button></p>
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

    </div>
) : (
    <>
        <div style={{
            display: expandedIndex === index ? 'block' : 'none',
            padding: '10px',
            backgroundColor: '#F2F2F2',
            width: '474px',
            height: 'auto',
            borderRadius: '4px',
            margin: '0 auto 10px auto',
            alignItems: 'center',
            wordWrap: 'break-word',
            fontSize: '12px',
            lineHeight: '1.2'
        }}>
            <div>비디오 링크: {item.authVideoUrl}</div>
            <div>{item.authContents}</div>
        </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
                }}>
                <img src={item.authImageUrl} alt="Auth Image" style={{
                    width: '220px',
                    objectFit: 'contain',
                }} />
            </div>
    </>
)}

{isWriter && (
    <div style={{
        display: expandedIndex === index ? 'flex' : 'none',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '10px',
        width: '100%',
    }}>
        <button
            onClick={isEditing ? () => handleUpdate(item.authId, item.challengerId) : () => handleEdit(item)}
            type='button'
            style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '15px',
                backgroundColor: '#636363',
                border: '1px solid #636363',
                borderRadius: '6px',
                color: 'white',
                width: '239px',
                height: '40px'
            }}>{isEditing ? '저장' : '수정'}</button>

        <button
            onClick={() => handleDelete(item.authId)}
            type='button'
            style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '15px',
                backgroundColor: '#ffffff',
                border: '1px solid #626262',
                borderRadius: '6px',
                color: 'black',
                width: '239px',
                height: '40px'
            }}>삭제</button>
    </div>
)}
                        </div>
                    );
                })}
            </form>
        </div>,
        document.getElementById('modal-root')
    );
 }
export default AuthResult;
