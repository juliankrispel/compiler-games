const Source = require('../source');

//
// Scanner. Takes in a list of mappers
// - can compile a string.
// - Throws errors if none of the mappers match a token
//
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

      this._source.cursor += mapped.value.length;

      if (this._source.cursor <= lastCursor) {
        throw new Error("The cursor hasn't advanced resulting in an infinite recursion.");
      }

      ast = ast.concat([mapped]);
    }

    return ast;
  }
}

module.exports = Scanner;
