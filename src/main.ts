import { Lexer } from "./lexer";
import { EOF } from "./token";

// const str = `let five = 5;
// let ten = 10;

// let add = fn(x, y) {
//     x + y;
// };
// let result = add(five, ten);
// `;

const str = `let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);
!-/*5;
5 < 10 > 5;

if (5 < 10) {
	return true;
} else {
	return false;
}

10 == 10;
10 != 9;
`;

const lexer = new Lexer(str);

for (
  let token = lexer.nextToken();
  token.type != EOF;
  token = lexer.nextToken()
) {
  console.log(token);
}
