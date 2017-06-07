const isRegExp = require('lodash/isRegExp');
const isString = require('lodash/isString');
const isNumber = require('lodash/isNumber');

// Source
//
// Contains source code. Source code can be either a string
// or a token list. The Source class holds:
// - the source [string|Token[]]
// - the cursor position [number]
// The cursor position is an index that tells you where you
// are in the source code.
// 
// Source class methods
// - toString():string
// - 
//
// as well as a little bit of state about
// the cursor position of the scanner
class Source {
  constructor(source) {
    this._source = source;
    this._cursor = 0;
  }

  toString() {
    return '' + this._source;
  }

  get cursor() {
    return this._cursor;
  }

  set cursor(num) {
    if (!isNumber(num)) {
      throw new Error('you can only set cursor to a number, argument is not a number ->', num);
    }

    if (num < this._cursor) {
      throw new Error("You're not allowed to move the cursor back, it needs to advance forward");
    }

    this._cursor = num;
  }

  findPrevLineBreak() {
    let currCursor = this.cursor;

    while(currCursor > 0) {
      if (this.toString()[currCursor] === '\n') {
        break;
        return currCursor;
      }
      currCursor--;
    }

    return 0;
  }

  // returns the current line and column coordinates
  getPosition(cursor = this.cursor) {
    const prevLine = this.findPrevLineBreak();
    const lineMatches = this.toString().substr(0, cursor).match(/\n/gi);
    const lineNumber = lineMatches ? lineMatches.length + 1: 1;
    const charNumber = cursor - prevLine;
    return [ lineNumber, charNumber ];
  }

  findNextLineBreak() {
    return this.toString().substr(this.cursor).indexOf('\n') || this.toString().length;
  }

  getCurrentLine() {
    return this.toString().substr(this.findPrevLineBreak(), this.findNextLineBreak());
  }

  get(chars=1) {
    return this.toString().substr.apply(this, [this.cursor, this.cursor + chars].sort());
  }

  isDone() {
    return this.toString().length <= this.cursor;
  }

  _matchString(string) {
    if (this.toString().substr(this._cursor, string.length) === string) {
      return string;
    }
    return '';
  }

  _matchRegex(token) {
    // adds a ^ at the beginning and removes global flag
    let source = token.source;
    let flags = token.flags.replace('g', '');
    if (source.indexOf('^') !== 0) {
      source = `^${source}`;
    }
    const reg = new RegExp(source, flags);
    const match = reg.exec(this.toString().substr(this.cursor));

    if (match === null) {
      return '';
    } else {
      return match[0];
    }
  }

  match(token) {
    if (isRegExp(token)) {
      return this._matchRegex(token);
    } else if(isString(token)) {
      return this._matchString(token);
    }
    throw new Error('token must be of type string or regex, ', token);
  }
}

module.exports = Source;
