class Token {
  constructor(type, value, start, end) {
    this.type = type;
    this.value = value;
    this.start = start;
    this.end = end;
  }

  getPosition() {
    return [
      this.start,
      this.end,
    ];
  }

  toString() {
    return '' + this.type;
  }
}

class TokenList {

}

module.exports = Token;
