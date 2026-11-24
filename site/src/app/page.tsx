import { CaseBI, CaseERP, Contato, Hero, Nav, PowerUp, Trajetoria } from "@/components/sections/Sections";
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PowerUp />
        <CaseBI />
        <CaseERP />
        <Trajetoria />
        <Contato />
      </main>
    </>
  );
}
