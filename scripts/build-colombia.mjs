// Genera src/content/colombia.ts: contornos de Colombia y países vecinos en
// coordenadas proyectadas (equirectangular), a partir de world-atlas
// (Natural Earth, dominio público). Ejecutar: node scripts/build-colombia.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";

const LON0 = -82;
const LAT0 = 13.5;
const K = 100; // unidades por grado
const COS = Math.cos((4.5 * Math.PI) / 180);
const proj = ([lon, lat]) => [(lon - LON0) * K * COS, (LAT0 - lat) * K];

function toPath(geom) {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  let d = "";
  for (const poly of polys) {
    for (const ring of poly) {
      let last = "";
      const pts = [];
      for (const c of ring) {
        const [x, y] = proj(c);
        const p = `${x.toFixed(1)} ${y.toFixed(1)}`;
        if (p !== last) pts.push(p);
        last = p;
      }
      if (pts.length > 2) d += `M${pts.join("L")}Z`;
    }
  }
  return d;
}

const load = (res) => {
  const topo = JSON.parse(readFileSync(`node_modules/world-atlas/countries-${res}.json`, "utf8"));
  return feature(topo, topo.objects.countries).features;
};

const colombia = load("10m").find((f) => f.id === "170");
const vecinos = load("50m").filter((f) => ["862", "218", "604", "076", "591", "188"].includes(f.id));

const out = `// Generado por scripts/build-colombia.mjs a partir de world-atlas (Natural Earth, dominio público). No editar a mano.
export const MAP = { lon0: ${LON0}, lat0: ${LAT0}, k: ${K}, cos: ${COS} };

/** Proyecta latitud/longitud a las coordenadas de los contornos. */
export const proj = (lat: number, lon: number) => ({ x: (lon - MAP.lon0) * MAP.k * MAP.cos, y: (MAP.lat0 - lat) * MAP.k });

export const colombiaPath = ${JSON.stringify(toPath(colombia.geometry))};

export const vecinosPath = ${JSON.stringify(vecinos.map((f) => toPath(f.geometry)).join(""))};
`;
writeFileSync("src/content/colombia.ts", out);
console.log("colombia.ts", (out.length / 1024).toFixed(0), "KB");
