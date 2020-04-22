import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #312E38;
    color: white;
  }

  body, input, button {
    font-family: "Roboto Slab", serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

/* Hack to disable Chrome's autofill styling */
  @keyframes autofill {
    0%,100% {
      color: #666;
      background: transparent;
    }
  }
  input:-webkit-autofill {
    animation-delay: 1s;
    animation-name: autofill;
    animation-fill-mode: both;
  }
`;
