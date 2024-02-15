import React, { useState, useCallback } from 'react';
import { useMutation } from 'react-query';
import { createChallenge } from '../../services/mainaxios';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

// 스타일 컴포넌트
const TitleText = styled.label`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.3px;
  margin-bottom: 10px;
  color: #000000;
  margin-top: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 10px;
`;

const InputStyle = styled.input`
  border: 1px solid #c3c3c3;
  border-radius: 6px;
  width: 590px;
  height: 40px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;

const CountContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  width: 1200px;
`;

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => setValue(e.target.value);
  const reset = () => setValue('');
  return [value, handleChange, reset];
}

function CreatePage() {
  const [title, handleTitleChange, resetTitle] = useInput('');
  const [category, handleCategoryChange, resetCategory] = useInput('');
  const [description, handleDescriptionChange, resetDescription] = useInput('');
  const [limitAttendance, handleLimitAttendanceChange, resetLimitAttendance] = useInput('');
  const [authExplanation, handleAuthExplanationChange, resetAuthExplanation] = useInput('');
  const [startDate, handleStartDateChange, resetStartDate] = useInput('');
  const [dueDate, handleDueDateChange, resetDueDate] = useInput('');
  const [thumbnailImageUrl, setImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [createData, setCreateData] = useState({
    title,
    category,
    description,
    frequency,
    limitAttendance,
    authExplanation,
    startDate,
    dueDate    
  })
  const countMap = {
    '매일': '매일',
    '평일 매일': '평일 매일',
    '주말 매일': '주말 매일',
    '주 1일': '주 1일',
    '주 2일': '주 2일',
    '주 3일': '주 3일',
    '주 4일': '주 4일',
    '주 5일': '주 5일',
    '주 6일': '주 6일',
  };

  const handleFrequencyChange = (event, option) => {
    event.preventDefault();
    setFrequency(option);
    setSelectedFrequency(option);
    
  };

  const resetImage = () => {
    setImage(null);
    setUploadedFileName('');
  };

  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
    setUploadedFileName(acceptedFiles[0].name);
  }, []);

  const handleRemoveFile = (event) => {
    event.stopPropagation();
    setImage(null);
    setUploadedFileName('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { mutate, isLoading, isError } = useMutation(createChallenge, {
    onSuccess: () => {
      alert('챌린지 이룸 생성 성공');
      resetTitle();
      resetCategory();
      resetDescription();
      setFrequency('');
      resetLimitAttendance();
      resetAuthExplanation();
      resetStartDate();
      resetDueDate();
      resetImage();
    },
    onError: () => {
      alert('챌린지 생성에 실패했습니다.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    // formData.append('category', category);
    // formData.append('description', description);
    // formData.append('frequency', frequency);
    // formData.append('limitAttendance', limitAttendance);
    // formData.append('authExplanation', authExplanation);
    // formData.append('startDate', startDate);
    // formData.append('dueDate', dueDate);
    if (thumbnailImageUrl) formData.append('thumbnailImageUrl', thumbnailImageUrl);
    
    mutate(formData);
  };

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '1200px',
        height: '160px',
        fontSize: '32px',
        fontWeight: '700',
        backgroundColor: 'gray',
        margin: '0 auto',
      }}>
        &nbsp;&nbsp; 챌린지를 만들어주세요
      </div>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <div style={{
            display: 'flex',
            gap: '20px',
          }}>
            <div>
              <TitleText>챌린지 이름</TitleText>
              <InputStyle type="text" value={title} onChange={handleTitleChange} />
            </div>
            <div>
              <TitleText>챌린지 주제</TitleText>
              <select value={category} onChange={handleCategoryChange} style={{
                border: '1px solid #C3C3C3',
                borderRadius: '6px',
                width: '590px',
                height: '44.95px',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px'
              }}>
                <option value="">주제를 선택하세요</option>
                <option value="IT">IT</option>
                <option value="인문">인문</option>
                <option value="수학">수학</option>
                <option value="과학">과학</option>
                <option value="예체능">예체능</option>
                <option value="기타">기타</option>
              </select>
            </div>
          </div>
          <div>
            <TitleText>챌린지 소개</TitleText>
            <textarea value={description} onChange={handleDescriptionChange} style={{
              width: '1200px',
              height: '150px',
              border: '1px solid #C3C3C3',
              borderRadius: '6px',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '14px'
            }} />
          </div>
          <div>
            <TitleText>참여 횟수</TitleText>
            <CountContainer>
              {Object.keys(countMap).map(option => (
                <button
                  key={option}
                  onClick={(event) => handleFrequencyChange(event, option)}
                  style={{
                    fontFamily:'Noto Sans KR, sans-serif',
                    width: '105px',
                    height: '48px',
                    backgroundColor: selectedFrequency === option ? '#626262' : '#FFFFFF',
                    border: '1px solid #626262',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: '15px',
                    color: selectedFrequency === option ? '#FFFFFF' : '#000000',
                  }}
                >
                  {option}
                </button>
              ))}
            </CountContainer>
          </div>
          <div>
            <TitleText>인증 방법</TitleText>
            <InputStyle type="text" value={authExplanation} onChange={handleAuthExplanationChange} style={{
              width: '1200px'
            }} />
          </div>

          <div style={{
            display: 'flex',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div>
              <TitleText>참여 인원</TitleText>
              <InputStyle type="number" value={limitAttendance} onChange={handleLimitAttendanceChange} style={{
                width: '300px'
              }}
              />
            </div>

            <div style={{
              marginLeft: '100px',
              marginBottom: '20px',
            }}>
              <TitleText>시작일</TitleText>
              <InputStyle type="date" value={startDate} onChange={handleStartDateChange} style={{
                width: '312px',
                padding: '0 10px'
              }} />
            </div>
            <div>
              <TitleText>종료일</TitleText>
              <InputStyle type="date" value={dueDate} onChange={handleDueDateChange} style={{
                width: '312px',
                padding: '0 10px'
              }}
              />
            </div>
          </div>

          <div {...getRootProps()} style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            width:'1200px',
            height:'97px',
            border: '2px dashed #C3C3C3',
            textAlign: 'center',
            borderRadius: '10px',
            backgroundColor: ' #F9F9F9'
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
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button type="submit" style={{
              fontFamily:'Noto Sans KR, sans-serif',
              width: '344px',
              height: '48px',
              border: '1px solid #626262',
              backgroundColor: ' #626262',
              color: ' #ffffff',
              fontWeight: '700',
              fontSize: '15px',
            }}>저장하기</button>
          </div>

        </Form>
      </FormContainer>
    </>
  );
}

export default CreatePage;
