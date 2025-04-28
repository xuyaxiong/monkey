export interface Token {
  type: string;
  literal: string;
}

export const ILLEGAL = "ILLEGAL";
export const EOF = "EOF";

export const IDENT = "IDENT";
export const INT = "INT";

export const ASSIGN = "=";
export const PLUS = "+";
export const MINUS = "-";
export const ASTERISK = "*";
export const SLASH = "/";
export const LT = "<";
export const GT = ">";
export const BANG = "!";
export const EQ = "==";
export const NOT_EQ = "!=";

export const COMMA = ",";
export const SEMICOLON = ";";
export const LPAREN = "(";
export const RPAREN = ")";
export const LBRACE = "{";
export const RBRACE = "}";

export const FUNCTION = "FUNCTION";
export const LET = "LET";
export const TRUE = "TRUE";
export const FALSE = "FALSE";
export const IF = "IF";
export const ELSE = "ELSE";
export const RETURN = "RETURN";

const keywords = new Map<string, string>([
  ["fn", FUNCTION],
  ["let", LET],
  ["true", TRUE],
  ["false", FALSE],
  ["if", IF],
  ["else", ELSE],
  ["return", RETURN],
]);

export function lookupIdent(ident: string): string {
  return keywords.get(ident) || IDENT;
}
