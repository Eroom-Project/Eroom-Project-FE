import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { createChallenge } from '../../services/mainaxios'; 

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return [value, handleChange];
}

function CreatePage() {
    const [title, handleTitleChange, resetTitle] = useInput('');
    const [category, handleCategoryChange, resetCategory] = useInput('');
    const [description, handleDescriptionChange, resetDescription] = useInput('');
    const [frequency, handleFrequencyChange, resetFrequency] = useInput('');
    const [limitAttendance, handleLimitAttendanceChange, resetLimitAttendance] = useInput('');
    const [authExplanation, handleAuthExplanationChange, resetAuthExplanation] = useInput('');
    const [startDate, handleStartDateChange, resetStartDate] = useInput('');
    const [dueDate, handleDueDateChange, resetDueDate] = useInput('');
    const [thumbnailImageUrl, setImage] = useState(null); 
    const resetImage = () => setImage(null);

    const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const { mutate, isLoading, isError } = useMutation(createChallenge, {
    onSuccess: () => {
      alert('챌린지가 성공적으로 저장되었습니다!');
      resetTitle();
      resetCategory();
      resetDescription();
      resetFrequency();
      resetLimitAttendance();
      resetAuthExplanation();
      resetStartDate();
      resetDueDate();
      resetImage();
      },
    onError: () => {
      alert('챌린지 저장에 실패했습니다.');
      },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('frequency', frequency);
    formData.append('limitAttendance', limitAttendance);
    formData.append('authExplanation', authExplanation);
    formData.append('startDate', startDate);
    formData.append('dueDate', dueDate);
    formData.append('thumbnailImageUrl', thumbnailImageUrl);

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>챌린지 이름:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label>챌린지 주제:</label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">주제를 선택하세요</option>
          <option value="IT">IT</option>
          <option value="인문">인문</option>
          <option value="수학">수학</option>
          <option value="과학">과학</option>
          <option value="예체능">예체능</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div>
        <label>챌린지 소개:</label>
        <textarea value={description} onChange={handleDescriptionChange} />
      </div>
      <div>
        <label>참여 횟수:</label>
        <input type="text" value={frequency} onChange={handleFrequencyChange} />
      </div>
      <div>
        <label>참여 인원:</label>
        <input type="number" value={limitAttendance} onChange={handleLimitAttendanceChange} />
      </div>
      <div>
        <label>인증 방법:</label>
        <input type="text" value={authExplanation} onChange={handleAuthExplanationChange} />
      </div>
      <div>
        <label>시작일:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </div>
      <div>
        <label>종료일:</label>
        <input type="date" value={dueDate} onChange={handleDueDateChange} />
      </div>
      <div>
        <label>이미지 업로드:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button type="submit">저장하기</button>
    </form>
  );
}

export default CreatePage;
