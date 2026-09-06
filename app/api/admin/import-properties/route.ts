import {readSheet} from "read-excel-file/node";
import {z} from "zod";
import {getDb} from "@/lib/mongodb";
import {isAdmin,unauthorized} from "@/lib/admin";
import {parseBoolean,splitList} from "@/lib/properties";

export const runtime="nodejs";
const MAX=5*1024*1024;
const rowSchema=z.object({
  reference:z.string().min(1).max(100),titre_fr:z.string().min(1),titre_en:z.string().optional(),titre_ar:z.string().optional(),
  description_fr:z.string().default(""),description_en:z.string().optional(),description_ar:z.string().optional(),
  type:z.string().default("Appartement"),ville:z.string().default(""),quartier:z.string().default(""),adresse:z.string().default(""),
  prix:z.coerce.number().nonnegative(),devise:z.string().default("MAD"),chambres:z.coerce.number().int().nonnegative().default(0),
  salles_de_bain:z.coerce.number().int().nonnegative().default(0),surface:z.coerce.number().nonnegative().default(0),
  images:z.any().optional(),equipements:z.any().optional(),publie:z.any().optional(),mis_en_avant:z.any().optional()
});

export async function POST(request:Request){
  if(!isAdmin(request))return unauthorized();
  const data=await request.formData(),file=data.get("file");
  if(!(file instanceof File))return Response.json({error:"Fichier manquant."},{status:400});
  if(file.size>MAX)return Response.json({error:"Le fichier dépasse 5 Mo."},{status:413});
  if(!/\.xlsx$/i.test(file.name))return Response.json({error:"Format .xlsx requis."},{status:400});
  let raw:Record<string,unknown>[];
  try{
    const rows=await readSheet(Buffer.from(await file.arrayBuffer()));
    const headers=rows[0].map(String);
    raw=rows.slice(1).filter(row=>row.some(value=>value!==null&&value!==""))
      .map(row=>Object.fromEntries(headers.map((header,index)=>[header,row[index]??""])));
  }catch{return Response.json({error:"Fichier Excel illisible."},{status:400})}
  if(!raw.length||raw.length>1000)return Response.json({error:"Le fichier doit contenir entre 1 et 1000 lignes."},{status:400});
  const valid:ReturnType<typeof rowSchema.parse>[]=[],errors:{row:number;error:string}[]=[];
  raw.forEach((row,index)=>{try{valid.push(rowSchema.parse(row))}catch(error){errors.push({row:index+2,error:error instanceof Error?error.message:"Ligne invalide"})}});
  if(errors.length)return Response.json({error:"Certaines lignes sont invalides.",errors},{status:422});
  const unique=new Map(valid.map(row=>[row.reference.trim(),row]));
  const db=await getDb(),now=new Date(),refs=[...unique.keys()];
  const existing=new Set((await db.collection("properties").find({reference:{$in:refs}},{projection:{reference:1}}).toArray()).map(row=>row.reference));
  const operations=[...unique.entries()].map(([reference,row])=>({updateOne:{
    filter:{reference},upsert:true,
    update:{$set:{reference,title:{fr:row.titre_fr.trim(),en:row.titre_en?.trim(),ar:row.titre_ar?.trim()},
      description:{fr:row.description_fr.trim(),en:row.description_en?.trim(),ar:row.description_ar?.trim()},
      type:row.type.trim(),city:row.ville.trim(),district:row.quartier.trim(),address:row.adresse.trim(),price:row.prix,
      currency:row.devise.trim()||"MAD",bedrooms:row.chambres,bathrooms:row.salles_de_bain,surface:row.surface,
      images:splitList(row.images),amenities:splitList(row.equipements),published:parseBoolean(row.publie),
      featured:parseBoolean(row.mis_en_avant),updatedAt:now},$setOnInsert:{createdAt:now}}
  }}));
  await db.collection("properties").bulkWrite(operations,{ordered:false});
  const summary={total:unique.size,created:refs.filter(ref=>!existing.has(ref)).length,updated:refs.filter(ref=>existing.has(ref)).length,duplicatesInFile:valid.length-unique.size};
  await db.collection("import_logs").insertOne({...summary,fileName:file.name,createdAt:now});
  return Response.json({ok:true,...summary});
}
