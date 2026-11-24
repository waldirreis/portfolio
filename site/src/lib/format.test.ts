import { it, expect } from "vitest";
import { fmtInt, fmtPct } from "./format";
it("fmtInt", () => expect(fmtInt(11522)).toBe("11.522"));
it("fmtPct", () => {
  expect(fmtPct(null)).toBe("—");
  expect(fmtPct(92.67)).toBe("92,7%");
});
