export type Lang = "fr" | "en" | "ar";
export type Property = { reference:string; title:{fr:string;en?:string;ar?:string}; description:{fr:string;en?:string;ar?:string}; type:string; city:string; district:string; address:string; price:number; currency:string; bedrooms:number; bathrooms:number; surface:number; images:string[]; amenities:string[]; published:boolean; featured:boolean; createdAt?:Date; updatedAt?:Date };
export type PublicProperty = Omit<Property,"title"|"description"> & {title:string;description:string};
