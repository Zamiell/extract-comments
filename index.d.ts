interface BlockComment {
  value: string;
  codeStart?: number;
}

/** @see https://github.com/jonschlinkert/extract-comments */
declare function extractComments(text: string): BlockComment[];

export = extractComments;
