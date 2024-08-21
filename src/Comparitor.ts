import { md5 } from 'hash-wasm';

import { diff, Edit, mergeOperations, splitContexts } from './lib/diff';

type ComparisonResultFileStats = {
  lines: number;
  commentLines: number;
  hash: string;
  toolChangeSequence: string[];
  feedrates: string[];
};

type ComparisonResultFile = {
  sequence: Edit[];
  stats: ComparisonResultFileStats;
};

export type ComparisonResult = {
  left: ComparisonResultFile
  right: ComparisonResultFile
};

/**
 * The Comparitor will compare two gcode files and return information about any differences.
 */
export default class Comparitor {
  private gcodeLeft: string;
  private gcodeRight: string;

  constructor(gcodeLeft: string, gcodeRight: string) {
    this.gcodeLeft = gcodeLeft;
    this.gcodeRight = gcodeRight;
  }

  /**
   * Compare the two gcode files and return the differences.
   * 
   * @returns The differences between the two gcode files.
   */

  async compare(): Promise<ComparisonResult> {

    const diffResult = diff(this.gcodeLeft, this.gcodeRight);
    const merged = mergeOperations(diffResult);
    const { leftContext, rightContext } = splitContexts(merged);

    return {
      left: {
        sequence: leftContext,
        stats: await this.makeComparisonStats(this.gcodeLeft)
      },
      right: {
        sequence: rightContext,
        stats: await this.makeComparisonStats(this.gcodeRight)
      }
    };
  }

  async makeComparisonStats(code: string) {
    const split = code.split('\n');
    
    const feedrates = [];
    const toolChanges = [];
    let comments = 0;

    // Loop over each line, calculating stats as we go
    for (let i = 0; i < split.length; i++) {
      if (this.isToolChange(split[i])) {
        // Get the tool number from the line
        const matchResult = split[i].match(/T(\d+)/);
        const tool = matchResult ? matchResult[1] : '??';
        toolChanges.push(tool);
      }

      if (this.isFeedrate(split[i])) {
        // Get the feedrate from the line
        const matchResult = split[i].match(/F(\d+)/);
        const feedrate = matchResult ? matchResult[1] : '??';
        feedrates.push(feedrate);
      }

      if (this.isLineComment(split[i])) {
        comments++;
      }
    }
    
    return {
      lines: split.length,
      commentLines: comments,
      hash: await md5(code),
      toolChangeSequence: toolChanges,
      feedrates
    }
  }

  isLineComment(line: string) {
    return line.startsWith(';');
  }

  isLineCommand(line: string) {
    return !line.startsWith(';');
  }

  isToolChange(line: string) {
    return line.includes('T');
  }

  isFeedrate(line: string) {
    return line.includes('F');
  }
}
