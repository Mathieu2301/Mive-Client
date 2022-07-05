import fs from 'fs';

interface RelationMember {
  type: 'node' | 'way' | 'relation';
  ref: string;
  role: '' | 'platform' | 'stop';
}

interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: string;
  tags?: { [tagName: string]: string };
  members?: RelationMember[];
  lat?: number;
  lon?: number;
  nodes?: number[];
}

const overpassElems = JSON.parse(
  fs.readFileSync('input.json', 'utf8'),
).elements as OverpassElement[];

class Node {
  id: string;
  lat: number;
  lon: number;

  constructor(id: string, lat: number, lon: number) {
    this.id = id;
    this.lat = lat;
    this.lon = lon;
  }

  is(other: Node): boolean {
    return this.id === other.id;
  }

  distanceTo(other: Node): number {
    const latDiff = this.lat - other.lat;
    const lonDiff = this.lon - other.lon;
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
  }

  getAngle(b: Node, c: Node) {
    const ab = this.distanceTo(b);
    const bc = b.distanceTo(c);
    const ac = this.distanceTo(c);
    return Math.acos((ab ** 2 + bc ** 2 - ac ** 2) / (2 * ab * bc)) * 180 / Math.PI;
  }
}

class Chunk {
  id: string;
  nodeIDs: number[];

  get nodes(): Node[] {
    return this.nodeIDs.map((id) => nodes[id]);
  }

  get startNode(): Node {
    return nodes[this.nodeIDs[0]];
  }

  get endNode(): Node {
    return nodes[this.nodeIDs[this.nodeIDs.length - 1]];
  }

  constructor(id: string, nodeIDs: number[]) {
    this.id = id;
    this.nodeIDs = nodeIDs;
  }

  getNode(i: number) {
    return nodes[this.nodeIDs[i >= 0 ? i : this.nodeIDs.length + i]];
  }

  getNodes(i1: number, i2: number): Node[] {
    return this.nodeIDs.slice(i1, i2).map((id) => nodes[id]);
  }

  /**
   * Calculate full path length
   */
  getLength(): number {
    let length = 0;
    for (let i = 0; i < this.nodeIDs.length - 1; i += 1) {
      length += nodes[this.nodeIDs[i]].distanceTo(nodes[this.nodeIDs[i + 1]]);
    }
    return Math.round(length * 10000000) / 10000000;
  }

  isReversed(): boolean {
    return this.id[0] === 'r';
  }

  canMergeWith(next: Chunk | Path): boolean {
    return (
      this.endNode.is(next.startNode)
      && this.getNode(-2).getAngle(next.getNode(0), next.getNode(1)) > 150
    );
  }
}

class Relation {
  id: string;
  ref: string;
  private chunkIDs: string[] = [];
  stopIDs: number[] = [];

  constructor(elem: OverpassElement) {
    this.id = elem.id;
    this.ref = elem.tags?.ref ?? '';

    for (const member of (elem.members as RelationMember[])) {
      if (member.role === '') this.chunkIDs.push(member.ref);
      else if (member.role === 'stop') this.stopIDs.push(Number(member.ref));
    }
  }

  /**
   * Chunks triés par distance décroissante
   */
  getChunks(): Chunk[] {
    return this.chunkIDs
      .concat(this.chunkIDs.map((id) => `r${id}`))
      .map((id) => chunks[id])
      .sort((a, b) => b.getLength() - a.getLength());
  }

  getPathCover(p: Path): number {
    return Math.round(this.stopIDs.filter((sID) => p.nodeIDs.includes(sID)).length / this.stopIDs.length * 100);
  }
}

const relations: { [relID: string]: Relation } = {};
const chunks: { [chunkID: string]: Chunk } = {};
const nodes: { [nodeID: string]: Node } = {};

for (const elem of overpassElems) {
  if (elem.type === 'node') nodes[elem.id] = new Node(elem.id, elem.lat as number, elem.lon as number);
  else if (elem.type === 'way') {
    const wayNodes = elem.nodes as number[];
    chunks[elem.id] = new Chunk(elem.id, wayNodes);
    chunks[`r${elem.id}`] = new Chunk(`r${elem.id}`, wayNodes.slice().reverse());
  } else if (elem.type === 'relation') {
    relations[elem.id] = new Relation(elem);
  } else throw new Error(`Unknown element type: ${elem.type}`);
}

class Path extends Chunk {
  merged: string[] = [];

  constructor(id: string, nodeIDs: number[]) {
    super(id, nodeIDs);
  }

  mergeLeft(other: Chunk | Path): void {
    const left = (other.endNode.id === this.startNode.id)
      ? other.nodeIDs.slice(0, -1)
      : other.nodeIDs;
    this.nodeIDs = [...left, ...this.nodeIDs];
    this.merged.push(other.id);
    if (other instanceof Path) this.merged.push(...other.merged);
  }

  mergeRight(other: Chunk | Path): void {
    const left = (other.startNode.id === this.endNode.id)
      ? this.nodeIDs.slice(0, -1)
      : this.nodeIDs;
    this.nodeIDs = [...left, ...other.nodeIDs];
    this.merged.push(other.id);
    if (other instanceof Path) this.merged.push(...other.merged);
  }

  clone(): Path {
    const splitted = this.id.split('_clone');
    const clonedI = Number(splitted[1] ?? -1);
    const cloned = new Path(`${splitted[0]}_clone${clonedI + 1}`, this.nodeIDs);
    cloned.merged = this.merged;
    return cloned;
  }

  autoMerge(chunks: (Chunk | Path)[]): Path[] {
    const possibilities: Path[] = [this];

    for (const chunk of chunks) {
      if (this.merged.includes(chunk.id) || this.id === chunk.id) continue;

      if (this.canMergeWith(chunk)) { // Merge right
        const newPath = this.clone();
        newPath.mergeRight(chunk);
        possibilities.push(...newPath.autoMerge(chunks));
      } else if (chunk.canMergeWith(this)) { // Merge left
        const newPath = this.clone();
        newPath.mergeLeft(chunk);
        possibilities.push(...newPath.autoMerge(chunks));
      }
    }

    return possibilities;
  }

  getMinAngle(): number {
    let min = 180;

    for (let i = 1; i < this.nodeIDs.length - 2; i += 1) {
      const [a, b, c] = this.getNodes(i, i + 3);
      const angle = a.getAngle(b, c);
      if (angle < min) min = angle;
    }

    return Math.round(min * 1000) / 1000;
  }

  getReversedPercent(): number {
    return Math.round(this.merged.filter((m) => m[0] === 'r').length / this.merged.length * 10000) / 100;
  }
}

function processRelation(relation: Relation) {
  if (relation.ref[0] !== '4') return;
  console.log('Processing route', relation.ref);

  const paths = [];
  const nodePaths: string[] = [];

  const chunks = relation.getChunks();

  for (const i in chunks) {
    if (chunks[i].isReversed()) continue;
    const newPaths = new Path(`${relation.ref}_${i}`, chunks[i].nodeIDs)
      .autoMerge(chunks)
      .filter((p) => !nodePaths.includes(p.nodeIDs.join()))
      .filter((p) => relation.getPathCover(p) >= 47);
    newPaths.forEach((p) => {
      for (let j = 0; j < p.nodeIDs.length; j += 1) {
        for (let k = j + 1; k < p.nodeIDs.length; k += 1) {
          if (p.nodeIDs[j] !== p.nodeIDs[k]) continue;
          console.log(`Duplicate node ${p.nodeIDs[j]} in path ${p.id}`);
          process.exit(1);
        }
      }
    });
    paths.push(...newPaths);
    nodePaths.push(...newPaths.map((p) => p.nodeIDs.join()));
  }

  paths.sort((a, b) => b.getLength() - a.getLength());
  paths.sort((a, b) => a.getReversedPercent() - b.getReversedPercent());

  for (const s in paths) console.log(paths[s]);
  for (const s in paths) console.log(`length${s}: ${paths[s].getLength()} (${paths[s].nodeIDs.length} nodes)`);
  for (const s in paths) console.log(`minAngle${s}: ${paths[s].getMinAngle()}°`);
  for (const s in paths) console.log(`reversedPercent${s}: ${paths[s].getReversedPercent()} %`);
  for (const s in paths) console.log(`coverPercent${s}: ${relation.getPathCover(paths[s])} %`);
  for (const s in paths) savePath(
    paths[s],
    `${relation.ref}_${s}_${Math.round(paths[s].getReversedPercent())}%_${relation.getPathCover(paths[s])}%`,
  );
  console.log(`Found ${paths.length} paths`);
}

function savePath(path: Path, name: string) {
  let pathFileContent = '';
  for (const node of path.nodes) pathFileContent += `  [${node.lon}, ${node.lat}],\n`;
  fs.writeFileSync(`output_${name}.txt`, pathFileContent.slice(0, -1));
}

for (const rel of Object.values(relations)) processRelation(rel);

console.log('Done !');
