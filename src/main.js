const { statement, htmlStatement } = require('./statement.js');

const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  aslike: { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" }
};

const invoice = {
  customer: "BigCo",
  performances: [
    { playID: "hamlet", audience: 55 },
    { playID: "aslike", audience: 35 },
    { playID: "othello", audience: 40 }
  ]
};

console.log(statement(invoice, plays));
console.log(htmlStatement(invoice, plays));