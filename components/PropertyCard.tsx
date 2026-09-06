import Link from "next/link";
import type {Lang,PublicProperty} from "@/lib/types";
import {t} from "@/lib/i18n";

export function PropertyCard({property:p,lang}:{property:PublicProperty;lang:Lang}){
  const image=p.images?.[0]||"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
  const c=t(lang),bookingUrl=process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL;
  return <article className="propertyCard"><div className="propertyImage" style={{backgroundImage:`url(${image})`}}><span>{p.type}</span></div><div className="propertyBody"><h3>{p.title}</h3><p className="location">⌖ {p.district?p.district+", ":""}{p.city}</p><div className="facts"><span>▣ {p.bedrooms}</span><span>♨ {p.bathrooms}</span><span>▱ {p.surface} m²</span></div><div className="cardBottom"><Link href={`/${lang}/bien/${encodeURIComponent(p.reference)}`}>{c.details} →</Link>{bookingUrl?<a className="bookingButton" href={bookingUrl} target="_blank" rel="noopener noreferrer">{c.book}</a>:<span className="bookingButton disabled" title={c.bookingPending} aria-disabled="true">{c.book}</span>}</div></div></article>
}
