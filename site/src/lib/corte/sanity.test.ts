import { it, expect } from "vitest";
import { generateCorte } from "./generate";
import { byDay, byMonth } from "./metrics";
it("share of days below meta is realistic (15-50%)", () => {
  const rows = generateCorte(2026, 2026, "2026-11-12");
  const days = [1,2,3,4,5,6,7,8,9,10,11].flatMap((m) => byDay(rows, m));
  const below = days.filter((d) => !d.bateuMeta).length / days.length;
  console.log("below", below.toFixed(2), "months below", byMonth(rows).filter(m=>!m.bateuMeta).length);
  expect(below).toBeGreaterThan(0.15);
  expect(below).toBeLessThan(0.5);
});
