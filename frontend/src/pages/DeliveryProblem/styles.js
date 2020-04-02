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

  table {
    width: 100%;
    margin-right: 100px;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const Topo = styled.div`
  display: flex;
  align-self: center;
  align-items: center;

  > button {
    background-color: #7159c1;
    width: 150px;
    height: 40px;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    border: 0;
    border-radius: 4px;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;

export const Input = styled.div`
  width: 100px;
`;

export const Form = styled.div``;
