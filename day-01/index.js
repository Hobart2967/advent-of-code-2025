const starting = 50;
const RIGHT = 1;
const LEFT = -1;

let current = starting;
let zeroCounter = 0;
let zeroIncludedCounter = 0;

function turn(modifier, value) {
  let newValue = current;


  for (let i = 0; i < value; i++) {
    newValue += modifier;

    if (newValue < 0) {
      newValue = 99;
    } else if(newValue > 99) {
      newValue = 0;
    }

    if (newValue === 0) {
      zeroIncludedCounter += 1;
    }
  }

  if (newValue === 0) {
    zeroCounter += 1;
  }

  console.log(`Turning ${modifier === RIGHT ? 'RIGHT' : 'LEFT'} by ${value} from ${current} to ${newValue}`);

  current = newValue;
}

const input = require('fs').readFileSync(require('path').join(process.cwd(), process.argv[2]), 'utf-8');

function parseInput(input) {
  const lines = input.split('\n').filter(line => line.length > 0);
  const commands = lines.map(line => {
    const [_, direction, value] = /([A-Z])(\d+)/.exec(line);
    return () => turn(direction === 'R'
      ? RIGHT
      : LEFT, parseInt(value, 10));
  });

  return commands;
}

const commands = parseInput(input);
commands.forEach(command => command());

console.log(current);

console.log(`Password is ${zeroCounter}`);
console.log(`Password with password method 0x434C49434B is ${zeroIncludedCounter}`);