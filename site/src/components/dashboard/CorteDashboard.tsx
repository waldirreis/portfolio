"use client";
import { useMemo, useState } from "react";
import { generateCorte, DISTRIBUIDORAS } from "@/lib/corte/generate";
import { applyFilters, byDay, byGroup, byMonth, byPrioridade, Filtros, lastDate, totals } from "@/lib/corte/metrics";
import { MODALIDADES, PRIORIDADES, Modalidade, Prioridade } from "@/lib/corte/types";
import { fmtInt, fmtPct, MESES } from "@/lib/format";
import { Card, DispersaoChart, ExecMetaChart, mesFmt, PrioridadeChart, RankingChart } from "./Charts";

const ATE = "2026-11-12";

function Select<T extends string | number>({ label, value, onChange, options, all = "Todas" }: {
  label: string; value: T | undefined; onChange: (v: T | undefined) => void; options: { v: T; l: string }[]; all?: string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-xs text-muted">
      {label}
      <select
        aria-label={label}
        className="rounded-lg border border-line bg-surface-2 px-2 py-2 text-sm text-ink outline-none focus:border-accent"
        value={value === undefined ? "" : String(value)}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "") return onChange(undefined);
          const opt = options.find((o) => String(o.v) === raw);
          onChange(opt?.v);
        }}
      >
        <option value="">{all}</option>
        {options.map((o) => <option key={String(o.v)} value={String(o.v)}>{o.l}</option>)}
      </select>
    </label>
  );
}

function Kpi({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: "good" | "bad" }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-3" data-kpi={label}>
      <div className="text-xs text-muted">{label}</div>
      <div className={`font-display text-xl font-semibold tabular-nums ${tone === "good" ? "text-good" : tone === "bad" ? "text-bad" : "text-ink"}`}>{value}</div>
      {hint && <div className="text-[11px] text-muted">{hint}</div>}
    </div>
  );
}

export default function CorteDashboard({ lang = "pt" }: { lang?: "pt" | "en" }) {
  const all = useMemo(() => generateCorte(2026, 2026, ATE), []);
  const ultimoMes = Number(ATE.slice(5, 7));
  const [f, setF] = useState<Filtros>({ mes: ultimoMes });

  const semMes = useMemo(() => applyFilters(all, { ...f, mes: undefined }), [all, f]);
  const rows = useMemo(() => applyFilters(all, f), [all, f]);
  const t = useMemo(() => totals(rows), [rows]);
  const grupo = f.distribuidora ? "regional" : "distribuidora";
  const grupos = useMemo(() => byGroup(rows, grupo), [rows, grupo]);
  const prios = useMemo(() => byPrioridade(rows, grupo), [rows, grupo]);
  const mesDia = f.mes ?? ultimoMes;
  const dias = useMemo(() => byDay(semMes, mesDia), [semMes, mesDia]);
  const meses = useMemo(() => byMonth(semMes), [semMes]);
  const regionais = DISTRIBUIDORAS.find((d) => d.nome === f.distribuidora)?.regionais ?? [];
  const atualizado = lastDate(all);
  const metaPct = t.meta ? (t.executado / t.meta) * 100 : null;

  const set = <K extends keyof Filtros>(k: K, v: Filtros[K]) =>
    setF((old) => ({ ...old, [k]: v, ...(k === "distribuidora" ? { regional: undefined } : {}) }));

  return (
    <div className="rounded-3xl border border-line bg-bg/60 p-3 sm:p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold">{lang === "en" ? "Daily Disconnection & Reconnection Dashboard" : "Painel Diário de Corte e Recorte"}</h3>
          <p className="text-xs text-muted">
            {lang === "en" ? "Updated through" : "Atualizado até"} {atualizado?.split("-").reverse().join("/")} ·{" "}
            <span className="rounded-full border border-accent/40 px-2 py-0.5 text-accent">{lang === "en" ? "Fictional data for demonstration." : "Dados fictícios gerados para demonstração."}</span>
          </p>
        </div>
        <button onClick={() => setF({ mes: ultimoMes })} className="rounded-lg border border-line px-3 py-2 text-xs text-muted hover:border-accent hover:text-ink">
          {lang === "en" ? "Reset filters" : "Limpar filtros"}
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <Select label={lang === "en" ? "Distributor" : "Distribuidora"} value={f.distribuidora} onChange={(v) => set("distribuidora", v)}
          options={DISTRIBUIDORAS.map((d) => ({ v: d.nome, l: d.nome }))} />
        <Select label={lang === "en" ? "Region" : "Regional"} value={f.regional} onChange={(v) => set("regional", v)}
          options={regionais.map((r) => ({ v: r, l: r }))} />
        <Select label={lang === "en" ? "Month" : "Mês"} value={f.mes} onChange={(v) => set("mes", v)} all={lang === "en" ? "Full year" : "Ano todo"}
          options={MESES.map((m, i) => ({ v: i + 1, l: m }))} />
        <Select<Modalidade> label={lang === "en" ? "Action" : "Modalidade"} value={f.modalidade} onChange={(v) => set("modalidade", v)}
          options={MODALIDADES.map((m) => ({ v: m, l: m === "CORTE" ? (lang === "en" ? "Disconnection" : "Corte") : (lang === "en" ? "Reconnection" : "Recorte") }))} />
        <Select<Prioridade> label={lang === "en" ? "Priority" : "Prioridade"} value={f.prioridade} onChange={(v) => set("prioridade", v)}
          options={PRIORIDADES.map((p) => ({ v: p, l: p }))} />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label={lang === "en" ? "Generated" : "Gerado"} value={fmtInt(t.gerado)} />
        <Kpi label={lang === "en" ? "Assigned" : "Atribuído"} value={fmtInt(t.atribuido)} hint={`${fmtPct(t.pctAtribGerado)} ${lang === "en" ? "of generated" : "do gerado"}`} />
        <Kpi label={lang === "en" ? "Completed" : "Executado"} value={fmtInt(t.executado)} hint={`${lang === "en" ? "Target" : "Meta"} ${fmtInt(t.meta)}`} tone={metaPct === null ? undefined : metaPct >= 100 ? "good" : "bad"} />
        <Kpi label={lang === "en" ? "Paid" : "Pago"} value={fmtInt(t.pago)} />
        <Kpi label={lang === "en" ? "Completed × Assigned" : "Exec × Atrib"} value={fmtPct(t.pctExecAtrib)} hint={lang === "en" ? "Target 70%" : "Meta 70%"} tone={t.pctExecAtrib === null ? undefined : t.pctExecAtrib >= 70 ? "good" : "bad"} />
        <Kpi label={lang === "en" ? "Paid × Completed" : "Pago × Exec"} value={fmtPct(t.pctPagoExec)} />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card title={`${lang === "en" ? "Completed × Target by day" : "Executado × Meta por dia"} — ${mesFmt(mesDia)}`} subtitle={lang === "en" ? "Green: target met · Red: below target" : "Verde: bateu a meta do dia · Vermelho: abaixo"}>
          <ExecMetaChart data={dias} xKey="dia" />
        </Card>
        <Card title={lang === "en" ? "Completed × Target by month" : "Executado × Meta por mês"} subtitle={lang === "en" ? "Monthly cumulative total" : "Acumulado mensal no ano"}>
          <ExecMetaChart data={meses} xKey="mes" xFmt={mesFmt} />
        </Card>
        <Card title={lang === "en" ? "Completed × Assigned" : "Executado × Atribuído"} subtitle={`${lang === "en" ? "By" : "Por"} ${lang === "en" ? (grupo === "regional" ? "region" : "distributor") : grupo} · ${lang === "en" ? "target" : "meta"} 70%`}>
          <RankingChart data={grupos} k="pctExecAtrib" meta={70} />
        </Card>
        <Card title={lang === "en" ? "Assigned × Generated" : "Atribuído × Gerado"} subtitle={`${lang === "en" ? "By" : "Por"} ${lang === "en" ? (grupo === "regional" ? "region" : "distributor") : grupo} · ${lang === "en" ? "target" : "meta"} 80%`}>
          <RankingChart data={grupos} k="pctAtribGerado" meta={80} />
        </Card>
        <Card title={lang === "en" ? "Completed × Assigned by priority" : "Executado × Atribuído por prioridade"} subtitle={lang === "en" ? "Productivity by debt range" : "% de produtividade por faixa de débito"}>
          <PrioridadeChart data={prios} />
        </Card>
        <Card title={lang === "en" ? "Performance scatter plot" : "Mapa de dispersão"} subtitle={`${lang === "en" ? "Assigned productivity × assignment rate by" : "% Prod. Atribuído × % Atribuição por"} ${lang === "en" ? (grupo === "regional" ? "region" : "distributor") : grupo} · ${lang === "en" ? "size = completed" : "tamanho = executado"}`}>
          <DispersaoChart data={grupos} />
        </Card>
        <Card title={lang === "en" ? "Unproductive actions" : "Improdutivo"} subtitle={lang === "en" ? "Lower is better · 5% benchmark" : "Menor é melhor · referência 5%"}>
          <RankingChart data={grupos} k="pctImprodutivo" meta={5} menorMelhor />
        </Card>
        <Card title={lang === "en" ? "Paid × Completed" : "Pago × Executado"} subtitle={lang === "en" ? "Action effectiveness: customers who paid after disconnection" : "Efetividade da ação: clientes que pagaram após o corte"}>
          <RankingChart data={grupos} k="pctPagoExec" />
        </Card>
      </div>
    </div>
  );
}
