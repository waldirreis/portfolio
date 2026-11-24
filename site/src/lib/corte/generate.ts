import { CorteRow, MODALIDADES, PRIORIDADES } from "./types";

/** Distribuidoras e regionais 100% fictícias; `escala` = volume médio diário gerado. */
export const DISTRIBUIDORAS: { nome: string; escala: number; regionais: string[] }[] = [
  { nome: "Distribuidora Norte", escala: 9000, regionais: ["Norte", "Sul", "Nordeste", "Oeste", "Centro"] },
  { nome: "Distribuidora Litoral", escala: 6500, regionais: ["Norte", "Sul", "Centro", "Leste", "Noroeste"] },
  { nome: "Distribuidora Planalto", escala: 5200, regionais: ["Metropolitana", "Capital", "Vale", "Serrana"] },
  { nome: "Distribuidora Sertão", escala: 3600, regionais: ["Metropolitana", "Sul", "Delta"] },
  { nome: "Distribuidora Delta", escala: 3800, regionais: ["Leste", "Oeste"] },
  { nome: "Distribuidora Sul", escala: 2600, regionais: ["Norte", "Sul"] },
  { nome: "Distribuidora Serra", escala: 900, regionais: ["Metropolitana", "Vale", "Fronteira", "Lagos"] },
];

const PESO_PRIORIDADE = [0.12, 0.3, 0.58];
const PESO_MODALIDADE = [0.7, 0.3];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Gera ações diárias fictícias (dias úteis) de 1º de janeiro de `ano` até `ateData` inclusive. */
export function generateCorte(seed: number, ano: number, ateData: string): CorteRow[] {
  const rnd = mulberry32(seed);
  const u = (a: number, b: number) => a + (b - a) * rnd();
  const rows: CorteRow[] = [];
  const end = new Date(ateData + "T00:00:00Z");

  // pesos fixos de regionais
  const pesosReg = DISTRIBUIDORAS.map((d) => {
    const w = d.regionais.map((_, i) => (i === 0 ? 2.2 : 1) * u(0.6, 1.4));
    const s = w.reduce((x, y) => x + y, 0);
    return w.map((x) => x / s);
  });
  // eficiência estrutural por regional (algumas cronicamente abaixo da meta)
  const efReg = DISTRIBUIDORAS.map((d) => d.regionais.map(() => u(0.8, 1.1)));
  // perfil de cada distribuidora: atribuição, execução, pagamento e improdutivo
  const perfil = DISTRIBUIDORAS.map(() => ({
    atrib: u(0.42, 0.86),
    exec: u(0.86, 1.08),
    pago: u(0.38, 0.86),
    improd: u(0.01, 0.11),
  }));

  for (let d = new Date(Date.UTC(ano, 0, 1)); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const dow = d.getUTCDay();
    if (dow === 0 || dow === 6) continue;
    const data = isoDate(d);
    const mes = d.getUTCMonth();
    const sazonal = 1 + 0.12 * Math.sin(((mes - 2) / 12) * 2 * Math.PI);

    const diaRuim = rnd() < 0.2 ? u(0.6, 0.85) : 1; // evento que afeta todas (chuva, falha de sistema)
    DISTRIBUIDORAS.forEach((dist, di) => {
      const choque = diaRuim * (rnd() < 0.1 ? u(0.4, 0.75) : u(0.92, 1.1)); // dias ruins (chuva, greve, sistema)
      dist.regionais.forEach((regional, ri) => {
        MODALIDADES.forEach((modalidade, mi) => {
          PRIORIDADES.forEach((prioridade, pi) => {
            const esperado = dist.escala * sazonal * pesosReg[di][ri] * PESO_MODALIDADE[mi] * PESO_PRIORIDADE[pi];
            const gerado = Math.round(esperado * u(0.85, 1.15));
            const taxaAtrib = Math.min(0.97, perfil[di].atrib * u(0.85, 1.12));
            const atribuido = Math.round(gerado * taxaAtrib);
            const taxaExec = Math.min(0.99, u(0.74, 0.92) * perfil[di].exec * efReg[di][ri] * [1.07, 1, 0.93][pi]);
            const executado = Math.round(atribuido * taxaExec * choque);
            rows.push({
              data,
              distribuidora: dist.nome,
              regional,
              modalidade,
              prioridade,
              gerado,
              atribuido,
              executado: Math.min(executado, atribuido),
              improdutivo: Math.round(Math.min(executado, atribuido) * perfil[di].improd * u(0.6, 1.4)),
              pago: Math.round(Math.min(executado, atribuido) * Math.min(0.98, perfil[di].pago * u(0.85, 1.15))),
              meta: Math.round(esperado * 0.43),
              potencial: Math.round(esperado * 0.78),
            });
          });
        });
      });
    });
  }
  return rows;
}
