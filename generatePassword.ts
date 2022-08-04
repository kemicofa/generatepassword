import { DEFAULT_LENGTH, LETTERS, NUMBERS, SYMBOLS } from "./constants.ts";
import getRandomCharacters from "./getRandomCharacters.ts";
import shuffle from "./shuffle.ts";

interface GeneratePasswordOptions {
  /**
   * Defaults to 10
   */
  numberOfSymbols?: number;
  /**
   * Defaults to 10
   */
  numberOfUppercaseLetters?: number;
  /**
   * Defaults to 10
   */
  numberOfLowercaseLetters?: number;
  /**
   * Defaults to 10
   */
  numberOfNumbers?: number;
}

const generatePassword = (options: GeneratePasswordOptions = {}) => {
  const {
    numberOfSymbols = DEFAULT_LENGTH,
    numberOfUppercaseLetters = DEFAULT_LENGTH,
    numberOfLowercaseLetters = DEFAULT_LENGTH,
    numberOfNumbers = DEFAULT_LENGTH,
  } = options;

  const selectedSymbols = getRandomCharacters(SYMBOLS, numberOfSymbols);
  const selectedUppercaseLetters = getRandomCharacters(
    LETTERS.toUpperCase(),
    numberOfUppercaseLetters,
  );
  const selectedLowercaseLetters = getRandomCharacters(
    LETTERS,
    numberOfLowercaseLetters,
  );
  const selectedNumbers = getRandomCharacters(NUMBERS, numberOfNumbers);

  const randomlyShuffledPasswordList = shuffle([
    ...selectedSymbols,
    ...selectedUppercaseLetters,
    ...selectedLowercaseLetters,
    ...selectedNumbers,
  ]);

  return randomlyShuffledPasswordList.join("");
};

export default generatePassword;
