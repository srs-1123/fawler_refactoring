function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

    // 関数の抽出
  function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  }

  // 関数の抽出
  // 余計なコメントアウトは関数の抽出に伴い削除
  function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" == aPerformance.play.type) volumeCredits += Math.floor(aPerformance.audience / 5);
    return volumeCredits;
  }

    // 関数の抽出
  function totalVolumeCredits(data) {
    return data.performances
      .reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(data) {
    return data.performances
      .reduce((total, p) => total + p.amount, 0);
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    let result = 0; // 関数名で何を返すのかは伝わるので、結果はresultという変数名にする
    // 変数のインライン化(playFor()を直接使う)
    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) 
          result += 1000 * (this.performance.audience - 30);
        break;
      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) 
          result += 500 * this.performance.audience + 10000;
        else result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${this.play.type}`);
    }
    return result;
  }
}

module.exports = { createStatementData };
