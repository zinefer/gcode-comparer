import Column from "./Column";
import ComparisonResultView from "./ComparisonResultView";
import GettingStartedView from "./GettingStartedView";

export default class App {
  // Layout
  private appContainer: Element;
  private leftColumn;
  private rightColumn;

  // State
  private leftFile = false;
  private rightFile = false;

  // Views
  private gettingStarted;

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
    //let content = '';
    const content: Element[] = [];

    this.appContainer.innerHTML = '';

    // if (this.leftFile) {
      content.push(this.leftColumn.render());
    // }

    // if (this.rightFile) {
      content.push(this.rightColumn.render());
    // }

    // if (!this.leftFile && !this.rightFile) {
      // content.push(this.gettingStarted.render());
    // }

    content.forEach((element) => {
      this.appContainer.appendChild(element);
    });
  }
}

function renderColumn(content: string) {
  return `<div class="column">${content}}</div>`;
}