function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) thisAmount += 1000 * (perf.audience - 30);
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) thisAmount += 500 * perf.audience + 10000;
        else thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    totalAmount += thisAmount;
    result += ` ${play.name}: ${thisAmount / 100} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${totalAmount / 100}\n`;
  return result;
}

module.exports = { statement };
