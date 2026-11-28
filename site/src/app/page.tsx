"use client";

import { useState } from "react";
import { CaseBI, CaseERP, Contato, Hero, Nav, PowerUp, Trajetoria } from "@/components/sections/Sections";

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("pt");

  return (
    <>
      <Nav lang={lang} onLanguageChange={setLang} />
      <main>
        <Hero lang={lang} />
        <PowerUp lang={lang} />
        <CaseBI lang={lang} />
        <CaseERP lang={lang} />
        <Trajetoria lang={lang} />
        <Contato lang={lang} />
      </main>
    </>
  );
}
