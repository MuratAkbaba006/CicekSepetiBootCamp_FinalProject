import React from 'react';
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import Notification from './Notification'
const NotificationContainer = (props) => {
  const notifications = useSelector((state) => state.notification.notifications);
  console.log(notifications);
  if(notifications.length===0)
  {
    return false;
  }
  return (
    <div>
      <NotificationWrapper>
        {notifications.map((noti) => {
          return <Notification  key={noti.id} {...noti} />;
        })}
      </NotificationWrapper>
      {props.children}
    </div>
  );
};

export default NotificationContainer;

const NotificationWrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 300px;
`;