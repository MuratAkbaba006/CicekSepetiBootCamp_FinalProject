import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { Line } from 'rc-progress';
import { v4 as uuid } from 'uuid';
import { addNotification } from '../../actions/Notification';
import image from '../../assets/ProductForm/Group 6911.svg';
import { PostImage, PostImageClear } from '../../actions/UploadForm';
import { UploadImageContainer, UploadedImage, ProgressArea } from './ScUploadImage';

const UploadImage = () => {
  const [data, setFile] = useState(null);
  const [progress, setProgress] = useState(1);
  const [isCompleteUpload, setIsCompleteUpload] = useState(false);
  const dispatch = useDispatch();
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: 409600,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length !== 0) {
        setFile(
          Object.assign(acceptedFiles[0], {
            url: URL.createObjectURL(acceptedFiles[0]),
          })
        );
      }
    },
    onDropAccepted: (files) => {
      const datam = new FormData();
      datam.append('file', files[0]);
      dispatch(PostImage(datam, setProgress, setIsCompleteUpload));
      dispatch(addNotification({ id: uuid(), type: 'SUCCESS', message: 'Resim yüklendi' }));
    },
    onDropRejected: () => {
      dispatch(addNotification({ id: uuid(), type: 'ERROR', message: 'Resim boyutu çok büyük' }));
    },
  });

  const handleClickDelete = () => {
    setFile(null);
    setIsCompleteUpload(false);
    setProgress(0);
    dispatch(PostImageClear());
  };

  if (isCompleteUpload === true) {
    return (
      <UploadedImage>
        <img src={data.url} alt="productimage" />
        <span onClick={handleClickDelete}>X</span>
      </UploadedImage>
    );
  }
  if (data !== null && progress < 100) {
    return (
      <ProgressArea>
        <p>%{progress}</p>
        <Line percent={progress} strokeWidth="4" strokeColor="#4B9CE2" />
        {isCompleteUpload !== true && <div>Loading...</div>}
      </ProgressArea>
    );
  }
  return (
    <UploadImageContainer {...getRootProps()}>
      <img src={image} alt="" />
      <input {...getInputProps()} />
      <p>Sürükleyip bırakarak yükle</p>
      <p>veya</p>
      <div onClick={open}>Görsel Seçin</div>
    </UploadImageContainer>
  );
};

export default UploadImage;
