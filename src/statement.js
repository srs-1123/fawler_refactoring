function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD",
      minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    // ボリューム特典の時のポイントを加算
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 喜劇の時は10人につき、さらにポイントを加算
    if ("comedy" == playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
    // 注文の内訳を出力
    result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  // 問い合わせによる一時変数の置き換え
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  // 関数の抽出
  function amountFor(aPerformance) {
    let result = 0; // 関数名で何を返すのかは伝わるので、結果はresultという変数名にする
    // 変数のインライン化(playFor()を直接使う)
    switch (playFor(aPerformance).type) {
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
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  }
}

module.exports = { statement };
