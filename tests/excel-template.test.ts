import test from "node:test";
import assert from "node:assert/strict";
import {readSheet} from "read-excel-file/node";

test("Excel template contains the required import columns",async()=>{
  const rows=await readSheet("public/modele-biens-shd.xlsx");
  assert.deepEqual(rows[0],["reference","titre_fr","titre_en","titre_ar","description_fr","description_en","description_ar","type","ville","quartier","adresse","prix","devise","chambres","salles_de_bain","surface","images","equipements","publie","mis_en_avant"]);
  assert.equal(rows[1][0],"SHD-IMI-001");
});
