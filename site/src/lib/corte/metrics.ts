import { CorteRow, Modalidade, Prioridade, PRIORIDADES } from "./types";

export interface Filtros {
  distribuidora?: string;
  regional?: string;
  mes?: number; // 1-12
  modalidade?: Modalidade;
  prioridade?: Prioridade;
}

const mesOf = (r: CorteRow) => Number(r.data.slice(5, 7));
const diaOf = (r: CorteRow) => Number(r.data.slice(8, 10));

export function applyFilters(rows: CorteRow[], f: Filtros): CorteRow[] {
  return rows.filter(
    (r) =>
      (!f.distribuidora || r.distribuidora === f.distribuidora) &&
      (!f.regional || r.regional === f.regional) &&
      (!f.mes || mesOf(r) === f.mes) &&
      (!f.modalidade || r.modalidade === f.modalidade) &&
      (!f.prioridade || r.prioridade === f.prioridade),
  );
}

export function pct(n: number, d: number): number | null {
  return d === 0 ? null : (n / d) * 100;
}

export interface Totais {
  gerado: number;
  atribuido: number;
  executado: number;
  improdutivo: number;
  pago: number;
  meta: number;
  potencial: number;
  pctExecAtrib: number | null;
  pctAtribGerado: number | null;
  pctImprodutivo: number | null;
  pctPagoExec: number | null;
}

export function totals(rows: CorteRow[]): Totais {
  const s = { gerado: 0, atribuido: 0, executado: 0, improdutivo: 0, pago: 0, meta: 0, potencial: 0 };
  for (const r of rows) {
    s.gerado += r.gerado;
    s.atribuido += r.atribuido;
    s.executado += r.executado;
    s.improdutivo += r.improdutivo;
    s.pago += r.pago;
    s.meta += r.meta;
    s.potencial += r.potencial;
  }
  return {
    ...s,
    pctExecAtrib: pct(s.executado, s.atribuido),
    pctAtribGerado: pct(s.atribuido, s.gerado),
    pctImprodutivo: pct(s.improdutivo, s.executado),
    pctPagoExec: pct(s.pago, s.executado),
  };
}

function groupBy<K extends string | number>(rows: CorteRow[], key: (r: CorteRow) => K) {
  const m = new Map<K, CorteRow[]>();
  for (const r of rows) {
    const k = key(r);
    const arr = m.get(k);
    if (arr) arr.push(r);
    else m.set(k, [r]);
  }
  return m;
}

export interface SeriePonto {
  executado: number;
  meta: number;
  potencial: number;
  bateuMeta: boolean;
}

function serie(rs: CorteRow[]): SeriePonto {
  const t = totals(rs);
  return { executado: t.executado, meta: t.meta, potencial: t.potencial, bateuMeta: t.executado >= t.meta };
}

export function byDay(rows: CorteRow[], mes: number): ({ dia: number } & SeriePonto)[] {
  const g = groupBy(rows.filter((r) => mesOf(r) === mes), diaOf);
  return [...g.entries()].sort((a, b) => a[0] - b[0]).map(([dia, rs]) => ({ dia, ...serie(rs) }));
}

export function byMonth(rows: CorteRow[]): ({ mes: number } & SeriePonto)[] {
  const g = groupBy(rows, mesOf);
  return [...g.entries()].sort((a, b) => a[0] - b[0]).map(([mes, rs]) => ({ mes, ...serie(rs) }));
}

export type GroupKey = "distribuidora" | "regional";

export function byGroup(rows: CorteRow[], key: GroupKey): ({ nome: string } & Totais)[] {
  const g = groupBy(rows, (r) => r[key]);
  return [...g.entries()]
    .map(([nome, rs]) => ({ nome, ...totals(rs) }))
    .sort((a, b) => (b.pctExecAtrib ?? -1) - (a.pctExecAtrib ?? -1));
}

export type PrioridadeLinha = { nome: string } & Record<Prioridade, number | null>;

export function byPrioridade(rows: CorteRow[], key: GroupKey): PrioridadeLinha[] {
  const g = groupBy(rows, (r) => r[key]);
  return [...g.entries()].map(([nome, rs]) => {
    const linha = { nome } as PrioridadeLinha;
    for (const p of PRIORIDADES) {
      const t = totals(rs.filter((r) => r.prioridade === p));
      linha[p] = t.pctExecAtrib;
    }
    return linha;
  });
}

export function lastDate(rows: CorteRow[]): string | null {
  let m: string | null = null;
  for (const r of rows) if (!m || r.data > m) m = r.data;
  return m;
}
