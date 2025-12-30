import { formatCurrency } from "../../scripts/utils/money.js";

describe("Test suite : formatCurrency", () => {
  it("converts cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("work with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("rounds up to the nearest cents", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });
  it("works with negative numbers", () => {
    expect(formatCurrency(-500)).toEqual("-5.00");
  });
});
