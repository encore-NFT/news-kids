import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TopButton from './components/shared/TopButton';

const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
  <>
    <App />
    <TopButton />
  </>
);