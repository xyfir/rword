import { Random } from './random';

/**
 * Randomly generate numbers for indexes within the words array.
 * @param length - The length of the words array.
 * @param count - How many indexes to generate.
 */
export function generateIndexes(length: number, count: number): number[] {
  const indexes = [];

  while (true) {
    const index = Random.range(0, length);

    // Check if the index has been chosen before
    if (indexes.indexOf(index) == -1) indexes.push(index);

    // Stop looping if we've hit limit
    if (indexes.length == count) break;
    else if (length < count && indexes.length == length) break;
  }

  return indexes;
}
