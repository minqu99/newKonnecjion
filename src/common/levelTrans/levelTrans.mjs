import sentences from './sentences.json';

let userLevel = "유치원";
let previousSentences = [];

export const loadSentences = async () => {
  return sentences;
};

export const getRandomSentence = (level, sentences) => {
  const availableSentences = sentences[level];
  if (availableSentences.length === 0) {
    return null;
  }

  let newSentence;
  do {
    const randomIndex = Math.floor(Math.random() * availableSentences.length);
    newSentence = availableSentences[randomIndex];
  } while (previousSentences.includes(newSentence) && availableSentences.length > 1);

  previousSentences.push(newSentence);
  return newSentence;
};

export const getUserLevel = () => {
  return userLevel;
};

export const setUserLevel = (level) => {
  userLevel = level;
};
