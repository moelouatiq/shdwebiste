"use client";
import {usePathname} from "next/navigation";
import type {Lang} from "@/lib/types";

const copy:Record<Lang,{label:string;message:string;property:string}>={
  fr:{label:"Contact rapide WhatsApp",message:"Bonjour SHD Immobilier, je souhaite obtenir plus d’informations.",property:"Je vous contacte au sujet du bien :"},
  en:{label:"Quick WhatsApp contact",message:"Hello SHD Real Estate, I would like more information.",property:"I am contacting you about property:"},
  ar:{label:"تواصل سريع عبر واتساب",message:"مرحباً SHD للعقارات، أود الحصول على مزيد من المعلومات.",property:"أتواصل معكم بخصوص العقار:"}
};

export function WhatsAppButton({lang}:{lang:Lang}){
  const pathname=usePathname();
  const match=pathname.match(/\/(?:fr|en|ar)\/bien\/([^/?#]+)/);
  let reference="";
  if(match?.[1]){try{reference=decodeURIComponent(match[1])}catch{reference=match[1]}}
  const c=copy[lang];
  const message=reference?`${c.message}\n${c.property} ${reference}`:c.message;
  const href=`https://wa.me/212663121027?text=${encodeURIComponent(message)}`;
  return <a className="whatsappButton" href={href} target="_blank" rel="noopener noreferrer" aria-label={c.label} title={c.label}>
    <svg aria-hidden="true" viewBox="0 0 32 32"><path fill="currentColor" d="M16.04 3A12.87 12.87 0 0 0 5.1 22.65L3 29l6.56-2.05A12.95 12.95 0 1 0 16.04 3Zm0 23.7c-2.05 0-4.05-.56-5.79-1.62l-.42-.25-3.89 1.21 1.27-3.77-.27-.43a10.72 10.72 0 1 1 9.1 4.86Zm5.88-8.03c-.32-.16-1.91-.94-2.21-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6a9.71 9.71 0 0 1-1.79-2.23c-.19-.32-.02-.49.14-.65.15-.14.32-.38.49-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.57-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.69s1.16 3.12 1.32 3.34c.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.91-.78 2.18-1.53.27-.76.27-1.42.19-1.55-.08-.14-.3-.22-.62-.38Z"/></svg>
    <span>{c.label}</span>
  </a>;
}
