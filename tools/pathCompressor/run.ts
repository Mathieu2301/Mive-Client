import fs from 'fs';
import { compressLineString, uncompressLineString } from '../../src/libs/lightLines';

const listJSON = fs.readFileSync('input.json', 'utf8');
const list = JSON.parse(listJSON);

const compressed = compressLineString(list, 4);

console.log('Checking values...');

const uncompressed = uncompressLineString(compressed);
for (const i in uncompressed) {
  if (uncompressed[i][0] !== list[i][0]) {
    console.log(`Value error for ${i}: ${uncompressed[i][0]} !== ${list[i][0]}`);
    process.exit(1);
  }
  if (uncompressed[i][1] !== list[i][1]) {
    console.log(`Value error for ${i}: ${uncompressed[i][1]} !== ${list[i][1]}`);
    process.exit(1);
  }
}

console.log('Values: OK\n');

console.log(`Compression: ${listJSON.length} bytes => ${compressed.length} bytes (${Math.round(compressed.length / listJSON.length * 1000 ) / 10} %)\n`);

console.log('Writing output... (compressed.txt)');
fs.writeFileSync('compressed.txt', compressed);

console.log('Reading output... (compressed.txt)');
const binPath = fs.readFileSync('compressed.txt', 'utf8');
console.log('Parsing output...');
const parsedPath = uncompressLineString(binPath);

console.log('Same values:', JSON.stringify(parsedPath) === listJSON, '\n');

{
  const iterations = 10000;
  const start = Date.now();
  for (let i = 0; i < iterations; i++) compressLineString(list, 4);
  const end = Date.now();
  console.log(`Compression time: ${Math.round((end - start) / iterations * 100000) / 100} µs`);
}
{
  const iterations = 10000;
  const start = Date.now();
  for (let i = 0; i < iterations; i++) JSON.parse(listJSON);
  const end = Date.now();
  console.log(`JSON parse time: ${Math.round((end - start) / iterations * 100000) / 100} µs`);
}
{
  const iterations = 10000;
  const start = Date.now();
  for (let i = 0; i < iterations; i++) uncompressLineString(binPath);
  const end = Date.now();
  console.log(`Uncompression time: ${Math.round((end - start) / iterations * 100000) / 100} µs`);
}
