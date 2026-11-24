import { test, expect } from "@playwright/test";

const exec = (page: import("@playwright/test").Page) => page.locator('[data-kpi="Executado"] .font-display').innerText();

test("filtro de distribuidora muda KPI", async ({ page }) => {
  await page.goto("/");
  const before = await exec(page);
  await page.getByLabel("Distribuidora").selectOption("Distribuidora Norte");
  await expect.poll(() => exec(page)).not.toBe(before);
});

test("mês sem dados não mostra NaN", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Mês").selectOption({ label: "dez" });
  await expect(page.getByText("Sem dados para este filtro.").first()).toBeVisible();
  expect(await page.locator("body").innerText()).not.toMatch(/NaN/);
});

test("sem scroll horizontal em 360px", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.waitForTimeout(500);
  const w = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(w).toBeLessThanOrEqual(360);
});
