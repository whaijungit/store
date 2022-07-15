import App from './App';
import React from 'react';
import 'styles/index.less';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom/client';

(async function createApp() {
  await new Promise<undefined>((reslove) => {
    setTimeout(() => {
      reslove(undefined)
    }, Math.random() * 3000 - 1000)
  })
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})()
