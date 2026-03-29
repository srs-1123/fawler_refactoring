const { statement } = require("../src/statement");

const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
};

const invoice = {
  customer: "BigCo",
  performances: [
    { playID: "hamlet", audience: 55 },
    { playID: "as-like", audience: 35 },
  ],
};

test("statement を生成できる", () => {
  const result = statement(invoice, plays);
  expect(result).toContain("BigCo");
  expect(result).toContain("Hamlet");
});

test("tragedyの料金計算が正しい", () => {
  const result = statement(invoice, plays);
  // Hamlet: 40000 + (55-30)*1000 = 65000 → 650
  expect(result).toContain("650");
});

test("comedyの料金計算が正しい（audience > 20）", () => {
  const invoice = {
    customer: "TestCo",
    performances: [{ playID: "as-like", audience: 35 }],
  };
  const result = statement(invoice, plays);
  // 30000 + 500*35 + 10000 = 57500 → $575.00
  expect(result).toContain("575.00");
});

test("comedyの料金計算が正しい（audience <= 20）", () => {
  const invoice = {
    customer: "TestCo",
    performances: [{ playID: "as-like", audience: 15 }],
  };
  const result = statement(invoice, plays);
  // 30000 + 300*15 = 34500 → $345.00
  expect(result).toContain("345.00");
});

test("ボリュームクレジットが正しく計算される", () => {
  // Hamlet(55席): 55-30=25pt
  // As You Like It(35席): 35-30=5pt + floor(35/5)=7pt → 12pt
  // 合計 37pt
  const result = statement(invoice, plays);
  expect(result).toContain("37");
});

test("未知のタイプでエラーをスローする", () => {
  const badPlays = { unknown: { name: "Mystery", type: "musical" } };
  const badInvoice = {
    customer: "TestCo",
    performances: [{ playID: "unknown", audience: 10 }],
  };
  expect(() => statement(badInvoice, badPlays)).toThrow("unknown type: musical");
});

test("tragedyでaudienceが30以下の場合は基本料金のみ", () => {
  const invoice = {
    customer: "TestCo",
    performances: [{ playID: "hamlet", audience: 30 }],
  };
  const result = statement(invoice, plays);
  // 40000 → $400.00
  expect(result).toContain("400.00");
});
