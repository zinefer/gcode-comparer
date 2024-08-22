import Column from "./Column";
import ComparisonResultView from "./ComparisonResultView";
import GettingStartedView from "./GettingStartedView";

export default class App {

  private appContainer: Element;

  private leftFile = false;
  private rightFile = false;

  // <div class="column" id="left-column"></div>
  // <div class="column" id="right-column"></div>
  private leftColumn;
  private rightColumn;

  private gettingStarted = {
    render: () => ''
  }

  constructor(appContainer: Element) {
    this.appContainer = appContainer;
    this.leftColumn = new Column(() => {
      return new ComparisonResultView('Ours').render();
    });
    this.rightColumn = new Column(() => {
      return new ComparisonResultView('Theirs').render();
    });
    
    this.gettingStarted = new GettingStartedView((e) => {
      alert('File changed');
    });

    this.render();
  }

  render() {
    let content = '';

    // if (this.leftFile) {
      content += this.leftColumn.render();
    // }

    // if (this.rightFile) {
      content += this.rightColumn.render();
    // }

    if (!this.leftFile && !this.rightFile) {
      content += this.gettingStarted.render();
    }

    this.appContainer.innerHTML = content;
  }
}

function renderColumn(content: string) {
  return `<div class="column">${content}}</div>`;
}