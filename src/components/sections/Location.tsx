import { SITE, wa } from "@/config";
import { MaskLines, Reveal } from "../motion";

export function Location() {
  return (
    <section id="local" className="section wrap grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow mb-4">Onde estamos</p>
        <MaskLines className="h2" lines={[<>Venha nos</>, <><em>visitar</em></>]} />
        <Reveal className="mt-8 space-y-4 text-lg">
          <p>{SITE.address}</p>
          <p className="text-ink-soft">{SITE.hours}</p> {/* TODO confirmar horário */}
          <p>{SITE.phoneDisplay}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a className="btn btn-primary" href={SITE.maps} target="_blank" rel="noopener noreferrer">Como chegar</a>
            <a className="btn btn-ghost" href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </Reveal>
      </div>
      <Reveal className="lg:col-span-7">
        <div className="arch aspect-[4/5] w-full border border-rosegold/50 sm:aspect-[16/11] sm:rounded-[2rem] sm:[border-radius:2rem]">
          <iframe title="Mapa: Thaís Andrade Beauty Lounge" src={SITE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 grayscale-[35%]" />
        </div>
      </Reveal>
    </section>
  );
}
