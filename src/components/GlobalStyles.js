import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: '游ゴシック', 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', 
      'メイリオ', 'Meiryo', 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, ${props => props.theme.colors.background} 0%, ${props => props.theme.colors.surfaceElevated} 100%);
    color: ${props => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    min-height: 100vh;
    line-height: 1.6;
    letter-spacing: 0.01em;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
    letter-spacing: 0.025em;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  input, select, textarea {
    font-family: inherit;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 400;
    letter-spacing: 0.01em;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
      border-color: ${props => props.theme.colors.primary};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.2;
  }
`;
