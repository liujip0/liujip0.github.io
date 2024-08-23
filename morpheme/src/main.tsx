import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import AppLayout from './AppLayout.tsx';
import { StringRes } from './common/Resources.tsx';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm(StringRes.newversionavailable)) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    alert(StringRes.finishedcaching);
  },
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppLayout />
  </React.StrictMode>
);

declare global {
  interface Window {
    showOpenFilePicker?: (options?: object) => Promise<FileSystemHandle[]>;
    showSaveFilePicker?: (options?: object) => Promise<FileSystemFileHandle>;
  }
}
