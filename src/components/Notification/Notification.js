import React,{useEffect, useState} from 'react'
import styled, { keyframes,css } from 'styled-components'
import { GoAlert ,GoCheck} from 'react-icons/go';
import { BsFillCheckCircleFill} from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../../actions/Notification';
const Notification = (props) => {
  const [colors,setColors] = useState({bg:'',icon:'',bar:'',font_color:''})
  const [width,setWidth] = useState(0);
  const [close,setClose] = useState(false);
  const [intervalId,setIntervalId] = useState(null);
  const dispatch =useDispatch()
  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if(prev <100)
        {
          return prev +0.5;
        }
        clearInterval(id);
        return prev
      })
    },20);
    setIntervalId(id);
  }

  const handleStopTimer = () => {
    clearInterval(intervalId);
  }

  const handleCloseNotification = () => {
    handleStopTimer();
    setClose(true);
    setTimeout(() => {
      dispatch(removeNotification(props.id))
    },400)
  }

  useEffect (() => {
    if(width===100)
    {
      //close Notification
      handleCloseNotification();
    }
  },[width])

  useEffect(() => {
    if(props.type === 'SUCCESS')
    {
      setColors({bg:'#F1FFF0',icon:'green',bar:'green',font_color:'#46AF32'})
    }
    else if(props.type === 'ERROR')
    {
      setColors({bg:'#FFE5E5',icon:'red',bar:'red',font_color:'#F77474'})
    }
    else if(props.type === 'WARNING'){
      setColors({bg:'#FDF5CA',icon:'#FFB319',bar:'#FFB319',font_color:'#FFB319'})
    }
    handleStartTimer();
  },[])

  return (
    <NotificationItem onMouseEnter={handleStopTimer} onMouseLeave={handleStartTimer} colors={colors} close={close}>
      <Content type={props.type}>
        {props.type === 'SUCCESS' && <BsFillCheckCircleFill style={{fill:colors.icon}} size={22}/>}
        {props.type === 'ERROR' && <GoAlert style={{fill:colors.icon}} size={25}/>}
        {props.type === 'WARNING' && <GoAlert style={{fill:colors.icon}} size={25}/>}
      <p>{props.message}</p>
      {/* <button onClick={() => setClose(true)}>Çıkış</button> */}
      </Content>
      <Bar colors={colors} width={width}></Bar>
    </NotificationItem>
  )
}

export default Notification
const SlideLeft = keyframes`
  0%{
    margin-left:120%
  }

  100%{
    margin-left:0
  }

`

const SlideRight = keyframes`
  0%{
    margin-left:0
  }

  100%{
    margin-left:120%
  }

`

const NotificationItem = styled.div`

box-shadow: 0 0 5px rgba(0,0,0,0.4);
border-radius: 6px;
overflow: hidden;
background-color: ${props=>props.colors.bg};
margin-bottom: 10px;
animation:${props=>(props.close ? css`${SlideRight}`:css`${SlideLeft}`)}  0.4s;
animation-fill-mode:forwards;
width:300px;
p{
  margin:0;
  padding: 10px ;
  font-size: 16px;
  font-weight:700;
  color:${props => props.colors.font_color};

}
`



const Content = styled.div`
display:flex;
  align-items: center;
  margin:0 5px;
`

const Bar = styled.div.attrs(props => ({
  style:{
    height: 10,
    background: props.colors.bar,
    width:`${props.width}%`
  },

}))`width:100%`
