import { useTranslation } from "@/i18n/LanguageProvider";
import { Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import "./NewYearSection.css";

function EvergreenCorner({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true">
      <g fill="none" strokeLinecap="round">
        <path
          d="M-15 8C67 39 119 91 176 192M8-12C44 56 98 108 213 139"
          stroke="#b89858"
          strokeWidth="2"
        />
        {Array.from({ length: 9 }, (_, index) => {
          const x = 12 + index * 17;
          const y = 15 + index * 18;
          return (
            <g key={index} stroke={index % 2 ? "#628568" : "#3e6656"} strokeWidth="2.4">
              <path d={`M${x} ${y}l-8-31m8 31 24-9m-14 24-12-30m12 30 25-8`} />
            </g>
          );
        })}
        <path d="M66 27v50M136 79v39" stroke="#caaa69" strokeWidth="1" />
      </g>
      <circle cx="66" cy="92" r="17" fill="#b58a43" stroke="#e5c88b" />
      <circle cx="61" cy="86" r="6" fill="#f6dda1" opacity=".5" />
      <path d="M52 91q14 9 28 0M52 98q14 8 28 0" fill="none" stroke="#e2bc78" opacity=".65" />
      <circle cx="136" cy="129" r="12" fill="#8c3540" stroke="#cb8b80" />
      <path d="m186 37 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="#ddc58b" />
    </svg>
  );
}

export function NewYearSection({ available = false }: { available?: boolean }) {
  const { tr } = useTranslation();
  return (
    <section
      className={`new-year-section ${available ? "new-year-section-available" : ""}`}
      aria-labelledby="new-year-title"
    >
      <div className="new-year-glow" aria-hidden="true" />
      <EvergreenCorner className="new-year-evergreen new-year-evergreen-left" />
      <EvergreenCorner className="new-year-evergreen new-year-evergreen-right" />
      <div className="new-year-sparkles" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => (
          <Sparkles
            key={index}
            size={index % 3 === 0 ? 17 : 10}
            style={
              {
                left: `${5 + ((index * 37) % 90)}%`,
                top: `${8 + ((index * 23) % 80)}%`,
                "--sparkle-delay": `${index * -0.47}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="new-year-copy">
        <span className="new-year-kicker">{tr("ԱՄԱՆՈՐՅԱ ՏՐԱՄԱԴՐՈՒԹՅՈՒՆ")}</span>
        <div className="new-year-emblem" aria-hidden="true">
          <Sparkles size={27} />
        </div>
        <h2 id="new-year-title">
          {tr("Նոր տարվա")}
          <br />
          {tr("հրավիրատոմսեր")}
        </h2>
        <p>
          {tr("Ջերմ հանդիպումներ, փայլուն պահեր")}
          <br />
          {tr("և միասին ստեղծվող նոր հիշողություններ։")}
        </p>
        <span className="new-year-soon">
          {tr(available ? "Ընտրեք ձեր ամանորյա հրավիրատոմսը" : "Տոնական հավաքածուն՝ շուտով")}
        </span>
      </div>
    </section>
  );
}
