const readline = require("readline");
import { Lexer } from "./lexer";
import { EOF } from "./token";

export function start() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">>> ",
  });

  rl.prompt();
  rl.on("line", (line: string) => {
    const lexer = new Lexer(line);
    for (
      let token = lexer.nextToken();
      token.type != EOF;
      token = lexer.nextToken()
    ) {
      console.log(token);
    }

    rl.prompt();
  });
}
