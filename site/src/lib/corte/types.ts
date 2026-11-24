export type Modalidade = "CORTE" | "RECORTE";
export type Prioridade = "01 - Maior 5K" | "02 - Maior 1K" | "03 - Menor 1K";
export const PRIORIDADES: Prioridade[] = ["01 - Maior 5K", "02 - Maior 1K", "03 - Menor 1K"];
export const MODALIDADES: Modalidade[] = ["CORTE", "RECORTE"];
export interface CorteRow {
  data: string; // YYYY-MM-DD
  distribuidora: string;
  regional: string;
  modalidade: Modalidade;
  prioridade: Prioridade;
  gerado: number;
  atribuido: number;
  executado: number;
  improdutivo: number;
  pago: number;
  meta: number;
  potencial: number;
}
