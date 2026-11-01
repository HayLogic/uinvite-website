import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CalendarHeart,
  Handshake,
  MessageCircle,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { WHATSAPP_URL } from "@/data/templates";
import "./corporate.css";

const TITLE = "Կորպորատիվ առաջարկ — uInvite";
const DESCRIPTION =
  "Համագործակցություն հարսանյաց սրահների, միջոցառումների կազմակերպիչների և այլ գործընկերների հետ՝ էլեկտրոնային հրավիրատոմսերի պատրաստման համար։";
export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: CorporatePage,
});

function CorporatePage() {
  const { tr } = useTranslation();
  const contactUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(tr("Բարև Ձեզ։ Հետաքրքրված եմ uInvite-ի կորպորատիվ առաջարկով։ Ցանկանում եմ քննարկել համագործակցությունը։"))}`;
  return (
    <main className="corporate-page">
      <section className="corporate-hero corporate-container">
        <span className="corporate-eyebrow">
          <Handshake size={16} aria-hidden="true" />
          {tr("Միասին՝ գեղեցիկ միջոցառումների համար")}
        </span>
        <h1>{tr("Կորպորատիվ առաջարկ")}</h1>
        <p>
          {tr(
            "Դուք ստեղծում եք հիշարժան միջոցառումներ, մենք՝ դրանց առաջին տպավորությունը։ Առաջարկեք ձեր հաճախորդներին uInvite-ի էլեկտրոնային հրավիրատոմսերը՝ որպես ձեր ծառայությունների գեղեցիկ շարունակություն։",
          )}
        </p>
        <div className="corporate-actions">
          <a
            className="corporate-primary"
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {tr("Քննարկել համագործակցությունը")}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <Link className="corporate-secondary" to="/templates">
            {tr("Դիտել տեսականին")}
          </Link>
        </div>
      </section>
      <section className="corporate-section corporate-soft">
        <div className="corporate-container">
          <h2>{tr("Ում համար է առաջարկը")}</h2>
          <div className="corporate-grid">
            {[
              {
                Icon: Building2,
                title: "Հարսանյաց սրահներ և ռեստորաններ",
                text: "Առաջարկեք հրավիրատոմսեր ձեր սրահն ընտրած զույգերին ու միջոցառման պատվիրատուներին։",
              },
              {
                Icon: CalendarHeart,
                title: "Միջոցառումների կազմակերպիչներ",
                text: "Համալրեք ձեր կազմակերպած հարսանիքները, ծնունդներն ու կորպորատիվ միջոցառումները համապատասխան վեբ հրավիրատոմսով։",
              },
              {
                Icon: Handshake,
                title: "Այլ գործընկերներ",
                text: "Հարսանյաց գործակալություններ, դեկորատորներ, լուսանկարիչներ և միջոցառումների ոլորտի այլ մասնագետներ․ քննարկենք համագործակցության ձեր գաղափարը։",
              },
            ].map(({ Icon, title, text }) => (
              <article className="corporate-card" key={title}>
                <span className="corporate-icon">
                  <Icon size={25} aria-hidden="true" />
                </span>
                <h3>{tr(title)}</h3>
                <p>{tr(text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="corporate-section corporate-container">
        <h2>{tr("Ինչ կարող ենք առաջարկել ձեր հաճախորդներին")}</h2>
        <ul className="corporate-benefits">
          {[
            "Պատրաստի դիզայնների ընտրանի՝ տարբեր առիթների համար",
            "Միջոցառման տվյալները, քարտեզը և հյուրերի պատասխանները՝ մեկ հղումով",
            "Standart և Premium փաթեթներ՝ ըստ հաճախորդի ընտրության",
          ].map((text) => (
            <li key={text}>
              <Check size={19} aria-hidden="true" />
              <span>{tr(text)}</span>
            </li>
          ))}
        </ul>
        <div className="corporate-process">
          <h2>{tr("Ինչպես սկսել համագործակցությունը")}</h2>
          <ol className="corporate-grid">
            {[
              [
                "Ծանոթանանք",
                "Գրեք մեզ WhatsApp-ով՝ նշելով ձեր կազմակերպությունը և գործունեության ոլորտը։",
              ],
              [
                "Քննարկենք ձևաչափը",
                "Միասին քննարկենք ձեր հաճախորդների կարիքներն ու համագործակցության պայմանները։",
              ],
              [
                "Սկսենք աշխատել միասին",
                "Համաձայնեցնենք պատվերների փոխանցման և կապի հարմար տարբերակը։",
              ],
            ].map(([title, text], i) => (
              <li className="corporate-card" key={title}>
                <span className="corporate-step">0{i + 1}</span>
                <h3>{tr(title)}</h3>
                <p>{tr(text)}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="corporate-contact">
          <h2>{tr("Քննարկենք ձեր առաջարկը")}</h2>
          <p>
            {tr(
              "Համագործակցության ձևաչափն ու պայմանները քննարկում ենք անհատապես։ Գրեք մեզ՝ միասին գտնենք ձեզ հարմար տարբերակը։",
            )}
          </p>
          <a
            className="corporate-primary"
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {tr("Քննարկել համագործակցությունը")}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="corporate-phone" href="tel:+37477198238">
            +374 77 198 238
          </a>
        </div>
      </section>
    </main>
  );
}
