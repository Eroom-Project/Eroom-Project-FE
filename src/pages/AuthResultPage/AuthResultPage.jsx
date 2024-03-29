import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { authResult, postAuthStatus, updateAuthStatus, deleteAuthStatus } from '../../services/mainaxios';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';


// 함수들~~
const formatDateTime = (createdAt) => {
    const date = new Date(createdAt); // 메시지 타임을 Date 객체로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`; // 포맷에 맞게 반환
  };


const AuthResult = ({ isOpen, onClose, challengeId }) => {
   
    // 상태 초기화
   const [uploadedFileName, setUploadedFileName] = useState('');
    const [expandedIndex, setExpandedIndex] = useState(null); 
    const [editMode, setEditMode] = useState(null); 
    const [authContents, setAuthContents] = useState('');
    const [editImage, setEditImage] = useState(null); 
    const [authVideoUrl, setAuthVideoUrl] = useState('')
    const [currentFilter, setCurrentFilter] = useState('전체');
    

    const authStateMap={
        전체 :'ALL',
        승인 :'APPROVED',
        거절 : 'DENIED',
        승인대기 : 'WAITING'
    }
    


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
    const postAuthStatusMutation = useMutation(({authId, authStatus, challengeId}) => postAuthStatus(authId, authStatus, challengeId), {
        onSuccess: () => {
            queryClient.invalidateQueries('authResult'); // 쿼리 갱신
            }
    });
    
    

    const deleteMutation = useMutation((authId) => deleteAuthStatus({challengeId, authId}), {
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

    //ESC 키
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
            onClose();
          }
        };
    
        if (isOpen) {
          document.addEventListener('keydown', handleKeyDown);
        }
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [isOpen, onClose]); 

      //인증상태 변경 핸들러
    const handleAuthStatusChange = (e, authId, newStatus) => {
        e.preventDefault();
        e.stopPropagation();
        postAuthStatusMutation.mutate({authId, challengeId, authStatus : newStatus});
    };

    //필터 변경 핸들러
    const handleFilterChange = (newFilter) => {
        setCurrentFilter(newFilter);
        };

    const filteredData = data?.authResponseDtoList?.filter((item) => {
        if(authStateMap[currentFilter] === 'ALL') {
            return data?.authResponseDtoList
        } else if(authStateMap[currentFilter] === 'APPROVED'||'DENIED'||'WAITING'){
            return item.authStatus === authStateMap[currentFilter];
        } else {
            return data?.authResponseDtoList
        }
    });

       
     //배경 선택 모달 닫힘. 
    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
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
        updateMutation.mutate({ authId, formData, challengeId });
        alert('저장 되었습니다.')
    };

    // 삭제 핸들러
    const handleDelete = (authId) => {
        
        const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
        if (isConfirmed) {
            deleteMutation.mutate(authId); 
        }
        alert('삭제되었습니다.')
      };

    // 리더 여부 확인
    
    const isLeader = data?.memberInfoResponseDto?.loginChallengeEnum === "LEADER";
    
   

    // 모달이 열려있지 않으면 null 반환
    if (!isOpen) return null;

    // 모달을 UI
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
                    marginBottom: '1px'
                }}>인증 확인하기</div>
    <div style={{
        display:'flex',
        gap:'10px'
    }}>
    {Object.keys(authStateMap).map((option) => (
    <FilterButton
      key={option}
      onClick={() => handleFilterChange(option)}
      >
      {option}
    </FilterButton>
    ))}</div>
    <div style={{fontSize:'11px', color:'gray'}}> ※리더가 아닌 경우 승인된 챌린지만 확인 할 수 있습니다.</div>
                {isLoading && <FeedbackContainer> <img src='img/icon (5).png' alt='로딩이미지' /> 로딩중입니다.</FeedbackContainer>}
                {error && <FeedbackContainer> <img src='img/icon (6).png' alt='에러이미지' /> 오류가 발생했습니다.</FeedbackContainer>}
                {!isLoading && !error && data?.authResponseDtoList?.length === 0 && (<FeedbackContainer> <img src='img/icon (4).png' alt='에러이미지' /> <br /> 인증 내용이 없습니다.</FeedbackContainer>)}
            
                <div style={{
                    overflowY:'auto'
                }}>
                {filteredData?.map((item) => {
                    const isWriter = item.memberId === data.memberInfoResponseDto.loginMemberId 
                    if(!isLeader && !isWriter && item.authStatus !== "APPROVED"){
                        return null;
                    } 
                    const showApprovalButtons = isLeader && (item.authStatus === "WAITING" || item.authStatus === "DENIED");

                    const isEditing = editMode === item.authId;

                    let dotColor = 'yellow'; 
                    if (item.authStatus === "APPROVED") {
                    dotColor = 'green';
                    } else if (item.authStatus === "DENIED") {
                    dotColor = 'red';
                    } 
                                  
                    return (
                        <AuthCard key={item.authId}  authStatus={item.authStatus}>
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
            <div style={{display:'flex', alignItems:'flex-start', gap:'5px'}}>
            <div style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '10px',
            }}>{item.nickname}</div>
            <div style={{height:'10px', width:'10px',borderRadius:'50px',backgroundColor:dotColor}}></div>
            </div>
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
        <div style={{fonts:'15px', fontWeight:'700',marginBottom:'5px'}}>비디오 링크</div>
        <TextArea
            value={authVideoUrl}
            onChange={(e) => setAuthVideoUrl(e.target.value)}
            maxLength={500}
            />
            <div style={{fonts:'15px', fontWeight:'700',marginBottom:'5px'}}>인증 내용</div>
        <TextArea
            value={authContents}
            onChange={(e) => setAuthContents(e.target.value)}
            maxLength={200}
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
        
            <div style={{fontSize:'14px',fontWeight:'700',marginBottom:'5px'}}>링크</div>
            <div style={{marginBottom:'10px',backgroundColor:'white',borderRadius:'6px',padding:'0 5px', minHeight:'30px', display:'flex', alignItems:'center'}}>{item.authVideoUrl}</div>
            <div style={{fontSize:'14px',fontWeight:'700',marginBottom:'5px'}}>인증내용</div>
            <div style={{marginBottom:'10px',backgroundColor:'white',borderRadius:'6px', padding:'0 5px',minHeight:'30px' ,display:'flex', alignItems:'center'}}>{item.authContents}</div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom:'5PX'
                }}>
                <a href={item.authImageUrl} target="_blank" rel="noopener noreferrer" style={{display: 'inline-block'}}>
                <img src={item.authImageUrl} alt="Auth Image" style={{
                    width: '190px',
                    maxHeight:'180px',
                    objectFit: 'contain',
                }} />
                </a>
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
            onClick={() => {
            if (isEditing) {
            setEditMode(null); 
            setEditImage(null); 
            setAuthVideoUrl('');
            setAuthContents('');
            } else {
            handleDelete(item.authId); 
    }
  }}
  type='button'
>
  {isEditing ? '이전' : '삭제'}
</WhiteButton>

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
    background-Color: black;
    border: 1px solid black;
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
    background-Color: black;
    border: 1px solid black;
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
    background-color: #e2f0f8;
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

const FilterButton = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  justify-content : center;
  align-items:center;
  width : 70px;
  height:30px;
  font-size: 14px;
  font-weight: 500;
  background-color: #000000;
  color: #ffffff;
  border-radius: 50px; 
  padding: 5px 5px; 
  cursor: pointer;
  &:hover {
    background-color:  #979797;
  }
`;