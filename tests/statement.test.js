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
