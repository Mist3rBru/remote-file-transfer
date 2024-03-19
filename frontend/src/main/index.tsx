import { Router } from '@/main/router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
