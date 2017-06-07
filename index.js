const Scanner = require('./scanner');

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
