const { json } = require("body-parser");
const { words } = require("../data/words");

const handlerGetWord = async (req, res) => {
  const wordId = req.params.id;
  const wordObject = words.find((word) => {
    if (word.id === wordId) return word;
  });

  res.status(200).json({
    status: 200,
    word: wordObject,
  });
};

const handlerGetRandomWord = async (req, res) => {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const wordData = { id: randomWord.id, letterCount: randomWord.letterCount };

  res.status(200).json({
    status: 200,
    wordData: wordData,
  });
};

const handlerGuessStatus = async (req, res) => {
  const wordId = req.params.id;
  const letterGuess = req.params.letter;
  let booleanArray = [];
  const wordObject = words.find((word) => {
    return word.id === wordId;
  });
  const word = wordObject.word;
  const wordArray = word.split("");

  if (booleanArray.length === 0) {
    wordArray.forEach((word) => {
      booleanArray.push(false);
    });
  }

  wordArray.forEach((letter, index) => {
    if (letter === letterGuess) {
      booleanArray[index] = true;
    } else {
      booleanArray[index] = false;
    }
  });

  res.status(200).json({
    status: 200,
    statusArray: booleanArray,
  });
};
// write your handlers here...

module.exports = { handlerGetWord, handlerGetRandomWord, handlerGuessStatus };
