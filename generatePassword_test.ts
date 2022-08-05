import {
  assert,
  assertEquals,
  assertNotStrictEquals,
} from "https://deno.land/std@0.150.0/testing/asserts.ts";
import generatePassword from "./generatePassword.ts";
import { LETTERS, NUMBERS, SYMBOLS } from "./constants.ts";

Deno.test("should generate a random short password with only lowercase letters", () => {
  const nonLowerCaseLettersSet = new Set([
    ...SYMBOLS.split(""),
    ...LETTERS.toUpperCase().split(""),
    ...NUMBERS.split(""),
  ]);
  const options = {
    numberOfLowercaseLetters: 10,
    numberOfNumbers: 0,
    numberOfSymbols: 0,
    numberOfUppercaseLetters: 0,
  };

  const password = generatePassword(options);
  assertEquals(password.length, 10);
  assert(
    password.split("").every((character) =>
      !nonLowerCaseLettersSet.has(character)
    ),
  );
  assertNotStrictEquals(password, generatePassword(options));
});

Deno.test("should generate a random short password with only numbers", () => {
  const nonNumbersSet = new Set([
    ...SYMBOLS.split(""),
    ...LETTERS.toUpperCase().split(""),
    ...LETTERS.split(""),
  ]);
  const options = {
    numberOfLowercaseLetters: 0,
    numberOfNumbers: 10,
    numberOfSymbols: 0,
    numberOfUppercaseLetters: 0,
  };
  const password = generatePassword(options);
  assertEquals(password.length, 10);
  assert(
    password.split("").every((character) => !nonNumbersSet.has(character)),
  );
  assertNotStrictEquals(password, generatePassword(options));
});

Deno.test("should generate a random short password with a mix of different character types", () => {
  const numbersSet = new Set(NUMBERS.split(""));
  const uppercaseSet = new Set(LETTERS.toUpperCase().split(""));
  const lowercaseSet = new Set(LETTERS.split(""));
  const symbolsSet = new Set(SYMBOLS.split(""));

  const options = {
    numberOfLowercaseLetters: 2,
    numberOfNumbers: 2,
    numberOfSymbols: 2,
    numberOfUppercaseLetters: 2,
  };
  const password = generatePassword(options);
  assertEquals(password.length, 8);
  const characterCountByTypes = password.split("").reduce((acc, cur) => {
    switch (true) {
      case numbersSet.has(cur): {
        acc.numberOfNumbers++;
        break;
      }
      case uppercaseSet.has(cur): {
        acc.numberOfUppercaseLetters++;
        break;
      }
      case lowercaseSet.has(cur): {
        acc.numberOfLowercaseLetters++;
        break;
      }
      case symbolsSet.has(cur): {
        acc.numberOfSymbols++;
        break;
      }
    }
    return acc;
  }, {
    numberOfLowercaseLetters: 0,
    numberOfNumbers: 0,
    numberOfSymbols: 0,
    numberOfUppercaseLetters: 0,
  });
  assertEquals(characterCountByTypes, options);
});
