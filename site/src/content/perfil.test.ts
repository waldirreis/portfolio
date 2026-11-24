import { it, expect } from "vitest";
import { perfil } from "./perfil";
it("contato correto", () => {
  expect(perfil.contato.email).toBe("waldir.reis2@gmail.com");
  expect(perfil.contato.whatsapp).toBe("https://wa.me/5598984067989");
});
it("sem e-mail corporativo", () => {
  expect(JSON.stringify(perfil)).not.toMatch(/equatorialenergia\.com\.br/);
});
it("trajetória começa em 2009 com programa seletivo", () => {
  expect(perfil.trajetoria[0].periodo).toMatch(/^2009/);
  expect(perfil.trajetoria[0].descricao.join(" ")).toMatch(/10\.000/);
});
it("ROI do slide", () => {
  expect(perfil.powerup.numeros[0].valor).toBe("+8,6 p.p.");
});
