import fs from 'node:fs';
import path from 'node:path';

const MAX: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

function isGamePossible(line: string) {
  const hands = line.slice(line.indexOf(':') + 1).split(';');

  for (const hand of hands) {
    for (const cube of hand.split(/\s?,/)) {
      const groups = cube.match(/(?<count>\d+) (?<color>\w+)/)!.groups!;

      if (Number(groups.count) > MAX[groups.color]) {
        return false;
      }
    }
  }

  return true;
}

const sum = fs
  .readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf8',
  })
  .trim()
  .split('\n')
  .reduce((sum, line) => {
    const id = Number(line.match(/Game (\d+)/)![1]);

    return isGamePossible(line) ? id + sum : sum;
  }, 0);

console.log(sum);
