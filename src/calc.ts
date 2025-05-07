import readline from "readline";

type TokenType =
  | "NUMBER"
  | "PLUS"
  | "MINUS"
  | "STAR"
  | "SLASH"
  | "LPAREN"
  | "RPAREN"
  | "EOF";

interface Token {
  type: TokenType;
  literal: string;
}

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const regex = /\s*([0-9.]+|[-+*/()])\s*/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    const value = match[1];
    let type: TokenType;
    switch (value) {
      case "+":
        type = "PLUS";
        break;
      case "-":
        type = "MINUS";
        break;
      case "*":
        type = "STAR";
        break;
      case "/":
        type = "SLASH";
        break;
      case "(":
        type = "LPAREN";
        break;
      case ")":
        type = "RPAREN";
        break;
      default:
        if (!isNaN(Number(value))) {
          type = "NUMBER";
        } else {
          throw new Error(`Unknown token: ${value}`);
        }
    }
    tokens.push({ type, literal: value });
  }
  tokens.push({ type: "EOF", literal: "" });
  return tokens;
}

class Parser {
  private tokens: Token[];
  private pos: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private current(): Token {
    return this.tokens[this.pos];
  }

  private consume(): Token {
    return this.tokens[this.pos++];
  }

  private expect(type: TokenType) {
    const token = this.consume();
    if (token.type !== type) {
      throw new Error(`Expected token ${type}, got ${token.type}`);
    }
  }

  private getPrecedence(type: TokenType): number {
    switch (type) {
      case "PLUS":
      case "MINUS":
        return 10;
      case "STAR":
      case "SLASH":
        return 20;
      default:
        return 0;
    }
  }

  private prefixParse(): number {
    const token = this.consume();
    switch (token.type) {
      case "NUMBER":
        return parseFloat(token.literal);
      case "LPAREN":
        const expr = this.parseExpression(0);
        this.expect("RPAREN");
        return expr;
      case "MINUS": // 支持负数
        return -this.parseExpression(100);
      default:
        throw new Error(`Unexpected token in prefix position: ${token.type}`);
    }
  }

  private infixParse(left: number, token: Token): number {
    switch (token.type) {
      case "PLUS":
        return left + this.parseExpression(this.getPrecedence(token.type));
      case "MINUS":
        return left - this.parseExpression(this.getPrecedence(token.type));
      case "STAR":
        return left * this.parseExpression(this.getPrecedence(token.type));
      case "SLASH":
        return left / this.parseExpression(this.getPrecedence(token.type));
      default:
        throw new Error(`Unexpected token in infix position: ${token.type}`);
    }
  }

  public parseExpression(precedence: number = 0): number {
    let left = this.prefixParse();

    while (precedence < this.getPrecedence(this.current().type)) {
      const token = this.consume();
      left = this.infixParse(left, token);
    }

    return left;
  }
}

export function evaluate(input: string): number {
  const tokens = tokenize(input);
  const parser = new Parser(tokens);
  return parser.parseExpression();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  rl.question("请输入表达式> ", (input) => {
    if (input.trim() === "exit") {
      rl.close();
      return;
    }
    try {
      const result = evaluate(input);
      console.log("结果：", result);
    } catch (err: any) {
      console.error("错误：", err.message);
    }
    prompt();
  });
}

prompt();
