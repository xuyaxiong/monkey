import {
  ASSIGN,
  ASTERISK,
  BANG,
  COMMA,
  EOF,
  EQ,
  GT,
  ILLEGAL,
  INT,
  LBRACE,
  lookupIdent,
  LPAREN,
  LT,
  MINUS,
  NOT_EQ,
  PLUS,
  RBRACE,
  RPAREN,
  SEMICOLON,
  SLASH,
  Token,
} from "./token";
import { isDigit, isLetter, isWhitespace } from "./utils";

export class Lexer {
  private input: string;
  private position: number = 0;
  private readPosition: number = 0;
  private ch: string = "";

  constructor(input: string) {
    this.input = input;
    this.readChar();
  }

  nextToken() {
    let token: Token;
    this.skipWhitespace();
    switch (this.ch) {
      case ",":
        token = { type: COMMA, literal: this.ch };
        break;
      case ";":
        token = { type: SEMICOLON, literal: this.ch };
        break;
      case "(":
        token = { type: LPAREN, literal: this.ch };
        break;
      case ")":
        token = { type: RPAREN, literal: this.ch };
        break;
      case "{":
        token = { type: LBRACE, literal: this.ch };
        break;
      case "}":
        token = { type: RBRACE, literal: this.ch };
        break;
      case "=":
        if (this.peekChar() === "=") {
          this.readChar();
          token = { type: EQ, literal: "==" };
        } else {
          token = { type: ASSIGN, literal: this.ch };
        }
        break;
      case "+":
        token = { type: PLUS, literal: this.ch };
        break;
      case "-":
        token = { type: MINUS, literal: this.ch };
        break;
      case "*":
        token = { type: ASTERISK, literal: this.ch };
        break;
      case "/":
        token = { type: SLASH, literal: this.ch };
        break;
      case ">":
        token = { type: GT, literal: this.ch };
        break;
      case "<":
        token = { type: LT, literal: this.ch };
        break;
      case "!":
        if (this.peekChar() === "=") {
          this.readChar();
          token = { type: NOT_EQ, literal: "!=" };
        } else {
          token = { type: BANG, literal: this.ch };
        }
        break;
      case "\0":
        token = { type: EOF, literal: this.ch };
        break;
      default:
        if (isLetter(this.ch)) {
          const literal = this.readIdentifier();
          const type = lookupIdent(literal);
          return { type, literal };
        } else if (isDigit(this.ch)) {
          const literal = this.readNumber();
          const type = INT;
          return { type, literal };
        } else {
          token = { type: ILLEGAL, literal: this.ch };
        }
        break;
    }
    this.readChar();
    return token;
  }

  skipWhitespace() {
    while (isWhitespace(this.ch)) {
      this.readChar();
    }
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = "\0";
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  peekChar() {
    if (this.readPosition >= this.input.length) {
      return EOF;
    } else {
      return this.input[this.readPosition];
    }
  }

  readIdentifier() {
    const position = this.position;
    while (isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }

  readNumber() {
    const position = this.position;
    while (isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }
}
