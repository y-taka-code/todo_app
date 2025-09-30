import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    min-height: 100vh;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  input {
    font-family: inherit;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}40;
    }
  }
`;
