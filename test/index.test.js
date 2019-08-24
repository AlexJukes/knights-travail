require('mocha');
const { expect } = require('chai');
const { generateChessBoard } = require('..');

describe("Knight's Travails", () => {
  describe('generateChessBoard', () => {
    it("will generate and 8 x 8 grid of Nodes", () => {
      console.log('generateChessBoard', generateChessBoard);
      const chessBoard = generateChessBoard();
      expect(chessBoard.length).to.equal(8)
      chessBoard.map(row => {
        expect(row.length).to.equal(8);
        row.map(node => {
          expect(Object.keys(node)).to.include('movesSoFar', 'estimatedTimeToFinish', 'overallScore', 'parent');
        })
      })
    })
  })
})