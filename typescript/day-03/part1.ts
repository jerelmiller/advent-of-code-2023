import fs from 'node:fs';
import path from 'node:path';

const contents = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf8',
});

function sumOfLine(schematic: string[], line: string, lineNumber: number) {
  let sum = 0;
  let digits = '';
  let matched = false;

  for (let i = 0; i < line.length; i++) {
    if (!line[i].match(/\d/)) {
      if (matched) {
        sum += Number(digits);
      }
      digits = '';
      matched = false;
      continue;
    }

    digits += line[i];

    for (
      let y = Math.max(lineNumber - 1, 0);
      y < Math.min(lineNumber + 2, schematic.length);
      y++
    ) {
      for (let x = Math.max(i - 1, 0); x < Math.min(i + 2, line.length); x++) {
        if (y === lineNumber && x === i) {
          continue;
        }

        const character = schematic[y][x];

        matched ||=
          !character.match(/\d/) &&
          character !== undefined &&
          character !== '.';
      }
    }
  }

  if (matched) {
    sum += Number(digits);
  }

  return sum;
}

const schematic = contents.trim().split('\n');

const sum = schematic.reduce(
  (sum, line, lineNumber) => sum + sumOfLine(schematic, line, lineNumber),
  0
);

console.log(sum);
