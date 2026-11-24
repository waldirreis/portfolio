import { describe, it, expect } from "vitest";
import { applyFilters, pct, totals, byDay, byGroup, byMonth, byPrioridade } from "./metrics";
import type { CorteRow } from "./types";

const base = { modalidade: "CORTE", prioridade: "01 - Maior 5K", improdutivo: 1, potencial: 20 } as const;
const fx: CorteRow[] = [
  { ...base, data: "2026-01-05", distribuidora: "A", regional: "R1", gerado: 20, atribuido: 10, executado: 8, pago: 4, meta: 7 },
  { ...base, data: "2026-01-05", distribuidora: "B", regional: "R2", gerado: 20, atribuido: 10, executado: 5, pago: 2, meta: 7 },
  { ...base, data: "2026-02-03", distribuidora: "A", regional: "R1", gerado: 10, atribuido: 0, executado: 0, pago: 0, meta: 3, improdutivo: 0 },
  { ...base, data: "2026-02-03", distribuidora: "A", regional: "R3", gerado: 10, atribuido: 10, executado: 9, pago: 9, meta: 5, prioridade: "03 - Menor 1K", modalidade: "RECORTE" },
];

describe("metrics", () => {
  it("pct", () => {
    expect(pct(1, 0)).toBeNull();
    expect(pct(7, 10)).toBe(70);
  });
  it("applyFilters", () => {
    expect(applyFilters(fx, { distribuidora: "A" })).toHaveLength(3);
    expect(applyFilters(fx, { distribuidora: "A", mes: 2 })).toHaveLength(2);
    expect(applyFilters(fx, { modalidade: "RECORTE" })).toHaveLength(1);
    expect(applyFilters(fx, { prioridade: "03 - Menor 1K", regional: "R3" })).toHaveLength(1);
  });
  it("totals empty", () => {
    const t = totals([]);
    expect(t.executado).toBe(0);
    expect(t.pctExecAtrib).toBeNull();
    expect(t.pctPagoExec).toBeNull();
  });
  it("totals", () => {
    const t = totals(fx);
    expect(t.executado).toBe(22);
    expect(t.pctExecAtrib).toBeCloseTo(73.33, 1);
  });
  it("byDay marks meta", () => {
    const d = byDay(fx, 1);
    expect(d).toEqual([{ dia: 5, executado: 13, meta: 14, potencial: 40, bateuMeta: false }]);
    expect(byDay(fx, 2)[0].bateuMeta).toBe(true);
  });
  it("byMonth", () => {
    expect(byMonth(fx).map((m) => m.mes)).toEqual([1, 2]);
  });
  it("byGroup sorted desc", () => {
    const g = byGroup(fx, "distribuidora");
    expect(g.map((x) => x.nome)).toEqual(["A", "B"]);
  });
  it("byPrioridade", () => {
    const p = byPrioridade(fx, "regional").find((x) => x.nome === "R3")!;
    expect(p["03 - Menor 1K"]).toBe(90);
    expect(p["01 - Maior 5K"]).toBeNull();
  });
});
