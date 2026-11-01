import { useTranslation } from "@/i18n/LanguageProvider";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Crown, Eye, Sparkles } from "lucide-react";
import {
  packageGroups,
  packageGroupLabels,
  packageLevels,
  packageLevelLabels,
  tierPrices,
  type TemplateTier,
} from "@/data/pricing";
import "./PricingSection.css";

export function PricingSection() {
  const { tr } = useTranslation();
  return (
    <section id="pricing" className="pricing-section ui-section ui-section-soft">
      <div className="ui-container">
        <div className="ui-section-head">
          <span className="pricing-eyebrow">{tr("ՁԵՐ ՕՐԸ · ՁԵՐ ԸՆՏՐՈՒԹՅՈՒՆԸ")}</span>
          <h2 className="ui-h2">{tr("Մեր փաթեթները")}</h2>
          <p className="ui-muted">
            {tr("Երկու տեսակ, երեք տարբերակ՝ ձեզ հարմար հրավիրատոմսի համար։")}
          </p>
        </div>
        <div className="pricing-announcement">
          <Sparkles size={18} aria-hidden="true" />
          <span>{tr("Այսուհետ առաջարկում ենք նաև Premium փաթեթներ")}</span>
        </div>
        {packageGroups.map((group) => (
          <section
            key={group}
            className={`pricing-group pricing-group-${group}`}
            aria-labelledby={`pricing-${group}-title`}
          >
            <div className="pricing-group-heading">
              <div className="pricing-group-icon" aria-hidden="true">
                {group === "premium" ? <Crown size={25} /> : <Sparkles size={25} />}
              </div>
              <div>
                <h3 id={`pricing-${group}-title`}>{packageGroupLabels[group]}</h3>
                <p>
                  {tr(
                    group === "premium"
                      ? "Հատուկ ընտրություն՝ ձեր կարևոր օրվա համար"
                      : "Գեղեցիկ հրավեր՝ ձեր սիրելի առիթի համար",
                  )}
                </p>
              </div>
            </div>
            <div className="pricing-options">
              {packageLevels.map((level) => {
                const tier: TemplateTier = `${group}-${level}`;
                return (
                  <article key={tier} className={`pricing-option pricing-option-${group}`}>
                    <span className="pricing-option-group">{packageGroupLabels[group]}</span>
                    <h4>{packageLevelLabels[level]}</h4>
                    <p className="pricing-option-price">{tierPrices[tier]}</p>
                    <Link to="/templates" hash={`tier-${tier}`} className="pricing-option-link">
                      <Eye size={15} aria-hidden="true" />
                      <span>{tr("Դիտել տեսականին")}</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
        <div className="pricing-custom">
          <div>
            <h3>{tr("Ձեր պատմությունը՝ ձեր ձևով")}</h3>
            <p>{tr("Ունե՞ք անհատական դիզայնի գաղափար։ Սիրով կքննարկենք այն ձեզ հետ։")}</p>
          </div>
          <a href="/#order">
            {tr("Քննարկել գաղափարը ")}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
