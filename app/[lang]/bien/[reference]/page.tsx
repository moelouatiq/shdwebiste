import {ContactForm} from "@/components/ContactForm";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {t} from "@/lib/i18n";
import {getDb} from "@/lib/mongodb";
import {localizeProperty} from "@/lib/properties";
import type {Lang,Property} from "@/lib/types";
import {notFound} from "next/navigation";

export default async function Page({params}:{params:Promise<{lang:Lang;reference:string}>}){
  const {lang,reference}=await params;
  let row;
  try{row=await (await getDb()).collection<Property>("properties").findOne({reference:decodeURIComponent(reference),published:true})}catch{}
  if(!row)notFound();
  const {_id,...plain}=row,p=localizeProperty(plain,lang),c=t(lang),bookingUrl=process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL;
  return <><Header lang={lang}/><main className="detail wrap"><div className="detailGallery">{p.images.length?p.images.map((x,i)=><img key={x} src={x} alt={`${p.title} ${i+1}`}/>):<div className="imageFallback"/>}</div><div className="detailInfo"><small>{p.reference} · {p.type}</small><h1>{p.title}</h1><p className="location">⌖ {[p.address,p.district,p.city].filter(Boolean).join(", ")}</p>{bookingUrl?<a className="btn bookingCta" href={bookingUrl} target="_blank" rel="noopener noreferrer">{c.book}</a>:<span className="btn bookingCta disabled" title={c.bookingPending} aria-disabled="true">{c.book}</span>}<div className="facts"><span>▣ {p.bedrooms}</span><span>♨ {p.bathrooms}</span><span>▱ {p.surface} m²</span></div><p>{p.description}</p><div className="amenities">{p.amenities.map(x=><span key={x}>✓ {x}</span>)}</div><h2>Contact</h2><ContactForm lang={lang} propertyReference={p.reference}/></div></main><Footer lang={lang}/></>
}
