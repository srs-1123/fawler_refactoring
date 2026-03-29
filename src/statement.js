function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD",
      minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);

    // ボリューム特典の時のポイントを加算
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 喜劇の時は10人につき、さらにポイントを加算
    if ("comedy" == play.type) volumeCredits += Math.floor(perf.audience / 5);
    // 注文の内訳を出力
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  // 関数の抽出
  function amountFor(aPerformance, play) {
    let result = 0; // 関数名で何を返すのかは伝わるので、結果はresultという変数名にする
    switch (play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) 
          result += 1000 * (aPerformance.audience - 30);
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) 
          result += 500 * aPerformance.audience + 10000;
        else result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    return result;
  }
}

module.exports = { statement };
