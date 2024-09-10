interface BlockComment {
  value: string;
  codeStart?: number;
}

export default function extractComments(text: string): BlockComment[];
