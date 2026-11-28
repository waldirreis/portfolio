"use client";
import {
  Bar, BarChart, CartesianGrid, Cell, ComposedChart, LabelList, Legend, Line, ReferenceLine,
  ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis,
} from "recharts";
import { fmtInt, fmtK, fmtPct, MESES } from "@/lib/format";
import type { SeriePonto, PrioridadeLinha, Totais } from "@/lib/corte/metrics";
import { PRIORIDADES } from "@/lib/corte/types";

export const C = {
  good: "#3ddc97",
  bad: "#f2545b",
  meta: "#8fb3ff",
  pot: "#6b7f99",
  grid: "#22395a",
  axis: "#9aabc2",
  prio: ["#2f5fd0", "#6f95f2", "#b4c8fb"],
};

const axisProps = { stroke: C.axis, fontSize: 11, tickLine: false, axisLine: false } as const;
const tooltipStyle = {
  contentStyle: { background: "#1b2d47", border: "1px solid #26405f", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#e6edf3", fontWeight: 600 },
  itemStyle: { color: "#e6edf3" },
  cursor: { fill: "rgba(255,255,255,0.05)" },
};

export function Card({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface p-4 min-w-0 ${className}`}>
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-ink">{title}</h4>
        {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function Empty() {
  return <div className="grid h-full place-items-center text-sm text-muted">Sem dados para este filtro.</div>;
}

/** Barras executado (verde = bateu meta, vermelho = abaixo), linha da meta e linha do potencial. */
export function ExecMetaChart({ data, xKey, xFmt, lang = "pt" }: { data: (SeriePonto & ({ dia: number } | { mes: number }))[]; xKey: "dia" | "mes"; xFmt?: (v: number) => string; lang?: "pt" | "en" }) {
  if (data.length === 0) return <div className="h-64"><Empty lang={lang} /></div>;
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }} barCategoryGap="18%">
          <CartesianGrid vertical={false} stroke={C.grid} />
          <XAxis dataKey={xKey} {...axisProps} tickFormatter={xFmt} interval="preserveStartEnd" />
          <YAxis {...axisProps} tickFormatter={fmtK} width={48} />
          <Tooltip {...tooltipStyle} labelFormatter={(v) => (xFmt ? xFmt(Number(v)) : `${lang === "en" ? "Day" : "Dia"} ${v}`)}
            formatter={(v, n) => [fmtInt(Number(v)), String(n)]} />
          <Legend wrapperStyle={{ fontSize: 12, color: C.axis }} />
          <Bar isAnimationActive={false} dataKey="executado" name={lang === "en" ? "Completed" : "Executado"} fill={C.good} radius={[4, 4, 0, 0]}>
            {data.map((d, i) => <Cell key={i} fill={d.bateuMeta ? C.good : C.bad} />)}
          </Bar>
          <Line isAnimationActive={false} dataKey="meta" name={lang === "en" ? "Target" : "Meta"} stroke={C.meta} strokeWidth={2} strokeDasharray="4 4" dot={false} />
          <Line isAnimationActive={false} dataKey="potencial" name={lang === "en" ? "Potential" : "Potencial"} stroke={C.pot} strokeWidth={2} dot={false} type="monotone" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export const mesFmt = (m: number) => MESES[m - 1] ?? String(m);

type RankKey = "pctExecAtrib" | "pctAtribGerado" | "pctPagoExec" | "pctImprodutivo";

/** Ranking horizontal de percentuais com linha de meta. `menorMelhor` inverte a regra de cor. */
export function RankingChart({ data, k, meta, menorMelhor, lang = "pt" }: { data: ({ nome: string } & Totais)[]; k: RankKey; meta?: number; menorMelhor?: boolean; lang?: "pt" | "en" }) {
  const rows = data
    .map((d) => ({ nome: d.nome.replace("Distribuidora ", ""), v: d[k] }))
    .filter((d): d is { nome: string; v: number } => d.v !== null)
    .sort((a, b) => (menorMelhor ? a.v - b.v : b.v - a.v));
  if (rows.length === 0) return <div className="h-48"><Empty /></div>;
  const ok = (v: number) => (meta === undefined ? true : menorMelhor ? v <= meta : v >= meta);
  return (
    <div style={{ height: Math.max(140, rows.length * 30 + 20) }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 48, left: 0, bottom: 4 }} barCategoryGap={6}>
          <XAxis type="number" hide domain={menorMelhor ? [0, (m: number) => Math.max(m * 1.3, (meta ?? 0) * 1.2)] : [0, 100]} />
          <YAxis type="category" dataKey="nome" {...axisProps} width={96} />
          <Tooltip {...tooltipStyle} formatter={(v) => [fmtPct(Number(v)), lang === "en" ? "Result" : "Resultado"]} />
          {meta !== undefined && (
            <ReferenceLine x={meta} stroke={C.meta} strokeDasharray="3 3" />
          )}
          <Bar isAnimationActive={false} dataKey="v" radius={[0, 4, 4, 0]}>
            {rows.map((d, i) => <Cell key={i} fill={meta === undefined ? C.meta : ok(d.v) ? C.good : C.bad} />)}
            <LabelList dataKey="v" position="right" formatter={(v: unknown) => fmtPct(Number(v))} fill="#e6edf3" fontSize={11} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PrioridadeChart({ data, lang = "pt" }: { data: PrioridadeLinha[]; lang?: "pt" | "en" }) {
  const rows = data.map((d) => ({ ...d, nome: d.nome.replace("Distribuidora ", "") }));
  if (rows.length === 0) return <div className="h-64"><Empty /></div>;
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barCategoryGap="20%" barGap={2}>
          <CartesianGrid vertical={false} stroke={C.grid} />
          <XAxis dataKey="nome" {...axisProps} interval={0} fontSize={10} />
          <YAxis {...axisProps} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip {...tooltipStyle} formatter={(v, n) => [fmtPct(Number(v)), String(n)]} />
          <Legend wrapperStyle={{ fontSize: 12, color: C.axis }} />
          {PRIORIDADES.map((p, i) => (
            <Bar isAnimationActive={false} key={p} dataKey={p} name={p} fill={C.prio[i]} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function median(xs: number[]) {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function DispersaoChart({ data, lang = "pt" }: { data: ({ nome: string } & Totais)[]; lang?: "pt" | "en" }) {
  const pts = data
    .filter((d) => d.pctExecAtrib !== null && d.pctAtribGerado !== null)
    .map((d) => ({ nome: d.nome.replace("Distribuidora ", ""), x: d.pctExecAtrib as number, y: d.pctAtribGerado as number, z: d.executado }));
  if (pts.length === 0) return <div className="h-72"><Empty /></div>;
  const mx = median(pts.map((p) => p.x));
  const my = median(pts.map((p) => p.y));
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 12, right: 16, left: -8, bottom: 8 }}>
          <CartesianGrid stroke={C.grid} />
          <XAxis type="number" dataKey="x" name={lang === "en" ? "Assigned productivity %" : "% Prod. Atribuído"} {...axisProps} domain={["dataMin - 5", 100]} tickFormatter={(v) => `${Math.round(v)}%`} />
          <YAxis type="number" dataKey="y" name={lang === "en" ? "Assignment rate %" : "% Atribuição"} {...axisProps} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <ZAxis type="number" dataKey="z" range={[60, 260]} />
          <ReferenceLine x={mx} stroke={C.axis} strokeDasharray="4 4" label={{ value: `${lang === "en" ? "Median" : "Mediana"} ${fmtPct(mx)}`, fill: C.axis, fontSize: 10, position: "insideTopLeft" }} />
          <ReferenceLine y={my} stroke={C.axis} strokeDasharray="4 4" label={{ value: `${lang === "en" ? "Median" : "Mediana"} ${fmtPct(my)}`, fill: C.axis, fontSize: 10, position: "insideBottomRight" }} />
          <Tooltip {...tooltipStyle}
            content={({ payload }) => {
              const p = payload?.[0]?.payload as (typeof pts)[number] | undefined;
              if (!p) return null;
              return (
                <div className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-xs">
                  <div className="font-semibold">{p.nome}</div>
                  <div>% Prod. Atribuído: {fmtPct(p.x)}</div>
                  <div>% Atribuição: {fmtPct(p.y)}</div>
                  <div>Executado: {fmtInt(p.z)}</div>
                </div>
              );
            }} />
          <Scatter isAnimationActive={false} data={pts} fill={C.meta} fillOpacity={0.85} stroke="#142338" strokeWidth={2}>
            <LabelList dataKey="nome" position="top" fill="#e6edf3" fontSize={10} />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
