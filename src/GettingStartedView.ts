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
      </p>`;

    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = this.onFileChange;
    input.style.display = 'none';

    const label = document.createElement('label');
    label.className = 'button';
    label.style.marginLeft = 'auto';
    label.style.marginRight = 'auto';
    label.style.marginTop = '0.5rem';
    label.innerText = 'Select Gcode Files';

    label.appendChild(input);
    this.element.appendChild(label);
    return this.element;
  }
}
