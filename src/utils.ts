export function isLetter(ch: string): boolean {
  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_";
}

export function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

export function isWhitespace(ch: string): boolean {
  return ch === " " || ch == "\t" || ch == "\n" || ch == "\r";
}
