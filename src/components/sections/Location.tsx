import { SITE, wa } from "@/config";
import { has } from "@/content/photos";
import { Photo } from "../Photo";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../motion";

export function Location() {
  const facade = has("fachada");
  return (
    <section id="local" className="section wrap grid12 gap-y-12">
      <div className="col-span-12 lg:col-span-5">
        <SectionHead label="Onde estamos" title={[<>Venha nos</>, <><em>visitar</em></>]} />
        <Reveal className="mt-8 space-y-4 text-[1.0625rem]">
          <p>{SITE.address}</p>
          <p className="text-ink-soft">{SITE.hours}</p> {/* TODO confirmar horário */}
          <p>{SITE.phoneDisplay}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a className="btn btn-primary" href={SITE.maps} target="_blank" rel="noopener noreferrer">Como chegar</a>
            <a className="btn btn-ghost" href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </Reveal>
        {facade && (
          <Reveal className="mt-10">
            <Photo name="fachada" sizes="(min-width: 1024px) 420px, 90vw" className="card-rect aspect-[4/3] w-full max-w-md" />
            <p className="eyebrow mt-3">Procure pelo portão branco com a nossa placa</p>
          </Reveal>
        )}
      </div>
      <Reveal className="col-span-12 lg:col-span-7">
        <div className="card-rect aspect-[4/5] w-full border border-rosegold/50 sm:aspect-[16/11]">
          <iframe title="Mapa: Thaís Andrade Beauty Lounge" src={SITE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 grayscale-[35%]" />
        </div>
      </Reveal>
    </section>
  );
}
