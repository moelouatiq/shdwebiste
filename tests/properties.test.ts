import test from "node:test";import assert from "node:assert/strict";import {localizeProperty,parseBoolean,splitList} from "../lib/properties.ts";import type {Property} from "../lib/types.ts";
const p={reference:"SHD-1",title:{fr:"Titre FR",en:"Title EN"},description:{fr:"Description FR"},type:"Appartement",city:"Agadir",district:"",address:"",price:1000,currency:"MAD",bedrooms:1,bathrooms:1,surface:50,images:[],amenities:[],published:true,featured:false} satisfies Property;
test("French is used as translation fallback",()=>{assert.equal(localizeProperty(p,"ar").title,"Titre FR");assert.equal(localizeProperty(p,"ar").description,"Description FR")});
test("Excel booleans accept oui and yes",()=>{assert.equal(parseBoolean("OUI"),true);assert.equal(parseBoolean("yes"),true);assert.equal(parseBoolean("non"),false)});
test("semicolon lists are trimmed",()=>assert.deepEqual(splitList("a ; b;; c "),["a","b","c"]));
