/** 
first we find the matching strings from placeholderPrompt by removing the placeholder ie. {word},
then we extract the word from wordPrompt leaving out the matchingParts
*/

/*
 * Example input/output:
 * const placeholderPrompt = 'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
 * const wordPrompt = 'meaning of word good, and slang meaning of word fr, also give synonyms';
 * console.log(findMatches(placeholderPrompt, wordPrompt)); // Output: [ 'good', 'fr' ]
 */

/*
 * Intermediate variables:
 * - wordPlaceholderIndexes: Array of start and end indexes of placeholders in placeholderPrompt.
 * - matchingParts: Array of string parts between placeholders.
 * - matchesInWordPrompt: Array of matching words extracted from wordPrompt.
 */

/*  
{
  wordPlaceholderIndexes: [ { start: 16, end: 22 }, { start: 50, end: 56 } ]
}
{
  matchingParts: [
    'meaning of word ',
    ', and slang meaning of word ',
    ', also give synonyms'
  ]
}
{ matchesInWordPrompt: [ 'good', 'fr' ] }
*/

export function findMatches(
  placeholderPrompt: string,
  wordPrompt: string
): string[] {
  const wordPlaceholderMatches = placeholderPrompt.matchAll(/\{word\}/g);
  const wordPlaceholderLength = '{word}'.length;

  const wordPlaceholderIndexes: { start: number; end: number }[] = [];

  for (const match of wordPlaceholderMatches) {
    wordPlaceholderIndexes.push({
      start: match.index!,
      end: match.index! + wordPlaceholderLength,
    });
  }

  const matchingParts: string[] = [];
  let previousStart = 0;

  for (const indexes of wordPlaceholderIndexes) {
    const part = placeholderPrompt.slice(previousStart, indexes.start);
    matchingParts.push(part);
    previousStart = indexes.end;
  }
  if (placeholderPrompt.length > previousStart) {
    matchingParts.push(
      placeholderPrompt.slice(previousStart, placeholderPrompt.length)
    );
  }
  const matchesInWordPrompt: string[] = [];

  let operatedWordPrompt = wordPrompt;
  for (let i = 0; i < matchingParts.length; i++) {
    const startIndex =
      operatedWordPrompt.indexOf(matchingParts[i]) + matchingParts[i].length;
    operatedWordPrompt = operatedWordPrompt.slice(
      startIndex,
      operatedWordPrompt.length
    );
    const endIndex =
      i < matchingParts.length - 1
        ? operatedWordPrompt.indexOf(matchingParts[i + 1])
        : operatedWordPrompt.length;
    if (endIndex > 0) {
      const word = operatedWordPrompt.slice(0, endIndex);
      matchesInWordPrompt.push(word);
      operatedWordPrompt = operatedWordPrompt.slice(
        word.length,
        operatedWordPrompt.length
      );
    }
  }

  return matchesInWordPrompt;
}

/**
if more than 1 word then return undefined, as that is not allowed.
if just 1 word occurs one or more times, return it

*/
export function extractWord(
  placeholderPrompt: string,
  wordPrompt: string
): string | undefined {
  const matchesInWordPrompt = findMatches(placeholderPrompt, wordPrompt);
  const set = new Set(matchesInWordPrompt);
  if (set.size === 1) {
    return matchesInWordPrompt[0];
  }
  return undefined;
}
