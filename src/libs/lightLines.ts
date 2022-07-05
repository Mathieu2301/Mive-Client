function encode(nbr: number, precision: number): string {
  let hex = nbr.toString(16);
  if (hex.length % 2 !== 0) hex = `0${hex}`;

  let rs = '';
  for (let i = 0; i < hex.length; i += 2) {
    rs += String.fromCharCode(~~`0x${hex[i]}${hex[i + 1]}`);
  }

  return '\0'.repeat(precision - rs.length) + rs;
}

function decode(hex: string): number {
  let nbr = 0;
  for (let i = hex.length - 1; i >= 0; i -= 1) {
    nbr += hex.charCodeAt(i) * 256 ** (hex.length - i - 1);
  }

  return nbr;
}

function compressNumber(nbr: number, min: number, step: number, precision: number) {
  return encode(Math.round((nbr - min) / step), precision);
}

function uncompressNumber(hex: string, min: number, step: number) {
  return Math.round((decode(hex) * step + min) * 10 ** 8) / 10 ** 8;
}

/**
 * Compress a lineString to a bin string.
 * @param line Input lineString
 * @param precision Compression precision (number of bytes). Recommended to be between 2 and 6 (Default is 4).
 * @returns Compressed lineString as a bin string.
 */
export function compressLineString(line: [number, number][], precision: number = 4): string {
  const min: [number, number] = [Infinity, Infinity];
  const max: [number, number] = [0, 0];

  for (const e of line) {
    if (e[0] < min[0]) min[0] = e[0];
    if (e[1] < min[1]) min[1] = e[1];
    if (e[0] > max[0]) max[0] = e[0];
    if (e[1] > max[1]) max[1] = e[1];
  }

  const step: [number, number] = [(max[0] - min[0]) / (256 ** precision - 1), (max[1] - min[1]) / (256 ** precision - 1)];

  const mins = `${encode(min[0] * 10 ** 10, 10)}${encode(min[1] * 10 ** 10, 10)}`;
  const steps = `${encode(step[0] * 10 ** 28, 10)}${encode(step[1] * 10 ** 28, 10)}`;

  return `${encode(precision, 1)}${mins}${steps}${line.map((e) =>
    `${compressNumber(e[0], min[0], step[0], precision)}${compressNumber(e[1], min[1], step[1], precision)}`
  ).join('')}`;
}

export function uncompressLineString(bin: string): [number, number][] {
  const precision = decode(bin.slice(0, 1));
  const min = [decode(bin.slice(1, 11)) / 10 ** 10, decode(bin.slice(11, 21)) / 10 ** 10];
  const step = [decode(bin.slice(21, 31)) / 10 ** 28, decode(bin.slice(31, 41)) / 10 ** 28];

  const lineString: [number, number][] = [];
  for (let i = 41; i < bin.length; i += precision * 2) {
    lineString.push([
      uncompressNumber(bin.slice(i, i + precision), min[0], step[0]),
      uncompressNumber(bin.slice(i + precision, i + precision * 2), min[1], step[1])
    ]);
  }
  return lineString;
}
