function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances;
  return renderPlainText(statementData, invoice, plays);
}

function renderPlainText(data, invoice, plays) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // 注文の内訳を出力
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount() / 100)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  // 関数の抽出 & 関数宣言の変更
  // 元のformat()だと何をしているか分からなかったためusd()に変更
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
                        { style: "currency", currency: "USD",
                          minimumFractionDigits: 2}).format(aNumber);
  }

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

  // 関数の抽出
  // 余計なコメントアウトは関数の抽出に伴い削除
  function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" == playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);
    return volumeCredits;
  }

  // 関数の抽出
  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf)
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
}

module.exports = { statement };
