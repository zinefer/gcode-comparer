import App from './App';
import ComparisonResultView from './ComparisonResultView';

import './styles/main.scss';

let app;
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('#app');
  if (appContainer) {
    app = new App(appContainer);
  } else {
    throw new Error('App container not found');
  }
});
