import {PropertiesPage} from "@/components/PropertiesPage";import type {Lang} from "@/lib/types";
export default async function Page({params}:{params:Promise<{lang:Lang}>}){const {lang}=await params;return <PropertiesPage lang={lang}/>}
