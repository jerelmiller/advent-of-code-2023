import fs from 'node:fs';
import path from 'node:path';

const WORDS_AS_DIGITS: { [key: string]: string } = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

function parseDigits(line: string) {
  const digits: string[] = [];

  for (let i = 0; i < line.length; i++) {
    if (line[i].match(/\d/)) {
      digits.push(line[i]);
      continue;
    }

    for (const word of Object.keys(WORDS_AS_DIGITS)) {
      let matched = false;

      for (let j = 0; j < word.length; j++) {
        matched = word[j] !== undefined && line[i + j] === word[j];

        if (!matched) {
          break;
        }
      }

      if (matched) {
        digits.push(WORDS_AS_DIGITS[word]);
      }
    }
  }

  const first = digits.at(0);
  const last = digits.at(-1);

  if (first === undefined || last === undefined) {
    throw new Error('Could not parse line');
  }

  return Number(first + last);
}

const digits = fs
  .readFileSync(path.resolve(path.join(__dirname, './input.txt')), {
    encoding: 'utf8',
  })
  .trim()
  .split('\n')
  .reduce((sum, line) => sum + parseDigits(line), 0);

console.log(digits);
