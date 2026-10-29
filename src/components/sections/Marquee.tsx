const words = ["Dia da Noiva", "Cabelos", "Maquiagem", "Sobrancelhas", "Estética", "Autocuidado"];

/**
 * Faixa discreta: Jost 500 13px caixa alta, losango rose gold, hairlines, ~64px de altura.
 * Velocidade lenta e constante (45s por ciclo), pausa no hover, fades de 80px nas bordas.
 * 100% CSS: sem JavaScript e sem inverter com o scroll. Com reduced-motion fica parada e centralizada.
 */
export function Marquee() {
  const row = (dup: boolean) => (
    <div className={`mq-row ${dup ? "mq-dup" : ""}`} aria-hidden="true">
      {words.map((w) => (
        <span key={w} className="mq-item">
          {w}
          <i className="mq-dot" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="mq" role="img" aria-label={words.join(", ")}>
      <div className="mq-track">{row(false)}{row(true)}</div>
    </div>
  );
}
