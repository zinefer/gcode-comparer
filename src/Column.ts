type ColumnContentRenderer = () => string;

export default class Column {
    private contentRenderer: ColumnContentRenderer;

    constructor(content: ColumnContentRenderer) {
        this.contentRenderer = content;
    }

    render() {
        return `<div class="column">${this.contentRenderer()}</div>`
    }
}
