import fs from 'fs';

interface RelationMember {
  type: 'node' | 'way' | 'relation';
  ref: number;
  role: '' | 'platform' | 'stop';
}

interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  tags?: { [tagName: string]: string };
  members?: RelationMember[];
  lat?: number;
  lon?: number;
  nodes?: number[];
}

const overpassElems = JSON.parse(
  fs.readFileSync('input.json', 'utf8'),
).elements as OverpassElement[];

const routes: { [relID: number]: number[] } = {};
const ways: { [wayID: number]: number[] } = {};
const coords: { [nodeID: number]: [number, number] } = {};

for (const node of overpassElems) {
  if (node.type === 'node') coords[node.id] = [node.lon as number, node.lat as number];
  else if (node.type === 'way') ways[node.id] = node.nodes as number[];
  else if (node.type === 'relation') {
    routes[node.id] = (node.members as RelationMember[])
      .filter((m) => m.role === '')
      .map((m) => m.ref);
  } else throw new Error(`Unknown element type: ${node.type}`);
}

for (const routeID in routes) {
  const availablesWays: { [startingNodeID: number]: number[] } = {};

  console.log(`Route ${routeID}: ${routes[routeID].length} ways`);
  for (const relWayID of routes[routeID]) {
    const startingNodeID = ways[relWayID][0];
    // if (availablesWays[startingNodeID]) throw new Error(`Duplicate starting node: ${startingNodeID}`);

    availablesWays[startingNodeID] = [];
    console.log(`  Way n${startingNodeID} (w${relWayID}): ${ways[relWayID].length} nodes`);
    for (const wayNodeID of ways[relWayID]) {
      availablesWays[startingNodeID].push(wayNodeID);
    }
  }

  const chunks: [number, number][][] = [];

  while (Object.keys(availablesWays).length > 0) {
    let currentNodeID = Number(Object.keys(availablesWays)[0]);
    const chunkStart = coords[availablesWays[currentNodeID][0]];
    const chunk: [number, number][] = [chunkStart];

    while (availablesWays[currentNodeID]) {
      const currentElem = availablesWays[currentNodeID];
      currentElem.shift();

      for (const nodeID of currentElem) chunk.push(coords[nodeID]);

      delete availablesWays[currentNodeID];
      currentNodeID = currentElem.pop() as number;
    }
    console.log('Unexisting node:', currentNodeID);
    chunks.push(chunk);
  }

  for (let i = 0; i < chunks.length; i += 1) {
    const chunk1 = chunks[i];
    const lastElem = chunk1[chunk1.length - 1];
    for (let j = 0; j < chunks.length; j += 1) {
      const chunk2 = chunks[j];
      const firstElem = chunk2[0];
      if (lastElem[0] === firstElem[0] && lastElem[1] === firstElem[1]) {
        chunks[i] = chunks[i].concat(chunks[j].slice(1));
        chunks.splice(j, 1);
        j -= 1;
      }
    }
    chunk1.reverse();
    for (let j = 0; j < chunks.length; j += 1) {
      const chunk2 = chunks[j];
      const firstElem = chunk2[0];
      if (lastElem[0] === firstElem[0] && lastElem[1] === firstElem[1]) {
        chunks[i] = chunks[i].concat(chunks[j].slice(1));
        chunks.splice(j, 1);
        j -= 1;
      }
    }
    chunk1.reverse();
  }

  console.log(chunks, `=> ${chunks.length} chunk${chunks.length > 1 ? 's' : ''}`);

  let i = 0;
  for (const chunk of chunks) {
    let pathFile = '';
    for (const [lon, lat] of chunk) pathFile += `  [${lon}, ${lat}],\n`;
    pathFile += '\n';
    fs.writeFileSync(`output_${routeID}_${i}.txt`, pathFile.slice(0, -1));
    i += 1;
  }

  // console.log(`Route ${routeID}: ${routes[routeID].length} ways`);
  // for (const relWayID of routes[routeID]) {
  //   console.log(`  Way ${relWayID}: ${ways[relWayID].length} nodes`);
  //   for (const wayNode of ways[relWayID]) {
  //     pathFile += `  [${coords[wayNode][0]}, ${coords[wayNode][1]}],\n`;
  //   }
  //   pathFile += '\n';
  // }
}

console.log('Done !');
