import getRandomNumber from "./getRandomNumber.ts";

const getRandomCharactersFromList = (
  list: string[] | string,
  numberOfCharacters: number,
) => {
  return new Array(numberOfCharacters).fill(undefined).map(() =>
    list[getRandomNumber(list.length)]
  );
};

export default getRandomCharactersFromList;
