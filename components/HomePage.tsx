import Link from "next/link";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {ContactForm} from "./ContactForm";
import {PropertyCard} from "./PropertyCard";
import type {Lang,PublicProperty} from "@/lib/types";
import {t} from "@/lib/i18n";

const blocks={
  fr:{
    benefits:[["⌂","Location & sous-location","Des solutions flexibles et rentables pour votre bien."],["♟","Gestion complète","De la mise en ligne à la remise des clés, nous nous occupons de tout."],["◈","Sécurité & sérénité","Des locataires fiables et un suivi rigoureux."],["▥","Valorisation de votre bien","Nous optimisons la rentabilité de votre patrimoine."]],
    propertiesLabel:"NOS BIENS",ownersLabel:"PROPRIÉTAIRES",about:"Une expertise locale et un accompagnement personnalisé pour protéger votre patrimoine et optimiser son rendement.",
    ownerPoints:["Étude rapide et gratuite","Gestion 100% prise en charge","Revenus réguliers et sécurisés","Valorisation de votre bien"],
    whyLabel:"VOTRE SÉJOUR",whyTitle:"Pourquoi choisir SHD Immobilier ?",whyText:"Un accompagnement local et des logements sélectionnés pour réserver en toute confiance.",
    why:[["✓","Logements vérifiés","Des biens sélectionnés et contrôlés par notre équipe."],["⌖","Assistance locale","Une équipe disponible à Agadir et dans les environs."],["⌂","Séjour accompagné","Un interlocuteur unique avant et pendant votre séjour."]],
    zonesLabel:"NOS DESTINATIONS",zonesTitle:"Trouvez votre logement dans la région d’Agadir",zonesText:"Découvrez nos biens disponibles dans les principales zones où nous intervenons.",
    zones:["Imi Ouaddar","Agadir","Haut-Founty","Hay Mohammadi","Tamraght","Aït Melloul"],
    processLabel:"PROPRIÉTAIRES",processTitle:"Comment confier votre bien à SHD",processText:"Un processus clair, de la première prise de contact jusqu’à la gestion quotidienne.",
    steps:[["01","Parlez-nous de votre bien","Envoyez les informations essentielles via le formulaire."],["02","Visite et évaluation","Nous étudions le logement et son potentiel locatif."],["03","Proposition personnalisée","Vous recevez une solution adaptée à votre bien."],["04","Mise en location et gestion","SHD prend en charge l’exploitation et le suivi."]],
    faqLabel:"QUESTIONS FRÉQUENTES",faqTitle:"Tout ce qu’il faut savoir",faqs:[["Comment réserver un logement ?","Choisissez un bien puis utilisez le bouton Réserver. Le lien sera activé dès la connexion du moteur de réservation."],["Les logements sont-ils vérifiés ?","Les biens présentés par SHD sont sélectionnés et suivis par notre équipe locale."],["Comment confier mon bien à SHD ?","Remplissez le formulaire de contact en précisant le type de bien et sa localisation. Notre équipe vous recontactera."],["Puis-je demander des informations avant de réserver ?","Oui. Utilisez le formulaire en indiquant la référence du bien concerné."]],
    ctaTitle:"Un logement à réserver ou un bien à confier ?",ctaText:"Découvrez nos logements disponibles ou échangez directement avec notre équipe.",ctaProperties:"Voir les logements",ctaOwner:"Confier mon bien"
  },
  en:{
    benefits:[["⌂","Rental & subletting","Flexible, profitable solutions for your property."],["♟","Complete management","From listing to key handover, we handle it all."],["◈","Security & peace of mind","Reliable tenants and rigorous follow-up."],["▥","Property enhancement","We optimize your property's profitability."]],
    propertiesLabel:"OUR PROPERTIES",ownersLabel:"PROPERTY OWNERS",about:"Local expertise and personal service to protect your property and improve its return.",
    ownerPoints:["Fast, free assessment","Fully managed service","Regular, secure income","Property value enhancement"],
    whyLabel:"YOUR STAY",whyTitle:"Why choose SHD Real Estate?",whyText:"Local support and carefully selected homes so you can book with confidence.",
    why:[["✓","Verified homes","Properties selected and checked by our team."],["⌖","Local assistance","A team available in Agadir and the surrounding area."],["⌂","Supported stay","One point of contact before and during your stay."]],
    zonesLabel:"OUR DESTINATIONS",zonesTitle:"Find your home in the Agadir region",zonesText:"Explore available properties in the main areas covered by our agency.",
    zones:["Imi Ouaddar","Agadir","Haut-Founty","Hay Mohammadi","Tamraght","Aït Melloul"],
    processLabel:"PROPERTY OWNERS",processTitle:"How to entrust your property to SHD",processText:"A clear process from the first contact through day-to-day management.",
    steps:[["01","Tell us about your property","Send the essential information through the form."],["02","Visit and assessment","We review the property and its rental potential."],["03","Tailored proposal","You receive a solution suited to your property."],["04","Listing and management","SHD handles operations and ongoing follow-up."]],
    faqLabel:"FREQUENTLY ASKED QUESTIONS",faqTitle:"Everything you need to know",faqs:[["How do I book a property?","Choose a property and use the Book now button. The link will be activated once the booking engine is connected."],["Are the properties verified?","Properties presented by SHD are selected and monitored by our local team."],["How can I entrust my property to SHD?","Complete the contact form with the property type and location. Our team will contact you."],["Can I ask questions before booking?","Yes. Use the contact form and include the relevant property reference."]],
    ctaTitle:"Looking for a home or ready to list your property?",ctaText:"Explore our available homes or speak directly with our team.",ctaProperties:"View properties",ctaOwner:"List my property"
  },
  ar:{
    benefits:[["⌂","الكراء والكراء الفرعي","حلول مرنة ومربحة لعقارك."],["♟","إدارة متكاملة","نتولى كل شيء من نشر الإعلان إلى تسليم المفاتيح."],["◈","الأمان وراحة البال","مستأجرون موثوقون ومتابعة دقيقة."],["▥","تثمين العقار","نعمل على تحسين مردودية ممتلكاتك."]],
    propertiesLabel:"عقاراتنا",ownersLabel:"مُلّاك العقارات",about:"خبرة محلية وخدمة شخصية لحماية ممتلكاتك وتحسين مردوديتها.",
    ownerPoints:["دراسة سريعة ومجانية","إدارة كاملة للعقار","مداخيل منتظمة وآمنة","تثمين عقارك"],
    whyLabel:"إقامتك",whyTitle:"لماذا تختار SHD للعقارات؟",whyText:"مواكبة محلية ومساكن مختارة لتتمكن من الحجز بكل ثقة.",
    why:[["✓","مساكن موثوقة","عقارات مختارة وتتابعها فرقنا."],["⌖","مساعدة محلية","فريق متوفر في أكادير والمناطق المجاورة."],["⌂","مواكبة أثناء الإقامة","جهة اتصال واحدة قبل إقامتك وأثناءها."]],
    zonesLabel:"وجهاتنا",zonesTitle:"اعثر على سكنك في منطقة أكادير",zonesText:"اكتشف العقارات المتاحة في أهم المناطق التي تغطيها وكالتنا.",
    zones:["إيمي وادار","أكادير","فونتي العليا","حي المحمدي","تامراخت","آيت ملول"],
    processLabel:"مُلّاك العقارات",processTitle:"كيف تعهد بعقارك إلى SHD",processText:"مسار واضح من أول تواصل إلى الإدارة اليومية للعقار.",
    steps:[["01","عرّفنا بعقارك","أرسل المعلومات الأساسية عبر الاستمارة."],["02","المعاينة والتقييم","ندرس العقار وإمكاناته في سوق الإيجار."],["03","عرض مخصص","تتوصل بحل يناسب عقارك."],["04","التسويق والإدارة","تتكلف SHD بالتشغيل والمتابعة المستمرة."]],
    faqLabel:"الأسئلة الشائعة",faqTitle:"كل ما تحتاج إلى معرفته",faqs:[["كيف أحجز مسكناً؟","اختر العقار ثم استخدم زر احجز الآن. سيتم تفعيل الرابط فور ربط محرك الحجز."],["هل تتم معاينة المساكن؟","تختار SHD العقارات المعروضة ويتابعها فريقنا المحلي."],["كيف أعهد بعقاري إلى SHD؟","املأ استمارة الاتصال وحدد نوع العقار وموقعه، وسيتواصل معك فريقنا."],["هل يمكنني طلب معلومات قبل الحجز؟","نعم. استخدم استمارة الاتصال وأدرج مرجع العقار المعني."]],
    ctaTitle:"تبحث عن سكن أو تريد أن تعهد إلينا بعقارك؟",ctaText:"اكتشف مساكننا المتاحة أو تواصل مباشرة مع فريقنا.",ctaProperties:"عرض العقارات",ctaOwner:"اعرض عقاري"
  }
} as const;

export function HomePage({lang,properties}:{lang:Lang;properties:PublicProperty[]}){
  const c=t(lang),b=blocks[lang];
  return <><Header lang={lang}/><main>
    <section className="hero"><div className="heroShade"/><div className="wrap heroInner"><div className="heroCopy"><small>{c.eyebrow}</small><h1>{c.hero}</h1><p>{c.heroText}</p><div className="heroButtons"><Link className="btn" href={`/${lang}/biens`}>⌕ {c.discover}</Link><Link className="btn ghost" href="#proprietaire">⌂ {c.entrust}</Link></div><div className="trust"><span>✓ {lang==="en"?"Professional management":lang==="ar"?"إدارة احترافية":"Gestion professionnelle"}</span><span>✓ {lang==="en"?"Verified tenants":lang==="ar"?"مستأجرون موثوقون":"Locataires vérifiés"}</span><span>✓ {lang==="en"?"Secure income":lang==="ar"?"مداخيل آمنة":"Revenus sécurisés"}</span></div></div><aside className="ownerCard"><div className="ownerIcon">⌂</div><div><h2>{c.owner}</h2><p>{c.ownerText}</p><Link href="#contact">{c.request} →</Link></div></aside></div></section>
    <section className="benefits wrap">{b.benefits.map(([i,h,p])=><article key={h}><i>{i}</i><h3>{h}</h3><p>{p}</p></article>)}</section>
    <section className="featured"><div className="wrap"><div className="sectionHead"><div><small>{b.propertiesLabel}</small><h2>{c.featured}</h2><p>{c.featuredText}</p></div><Link className="outline" href={`/${lang}/biens`}>{c.all} →</Link></div>{properties.length?<div className="propertyGrid">{properties.slice(0,3).map(p=><PropertyCard key={p.reference} property={p} lang={lang}/>)}</div>:<div className="empty">{c.empty}</div>}</div></section>
    <section className="whyShd"><div className="wrap"><div className="blockHead"><small>{b.whyLabel}</small><h2>{b.whyTitle}</h2><p>{b.whyText}</p></div><div className="whyGrid">{b.why.map(([icon,title,text])=><article key={title}><i>{icon}</i><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="zones wrap"><div className="blockHead"><small>{b.zonesLabel}</small><h2>{b.zonesTitle}</h2><p>{b.zonesText}</p></div><div className="zoneList">{b.zones.map(zone=><span key={zone}>⌖ {zone}</span>)}</div><Link className="outline" href={`/${lang}/biens`}>{c.all} →</Link></section>
    <section id="proprietaire" className="ownerSection"><div className="ownerPhoto"/><div className="ownerContent"><small>{b.ownersLabel}</small><h2>{c.ownerTitle}</h2><p>{c.ownerBody}</p><ul>{b.ownerPoints.map(point=><li key={point}>✓ {point}</li>)}</ul><Link className="btn" href="#contact">{c.offer} →</Link></div></section>
    <section className="process"><div className="wrap"><div className="blockHead"><small>{b.processLabel}</small><h2>{b.processTitle}</h2><p>{b.processText}</p></div><div className="steps">{b.steps.map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section id="apropos" className="about wrap"><small>{c.eyebrow}</small><h2>{c.services}</h2><p>{b.about}</p></section>
    <section className="faq wrap"><div className="blockHead"><small>{b.faqLabel}</small><h2>{b.faqTitle}</h2></div><div className="faqList">{b.faqs.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="finalCta"><div className="wrap finalCtaInner"><div><h2>{b.ctaTitle}</h2><p>{b.ctaText}</p></div><div><Link className="btn" href={`/${lang}/biens`}>{b.ctaProperties}</Link><Link className="btn ghost" href="#contact">{b.ctaOwner}</Link></div></div></section>
    <section id="contact" className="contact"><div className="wrap contactInner"><div><small>CONTACT</small><h2>{c.contactTitle}</h2><p>{c.contactText}</p><div className="contactDetails"><p>✉ <a href="mailto:shdimmobillier@gmail.com">shdimmobillier@gmail.com</a></p><p>⌖ Agadir, Maroc</p></div></div><ContactForm lang={lang}/></div></section>
  </main><Footer lang={lang}/></>
}
