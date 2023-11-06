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
