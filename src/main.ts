import ComparisonResultView from './ComparisonResultView';

import './styles/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  const leftColumn = document.querySelector('#left-column');
  const rightColumn = document.querySelector('#right-column');

  const leftComparisonResultView = new ComparisonResultView('Ours');
  const rightComparisonResultView = new ComparisonResultView('Theirs');

  if (leftColumn) {
    leftColumn.innerHTML = leftComparisonResultView.render();
  }

  if (rightColumn) {
    rightColumn.innerHTML = rightComparisonResultView.render();
  }
});
