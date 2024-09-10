interface BlockComment {
  value: string;
  codeStart?: number;
}

/** @see https://github.com/jonschlinkert/extract-comments */
export default function extractComments(text: string): BlockComment[];
