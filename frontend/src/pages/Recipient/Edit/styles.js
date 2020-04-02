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

  input {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
    &::placeholder {
      /*color: rgba(255, 255, 255, 0.7);*/
      color: #ddd;
    }
  }

  span {
    color: #000;
    align-self: flex-start;

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
    margin-right: 10px;
    &:hover {
      background: ${darken(0.08, '#7159c1')};
    }
  }
`;

export const Input = styled.div`
  width: 100px;
`;

export const Form = styled.div``;

export const AsyncSelect = styled.div``;
