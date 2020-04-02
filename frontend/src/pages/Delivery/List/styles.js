import styled, { css } from 'styled-components';
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
    thead {
      width: 100px;

      tr {
        width: 100px;
        background-color: #ddd;
        td {
        }
      }
    }

    tbody {
      button {
        background-color: #ffffff;
        width: 66px;
        color: #000;
        font-weight: bold;
        font-size: 12px;
        margin: 5px 0 0;
        height: 35px;
        border: 0;
        border-radius: 4px;

        &:hover {
          background: ${darken(0.08, '#fff')};
        }
      }
    }
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const Topo = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;

  input {
    width: 250px;
    height: 35px;
    border-radius: 4px;
  }

  > button {
    background-color: #7159c1;
    width: 150px;
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    margin: 5px 0 0;
    height: 35px;
    border: 0;
    border-radius: 4px;

    &:hover {
      background: ${darken(0.08, '#7159c1')};
    }
  }
`;

export const Input = styled.div`
  width: 100px;
`;

export const Form = styled.div``;

export const Status = styled.div`
  /*background: none;*/
  border: 0;
  position: relative;
  font-weight: bold;

  p {
    margin-left: 15px;
  }

    ${props =>
      props.status === 'ENTREGUE' &&
      css`
        &::after {
          position: absolute;
          left: 0;
          top: 0;
          width: 10px;
          height: 10px;
          background: green;

          content: '';
          border-radius: 50%;
        }
      `}
    ${props =>
      props.status === 'PENDENTE' &&
      css`
        &::after {
          position: absolute;
          left: 0;
          top: 0;
          width: 10px;
          height: 10px;
          background: yellow;
          content: '';
          border-radius: 50%;
        }
      `}
    ${props =>
      props.status === 'RETIRADA' &&
      css`
        &::after {
          position: absolute;
          left: 0;
          top: 0;
          width: 10px;
          height: 10px;
          background: blue;
          content: '';
          border-radius: 50%;
        }
      `}
    ${props =>
      props.status === 'CANCELADA' &&
      css`
        &::after {
          position: absolute;
          left: 0;
          top: 0;
          width: 10px;
          height: 10px;
          background: red;
          content: '';
          border-radius: 50%;
        }
      `};
`;

export const Text = styled.text`
  color: red;
  font-weight: bold;
`;
