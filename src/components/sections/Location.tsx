import { SITE, wa } from "@/config";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../motion";

export function Location() {
  return (
    <section id="local" className="section wrap grid12 gap-y-12 lg:items-stretch">
      <div className="col-span-12 lg:col-span-5">
        <SectionHead label="Onde estamos" title={[<>Venha nos</>, <><em>visitar</em></>]} />
        <Reveal className="mt-8 space-y-4 text-[1.0625rem]">
          <p>{SITE.address}</p>
          <p className="text-ink-soft">{SITE.hours}</p>
          <p>{SITE.phoneDisplay}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a className="btn btn-primary" href={SITE.maps} target="_blank" rel="noopener noreferrer">Como chegar</a>
            <a className="btn btn-ghost" href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </Reveal>
      </div>
      {/* O mapa ocupa a coluna da direita na altura toda */}
      <Reveal className="col-span-12 lg:col-span-7">
        <div className="card-rect h-full min-h-[22rem] w-full border border-rosegold/50 lg:min-h-[28rem]">
          <iframe title="Mapa: Thaís Andrade Beauty Lounge" src={SITE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[22rem] w-full border-0 grayscale-[35%] lg:min-h-[28rem]" />
        </div>
      </Reveal>
    </section>
  );
}
