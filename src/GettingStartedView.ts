type onFileChangeHandler = (event: Event) => void;

export default class GettingStartedView {
  private element: HTMLDivElement;
  private onFileChange: onFileChangeHandler;

  constructor(onFileChange: onFileChangeHandler) {
    this.element = document.createElement('div');
    this.element.className = 'modal';
    this.onFileChange = onFileChange;
  }

  render() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = this.onFileChange;

    this.element.innerHTML = `
      <h2 class="header">Getting Started</h2>
      <hr/>
      <p>👋 Hello!</p>

      <p>Welcome to the Gcode Comparator.</p>

      <p>
          Gcode is a flexible format and as such, it can be difficult to compare two files.
          Comparing any one metric, such as line count, may not give a complete picture.

      </p>

      <p>
          This tool will help you compare two gcode files and highlight the differences
          between them as well as other useful information like the number of lines, comments,
          tool changes and more.
      </p>

      <p>
          Click the "Choose Files" button to get started.
      </p>`;

    this.element.appendChild(input);
    return this.element;
  }
}
