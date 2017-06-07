const Token = require('./token');

const findToken = (type, token) => (source) => {
  const value = source.match(token);

  if (value !== '') {
    return new Token(
      type,
      value,
      source.getPosition(),
      source.getPosition(source._cursor + value.length)
    );
  }
  return false;
}

const symbols = [
  findToken('WHITESPACE', /\s+/),
  findToken('OPERATOR', '+'),
  findToken('OPERATOR', '-'),
  findToken('OPERATOR', '/'),
  findToken('OPEN_PAREN', '('),
  findToken('CLOSE_PAREN', ')'),
  findToken('NUMBER', /[0-9]+(?:\.[0-9]+)?/),
];

const statements = [
  findToken(
    'OPEN_PAREN',
    
  )
];
//const statements = [
//  findToken([
//    '(',
//    maybe('WHITESPACE'),
//    list(or('NUMBER', 'STRING')),
//    ')',
//  ])
//];

module.exports = {
  symbols,
  //  statements
};
