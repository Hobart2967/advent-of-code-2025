const file = process.argv[2] ?? 'day-02/sample.txt';
const part1 = true;
const input = require('fs').readFileSync(require('path').join(process.cwd(), file), 'utf-8');

function parseInput(input) {
  return input
    .split(',')
    .map(idRange => idRange.split('-')
    .map(id => parseInt(id, 10)));

}

const ranges = parseInput(input);
const invalidIds = [];

for (const [start, end] of ranges) {
  let rangeDuplicateCounter = 0;
  for (let id = start; id <= end; id++) {
    const idString = id.toString();
    const regex = part1
      ? /^(\d+)\1$/g
      : /^(\d+)\1+$/g
    if(regex.test(idString)) {
      rangeDuplicateCounter++;
      invalidIds.push(id);
    }
  }
}

console.log('Invalid IDs:', JSON.stringify(invalidIds, null, 2));
console.log('Total Invalid IDs:', invalidIds.reduce((prev, cur) => prev + cur, 0));
