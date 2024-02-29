import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { eaditChallenge } from '../../services/mainaxios';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { getChallengeDetail } from '../../services/Query';



function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => setValue(e.target.value);
  const reset = () => setValue('');
  const set = (newValue) => setValue(newValue);
  return [value, handleChange, reset, set];
}




function EditPage() {
  const [title, handleTitleChange, resetTitle] = useInput('');
  const [category, handleCategoryChange, resetCategory] = useInput('');
  const [description, handleDescriptionChange, resetDescription] = useInput('');
  const [limitAttendance, handleLimitAttendanceChange, resetLimitAttendance] = useInput('');
  const [authExplanation, handleAuthExplanationChange, resetAuthExplanation] = useInput('');
  const [startDate, handleStartDateChange, resetStartDate] = useInput('');
  const [dueDate, handleDueDateChange, resetDueDate] = useInput('');
  const [thumbnailImageUrl, setImage] = useState(null);
  const [frequency, setFrequency] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const location = useLocation();
  const { challengeId } = location.state || {};



  const challengeDetailData = useQuery(
    ['challengeDetailData', challengeId],
    () => getChallengeDetail(challengeId),)

  const [fieldErrors, setFieldErrors] = useState({
    title: false,
    category: false,
    description: false,
    frequency: false,
    limitAttendance: false,
    authExplanation: false,
    startDate: false,
    dueDate: false,
  });

  const validateForm = () => {
    const errors = {
      title: !title,
      category: !category,
      description: !description,
      frequency: !frequency,
      limitAttendance: !limitAttendance,
      authExplanation: !authExplanation,
      startDate: !startDate,
      dueDate: !dueDate,
    };

    setFieldErrors(errors);

    // 모든 필드가 유효한지 여부를 반환
    return Object.values(errors).every(isValid => !isValid);
  };

  const navigate = useNavigate();

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
  };

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
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      alert('JPEG 또는 PNG 형식의 이미지 파일만 업로드 가능합니다.');
    }
  }, []);


  const handleRemoveFile = (event) => {
    event.stopPropagation();
    setImage(null);
    setPreviewUrl(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const today = new Date().toISOString().split('T')[0];

  const { mutate } = useMutation(eaditChallenge, {
    onSuccess: () => {
      alert('챌린지 수정 성공');
      resetTitle();
      resetCategory();
      resetDescription();
      setFrequency('');
      resetLimitAttendance();
      resetAuthExplanation();
      resetStartDate();
      resetDueDate();
      resetImage();
      setSelectedFrequency();
      navigate(-1);
    },
    onError: () => {
      alert('챌린지 수정에 실패했습니다.');
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(dueDate)) {
      alert('종료일은 시작일보다 이후여야 합니다.');
      e.preventDefault();
      return;
    }

    if (!validateForm()) {
      alert('모든 내용을 작성해주세요.');
      return;
    }


    const ChallengeUpdateData = {
      title,
      category,
      description,
      frequency,
      limitAttendance,
      authExplanation,
      startDate,
      dueDate,
    };

    const form = new FormData();

    form.append('ChallengeUpdateData', new Blob([JSON.stringify(ChallengeUpdateData)], { type: "application/json" }));
    form.append('thumbnailImageUrl', thumbnailImageUrl);


    mutate({ form: form, challengeId: challengeId });
  };


  useEffect(() => {
      const savedData = challengeDetailData?.data?.responseDto;
      console.log("savedData=>",savedData)
      handleTitleChange({ target: { value: savedData?.title || '' } });
      handleCategoryChange({ target: { value: savedData?.category || '' } });
      handleDescriptionChange({ target: { value: savedData?.description || '' } });
      setFrequency(savedData?.frequency || '');
      setSelectedFrequency(savedData?.frequency || '');
      handleLimitAttendanceChange({ target: { value: savedData?.limitAttendance || '' } });
      handleAuthExplanationChange({ target: { value: savedData?.authExplanation || '' } });
      handleStartDateChange({ target: { value: savedData?.startDate || '' } });
      handleDueDateChange({ target: { value: savedData?.dueDate || '' } });
      setImage(savedData?.thumbnailImageUrl || '');
      setPreviewUrl(savedData?.thumbnailImageUrl || '');
  }, [challengeDetailData.data]);


  




  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'URL(/img/CreateHeaderImg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '300px',
        marginBottom: '60px'
      }}>
        <div style={{
          fontSize: '40px',
          fontWeight: '900'
        }}>챌린지를 수정해 주세요</div>
      </div>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <div style={{
            display: 'flex',
            gap: '20px',
          }}>
            <div>
              <TitleText>챌린지 이름</TitleText>
              <InputStyle type="text" value={title} onChange={handleTitleChange} maxLength={23} placeholder='챌린지 이름을 입력해주세요(20글자 이내)' fieldError={fieldErrors.title} />
            </div>
            <div>
              <TitleText>챌린지 주제</TitleText>
              <select value={category} onChange={handleCategoryChange} style={{
                border: fieldErrors.category ? '2px solid red' : '1px solid #C3C3C3',
                borderRadius: '6px',
                width: '590px',
                height: '44.95px',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                padding: '0 10px'
              }}>
                <option value="">주제를 선택하세요</option>
                <option value="IT">IT</option>
                <option value="HUMANITIES">인문</option>
                <option value="MATH">수학</option>
                <option value="SCIENCE">과학</option>
                <option value="ARTS_AND_PHYSICAL_EDUCATION">예체능</option>
                <option value="FOREIGN_LANGUAGE">외국어</option>
                <option value="ETC">기타</option>
              </select>
            </div>
          </div>
          <div>
            <TitleText>챌린지 소개</TitleText>
            <textarea value={description} onChange={handleDescriptionChange} maxLength={1000} placeholder='챌린지를 소개해주세요' style={{
              width: '1200px',
              height: '150px',
              border: fieldErrors.category ? '2px solid red' : '1px solid #C3C3C3',
              borderRadius: '6px',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '14px',
              padding: '0 10px'
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
                    fontFamily: 'Noto Sans KR, sans-serif',
                    width: '105px',
                    height: '48px',
                    backgroundColor: selectedFrequency === option ? 'black' : '#FFFFFF',
                    border: fieldErrors.category ? '2px solid red' : '1px solid #C3C3C3',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: '15px',
                    color: selectedFrequency === option ? '#FFFFFF' : '#888888',
                  }}
                >
                  {option}
                </button>
              ))}
            </CountContainer>
          </div>
          <div>
            <TitleText>인증 방법</TitleText>
            <InputStyle type="text" value={authExplanation} onChange={handleAuthExplanationChange} maxLength={25} placeholder='인증방식을 간단히 설명해주세요(25자 이내)'
              fieldError={fieldErrors.authExplanation}
              style={{
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
              <InputStyle type="number" value={limitAttendance} onChange={handleLimitAttendanceChange} min='0' max="50" fieldError={fieldErrors.limitAttendance}
                onInput={(e) => {
                  if (e.target.value.length > e.target.maxLength)
                    e.target.value = e.target.value.slice(0, e.target.maxLength);
                }} maxLength={2}
                style={{ width: '300px' }}
              />
            </div>

            <div style={{
              marginLeft: '100px',
              marginBottom: '20px',
            }}>
              <TitleText>시작일</TitleText>
              <InputStyle type="date" value={startDate} onChange={handleStartDateChange} min={today}
                fieldError={fieldErrors.startDate}
                style={{
                  width: '312px',
                  padding: '0 10px'
                }} />
            </div>
            <div>
              <TitleText>종료일</TitleText>
              <InputStyle type="date" value={dueDate} onChange={handleDueDateChange} min={today}
                fieldError={fieldErrors.dueDate}
                style={{
                  width: '312px',
                  padding: '0 10px'
                }}
              />
            </div>
          </div>

          <div {...getRootProps()} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '1200px',
            minheight: '150px',
            maxHeight: '500',
            border: '2px dashed #C3C3C3',
            textAlign: 'center',
            borderRadius: '10px',
            backgroundColor: '#F9F9F9',
            marginBottom: '20px'
          }}>
            <input {...getInputProps()} />
            {previewUrl ? (
              <div style={{height: '200px', overflow: 'hidden'}}>
                <img src={previewUrl} style={{ width: '80%', height: '80%', padding: '10px 0' }} alt="Preview" /> <button type="button" onClick={handleRemoveFile} style={{
                  marginLeft: '10px', cursor: 'pointer', borderRadius: '10px',
                }}>X</button>
              </div>
            ) : isDragActive ? (
              <p style={{ display: 'flex', alignItems: 'center', lineHeight: '1.5', minHeight: '97px' }}>파일을 여기에 드롭하세요.</p>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', height: '97px' }}>
                <p style={{ lineHeight: '1.5' }}>
                  여기에 파일을 끌어다주세요.<br />
                  <span style={{ fontSize: '12px', color: 'grey' }}>최대 10MB</span><br />
                  <span style={{ textDecoration: 'underline' }}>또는 클릭하여 파일을 선택하세요.</span>
                </p>
              </div>
            )}

          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}>

            <button type="submit" style={{
              fontFamily: 'Noto Sans KR, sans-serif',
              width: '344px',
              height: '48px',
              borderRadius: '6px',
              backgroundColor: 'black',
              color: ' #ffffff',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer'
            }}>수정하기</button>
          </div>

        </Form>
      </FormContainer>
    </div>
  );
}

export default EditPage;


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
  border: ${props => props.fieldError ? '2px solid red' : '1px solid #c3c3c3'};
  border-radius: 6px;
  width: 590px;
  height: 40px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  padding : 0 10px;
`;

const CountContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  width: 1200px;
`;
