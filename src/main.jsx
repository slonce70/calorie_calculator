import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App'

const theme = {
  colors: {
    primary: '#2a9d8f',
    secondary: '#264653',
    accent: '#e9c46a',
    background: '#f8f9fa'
  },
  shadows: {
    soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
