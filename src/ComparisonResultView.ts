import GcodeViewer from "./GcodeViewer";

// Example usage
const code = `G0 G49 G40  G17 G80 G50 G90 
M6 T0
G20 (Inch)
M03 S500
M08
G90
G00 G43 H0  Z0.1
G73 X-7 Y-4 Z-0.75 Q0.2 R0.1 F10
X-5.8889
X-4.7778
X-3.6667
X-2.5556
X-1.4444
X-0.3333
X0.7778
X1.8889
X3
Y-2
X1.8889
X0.7778
X-0.3333
X-1.4444
X-2.5556
X-3.6667
X-4.7778
X-5.8889
X-7
Y0
X-5.8889
X-4.7778
X-3.6667
X-2.5556
X-1.4444
X-0.3333
X0.7778
X1.8889
X3
G80
M5 M9
X-7  Y-4
M30

N1 (MAR-09-2017-8:23:59AM)
N2 G00 G17 G40 G90 G90 G94
N100 G53 Z0
N101 T20 (TA1955 : DRILL SPADE CTT 21/32 X 3.2 132POINT)
N102 M6
N103 T15
N104 (DRILL-MT-HOLES)
N105 S3735 M03
N106 M12
N107 G90 G54
N108 G00 X24. Y-9.
N109 G43 H20 Z4.1
Z4.
G98 G81 X24. Y-9. Z-0.291 R1.25 F45.
X12. Y-9.
X0. Y-9.
X-12. Y-9.
X-24. Y-9.
X-24 Y9.
X-12 Y9.
X0. Y9.
X12. Y9.
X24. Y9.
G80
M05`

let highlightedCode = new GcodeViewer(code).render();

export default class ComparisonResultView {
  //private element: HTMLDivElement;

  private title: string;

  constructor(title: string) {
      this.title = title;
  }
    
  render() {
    return `
      <h2>${this.title}</h2>
      <!-- <input type="file" id="file1" /> -->
      <div class="stats" id="stats1">a
        <div class="stat">
          <span>Lines</span>
          <span>231</span>
        </div>
        <div class="stat">
          <span>Words</span>
          <span>231</span>
        </div>
        <div class="stat">
          <span>Chars</span>
          <span>231</span>
        </div>
      </div>
      <!--<textarea class="diff" id="diff1" readonly></textarea>-->
      <!--<code class="diff language-js">
        ${highlightedCode}
      </code>-->
      ${highlightedCode}
    `;
  }
}
