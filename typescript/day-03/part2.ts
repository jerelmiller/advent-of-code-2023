import fs from 'node:fs';
import path from 'node:path';

function isDigit(character: string) {
  return Boolean(character.match(/\d/));
}

function isBetween(num: number, start: number, end: number) {
  return num >= start && num <= end;
}

function parseNumLocations(line: string, lineNumber: number) {
  let digits = '';
  const nums: Array<{
    number: number;
    start: number;
    end: number;
    lineNumber: number;
  }> = [];

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (!isDigit(char)) {
      if (digits) {
        nums.push({
          number: Number(digits),
          start: i - digits.length,
          end: i - 1,
          lineNumber,
        });
      }

      digits = '';
      continue;
    }

    digits += char;
  }

  if (digits.length) {
    nums.push({
      number: Number(digits),
      start: line.length - digits.length,
      end: line.length - 1,
      lineNumber,
    });
  }

  return nums;
}

function getPartNumbersConnectedToCoordinate(
  index: number,
  lineNumber: number
) {
  const nums: number[] = [];

  for (const location of numLocations) {
    if (
      isBetween(location.lineNumber, lineNumber - 1, lineNumber + 1) &&
      (isBetween(location.start, index - 1, index + 1) ||
        isBetween(location.end, index - 1, index + 1))
    ) {
      nums.push(location.number);
    }
  }

  return nums;
}

function gearRatio(index: number, lineNumber: number) {
  const partNumbers = getPartNumbersConnectedToCoordinate(index, lineNumber);

  return partNumbers.length === 2 ? partNumbers[0] * partNumbers[1] : 0;
}

function computeLine(line: string, lineNumber: number) {
  return Array.from(line).reduce((sum, character, index) => {
    return character === '*' ? sum + gearRatio(index, lineNumber) : sum;
  }, 0);
}

const contents = fs.readFileSync(
  path.resolve(path.join(__dirname, './input.txt')),
  { encoding: 'utf8' }
);

const schematic = fs
  .readFileSync(path.resolve(path.join(__dirname, './input.txt')), {
    encoding: 'utf8',
  })
  .trim()
  .split('\n');

const numLocations = schematic.flatMap(parseNumLocations);

const sum = schematic.reduce(
  (sum, line, lineNumber) => sum + computeLine(line, lineNumber),
  0
);

console.log(sum);
