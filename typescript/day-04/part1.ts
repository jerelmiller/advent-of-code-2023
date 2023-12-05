import fs from 'node:fs';
import path from 'node:path';

const contents = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf8',
});

function pointValue(line: string) {
  const match = line.match(/Card\s+\d+:\s+(\d[\d\s]+)\s+\|\s+(\d[\d\s]+)$/)!;

  if (!match) {
    throw new Error(`Could not parse line: ${line}`);
  }

  const [, winningNums, nums] = match.map((m) => m.split(/\s+/));
  const matchingNums = nums.filter((num) => winningNums.includes(num));

  return matchingNums.length ? 2 ** (matchingNums.length - 1) : 0;
}

const points = fs
  .readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf8',
  })
  .trim()
  .split('\n')
  .reduce((points, line) => points + pointValue(line), 0);

console.log(points);
