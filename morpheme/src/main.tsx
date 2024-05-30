import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

declare global {
  interface Window {
    showOpenFilePicker?: (options?: object) => Promise<FileSystemHandle[]>;
    showSaveFilePicker?: (options?: object) => Promise<FileSystemFileHandle>
  }
}