import { timingSafeEqual } from "node:crypto";
export function isAdmin(request:Request){const expected=process.env.ADMIN_TOKEN||"";const actual=request.headers.get("x-admin-token")||"";if(!expected||actual.length!==expected.length)return false;return timingSafeEqual(Buffer.from(actual),Buffer.from(expected));}
export function unauthorized(){return Response.json({error:"Accès administrateur refusé."},{status:401});}
