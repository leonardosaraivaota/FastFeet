import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  /*background: linear-gradient(-90deg, #7159c1, #ab59c1);*/
  background: #7159c1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: center;
  background: #fff;
  height: 450px;

  img {
    margin-top: 50px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    align-items: center;

    input {
      /*background: rgba(0, 0, 0, 0.1);*/
      background: #fff;

      border-color: #999;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      /*color: #fff;*/
      color: #000;
      margin: 0 0 10px;
      width: 300px;

      &::placeholder {
        /*color: rgba(255, 255, 255, 0.7);*/
        color: #ddd;
      }
    }

    small {
      color: #000;
      align-self: flex-start;
      margin-left: 24px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      width: 300px;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }
    }

    a {
      color: #7159c1;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
