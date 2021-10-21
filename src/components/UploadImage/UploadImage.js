import React, { useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import image from '../../assets/ProductForm/Group 6911.svg';
import { useDispatch, useSelector } from 'react-redux';
import { PostImage } from '../../actions/UploadForm';
import { Line, Circle } from 'rc-progress';
import { addNotification} from '../../actions/Notification';
import { v4 as uuid } from 'uuid';
const UploadImage = () => {
  const [data, setFile] = useState(null);
  const [progress, setProgress] = useState(1);
  const [isCompleteUpload, setIsCompleteUpload] = useState(false);
  const dispatch = useDispatch();
  const url = useSelector((state) => state.form.imageUrl);
  console.log(progress);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize:409600,
    onDrop: (acceptedFiles) => {
      if(acceptedFiles.length !==0)
      {
        setFile(
          Object.assign(acceptedFiles[0], {
            url: URL.createObjectURL(acceptedFiles[0]),
          })
        );
      }

    },
    onDropAccepted: (files) => {
      let datam = new FormData();
      datam.append('file', files[0]);
      dispatch(PostImage(datam, setProgress, setIsCompleteUpload));
      dispatch(addNotification({id:uuid(),type:'SUCCESS',message:'Resim yüklendi'}))
    },
    onDropRejected:() => {
      dispatch(addNotification({id:uuid(),type:'ERROR',message:'Resim boyutu çok büyük'}))
    }
  });

  const handleClickDelete = () => {
    setFile(null);
    setIsCompleteUpload(false);
    setProgress(0);
  };

  if (isCompleteUpload === true) {
    return (
      <UploadedImage>
        <img src={data.url} />
        <span onClick={handleClickDelete}>X</span>
      </UploadedImage>
    );
  }
  if (data !== null && progress < 100) {
    return (
      <ProgressArea>
        <p>%{progress}</p>
        <Line percent={progress} strokeWidth="4" strokeColor="#4B9CE2" />
        {
          isCompleteUpload !== true && <div>Loading...</div>
        }
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

const UploadImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px dashed #b1b1b1;
  border-radius: 2px;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  width: 80%;

  p {
    margin: 0;
  }
  div {
    color: #b1b1b1;
    background-color: #f4f4f4;
    border-radius: 8px;
    padding: 5px;
    cursor: pointer;
  }
`;

const UploadedImage = styled.div`
  position: relative;
  margin-left: 8px;
  img {
    width: 40%;
    justify-content: start;
  }
  span {
    position: absolute;
    left: 37%;
    background-color: black;
    color: #ffffff;
    cursor: pointer;
    border-radius: 5px;
  }
`;


const ProgressArea = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 80%;
p{
  margin:0;
  color:#525252;
  font-size: 12px;
}
div{
  font-size: 12px;
  color:#525252;
}
`