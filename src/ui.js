/* eslint-disable no-console */
const readline = require('readline');
const { getBoardIndexFromNotation, getNotationFromBoardIndex } = require('./helpers');
const { findBestMoveSet } = require('./logic');

const parseInputForMoves = (input) => {
  const [startInput, endInput] = input.split(' ');
  const start = getBoardIndexFromNotation(startInput.toLowerCase());
  const end = getBoardIndexFromNotation(endInput.toLowerCase());
  return [start, end];
};

const run = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log('So you think you can beat me? Pah! Let us see...');
  rl.question('Give me the starting square and ending square, separated by a space. No funny business!', (answer) => {
    const [start, end] = parseInputForMoves(answer);
    const bestMoves = findBestMoveSet(start, end);
    const result = bestMoves.map(move => getNotationFromBoardIndex(move));
    console.log(`I can do it in ${result.length} moves! They are: ${result}`);
    rl.close();
  });
};

run();