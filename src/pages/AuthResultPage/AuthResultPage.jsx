import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { authResult, postAuthStatus, updateAuthStatus, deleteAuthStatus } from '../../services/mainaxios';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';


// 함수들~~
const formatDateTime = (createdAt) => {
    const utcDate = new Date(createdAt); // 서버에서 받은 UTC 시간
    const koreanDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000)); // UTC 시간을 한국 시간으로 변환
    const year = koreanDate.getFullYear();
    const month = String(koreanDate.getMonth() + 1).padStart(2, '0');
    const day = String(koreanDate.getDate()).padStart(2, '0');
    const hours = String(koreanDate.getHours()).padStart(2, '0');
    const minutes = String(koreanDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};


const AuthResult = ({ isOpen, onClose, challengeId }) => {
   
    // 상태 초기화
   const [uploadedFileName, setUploadedFileName] = useState('');
    const [expandedIndex, setExpandedIndex] = useState(null); 
    const [editMode, setEditMode] = useState(null); 
    const [authContents, setAuthContents] = useState('');
    const [editImage, setEditImage] = useState(null); 
    const [authVideoUrl, setAuthVideoUrl] = useState('')
    
    

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
            setEditImage(null)

        }
    });
    const postAuthStatusMutation = useMutation(({authId, authStatus}) => postAuthStatus(authId, authStatus), {
        onSuccess: () => {
            queryClient.invalidateQueries('authResult'); // 쿼리 갱신
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
    const handleAuthStatusChange = (e, authId, newStatus) => {
        e.preventDefault();
        e.stopPropagation();
        
        postAuthStatusMutation.mutate({authId, authStatus : newStatus});
    };

    // 항목 확장/축소 토글 핸들러
    const toggleExpand = (authId) => {
        setExpandedIndex(prevIndex => prevIndex === authId ? null : authId);
    };

    // 수정 모드 토글 핸들러
    const handleEdit = (item) => {
        setEditMode(prevMode => (prevMode === item.authId ? null : item.authId)); 
        setAuthContents(item.authContents); 
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
    const handleUpdate = (authId) => {
        
        const authUpdateData = {
            authContents,
            authVideoUrl
        }
        const formData = new FormData();
        formData.append('authUpdateData', new Blob([JSON.stringify(authUpdateData)], { type: "application/json" }));
        if (editImage) {
            formData.append('authImageUrl', editImage);
        }
        updateMutation.mutate({ authId, formData });
    };

    // 삭제 핸들러
    const handleDelete = (authId) => {
        
        deleteMutation.mutate(authId);
    };

    // 리더 여부 확인
    
    const isLeader = data?.memberInfoResponseDto?.loginChallengeEnum === "LEADER";
    
    // 모달이 열려있지 않으면 null 반환
    if (!isOpen) return null;

    // 모달을 UI
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
            overflowY:'auto'
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
                overflowY:'auto'
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
    
                {isLoading && <FeedbackContainer> <img src='img/icon (5).png' alt='로딩이미지' /> 로딩중입니다.</FeedbackContainer>}
                {error && <FeedbackContainer> <img src='img/icon (6).png' alt='에러이미지' /> 오류가 발생했습니다.</FeedbackContainer>}
            
                <div style={{
                    overflowY:'auto'
                }}>
                {data?.authResponseDtoList?.map((item) => {
                    const isWriter = item.memberId === data.memberInfoResponseDto.loginMemberId 
                    if(!isLeader && !isWriter && item.authStatus !== "APPROVED"){
                        return null;
                    } 
                    const showApprovalButtons = isLeader && (item.authStatus === "WAITING" || item.authStatus === "DENIED");

                    const isEditing = editMode === item.authId;

                                  
                    return (
                        <AuthCard key={item.authId} >
                           <div onClick={() => toggleExpand(item.authId)} style={{
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    width: '100%',
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
            }}>{formatDateTime(item.createdAt)}</div>
        </div>
    </div>

    {showApprovalButtons && !isEditing && (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        }}>
            <SmallGrayButton onClick={(e) => handleAuthStatusChange(e, item.authId, 'APPROVED')}
                type='button'>승인</SmallGrayButton>
            
            <SmallWhiteButton onClick={(e) => handleAuthStatusChange(e, item.authId, 'DENIED')}
                type='button'>거절</SmallWhiteButton>
        </div>
    )}
</div>

{isEditing ? (
    <EditContainer expanded={expandedIndex === item.authId}>
        <TextArea
            value={authVideoUrl}
            onChange={(e) => setAuthVideoUrl(e.target.value)}
            />
        <TextArea
            value={authContents}
            onChange={(e) => setAuthContents(e.target.value)}
            />
        <DropZoneStyle {...getRootProps()}>
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
</DropZoneStyle>

    </EditContainer>
) : (
    <>
        <EditContainer expanded={expandedIndex === item.authId}>
        
            <div>비디오 링크: {item.authVideoUrl}</div>
            <div>{item.authContents}</div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom:'5PX'
                }}>
                <img src={item.authImageUrl} alt="Auth Image" style={{
                    width: '190px',
                    maxHeight:'180px',
                    objectFit: 'contain',
                }} />
            </div>
        </EditContainer>
            
    </>
)}

{isWriter && (
    <div style={{
        display: expandedIndex === item.authId ? 'flex' : 'none',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '10px',
        width: '100%',
    }}>
        <GrayButton
            onClick={isEditing ? () => handleUpdate(item.authId, item.challengerId) : () => handleEdit(item)}
            type='button'
            >{isEditing ? '저장' : '수정'}</GrayButton>

        <WhiteButton
            onClick={() => handleDelete(item.authId)}
            type='button'
            >삭제</WhiteButton>
    </div>
)}
                        </AuthCard>
                    );
                })}
                </div>
            </form>
            
        </div>,
        document.getElementById('modal-root')
    );
 }
export default AuthResult;


//스타일 컴포넌트 
const FeedbackContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  font-size:20px;
  font-weight:500;
  margin-top: 100px;
  gap:10px;
`;
                            
const AuthCard = styled.div`
    display:flex;
    flex-direction:column;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    transition: max-height 0.5s ease;
    width:520px;
    margin-bottom:5px;
    background-color: #ffffff;

    /* :hover{
        background-color: #FFC3C3;
        cursor: pointer; 
    } */
`;

const SmallGrayButton = styled.button`
    font-Family: Noto Sans KR, sans-serif;
    font-Size: 15px;
    background-Color: #636363;
    border: 1px solid #636363;
    border-Radius: 6px;
    color: white;
    width: 66px;
    height: 40px;
    cursor: pointer;
`;
const SmallWhiteButton = styled.button`
    font-Family: Noto Sans KR, sans-serif;
    font-Size: 15px;
    background-Color: #ffffff;
    border: 1px solid #636363;
    border-Radius: 6px;
    color: black;
    width: 66px;
    height: 40px;
    cursor: pointer;
`;
const GrayButton = styled.button`
    font-Family: Noto Sans KR, sans-serif;
    font-Size: 15px;
    background-Color: #636363;
    border: 1px solid #636363;
    border-Radius: 6px;
    color: white;
    width: 239px;
    height: 40px;
    cursor: pointer;
`;
const WhiteButton = styled.button`
    font-Family: Noto Sans KR, sans-serif;
    font-Size: 15px;
    background-Color: #ffffff;
    border: 1px solid #636363;
    border-Radius: 6px;
    color: black;
    width: 239px;
    height: 40px;
    cursor: pointer;
`;

const TextArea = styled.textarea`
    width: 450px;
    height: 45px;
    border-Radius: 4px;
    font-Size: 12px;
    resize: none;
    line-Height:1.4;
    margin-Bottom:5px;
`;

const EditContainer = styled.div`
    display: ${props => props.expanded ? 'block' : 'none'};
    padding: 10px;
    background-color: #F2F2F2;
    width: 474px;
    height: auto;
    border-radius: 4px;
    margin: 0 auto 10px auto;
    align-items: center;
    word-wrap: break-word;
    font-size: 12px;
    line-height: 1.4;
`;

const DropZoneStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 455px;
    height: 100px;
    border: 2px dashed #C3C3C3;
    border-radius: 10px;
    background-color: #F9F9F9;
    text-align: center;
    cursor: pointer;
    margin: 0 auto;
`;