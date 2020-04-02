import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  max-width: 900px;
  flex-direction: column;
  margin: 100px auto;
  text-align: center;

  form {
    flex: 1;
    flex-direction: column;

    button {
      background-color: #7159c1;
      width: 150px;
      color: #ffffff;
      font-weight: bold;
      font-size: 18px;
      flex: 1;
      height: 35px;
      border: 0;
      border-radius: 4px;
      margin-right: 10px;
      margin-bottom: 20px;
      &:hover {
        background: ${darken(0.08, '#7159c1')};
      }
    }

    small {
      color: #000;
      align-self: flex-start;
      margin-left: 24px;
      font-weight: bold;
      margin-right: 10px;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 60px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
      align-self: center;
    }

    input {
      background: #fff;
      border-color: #999;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;
      width: 300px;

      &::placeholder {
        /*color: rgba(255, 255, 255, 0.7);*/
        color: #ddd;
      }
    }
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const Topo = styled.div``;
