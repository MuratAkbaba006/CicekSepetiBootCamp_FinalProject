import styled, { keyframes, css } from 'styled-components';

export const SlideLeft = keyframes`
  0%{
    margin-left:120%
  }

  100%{
    margin-left:0
  }

`;

export const SlideRight = keyframes`
  0%{
    margin-left:0
  }

  100%{
    margin-left:120%
  }

`;

export const NotificationItem = styled.div`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  overflow: hidden;
  background-color: ${(props) => props.colors.bg};
  margin-bottom: 10px;
  animation: ${(props) => (props.close ? css`${SlideRight}` : css`${SlideLeft}`)} 0.4s;
  animation-fill-mode: forwards;
  width: 300px;
  p {
    margin: 0;
    padding: 10px;
    font-size: 16px;
    font-weight: 700;
    color: ${(props) => props.colors.font_color};
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
`;

export const Bar = styled.div.attrs((props) => ({
  style: {
    height: 10,
    background: props.colors.bar,
    width: `${props.width}%`,
  },
}))`
  width: 100%;
`;
