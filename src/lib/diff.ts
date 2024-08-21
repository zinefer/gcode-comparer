export type Edit = { type: 'add' | 'remove' | 'unchanged', value: string };

/**
 * Calculates the difference between two strings using the Myers diff algorithm.
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @returns An array of Edit objects representing the differences between the two strings.
 */
/**
 * Calculates the difference between two strings using the Myers diff algorithm.
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @returns An array of Edit objects representing the differences between the two strings.
 */
export function diff(a: string, b: string): Edit[] {
  // Calculate the lengths of the input strings
  const n = a.length;
  const m = b.length;

  // Calculate the maximum possible length of the edit script
  const max = n + m;

  // Initialize the v array to store the endpoints of the furthest reaching D-paths
  const v: { [key: number]: number } = { 1: 0 };

  // Initialize the trace object to store the endpoints of each D-path at each diagonal
  const trace: { [key: number]: { [key: number]: number } } = {};

  // Calculate the edit script using the Myers diff algorithm
  for (let d = 0; d <= max; d++) {
      // Store the current v array in the trace object
      trace[d] = { ...v };

      // Iterate over each diagonal of the edit graph
      for (let k = -d; k <= d; k += 2) {
          let x: number;

          // Calculate the x-coordinate of the current point on the diagonal
          if (k === -d || (k !== d && v[k - 1] < v[k + 1])) {
              x = v[k + 1];
          } else {
              x = v[k - 1] + 1;
          }

          // Calculate the y-coordinate of the current point on the diagonal
          let y = x - k;

          // Extend the diagonal as far as possible by matching characters
          while (x < n && y < m && a[x] === b[y]) {
              x++;
              y++;
          }

          // Store the endpoint of the current D-path in the v array
          v[k] = x;

          // If we have reached the end of both strings, return the calculated differences
          if (x >= n && y >= m) {
              return buildDiff(trace, a, b, n, m);
          }
      }
  }

  // If we have not reached the end of both strings, return an empty array
  return [];
}

/**
 * Builds the difference between two strings using the trace matrix.
 * 
 * @param trace - The trace matrix containing the edit distances.
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @param n - The length of the first string.
 * @param m - The length of the second string.
 * @returns An array of Edit objects representing the differences between the two strings.
 */
/**
 * Builds the difference between two strings using the trace matrix.
 * 
 * @param trace - The trace matrix containing the edit distances.
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @param n - The length of the first string.
 * @param m - The length of the second string.
 * @returns An array of Edit objects representing the differences between the two strings.
 */
export function buildDiff(trace: { [key: number]: { [key: number]: number } }, a: string, b: string, n: number, m: number): Edit[] {
  const edits: Edit[] = [];
  let x = n;
  let y = m;

  // Traverse the trace matrix in reverse order
  for (let d = Object.keys(trace).length - 1; d >= 0; d--) {
    const v = trace[d];
    const k = x - y;
    let prevK: number;

    // Determine the previous k value based on the current k value and v array
    if (k === -d || (k !== d && v[k - 1] < v[k + 1])) {
      prevK = k + 1;
    } else {
      prevK = k - 1;
    }

    const prevX = v[prevK];
    const prevY = prevX - prevK;

    // Add unchanged edits until reaching the previous diagonal
    while (x > prevX && y > prevY) {
      edits.push({ type: 'unchanged', value: a[--x] });
      y--;
    }

    // Add remove or add edits based on the current diagonal
    if (d > 0) {
      if (x > prevX) {
        edits.push({ type: 'remove', value: a[--x] });
      } else {
        edits.push({ type: 'add', value: b[--y] });
      }
    }
  }

  // Reverse the edits array to maintain the correct order
  return edits.reverse();
}


/**
 * Merges an array of Edit operations by combining consecutive operations of the same type.
 * 
 * @param operations - The array of Edit operations to be merged.
 * @returns The merged array of Edit operations.
 */
export function mergeOperations(operations: Edit[]): Edit[] {
    if (operations.length === 0) return [];

    const merged: Edit[] = [];
    let current = operations[0];

    for (let i = 1; i < operations.length; i++) {
        const next = operations[i];
        if (current.type === next.type) {
            current.value += next.value;
        } else {
            merged.push(current);
            current = next;
        }
    }
    merged.push(current);

    return merged;
}


/**
 * Splits edits into left and right contexts.
 * 
 * @param merged - The edits to split.
 * @returns An object containing the left and right contexts.
 */
export function splitContexts(merged: Edit[]): { leftContext: Edit[], rightContext: Edit[] } {
    const leftContext: Edit[] = [];
    const rightContext: Edit[] = [];

    for (const operation of merged) {
        if (operation.type === 'unchanged' || operation.type === 'remove') {
            leftContext.push(operation);
        }
        if (operation.type === 'unchanged' || operation.type === 'add') {
            rightContext.push(operation);
        }
    }

    return { leftContext, rightContext };
}

/**
 * Prints the contexts of left and right edits to the console for debugging.
 * 
 * @param leftContext - The array of left edits.
 * @param rightContext - The array of right edits.
 */
export function printContexts(leftContext: Edit[], rightContext: Edit[]): void {
    let leftString = '';
    let rightString = '';

    for (const left of leftContext) {
        if (left.type === 'remove') {
            leftString += `\x1b[41m${left.value}\x1b[0m`;
        } else {
            leftString += left.value;
        }
    }

    for (const right of rightContext) {
        if (right.type === 'add') {
            rightString += `\x1b[42m${right.value}\x1b[0m`;
        } else {
            rightString += right.value;
        }
    }

    console.log(`${leftString} = ${rightString}`);
}