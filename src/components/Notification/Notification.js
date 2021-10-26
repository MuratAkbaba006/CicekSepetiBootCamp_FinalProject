import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoAlert } from 'react-icons/go';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { NotificationItem, Content, Bar } from './ScNotification';
import { removeNotification } from '../../actions/Notification';

const Notification = (props) => {
  const [colors, setColors] = useState({
    bg: '',
    icon: '',
    bar: '',
    font_color: '',
  });
  const [width, setWidth] = useState(0);
  const [close, setClose] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const dispatch = useDispatch();
  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }
        clearInterval(id);
        return prev;
      });
    }, 20);
    setIntervalId(id);
  };
  // her 20ms 'de bir çalışarak notification barın genişliğini değiştirir.
  const handleStopTimer = () => {
    clearInterval(intervalId);
  };

  const handleCloseNotification = () => {
    handleStopTimer();
    setClose(true);
    setTimeout(() => {
      dispatch(removeNotification(props.id));
    }, 400);
  };

  useEffect(() => {
    if (width === 100) {
      // close Notification
      handleCloseNotification();
    }
  }, [width]);

  useEffect(() => {
    if (props.type === 'SUCCESS') {
      setColors({
        bg: '#F1FFF0',
        icon: 'green',
        bar: 'green',
        font_color: '#46AF32',
      });
    } else if (props.type === 'ERROR') {
      setColors({
        bg: '#FFE5E5',
        icon: 'red',
        bar: 'red',
        font_color: '#F77474',
      });
    } else if (props.type === 'WARNING') {
      setColors({
        bg: '#FDF5CA',
        icon: '#FFB319',
        bar: '#FFB319',
        font_color: '#FFB319',
      });
    }
    handleStartTimer();
  }, []);

  return (
    <NotificationItem onMouseEnter={handleStopTimer} onMouseLeave={handleStartTimer} colors={colors} close={close}>
      <Content type={props.type}>
        {props.type === 'SUCCESS' && <BsFillCheckCircleFill style={{ fill: colors.icon }} size={22} />}
        {props.type === 'ERROR' && <GoAlert style={{ fill: colors.icon }} size={25} />}
        {props.type === 'WARNING' && <GoAlert style={{ fill: colors.icon }} size={25} />}
        <p>{props.message}</p>
      </Content>
      <Bar colors={colors} width={width} />
    </NotificationItem>
  );
};

export default Notification;
