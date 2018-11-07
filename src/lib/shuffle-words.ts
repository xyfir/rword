import { Random } from './random';

/**
 * Shuffle the words array in place.
 * @param words - The words array to shuffle.
 */
export function shuffleWords(words: string[]) {
  let i = 0;
  let j = 0;
  let temp = '';

  for (i = words.length - 1; i > 0; i -= 1) {
    j = Random.range(0, i + 1);

    temp = words[i];
    words[i] = words[j];
    words[j] = temp;
  }
}
