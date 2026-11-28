"use client";

import Image from "next/image";
import { perfil } from "@/content/perfil";
import { perfilEn } from "@/content/perfil.en";

type Language = "pt" | "en";
type LanguageProps = { lang: Language };
import CorteDashboard from "@/components/dashboard/CorteDashboard";

const getProfile = (lang: Language) => lang === "en" ? perfilEn : perfil;

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:py-24">
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-muted">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className="rounded-md border border-line bg-surface px-2.5 py-1 text-sm text-ink">{s}</li>
      ))}
    </ul>
  );
}

export function Nav({ lang, onLanguageChange }: LanguageProps & { onLanguageChange: (lang: Language) => void }) {
  const p = getProfile(lang);
  const links = lang === "en" ? [["#power-up", "Power UP"], ["#bi", "Dashboard"], ["#software", "Software"], ["#trajetoria", "About"]] : [["#power-up", "Power UP"], ["#bi", "Dashboard"], ["#software", "Software"], ["#trajetoria", "Sobre mim"]];
  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#topo" className="font-display text-lg font-semibold">Waldir Reis</a>
        <div className="hidden gap-6 text-sm text-muted md:flex">
          {links.map(([h, l]) => <a key={h} href={h} className="hover:text-ink">{l}</a>)}
        </div>
        <div className="flex items-center gap-2"><div className="flex rounded-lg border border-line p-1 text-xs" aria-label={lang === "en" ? "Choose language" : "Escolher idioma"}><button type="button" onClick={() => onLanguageChange("pt")} aria-pressed={lang === "pt"} className={lang === "pt" ? "rounded-md bg-surface-2 px-2 py-1 text-ink" : "rounded-md px-2 py-1 text-muted"}>PT</button><button type="button" onClick={() => onLanguageChange("en")} aria-pressed={lang === "en"} className={lang === "en" ? "rounded-md bg-surface-2 px-2 py-1 text-ink" : "rounded-md px-2 py-1 text-muted"}>EN</button></div><a href="#contato" className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-white hover:brightness-110">{lang === "en" ? "Contact me" : "Falar comigo"}</a></div>
      </nav>
    </header>
  );
}

export function Hero({ lang }: LanguageProps) {
  const p = getProfile(lang);
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:pt-20 md:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="text-muted">{p.nome} · {p.local}</p>
          <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {lang === "en" ? "I turn business challenges into data-driven decisions." : "Conecto negócio, dados e tecnologia para gerar resultados."}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{p.subtitulo}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#bi" className="rounded-xl bg-accent px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 hover:-translate-y-0.5 hover:brightness-110">{lang === "en" ? "Explore projects" : "Conheça meus projetos"}</a>
            <a href={p.contato.curriculo} className="rounded-xl border border-line px-5 py-3 font-semibold hover:border-accent">{lang === "en" ? "Download résumé" : "Baixar currículo"}</a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line">
            <Image src="/img/perfil.png" alt={`Foto de ${p.nome}`} fill priority sizes="(max-width: 768px) 90vw, 380px" className="object-cover" />
          </div>
          <svg viewBox="0 0 300 60" className="absolute -bottom-6 -left-6 w-[85%]" aria-hidden>
            <polyline className="energy-line" points="0,50 40,48 70,40 100,44 130,30 160,34 190,18 220,22 250,8 300,4"
              fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="relative mx-auto max-w-6xl px-4 pb-8">
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {p.destaques.map((d) => (
            <div key={d.label} className="bg-surface px-5 py-5">
              <dt className="text-sm text-muted">{d.label}</dt>
              <dd className="font-display text-3xl font-semibold text-accent">{d.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function PowerUp({ lang }: LanguageProps) {
  const p = getProfile(lang);
  const u = p.powerup;
  return (
    <Section id="power-up" title={u.titulo}>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <figure className="self-start overflow-hidden rounded-2xl border border-line">
          <Image src={u.fotos[0].src} alt={u.fotos[0].alt} width={1280} height={721} sizes="(max-width: 1024px) 100vw, 640px" className="h-auto w-full" />
        </figure>
        <div className="flex flex-col gap-5">
          {u.texto.map((t) => <p key={t} className="text-muted leading-relaxed">{t}</p>)}
          <div className="grid grid-cols-3 gap-2">
            {u.numeros.map((n) => (
              <div key={n.label} className="rounded-xl border border-line bg-surface p-3">
                <div className="font-display text-2xl font-semibold text-accent">{n.valor}</div>
                <div className="text-xs text-muted">{n.label}</div>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-2 text-sm text-muted">{lang === "en" ? "ROI improvement by collection action (percentage points)" : "Ganho de ROI por ação de cobrança (p.p.)"}</p>
            <ul className="space-y-1.5">
              {u.porAcao.map((a) => (
                <li key={a.acao} className="grid grid-cols-[80px_1fr_56px] items-center gap-2 text-sm">
                  <span>{a.acao}</span>
                  <span className="h-2 rounded-full bg-surface-2">
                    <span className="block h-2 rounded-full bg-accent" style={{ width: `${(parseFloat(a.pp.replace(",", ".")) / 12.02) * 100}%` }} />
                  </span>
                  <span className="text-right tabular-nums">{a.pp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {u.fotos.slice(1).map((f) => (
          <figure key={f.src} className="overflow-hidden rounded-2xl border border-line">
            <Image src={f.src} alt={f.alt} width={800} height={600} sizes="(max-width: 640px) 100vw, 560px" className="h-auto w-full" />
          </figure>
        ))}
      </div>
    </Section>
  );
}

function ProblemaSolucao({ itens }: { itens: [string, string][] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {itens.map(([t, d]) => (
        <div key={t} className="border-l-2 border-accent pl-4">
          <h3 className="font-display text-lg font-semibold">{t}</h3>
          <p className="mt-1 text-muted leading-relaxed">{d}</p>
        </div>
      ))}
    </div>
  );
}

export function CaseBI({ lang }: LanguageProps) {
  const p = getProfile(lang);
  const c = p.caseBI;
  return (
    <Section id="bi" title={lang === "en" ? "Daily disconnection and reconnection dashboard" : "Painel diário de corte e recorte"}
      intro={lang === "en" ? "The original version supports daily collections management in Power BI. This interactive recreation uses fictional data. Explore the filters." : "A versão original roda em Power BI todos os dias na gestão de cobrança. Recriei aqui o mesmo painel com dados fictícios: use os filtros."}>
      <ProblemaSolucao itens={lang === "en" ? [["Challenge", c.problema], ["Solution", c.solucao], ["Impact", c.impacto]] : [["Problema", c.problema], ["Solução", c.solucao], ["Impacto", c.impacto]]} />
      <div className="mt-10"><CorteDashboard lang={lang} /></div>
      <div className="mt-6"><Tags items={c.stack} /></div>
    </Section>
  );
}

export function CaseERP({ lang }: LanguageProps) {
  const p = getProfile(lang);
  const c = p.caseERP;
  return (
    <Section id="software" title={c.titulo} intro={c.subtitulo}>
      <ProblemaSolucao itens={lang === "en" ? [["Challenge", c.problema], ["Solution", c.solucao], ["Under the hood", c.destaques.slice(0, 3).join(". ") + "."]] : [["Problema", c.problema], ["Solução", c.solucao], ["O que tem por dentro", c.destaques.slice(0, 3).join(". ") + "."]]} />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {c.imagens.map((i) => (
          <figure key={i.src} className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Image src={i.src} alt={i.alt} width={1440} height={900} sizes="(max-width: 768px) 100vw, 380px" className="h-auto w-full" />
          </figure>
        ))}
      </div>
      <ul className="mt-8 grid gap-2 text-muted sm:grid-cols-2">
        {c.destaques.map((d) => <li key={d} className="flex gap-2"><span className="text-accent" aria-hidden>✓</span>{d}</li>)}
      </ul>
      <div className="mt-6"><Tags items={c.stack} /></div>
    </Section>
  );
}

export function Trajetoria({ lang }: LanguageProps) {
  const p = getProfile(lang);
  return (
    <Section id="trajetoria" title={lang === "en" ? "About me" : "Sobre mim"}>
      <div className="mb-16 max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
        {p.resumo.map((t) => <p key={t}>{t}</p>)}
      </div>
      <h3 className="mb-8 font-display text-2xl font-semibold">{lang === "en" ? "Career journey" : "Trajetória"}</h3>
      <ol className="relative space-y-10 border-l border-line pl-6">
        {p.trajetoria.map((t) => (
          <li key={t.periodo} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" aria-hidden />
            <p className="text-sm text-accent">{t.periodo}</p>
            <h3 className="font-display text-xl font-semibold">{t.cargo}</h3>
            <p className="text-sm text-muted">{t.empresa}</p>
            <ul className="mt-2 max-w-3xl list-disc space-y-1 pl-5 text-muted">
              {t.descricao.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </li>
        ))}
      </ol>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="font-display text-xl font-semibold">{lang === "en" ? "Education" : "Formação"}</h3>
          <ul className="mt-4 space-y-3">
            {p.formacao.map((f) => (
              <li key={f.curso}>
                <div className="font-medium">{f.curso}</div>
                <div className="text-sm text-muted">{[f.instituicao, f.periodo].filter(Boolean).join(", ")}</div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">{p.idiomas}</p>
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold">{lang === "en" ? "Skills" : "Competências"}</h3>
          <div className="mt-4 space-y-5">
            {p.competencias.map((c) => (
              <div key={c.grupo}>
                <p className="mb-2 text-sm text-muted">{c.grupo}</p>
                <Tags items={c.itens} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Contato({ lang }: LanguageProps) {
  const p = getProfile(lang);
  const c = p.contato;
  const itens = [
    ["E-mail", c.email, `mailto:${c.email}`],
    ["WhatsApp", c.telefone, c.whatsapp],
    ["LinkedIn", "in/waldirfigueiredo", c.linkedin],
    ["GitHub", "waldirreis", c.github],
  ];
  return (
    <section id="contato" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{lang === "en" ? "Let’s connect." : "Vamos conversar?"}</h2>
        <p className="mt-3 max-w-xl text-muted">{lang === "en" ? "I welcome conversations about Business Intelligence, Analytics and technology opportunities. Choose your preferred channel." : "Estou aberto a conversas sobre oportunidades em Business Intelligence, Analytics e tecnologia. Escolha o canal que preferir."}</p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {itens.map(([l, v, h]) => (
            <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="rounded-2xl border border-line bg-bg p-5 hover:border-accent">
              <div className="text-sm text-muted">{l}</div>
              <div className="mt-1 break-all font-medium">{v}</div>
            </a>
          ))}
        </div>
        <a href={c.curriculo} className="mt-8 inline-block rounded-xl bg-accent px-5 py-3 font-semibold text-white hover:brightness-110">{lang === "en" ? "Download résumé (Portuguese PDF)" : "Baixar currículo (PDF)"}</a>
        <p className="mt-16 text-xs text-muted">© 2026 {p.nome}. {lang === "en" ? "Built with Next.js. Source code on GitHub." : "Site desenvolvido em Next.js. Código no GitHub."}</p>
      </div>
    </section>
  );
}
