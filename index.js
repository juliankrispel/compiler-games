const Source = require('./source');

// Lexer
//
// takes in instance of Source and a list of mappers
class Scanner {
  constructor(mappers=[]) {
    this._mappers = mappers;
  }

  compile(source) {
    this._source = new Source(source);
    let ast = [];
    while(!this._source.isDone()) {
      var lastCursor = this._source.cursor;
      let mapped = false;
      for (var i = 0; i < this._mappers.length; i++) {
        mapped = this._mappers[i](this._source);
        if (mapped !== false) {
          break;
        }
      }

      if (mapped === false) {
        const [line, column] = this._source.getPosition();
        throw new Error(`Unexpected token at line: ${line}, column: ${column}`);
      }

      this._source.advance(mapped.value.length);

      if (this._source.cursor <= lastCursor) {
        throw new Error("The cursor hasn't advanced resulting in an infinite recursion.");
      }

      ast = ast.concat([mapped]);
    }

    return ast;
  }
}

class TokenScanner {
  constructor(mappers) {
    this._mappers = mappers;
  }

  compile(tokenList) {
    let cursor = 0;

    while (cursor < tokenList.length) {

    }
  }
}

const { symbols, statements } = require('./mappers');
const scanner = new Scanner(symbols);


const tokens = scanner.compile(
`(/ 5
  (+ 1 2))
`);

console.log(tokens);

const ast = [];

//tokens.forEach(token => {
//  let index = 0;
//  while(index > token)
//  for (var i = 0; i < statements.length; i++) {
//    const mapped = statements[i](token);
//  }
//});
