const intFmt = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const pctFmt = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const fmtInt = (n: number) => intFmt.format(n);
export const fmtPct = (n: number | null) => (n === null || !Number.isFinite(n) ? "—" : pctFmt.format(n) + "%");
export const fmtK = (n: number) => (n >= 1e6 ? pctFmt.format(n / 1e6) + "M" : n >= 1e3 ? intFmt.format(Math.round(n / 1e3)) + "K" : intFmt.format(n));
export const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
