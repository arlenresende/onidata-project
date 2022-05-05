import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  @media (max-width: 1025px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-contente: center;
  }

  .left {
    width: 50%;
    background: #ffffff;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1025px) {
      width: 100%;
      background: none;
    }
  }
  .right {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 1025px) {
      width: 100%;
    }
  }
`;

export const BoxLogin = styled.div`
  width: 650px;
  height: 465px;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(53, 53, 53, 0.82);
  box-shadow: 0px 0px 6px 0px rgba(53, 53, 53, 0.82);
  position: relative;
  left: 250px;
  background: #ffffff;
  padding: 2rem;
  border-radius: 15px;
  @media (max-width: 1600px) {
    left: 50px;
  }
  @media (max-width: 1025px) {
    left: 0;
  }
  @media (max-width: 800px) {
    margin: 0 2rem;
    margin-top: 2rem;
  }
  .MuiTypography-root {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }
  form {
    margin-top: 2rem;
  }
  .MuiBox-root {
    width: 100%;
    .MuiFormControl-root {
      width: 100%;
    }
  }
  .MuiTypography-h6 {
    font-size: 12px;
    color: #f44336;
    text-align: left;
  }
  .MuiButton-root {
    width: 100%;
    margin-top: 2rem;
    height: 50px;
    font-size: 18px;
  }
`;

export const BoxText = styled.div`
  width: 650px;
  height: 465px;

  padding: 2rem;
  @media (max-width: 960px) {
    left: 0;
  }
  .MuiButton-containedSecondary {
    width: 80%;
    margin: 0 auto;
    display: block;
    text-align: center;
    margin-top: 2rem;
    font-size: 18px;
    color: #5582a1;
  }
`;
