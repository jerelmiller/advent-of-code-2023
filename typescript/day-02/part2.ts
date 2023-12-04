import fs from 'node:fs';
import path from 'node:path';

function powerOfGame(line: string) {
  const hands = line.slice(line.indexOf(':') + 1).split(';');
  const minCounts: Record<string, number> = {};

  for (const hand of hands) {
    for (const cube of hand.split(/\s?,/)) {
      const groups = cube.match(/(?<count>\d+) (?<color>\w+)/)!.groups!;
      const count = Number(groups.count);

      minCounts[groups.color] = Math.max(
        minCounts[groups.color] || count,
        count
      );
    }
  }

  return Object.values(minCounts).reduce((a, b) => a * b);
}

const sum = fs
  .readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf8',
  })
  .trim()
  .split('\n')
  .reduce((sum, line) => sum + powerOfGame(line), 0);

console.log(sum);
