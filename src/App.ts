import Column from "./Column";
import ComparisonResultView from "./ComparisonResultView";
import GettingStartedView from "./GettingStartedView";

export default class App {
  // Layout
  private appContainer: Element;
  private leftColumn;
  private rightColumn;

  // State
  private leftFile: File | false = false;
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
      const input = e.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.leftFile = input.files[0];
      }
      this.render();
    });

    this.render();
  }

  render() {
    const content: Element[] = [];

    this.appContainer.innerHTML = '';

    if (this.leftFile !== false) {
      content.push(this.leftColumn.render());
    }

    if (this.rightFile) {
      content.push(this.rightColumn.render());
    }

    if (!this.leftFile && !this.rightFile) {
      content.push(this.gettingStarted.render());
    }

    content.forEach((element) => {
      this.appContainer.appendChild(element);
    });
  }
}
