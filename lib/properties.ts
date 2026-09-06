import type {Lang,Property,PublicProperty} from "./types";
export function localizeProperty(p:Property,lang:Lang):PublicProperty{return {...p,title:p.title[lang]||p.title.fr,description:p.description[lang]||p.description.fr};}
export function parseBoolean(v:unknown){return ["oui","yes","true","1","نعم"].includes(String(v??"").trim().toLowerCase());}
export function splitList(v:unknown){return String(v??"").split(";").map(x=>x.trim()).filter(Boolean);}
