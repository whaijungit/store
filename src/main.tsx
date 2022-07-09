import App from './App';
import React from 'react';
import 'styles/index.less';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom/client';

setTimeout(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}, 2000)



