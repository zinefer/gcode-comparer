type ColumnContentRenderer = () => DocumentFragment;

export default class Column {
    private element: HTMLDivElement;
    private contentRenderer: ColumnContentRenderer;

    constructor(content: ColumnContentRenderer) {
        this.element = document.createElement('div');
        this.element.className = 'column';
        this.contentRenderer = content;
    }

    render() {
        this.element.appendChild(this.contentRenderer());
        return this.element;
    }
}
