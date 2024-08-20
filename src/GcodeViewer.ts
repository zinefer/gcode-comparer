import './styles/gcode-syntax.scss';

interface HighlightPattern {
  name: string;
  match?: string;
  flags?: string;
  begin?: string;
  end?: string;
}

interface Match {
  start: number;
  end: number;
  className: string;
}

const highlightingPatterns: { [key: string]: HighlightPattern[] | HighlightPattern } = {
  keywords: [
      { name: "gcode-constant", match: "[nN][ \\t]*[0-9\\.]+", flags: "g" },
      { name: "gcode-keyword", match: "[gG][ \\t]*[0-9][0-9\\.]*", flags: "g" },
      { name: "gcode-zcode", match: "[rRzZ][ \\t]*[\\-\\+]?[0-9\\.]+", flags: "gi" },
      { name: "gcode-xcode", match: "[XAUI][ \\t]*[\\-\\+]?[0-9\\.]+", flags: "gi" },
      { name: "gcode-ycode", match: "[YBVJ][ \\t]*[\\-\\+]?[0-9\\.]+", flags: "gi" },
      { name: "gcode-mcode-supportfunction", match: "[mM][ \\t]*[0-9][0-9\\.]*", flags: "g" },
      { name: "gcode-supporttype", match: "[dDfFhHsStT][ \\t]*[0-9][0-9\\.]*", flags: "g" },
      { name: "gcode-variable-parameter", match: "[pPqQeE][ \\t]*[0-9][0-9\\.]*", flags: "g" },
      { name: "gcode-mcode", match: "[cCwWkKlL][ \\t]*[\\-\\+]?[0-9\\.]+", flags: "g" }
  ],
  strings: {
      name: "gcode-comment",
      match: "(\\().*?(\\))|(;).*?(\n)",
  }
};

export default class GcodeViewer {
    private code: string;

    constructor(code: string) {
        this.code = code;
    }

    private applyHighlighting(code: string, patterns: { [key: string]: HighlightPattern[] | HighlightPattern }): string {
        let matches: Match[] = [];

        // 1. Apply non-comment patterns first
        for (const category of Object.values(patterns)) {
            if (Array.isArray(category)) {
                for (const pattern of category) {
                    if (pattern.match) {
                        const regex = new RegExp(pattern.match, pattern.flags || '');
                        let match: RegExpExecArray | null;
                        while ((match = regex.exec(code)) !== null) {
                            // Avoid infinite loop on zero-length matches
                            if (match.index === regex.lastIndex) {
                                regex.lastIndex++;
                            }
                            matches.push({
                                start: match.index,
                                end: match.index + match[0].length,
                                className: pattern.name
                            });
                        }
                    }
                }
            }
        }

        // 2. Apply comment patterns to the unmatched parts of the code
        if (patterns.strings) {
            const commentPattern = patterns.strings as HighlightPattern;
            if (commentPattern.match) {
                const regex = new RegExp(commentPattern.match, 'gs');
                let match: RegExpExecArray | null;
                while ((match = regex.exec(code)) !== null) {
                    if (match.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    matches.push({
                        start: match.index,
                        end: match.index + match[0].length,
                        className: commentPattern.name
                    });
                }
            }
        }

        // 3. Sort the matches by start index
        matches.sort((a, b) => a.start - b.start);

        // 4. Merge overlapping matches
        matches = matches.reduce((acc: Match[], current: Match) => {
            if (acc.length === 0) {
                acc.push(current);
            } else {
                const last = acc[acc.length - 1];
                if (current.start < last.end) {
                    // Extend the last match if they overlap
                    last.end = Math.max(last.end, current.end);
                } else {
                    acc.push(current);
                }
            }
            return acc;
        }, []);

        // 5. Apply the matches to the code by wrapping them in <span> tags
        let highlightedCode = '';
        let lastIndex = 0;

        for (const match of matches) {
            // Append text before the match
            highlightedCode += code.slice(lastIndex, match.start);
            // Wrap the match in a span with the class name
            highlightedCode += `<span class="${match.className}">${code.slice(match.start, match.end)}</span>`;
            lastIndex = match.end;
        }
        // Append the remaining text after the last match
        highlightedCode += code.slice(lastIndex);

        return highlightedCode;
    }

    public render(): string {
        const highlightedCode = this.applyHighlighting(this.code, highlightingPatterns);
        return `<pre><code>${highlightedCode}</code></pre>`;
    }
}

