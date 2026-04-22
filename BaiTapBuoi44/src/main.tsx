import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#0f172a',
    },
    background: {
      default: 'transparent',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: 'none',
          fontWeight: 700,
          textTransform: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#334155',
          fontSize: '0.95rem',
          fontWeight: 800,
        },
        body: {
          fontSize: '0.95rem',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'medium',
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
