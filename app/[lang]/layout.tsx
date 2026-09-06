import {notFound} from "next/navigation";import {languages} from "@/lib/i18n";import type {Lang} from "@/lib/types";
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{lang:string}>}){const {lang}=await params;if(!languages.includes(lang as Lang))notFound();return <div lang={lang} dir={lang==="ar"?"rtl":"ltr"}>{children}</div>}
