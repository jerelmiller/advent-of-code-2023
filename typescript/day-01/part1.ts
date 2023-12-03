import fs from 'node:fs';
import path from 'node:path';

function getDigits(line: string) {
  const match = Array.from(line.matchAll(/\d/g));
  const first = match.at(0);
  const last = match.at(-1);

  if (!first || !last) {
    return 0;
  }

  return Number(first[0] + last[0]);
}

const digits = fs
  .readFileSync(path.resolve(path.join(__dirname, './input.txt')), {
    encoding: 'utf8',
  })
  .trim()
  .split('\n')
  .reduce((sum, line) => sum + getDigits(line), 0);

console.log(digits);
