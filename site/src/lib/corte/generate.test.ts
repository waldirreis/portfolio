import { describe, it, expect } from "vitest";
import { generateCorte } from "./generate";

const rows = generateCorte(2026, 2026, "2026-11-12");

describe("generateCorte", () => {
  it("deterministic", () => {
    expect(generateCorte(2026, 2026, "2026-11-12")).toEqual(rows);
  });
  it("invariants", () => {
    for (const r of rows) {
      for (const k of ["gerado", "atribuido", "executado", "improdutivo", "pago", "meta", "potencial"] as const) {
        expect(Number.isInteger(r[k]) && r[k] >= 0).toBe(true);
      }
      expect(r.atribuido).toBeLessThanOrEqual(r.gerado);
      expect(r.executado).toBeLessThanOrEqual(r.atribuido);
      expect(r.pago).toBeLessThanOrEqual(r.executado);
      expect(r.improdutivo).toBeLessThanOrEqual(r.executado);
    }
  });
  it("no-real-names", () => {
    expect(JSON.stringify(rows)).not.toMatch(/equatorial|eqtl/i);
  });
  it("coverage", () => {
    expect(new Set(rows.map((r) => r.distribuidora)).size).toBe(7);
    expect(new Set(rows.map((r) => r.modalidade)).size).toBe(2);
    expect(new Set(rows.map((r) => r.prioridade)).size).toBe(3);
    const datas = rows.map((r) => r.data).sort();
    expect(datas[0] >= "2026-01-01").toBe(true);
    expect(datas[datas.length - 1]).toBe("2026-11-12");
  });
});
